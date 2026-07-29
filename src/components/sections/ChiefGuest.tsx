"use client";

import { CHIEF_GUEST_2026, GUESTS, type Guest, BOOKING_URL } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PhotoMedallion } from "@/components/ui/PhotoMedallion";
import {
  CornerFrame,
  Laurel,
  SparkleField,
  StarRow,
} from "@/components/ui/Ornaments";

/** A smaller horizontal honour card for a past / honorary guest. */
function GuestCard({ guest }: { guest: Guest }) {
  return (
    <div
      data-reveal=""
      className="flex flex-col items-center gap-5 rounded-[6px] border border-gold/22 bg-navy/40 px-6 py-6 text-center sm:flex-row sm:gap-8 sm:text-left"
    >
      <PhotoMedallion
        src={guest.src}
        alt={`${guest.name}, ${guest.editionLabel}`}
        label={"Official photo\nto be added"}
        sizes="190px"
        className="w-[clamp(150px,40vw,190px)] shrink-0"
      />
      <div className="flex flex-1 flex-col items-center sm:items-start">
        <div className="flex items-center gap-3">
          <Laurel side="left" className="hidden h-9 w-5 sm:block" />
          <span className="type-eyebrow text-gold-light/80">
            {guest.editionLabel}
          </span>
          <Laurel side="right" className="hidden h-9 w-5 sm:block" />
        </div>
        <h3 className="type-display mt-2 text-[clamp(1.3rem,3vw,1.9rem)] text-cream">
          {guest.name}
        </h3>
        <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-mist">
          {guest.title} — {guest.note}
        </p>
      </div>
    </div>
  );
}

export function ChiefGuest() {
  const scope = useRevealScope<HTMLElement>();
  const guest = CHIEF_GUEST_2026;

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
          eyebrow="Guest of honour"
          id="guest-heading"
          heading={"Our 2026\n*chief guest*."}
          gold
          className="items-center text-center"
          headingClassName="text-center"
        />

        {/* Featured 2026 chief guest — Sonu Sharma. */}
        <div
          data-reveal=""
          className="panel-gold relative mx-auto mt-12 flex max-w-4xl flex-col items-center gap-8 rounded-[6px] px-6 py-10 text-center sm:px-10 md:flex-row md:gap-12 md:text-left"
        >
          <CornerFrame size={64} inset={12} />

          <div className="relative flex flex-col items-center gap-4">
            <PhotoMedallion
              src={guest.src}
              alt={`${guest.name}, ${guest.editionLabel}`}
              label={"Official photo\nto be added"}
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
            <div className="mt-8">
              <Button variant="metal" href={BOOKING_URL}>
                Book your seat
              </Button>
            </div>
          </div>
        </div>

        {/* Past & honorary guests, in array order. */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-6">
          {GUESTS.map((g) => (
            <GuestCard key={g.name} guest={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
