import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StarRow } from "@/components/ui/Ornaments";
import { SplitHeading } from "@/lib/split-text";
import { DIRECTIONS_URL, EVENT } from "@/lib/site";

/**
 * The city is the only part of the location that is actually confirmed, so it
 * carries the section at poster scale; the hall is still owed to us and is
 * labelled as such rather than dressed up as an address.
 *
 * `wordClassName` puts the metal on the masked word span rather than on the
 * <h2>: a background clipped to text does not follow a transformed descendant,
 * and the word span is exactly that while it rises out of its mask.
 */
export function Venue() {
  return (
    <Section id="venue" labelledBy="venue-heading" field="royal">
      <div className="flex flex-col items-center text-center">
        <Eyebrow className="justify-center">Venue &amp; date</Eyebrow>

        {/* One word, so there is no break opportunity: the lower clamp bound
            has to keep MUMBAI inside the gutters at 360px on its own. */}
        <SplitHeading
          as="h2"
          id="venue-heading"
          text={EVENT.city}
          className="type-poster mt-7 text-[clamp(2.9rem,15vw,9.5rem)]"
          wordClassName="text-metal"
        />

        <div
          data-reveal=""
          aria-hidden="true"
          className="rule-gold mt-8 max-w-72"
        />

        <p
          data-reveal=""
          className="type-name mt-8 text-[clamp(0.85rem,2.2vw,1.15rem)] text-cream"
        >
          {EVENT.dateLabel}
        </p>

        <div data-reveal="" className="mt-5">
          <StarRow size={14} />
        </div>

        <div
          data-reveal=""
          className="panel-gold mt-10 max-w-[46ch] rounded-[4px] px-6 py-5 sm:px-9 sm:py-6"
        >
          <p className="type-eyebrow text-[10px] text-gold-light/90">
            Venue &mdash; to be confirmed
          </p>
          <p className="type-name mt-3 text-[clamp(0.8rem,1.9vw,1rem)] text-cream">
            {EVENT.venue}
          </p>
          <p className="mt-2.5 font-body text-[13px] leading-relaxed text-mist">
            {EVENT.address}
          </p>
        </div>
      </div>

      <div
        data-reveal=""
        role="img"
        aria-label={`Decorative map placeholder for ${EVENT.city}. The venue is still to be confirmed, so there is no interactive map yet — use the Get directions link below.`}
        className="panel-gold relative mt-16 aspect-[4/3] overflow-hidden rounded-[4px] sm:aspect-[16/9] md:aspect-[21/9]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <pattern
              id="venue-map-grid"
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M56 0H0v56"
                fill="none"
                stroke="var(--color-gold)"
                strokeOpacity="0.14"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1200" height="500" fill="url(#venue-map-grid)" />
          {/* Abstract "arterial roads" so the placeholder reads as a map. */}
          <g
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.34"
            strokeWidth="2"
          >
            <path d="M-40 372 L340 372 L520 250 L1240 250" />
            <path d="M600 -40 L600 156 L724 250" />
            <path d="M-40 96 L232 96 L340 190 L340 372" />
            <path d="M860 540 L860 328 L1240 328" />
          </g>
          <circle
            cx="600"
            cy="250"
            r="132"
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-navy/40"
        />

        {/* Pin marker. The ping ring keeps a visible resting state so the
            frozen-animation case under reduced motion still looks intentional. */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="absolute inset-0 -m-4 animate-ping rounded-full border border-gold/55 opacity-70" />
          <span className="block size-3 rounded-full bg-gold shadow-[0_0_28px_6px_rgba(241,201,116,0.5)]" />
        </div>

        <p
          aria-hidden="true"
          className="type-name absolute top-1/2 left-1/2 mt-8 -translate-x-1/2 rounded-full border border-gold/35 bg-navy/75 px-4 py-2 text-[11px] whitespace-nowrap text-cream"
        >
          {EVENT.venue}
        </p>

        <p
          aria-hidden="true"
          className="type-eyebrow absolute bottom-4 left-4 rounded-full border border-gold/35 px-3 py-1.5 text-[10px] text-gold sm:bottom-6 sm:left-6 sm:text-[11px]"
        >
          {"{{MAP EMBED}}"}
        </p>
      </div>

      <div data-reveal="" className="mt-10 flex justify-center">
        <Button variant="outline" href={DIRECTIONS_URL}>
          Get directions
        </Button>
      </div>
    </Section>
  );
}
