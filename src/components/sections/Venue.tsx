import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StarRow } from "@/components/ui/Ornaments";
import { SplitHeading } from "@/lib/split-text";
import { DIRECTIONS_URL, EVENT, VENUE_IMAGE } from "@/lib/site";

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
            The venue
          </p>
          <p className="type-name mt-3 text-[clamp(0.8rem,1.9vw,1rem)] text-cream">
            {EVENT.venue}
          </p>
          <p className="mt-2.5 font-body text-[13px] leading-relaxed text-mist">
            {EVENT.address}
          </p>
        </div>
      </div>

      {/* The Mumbai key-visual, framed like the rest of the collateral. Its
          native ratio is ~3:2, so object-cover fills the frame with no crop. */}
      <div
        data-reveal=""
        className="ring-metal relative mx-auto mt-16 max-w-4xl rounded-[12px] p-[3px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded-[10px] bg-navy">
          <Image
            src={VENUE_IMAGE.src}
            alt={VENUE_IMAGE.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-navy/70 to-transparent"
          />
          <p className="type-eyebrow absolute bottom-4 left-4 rounded-full border border-gold/35 bg-navy/70 px-3 py-1.5 text-[10px] text-gold-light backdrop-blur-sm sm:bottom-6 sm:left-6 sm:text-[11px]">
            {EVENT.city} · {EVENT.venue}
          </p>
        </div>
      </div>

      <div data-reveal="" className="mt-10 flex justify-center">
        <Button variant="outline" href={DIRECTIONS_URL}>
          Get directions
        </Button>
      </div>
    </Section>
  );
}
