"use client";

import { useRef } from "react";
import {
  DUR,
  EASE,
  STAGGER,
  START,
  ScrollTrigger,
  gsap,
  markRevealed,
  motionEnabled,
  useGSAP,
} from "@/lib/gsap";

/**
 * The one reveal hook every section uses.
 *
 * Attach the returned ref to the section root, then inside it:
 *   - `data-reveal` on anything that should rise + fade in
 *   - `data-fade`   on anything that should only fade in
 *   - `data-split`  on a <SplitHeading> whose words slide out of their masks
 *
 * Elements that enter the viewport together are batched so they share one
 * stagger — that is what makes the page feel like a single system instead of
 * N components each firing an independent timeline.
 *
 * Every tween animates *to* the visible state; the *from* state is the CSS in
 * globals.css. One source of truth, and no flash between paint and hydration.
 */
export function useRevealScope<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;

      const root = scope.current;
      if (!root) return;

      const risers = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const faders = gsap.utils.toArray<HTMLElement>("[data-fade]", root);
      const splits = gsap.utils.toArray<HTMLElement>("[data-split]", root);

      // rise + fade
      if (risers.length) {
        ScrollTrigger.batch(risers, {
          start: START,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: DUR,
              ease: EASE,
              stagger: STAGGER,
              overwrite: "auto",
              onComplete: () => markRevealed(batch),
            }),
        });
      }

      // fade only
      if (faders.length) {
        ScrollTrigger.batch(faders, {
          start: START,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              duration: DUR,
              ease: EASE,
              stagger: STAGGER,
              overwrite: "auto",
              onComplete: () => markRevealed(batch),
            }),
        });
      }

      // masked word reveals
      for (const heading of splits) {
        const words = heading.querySelectorAll<HTMLElement>("[data-word]");
        if (!words.length) continue;

        // Both y and yPercent are zeroed on purpose. The CSS hidden state is
        // translate3d(0,110%,0), but getComputedStyle resolves that to a pixel
        // matrix, so GSAP parses it into `y` and leaves `yPercent` at 0 —
        // animating yPercent alone would move nothing and the words would stay
        // parked below their masks forever.
        gsap.to(words, {
          y: 0,
          yPercent: 0,
          duration: 1,
          ease: EASE,
          stagger: 0.05,
          onComplete: () => markRevealed(heading),
          scrollTrigger: { trigger: heading, start: START, once: true },
        });
      }
    },
    { scope },
  );

  return scope;
}
