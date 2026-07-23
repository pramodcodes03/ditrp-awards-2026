"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, gsap, motionEnabled } from "@/lib/gsap";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Wires Lenis smooth scrolling into GSAP's ticker and keeps ScrollTrigger in
 * sync with it. Mounted once, around the whole page.
 *
 * With `prefers-reduced-motion: reduce` Lenis is never created and every
 * ScrollTrigger — including pins — is killed, leaving native scrolling and a
 * fully static, fully visible page.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!motionEnabled()) {
      // Kill anything a child component may have created before this ran,
      // and clear pin spacing so the layout collapses back to normal flow.
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      // Native momentum on touch feels better than synced smoothing, and it
      // keeps the mobile categories carousel responsive.
      syncTouch: false,
      allowNestedScroll: true,
      anchors: { offset: -80 },
    });

    // Published so components can scroll the page THROUGH Lenis; a raw
    // window.scrollTo would be reverted on the next tick.
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /**
     * Keyboard focus must follow the page.
     *
     * The browser natively scrolls a newly focused element into view, but it
     * does so by moving the document directly — which Lenis does not know
     * about, so on the next frame Lenis animates back to its own target and
     * the focused control is left off-screen. Without this, tabbing past the
     * fold silently loses the focus ring.
     *
     * Only `:focus-visible` is handled, so clicking a button never yanks the
     * page; and anything inside a pinned track is skipped because those
     * sections must map focus onto their own scrub position instead.
     */
    const MARGIN = 120;
    const onFocusIn = (event: FocusEvent) => {
      const el = event.target;
      if (!(el instanceof HTMLElement)) return;
      if (!el.matches(":focus-visible")) return;
      if (el.closest("[data-pinned-track]")) return;

      const box = el.getBoundingClientRect();
      const above = box.top < MARGIN;
      const below = box.bottom > window.innerHeight - 24;
      if (!above && !below) return;

      // Instant, not animated: native focus scrolling is instant, and
      // smooth-scrolling the page under a keyboard user is disorienting.
      lenis.scrollTo(el, {
        offset: -MARGIN,
        immediate: true,
        lock: false,
        force: true,
      });
    };
    document.addEventListener("focusin", onFocusIn);

    // Fonts settle after first paint and change heading heights; refresh so
    // every trigger start/end is measured against the final layout.
    let refreshTimer = 0;
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        refreshTimer = window.setTimeout(refresh, 60);
      });
    }

    return () => {
      window.clearTimeout(refreshTimer);
      document.removeEventListener("focusin", onFocusIn);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
