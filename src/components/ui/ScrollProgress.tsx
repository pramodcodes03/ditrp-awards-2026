"use client";

import { useRef } from "react";
import { ScrollTrigger, SCRUB, gsap, motionEnabled, useGSAP } from "@/lib/gsap";

/** 2px gold bar across the top, scaling with total page scroll progress. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!motionEnabled()) return;
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: SCRUB,
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-0.5"
    >
      {/* The closed state is an inline `transform`, deliberately not
          `scale-x-0`. Tailwind v4 compiles that utility to the independent
          `scale:` property, which the browser multiplies with `transform` —
          so a GSAP-driven scaleX would be multiplied by zero and the bar
          would never appear. */}
      <div
        ref={ref}
        style={{ transform: "scaleX(0)" }}
        className="h-full w-full origin-left bg-linear-to-r from-gold-deep via-gold-light to-gold-deep"
      />
    </div>
  );
}
