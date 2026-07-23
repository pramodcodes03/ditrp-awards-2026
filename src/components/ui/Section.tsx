"use client";

import { cn } from "@/lib/cn";
import { useRevealScope } from "@/lib/use-reveal";

/**
 * Standard section shell: the royal-blue field, optional gold hairline seams
 * top and bottom, and the shared reveal scope wired up. Any `data-reveal` /
 * `data-fade` / `data-split` element inside animates on the one grammar.
 */
export function Section({
  id,
  labelledBy,
  field = "royal",
  seams = false,
  className,
  innerClassName,
  children,
}: {
  id?: string;
  labelledBy?: string;
  /** `royal` lights the middle of the band; `deep` stays flat navy. */
  field?: "royal" | "deep";
  /** Gold hairlines along the top and bottom edges, as on the card border. */
  seams?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      id={id}
      ref={scope}
      aria-labelledby={labelledBy}
      className={cn(
        "section-y relative isolate",
        field === "royal" ? "field-royal" : "bg-navy",
        seams &&
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35",
        className,
      )}
    >
      <div className={cn("container-page", innerClassName)}>{children}</div>
    </section>
  );
}
