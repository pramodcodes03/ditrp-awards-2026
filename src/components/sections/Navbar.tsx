"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DUR,
  EASE,
  STAGGER,
  ScrollTrigger,
  gsap,
  motionEnabled,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { BOOKING_URL, EVENT, NAV_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { CornerFrame, StarRow } from "@/components/ui/Ornaments";

const MENU_ID = "site-mobile-menu";
const BOOK_LABEL = "Book your seat";
/** Tailwind's `lg` breakpoint. The panel is `lg:hidden`, so this must match. */
const DESKTOP_MQ = "(min-width: 64rem)";
const GLASS_AT = 60;

/** "India's Best 100" — the poster lockup, taken off the front of the event
    name rather than retyped, so site.ts stays the only source of the copy. */
const SHOW_LOCKUP = EVENT.name.split(" ").slice(0, 3).join(" ");

/**
 * The DiTRP mark in its white box.
 *
 * The artwork is red and navy on white, so on the royal field it has to sit on
 * a white card exactly as it does on the printed collateral — knocking it out
 * or recolouring it would misprint the brand.
 */
function Brandmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="block rounded-md bg-white px-2.5 py-1.5 shadow-[0_12px_34px_-18px_rgba(0,0,0,0.9)]">
        <Image
          src="/awards/brand/ditrp-logo.png"
          alt={`${EVENT.organizer} — ${EVENT.organizerFull}`}
          width={714}
          height={248}
          loading="eager"
          fetchPriority="high"
          className="h-8 w-auto lg:h-10"
        />
      </span>
      <span className="type-eyebrow hidden text-[10px] text-gold-light/85 sm:block">
        {SHOW_LOCKUP}
      </span>
    </span>
  );
}

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);
  const wasOpen = useRef(false);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The nav's section links are homepage anchors, so from any other route they
  // have to jump home first. On "/" the logo scrolls to the top; elsewhere it
  // navigates home. `#about` becomes `/#about` off the homepage.
  const pathname = usePathname();
  const onHome = pathname === "/";
  const logoHref = onHome ? "#top" : "/";
  const sectionHref = (href: string) => (onHome ? href : `/${href}`);

  /**
   * Unlocks the document synchronously, then closes.
   *
   * Order matters: both next/link and Lenis' delegated anchor handler run
   * *after* this React handler in the same click dispatch, and neither can
   * scroll a document whose root is `overflow: hidden`. Waiting for the effect
   * cleanup would swallow the jump to the section.
   */
  const closeMenu = useCallback(() => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  }, []);

  /* Glass state ---------------------------------------------------- */

  useGSAP(
    () => {
      if (!motionEnabled()) return;

      // Restored scroll positions (reload mid-page) must not paint a
      // transparent bar over content before the first toggle fires.
      setScrolled(window.scrollY > GLASS_AT);

      // No trigger element: start/end resolve against the scroller, so this
      // flips once the page has travelled 60px.
      ScrollTrigger.create({
        start: `top -${GLASS_AT}px`,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });
    },
    { scope: headerRef },
  );

  // Reduced motion: SmoothScrollProvider kills every ScrollTrigger, so the bar
  // would stay transparent over content without this.
  useEffect(() => {
    if (motionEnabled()) return;

    const onScroll = () => setScrolled(window.scrollY > GLASS_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu ---------------------------------------------------- */

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const opening = open;
      const previous = wasOpen.current;
      wasOpen.current = open;

      // Mount (and StrictMode's second mount): the closed state is already
      // server-rendered inline, so there is nothing to animate or un-hide.
      if (!opening && !previous) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]", panel);

      if (!motionEnabled()) {
        gsap.set(panel, { autoAlpha: opening ? 1 : 0 });
        gsap.set(items, { y: 0, opacity: 1 });
        return;
      }

      if (opening) {
        // Synchronous so focus can move into the panel immediately.
        gsap.set(panel, { autoAlpha: 1 });
        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DUR,
            ease: EASE,
            stagger: STAGGER,
            overwrite: "auto",
          },
        );
        return;
      }

      gsap.to(items, {
        y: 12,
        opacity: 0,
        duration: 0.3,
        ease: EASE,
        stagger: 0.03,
        overwrite: "auto",
      });
      gsap.to(panel, { autoAlpha: 0, duration: 0.3, ease: EASE, delay: 0.12 });
    },
    { scope: panelRef, dependencies: [open] },
  );

  // Escape closes; Tab cycles inside the panel so focus never lands on the
  // page behind a full-screen overlay.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      const outside = !panel.contains(active);

      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // Body scroll lock. `overflow` on <html> is what Lenis itself uses to stop.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  // Resizing to desktop hides the panel via `lg:hidden`. Without this the
  // document would stay scroll-locked behind an invisible overlay.
  useEffect(() => {
    if (!open) return;

    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      if (mq.matches) closeMenu();
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, closeMenu]);

  // Focus in on open, back to the hamburger on close.
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      closeRef.current?.focus();
    } else if (hasOpened.current) {
      toggleRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        // The open panel covers the header; `inert` keeps its controls out of
        // the tab order instead of hiding them behind the overlay.
        inert={open}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] border-b",
          "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out",
          scrolled
            ? "border-gold/30 bg-royal/85 shadow-[0_24px_60px_-40px_rgba(1,10,32,0.95)] backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none",
        )}
      >
        <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link
            href={logoHref}
            aria-label={
              onHome ? `${EVENT.name} — back to top` : `${EVENT.name} — home`
            }
            className="flex min-h-11 items-center rounded-[3px]"
          >
            <Brandmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={sectionHref(link.href)}
                    className="group relative flex min-h-11 items-center font-body text-[13px] font-medium tracking-[0.16em] text-mist uppercase transition-colors duration-300 ease-out hover:text-cream"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-2.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Button variant="metal" href={BOOKING_URL}>
              {BOOK_LABEL}
            </Button>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label="Open menu"
            className="-mr-2 flex size-11 items-center justify-center rounded-full text-cream lg:hidden"
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu. The hidden state is inline + server-rendered
          so there is nothing to un-hide after paint. */}
      <div
        ref={panelRef}
        id={MENU_ID}
        style={{ opacity: 0, visibility: "hidden" }}
        className={cn(
          "field-royal fixed inset-0 z-[115] isolate lg:hidden",
          // Kept off during the 420ms close fade so it cannot swallow taps.
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Negative z so the ornament sits on the field but under the links. */}
        <CornerFrame className="-z-10" size={86} inset={12} />

        <div className="relative flex h-full flex-col">
          <div className="container-page flex h-18 shrink-0 items-center justify-between gap-6">
            <Brandmark />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-controls={MENU_ID}
              aria-label="Close menu"
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-cream"
            >
              <span aria-hidden="true" className="relative block size-5">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          {/* `my-auto` rather than `justify-center`: a centred flex child is
              unreachable at the top once it overflows its scroll container. */}
          <nav
            aria-label="Primary mobile"
            data-lenis-prevent=""
            className="container-page flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
          >
            <div className="my-auto w-full py-8">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.href}
                    data-menu-item=""
                    className="border-b border-gold/20"
                  >
                    <Link
                      href={sectionHref(link.href)}
                      onClick={closeMenu}
                      className="type-name flex min-h-14 items-center py-2 text-[clamp(20px,6.2vw,30px)] text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div data-menu-item="" className="mt-10">
                <Button
                  variant="metal"
                  href={BOOKING_URL}
                  onClick={closeMenu}
                  className="w-full"
                >
                  {BOOK_LABEL}
                </Button>

                <StarRow className="mt-7 justify-start" size={13} />

                <p className="mt-4 font-body text-sm text-mist">
                  {EVENT.dateLabel} · {EVENT.city}
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
