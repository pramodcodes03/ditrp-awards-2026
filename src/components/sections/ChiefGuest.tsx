"use client";

import { CHIEF_GUEST_2026, GUESTS, type Guest, BOOKING_URL } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PhotoMedallion } from "@/components/ui/PhotoMedallion";
import { CornerFrame, SparkleField, StarRow } from "@/components/ui/Ornaments";

/** A social glyph, sized and coloured to inherit the button's gold-on-hover. */
function SocialSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px] text-gold-light transition-colors group-hover/soc:text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const GLYPHS = {
  Instagram: (
    <SocialSvg>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </SocialSvg>
  ),
  Facebook: (
    <SocialSvg>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </SocialSvg>
  ),
  YouTube: (
    <SocialSvg>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </SocialSvg>
  ),
} as const;

/** The guest's official channels, as compact gold-ringed icon buttons. */
function GuestSocials({ guest }: { guest: Guest }) {
  const links = [
    { label: "Instagram", href: guest.instagram, glyph: GLYPHS.Instagram },
    { label: "Facebook", href: guest.facebook, glyph: GLYPHS.Facebook },
    { label: "YouTube", href: guest.youtube, glyph: GLYPHS.YouTube },
  ].filter((l) => l.href);

  if (links.length === 0) return null;

  return (
    <ul className="flex items-center gap-2.5">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${guest.name} on ${l.label} (opens in a new tab)`}
            className="group/soc flex size-11 items-center justify-center rounded-full border border-gold/40 bg-navy/30 transition-colors hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {l.glyph}
          </a>
        </li>
      ))}
    </ul>
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
          <GuestSocials guest={guest} />
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
