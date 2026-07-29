"use client";

import Image from "next/image";

import { PARTNERS } from "@/lib/site";
import type { Partner } from "@/lib/site";
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

/**
 * One partner plate. A supplied logo sits on a cream chip so a coloured mark
 * reads against the blue field (the DiTRP logo treatment); until then, the tier
 * and name stand in as a clean, labelled placeholder — the section is never
 * empty even before a single logo lands.
 */
function PartnerPlate({ partner }: { partner: Partner }) {
  return (
    <div className="panel-gold group/plate mx-3 flex h-[92px] w-[200px] shrink-0 items-center justify-center rounded-[4px] px-4 text-center transition-colors duration-300 hover:border-gold/75 sm:mx-4">
      {partner.logo ? (
        <span className="flex h-[64px] w-full items-center justify-center rounded-[3px] bg-cream px-3">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={160}
            height={60}
            className="h-auto max-h-[48px] w-auto max-w-full object-contain"
          />
        </span>
      ) : (
        <span className="flex flex-col items-center justify-center gap-1.5">
          <span className="type-eyebrow text-[10px] text-gold-light/90">
            {partner.tier}
          </span>
          <span className="type-name text-[13px] leading-tight text-mist transition-colors duration-300 group-hover/plate:text-gold">
            {partner.name}
          </span>
        </span>
      )}
    </div>
  );
}

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
          <p className="mx-auto max-w-md text-[13px] leading-relaxed text-mist">
            Our partners for the 2026 show are being confirmed — logos land here
            as each is signed.
          </p>
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
            <PartnerPlate key={partner.name} partner={partner} />
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
