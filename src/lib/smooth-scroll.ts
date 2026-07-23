"use client";

import type Lenis from "lenis";

/**
 * Access to the single Lenis instance created by SmoothScrollProvider.
 *
 * Anything that needs to move the page programmatically MUST go through
 * `scrollToY` rather than calling `window.scrollTo`. Lenis keeps its own
 * internal scroll target and drives the real scroll position from it every
 * frame; a raw `window.scrollTo` changes the document position without
 * telling Lenis, so on the very next tick Lenis animates straight back to
 * where it thought it was and the jump is silently undone.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Scroll to an absolute document Y.
 *
 * Falls back to native scrolling when Lenis is not running — which is the
 * case under `prefers-reduced-motion`, so the fallback also deliberately
 * skips the smooth animation.
 */
export function scrollToY(y: number, { immediate = false } = {}) {
  if (instance) {
    instance.scrollTo(y, { immediate, lock: false, force: true });
    return;
  }
  window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}
