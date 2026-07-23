"use client";

import { cn } from "@/lib/cn";

/**
 * Seamless infinite marquee.
 *
 * The track holds the children twice and translates by exactly -50%, so the
 * second copy lands precisely where the first began — no seam, no jump. Pure
 * CSS animation (transform only), which means it costs nothing on the main
 * thread and stops dead under `prefers-reduced-motion` via the global rule in
 * globals.css.
 */
export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  className,
  trackClassName,
  reverse = false,
}: {
  children: React.ReactNode;
  /** Seconds for one full loop. Higher is slower. */
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group relative w-full overflow-hidden", className)}
      // The duplicated copy is decorative; announce the content once.
      role="presentation"
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center will-change-transform",
          "motion-safe:[animation:marquee-x_linear_infinite]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          "[animation-play-state:running] focus-within:[animation-play-state:paused]",
          trackClassName,
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
