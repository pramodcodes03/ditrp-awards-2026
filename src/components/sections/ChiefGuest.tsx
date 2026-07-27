"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { CHIEF_GUEST_2026, PAST_GUEST, type Guest } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/site";
import {
  CornerFrame,
  Laurel,
  SparkleField,
  StarRow,
} from "@/components/ui/Ornaments";

/** Gold-ringed portrait. A null src renders a marked placeholder coin. */
function GuestMedallion({ guest, size }: { guest: Guest; size: "lg" | "sm" }) {
  const px = size === "lg" ? "w-[clamp(190px,44vw,260px)]" : "w-[clamp(150px,40vw,190px)]";
  return (
    <div className={cn("relative aspect-square shrink-0", px)}>
      {/* gold coin edge */}
      <div className="ring-metal absolute inset-0 rounded-full" />
      <div className="absolute inset-[6px] overflow-hidden rounded-full bg-royal-lit">
        {guest.src ? (
          <Image
            src={guest.src}
            alt={`${guest.name}, ${guest.editionLabel}`}
            fill
            sizes="260px"
            className="object-cover"
          />
        ) : (
          // Marked photo placeholder — never a stand-in face for a named person.
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-b from-royal-lit to-navy text-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-1/3 w-1/3 text-gold/70" fill="currentColor">
              <circle cx="12" cy="8" r="4.2" />
              <path d="M3.5 21c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5z" />
            </svg>
            <span className="type-eyebrow px-3 text-[9px] text-gold-light/70">
              Official photo
              <br />
              to be added
            </span>
          </div>
        )}
      </div>
      {/* thin inner ring */}
      <div aria-hidden="true" className="absolute inset-[6px] rounded-full ring-1 ring-gold/40" />
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

        {/* Featured 2026 guest — Sonu Sharma. */}
        <div
          data-reveal=""
          className="panel-gold relative mx-auto mt-12 flex max-w-4xl flex-col items-center gap-8 rounded-[6px] px-6 py-10 text-center sm:px-10 md:flex-row md:gap-12 md:text-left"
        >
          <CornerFrame size={64} inset={12} />

          <div className="relative flex flex-col items-center gap-4">
            <GuestMedallion guest={guest} size="lg" />
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

        {/* 2024 guest — Ashneer Grover, real photography. */}
        <div
          data-reveal=""
          className="mx-auto mt-8 flex max-w-4xl flex-col items-center gap-5 rounded-[6px] border border-gold/22 bg-navy/40 px-6 py-6 text-center sm:flex-row sm:gap-8 sm:text-left"
        >
          <GuestMedallion guest={PAST_GUEST} size="sm" />
          <div className="flex flex-1 flex-col items-center sm:items-start">
            <div className="flex items-center gap-3">
              <Laurel side="left" className="hidden h-9 w-5 sm:block" />
              <span className="type-eyebrow text-gold-light/80">
                {PAST_GUEST.editionLabel}
              </span>
              <Laurel side="right" className="hidden h-9 w-5 sm:block" />
            </div>
            <h3 className="type-display mt-2 text-[clamp(1.3rem,3vw,1.9rem)] text-cream">
              {PAST_GUEST.name}
            </h3>
            <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-mist">
              {PAST_GUEST.title} — {PAST_GUEST.note} The 2024 edition drew a full
              hall and a hundred trophies; 2026 raises the stage again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
