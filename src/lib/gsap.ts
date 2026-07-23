"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP plugins. Every client component that
 * animates must import `gsap` / `ScrollTrigger` / `useGSAP` from HERE, never
 * from the packages directly, so registration happens exactly once.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };

/* ------------------------------------------------------------------
   Global animation grammar. Do not invent new values in components.
   ------------------------------------------------------------------ */

/** Reveal easing. */
export const EASE = "power3.out";
/** Reveal duration, seconds. */
export const DUR = 0.9;
/** ScrollTrigger start for every reveal. */
export const START = "top 80%";
/** Stagger between sibling reveals. */
export const STAGGER = 0.08;
/** Scrub value for every scrubbed effect. */
export const SCRUB = 1;
/** Distance a reveal travels. Mirrors the CSS initial state in globals.css. */
export const REVEAL_Y = 48;

/**
 * True when motion is allowed. Mirrors the pre-paint inline script that
 * stamps `html[data-motion="on"]`, so JS and CSS can never disagree.
 */
export function motionEnabled(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.motion === "on";
}

/** Mark elements as permanently revealed (see globals.css release rule). */
export function markRevealed(targets: Element | Element[]) {
  const list = Array.isArray(targets) ? targets : [targets];
  for (const el of list) el.setAttribute("data-revealed", "true");
}
