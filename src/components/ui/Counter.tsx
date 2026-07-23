"use client";

import { useRef } from "react";
import { EASE, START, gsap, motionEnabled, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const formatter = new Intl.NumberFormat("en-IN");

/**
 * Counts up to `value` once, the first time it scrolls into view.
 *
 * The final value is rendered on the server and left in the DOM, so the
 * number is correct for screen readers, for search engines, with JS off and
 * under reduced motion. The count-up only ever overwrites text that is
 * already there — it never causes layout shift because the box is sized by
 * the final string via `tabular-nums` and a min-width from the ch unit.
 */
export function Counter({
  value,
  suffix = "",
  className,
  duration = 2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = formatter.format(value);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const el = ref.current;
      if (!el) return;

      // Reset to zero at mount rather than at trigger time, so the number
      // never visibly snaps back from its final value as it scrolls in.
      el.textContent = formatter.format(0);

      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration,
        ease: EASE,
        onUpdate: () => {
          el.textContent = formatter.format(Math.round(counter.n));
        },
        onComplete: () => {
          el.textContent = final;
        },
        scrollTrigger: { trigger: el, start: START, once: true },
      });
    },
    { dependencies: [value, duration, final] },
  );

  return (
    <span className={cn("tabular-nums", className)}>
      <span ref={ref}>{final}</span>
      {suffix}
    </span>
  );
}
