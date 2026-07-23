"use client";

import Image from "next/image";
import { useRef } from "react";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { EVENT } from "@/lib/site";
import { StarRow } from "@/components/ui/Ornaments";

const SEEN_KEY = "ditrp-preloader-seen";
/** Timeline runs ~1.40s; this is the dead-man's switch if anything stalls. */
const SAFETY_MS = 1600;

/** "India's Best 100" — the poster lockup, taken off the front of the event
    name rather than retyped, so site.ts stays the only source of the copy. */
const WORDS = EVENT.name.split(" ").slice(0, 3);

/**
 * Once-per-session curtain raise.
 *
 * The decision to play is made *before first paint* by the inline script in
 * the root layout: it checks both `prefers-reduced-motion` and sessionStorage
 * and stamps `html[data-preloader="on"]`. CSS keys the overlay's visibility
 * and the scroll lock off that attribute, which buys three things React
 * cannot:
 *
 *   - the curtain is painted on the very first frame, so it actually covers
 *     the page load instead of dropping in a frame late;
 *   - a returning visitor never sees a flash of curtain at all;
 *   - with JavaScript disabled the attribute is never set, so the overlay
 *     stays `display: none` and can never strand the page behind it.
 *
 * This component therefore owns no visibility state — it only plays the
 * timeline and then clears the attribute, which simultaneously hides the
 * overlay and releases the scroll lock.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const doc = document.documentElement;
      if (doc.dataset.preloader !== "on") return;

      // Mark it seen immediately: a reload mid-animation should not replay.
      // Private-mode browsers throw on storage access, and a throw must never
      // cost the visitor a locked page.
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Ignored — worst case the curtain plays again next navigation.
      }

      // Clearing the attribute hides the overlay AND releases the scroll lock,
      // so every exit path funnels through this one call.
      const release = () => doc.removeAttribute("data-preloader");
      const safety = window.setTimeout(release, SAFETY_MS);

      const letters = gsap.utils.toArray<HTMLElement>("[data-word]", root);

      const timeline = gsap
        .timeline({
          onComplete: () => {
            window.clearTimeout(safety);
            release();
          },
        })
        .to(logoRef.current, { y: 0, opacity: 1, duration: 0.42, ease: EASE }, 0)
        // The CSS hidden state is translate3d(0,110%,0), which getComputedStyle
        // resolves to a pixel matrix — GSAP parses that into `y` and leaves
        // `yPercent` at 0, so both must be zeroed or the letters never leave
        // their masks.
        .to(
          letters,
          { y: 0, yPercent: 0, duration: 0.46, ease: EASE, stagger: 0.013 },
          0.05,
        )
        .to(ruleRef.current, { scaleX: 1, duration: 0.46, ease: EASE }, 0.2)
        .to(starsRef.current, { opacity: 1, duration: 0.34, ease: "none" }, 0.34)
        // The complete lockup holds for ~110ms before it leaves.
        .to(
          stageRef.current,
          { y: -28, opacity: 0, duration: 0.24, ease: "power2.in" },
          0.8,
        )
        .to(
          leftRef.current,
          { xPercent: -100, duration: 0.58, ease: "power3.inOut" },
          0.82,
        )
        .to(
          rightRef.current,
          { xPercent: 100, duration: 0.58, ease: "power3.inOut" },
          0.82,
        );

      return () => {
        window.clearTimeout(safety);
        timeline.kill();
        release();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-preloader-overlay=""
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[110] select-none"
    >
      {/* Curtain halves — transform-only, so the page shows through the seam. */}
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <div
          ref={leftRef}
          className="absolute inset-0 bg-royal will-change-transform"
        >
          <span className="absolute inset-0 bg-linear-to-r from-navy to-transparent" />
          <span className="absolute inset-y-0 right-0 w-10 bg-linear-to-l from-gold/10 to-transparent" />
          <span className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-gold/55 to-transparent" />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <div
          ref={rightRef}
          className="absolute inset-0 bg-royal will-change-transform"
        >
          <span className="absolute inset-0 bg-linear-to-l from-navy to-transparent" />
          <span className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-gold/10 to-transparent" />
          <span className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-gold/55 to-transparent" />
        </div>
      </div>

      {/* Lockup layer: rides above both halves and leaves before they part. */}
      <div
        ref={stageRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-[clamp(14px,2.6vw,24px)] will-change-transform"
      >
        <div className="field-vignette pointer-events-none absolute inset-0" />

        {/* The mark in its white box — the strongest brand signal we have, and
            the way it is printed on every card. */}
        <div
          ref={logoRef}
          style={{ opacity: 0, transform: "translate3d(0,14px,0)" }}
          className="relative rounded-lg bg-white px-4 py-2.5 shadow-[0_14px_44px_-18px_rgba(0,0,0,0.95)] will-change-transform sm:px-6 sm:py-3"
        >
          <Image
            src="/awards/brand/ditrp-logo.png"
            alt=""
            width={714}
            height={248}
            loading="eager"
            fetchPriority="high"
            className="h-8 w-auto sm:h-11"
          />
        </div>

        {/* Inline-block letter masks (not flex) so `align-bottom` — not flex
            stretch — decides the mask height; a stretched mask would sit taller
            than the 110% travel and let the glyph tops peek through.
            `leading-[1.12]` deliberately overrides type-poster's 0.94: at that
            leading the mask is shorter than the caps and clips them. */}
        <div className="type-poster relative px-[var(--gutter)] text-center text-[clamp(1.55rem,7vw,4.75rem)] leading-[1.12]">
          {WORDS.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className={cn(
                "inline-block align-bottom whitespace-nowrap",
                wordIndex < WORDS.length - 1 && "me-[0.28em]",
              )}
            >
              {Array.from(word).map((character, characterIndex) => (
                <span
                  key={characterIndex}
                  className="me-[0.09em] inline-block overflow-hidden align-bottom"
                >
                  {/* data-word inherits the pre-paint hidden state from
                      globals.css. text-metal sits on the moving span rather
                      than on the block above so the gradient travels with the
                      glyph inside its mask instead of being painted once at
                      the untransformed position. */}
                  <span
                    data-word=""
                    className="text-metal inline-block will-change-transform"
                  >
                    {character}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>

        {/* scaleX lives in an inline transform, not `scale-x-0`: Tailwind v4
            compiles that class to the independent `scale` property, which
            multiplies GSAP's transform and would pin the rule shut forever. */}
        <div className="relative w-[min(340px,56vw)]">
          <span
            ref={ruleRef}
            className="rule-gold block origin-center will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div ref={starsRef} className="relative opacity-0">
          <StarRow size={15} />
        </div>
      </div>
    </div>
  );
}
