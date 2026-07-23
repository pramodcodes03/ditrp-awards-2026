"use client";

import { PARTNERS } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** ~22px/s drift — slow enough to read a plate as it passes. */
const LOOP_SECONDS = 60;

/**
 * With motion reduced the track never moves, and one pass is wider than a phone
 * — so the last partners would simply be unreachable. Reduced motion therefore
 * gets a real horizontal scroller instead of a frozen marquee.
 */
const MARQUEE_CLASS =
  "motion-reduce:overflow-x-auto motion-reduce:overscroll-x-contain";

export function Partners() {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      id="partners"
      ref={scope}
      aria-labelledby="partners-heading"
      className="field-royal section-y relative isolate overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="With thanks"
          id="partners-heading"
          heading="Partners & sponsors"
          gold
          className="items-center text-center"
          headingClassName="text-center text-[clamp(1.5rem,3vw,2.25rem)]"
        >
          <div
            aria-hidden="true"
            data-fade=""
            className="rule-gold mx-auto w-full max-w-32"
          />
        </SectionHeading>
      </div>

      {/* Full-bleed band: the marquee clips itself, and the section clips the
          page, so a track wider than the viewport can never push the document
          sideways. */}
      <div data-reveal="" className="relative mt-14 sm:mt-16">
        <Marquee speed={LOOP_SECONDS} className={MARQUEE_CLASS}>
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="panel-gold type-eyebrow mx-3 flex h-[88px] w-[200px] shrink-0 items-center justify-center rounded-[4px] px-4 text-center text-[11px] leading-[1.6] text-mist transition-colors duration-300 hover:border-gold/75 hover:text-gold sm:mx-4"
            >
              {partner}
            </div>
          ))}
        </Marquee>

        {/* Navy edge fades, so plates dissolve into the field rather than
            being sliced off at the viewport edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-navy via-navy/70 to-transparent sm:w-32"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-navy via-navy/70 to-transparent sm:w-32"
        />
      </div>
    </section>
  );
}
