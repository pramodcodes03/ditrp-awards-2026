"use client";

import { CHIEF_GUEST_2026, GUESTS, type Guest, BOOKING_URL } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PhotoMedallion } from "@/components/ui/PhotoMedallion";
import { CornerFrame, SparkleField, StarRow } from "@/components/ui/Ornaments";

/** Instagram mark, drawn so it inherits the gold-on-hover text colour. */
function InstagramGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px] text-gold-light transition-colors group-hover/ig:text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * The one guest card used for every guest — the featured design applied to all,
 * so 2026, 2024 and 2023 read as the same honour at the same scale. Only the
 * current chief guest carries the booking call to action.
 */
function GuestCard({ guest, featured }: { guest: Guest; featured?: boolean }) {
  return (
    <div
      data-reveal=""
      className="panel-gold relative flex flex-col items-center gap-8 rounded-[6px] px-6 py-10 text-center sm:px-10 md:flex-row md:gap-12 md:text-left"
    >
      <CornerFrame size={64} inset={12} />

      <div className="relative flex shrink-0 flex-col items-center gap-4">
        <PhotoMedallion
          src={guest.src}
          alt={`${guest.name}, ${guest.editionLabel}`}
          label={"Official photo\nto be added"}
          sizes="260px"
          className="w-[clamp(190px,44vw,260px)]"
        />
        <StarRow size={13} />
      </div>

      <div className="relative flex flex-1 flex-col items-center md:items-start">
        <span className="type-eyebrow text-gold-light/80">
          {guest.editionLabel}
        </span>
        <h3 className="type-poster text-metal mt-3 text-[clamp(1.9rem,4.6vw,3.1rem)]">
          {guest.name}
        </h3>
        <p className="type-name mt-2 text-[clamp(0.72rem,1.6vw,0.88rem)] text-cream">
          {guest.title}
        </p>
        <span aria-hidden="true" className="rule-gold my-6 max-w-[220px]" />
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-mist">
          {guest.note}
        </p>

        <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row md:items-center">
          {guest.instagram && (
            <a
              href={guest.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${guest.name} on Instagram (opens in a new tab)`}
              className="group/ig inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-navy/30 px-4 py-2 text-cream transition-colors hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <InstagramGlyph />
              <span className="type-name text-[0.7rem]">Follow on Instagram</span>
            </a>
          )}
          {featured && (
            <Button variant="metal" href={BOOKING_URL}>
              Book your seat
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ChiefGuest() {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      id="guest"
      ref={scope}
      aria-labelledby="guest-heading"
      className="field-royal section-y relative isolate overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35"
    >
      <SparkleField className="-z-10 opacity-60" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Guests of honour"
          id="guest-heading"
          heading={"On the\n*stage*."}
          gold
          className="items-center text-center"
          headingClassName="text-center"
        />

        {/* 2026 chief guest first, then the previous editions — same card. */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-8">
          <GuestCard guest={CHIEF_GUEST_2026} featured />
          {GUESTS.map((g) => (
            <GuestCard key={g.name} guest={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
