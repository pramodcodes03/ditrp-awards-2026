"use client";

import { AWARDS, type Award } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SplitHeading } from "@/lib/split-text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  CornerFrame,
  Laurel,
  SparkleField,
  StarRow,
  Trophy,
} from "@/components/ui/Ornaments";

/* Declared out here so "\n" reaches SplitHeading as a real line break. */
const HEADING = "Two honours.\nOne *stage*.";

/**
 * The honours.
 *
 * There are exactly two awards, so this is deliberately NOT a carousel — two
 * items behind a pinned horizontal scroll would be a mechanism with nothing to
 * do. Instead each award gets a full ceremonial panel: trophy, ordinal, name in
 * struck gold, and the ghosted numeral behind it, sized so a pair fills the
 * width the way eight cards used to.
 */
function AwardPanel({ award }: { award: Award }) {
  const [line1, line2] = award.title.split("\n");

  return (
    <li
      data-reveal=""
      className="panel-gold group relative flex flex-col items-center overflow-hidden rounded-[4px] px-6 py-11 text-center sm:px-10 sm:py-14"
    >
      <CornerFrame size={60} inset={10} />

      {/* Oversized ghosted ordinal, anchoring the panel's negative space. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(11rem,22vw,17rem)] leading-none font-black text-gold/[0.05]"
      >
        {award.index}
      </span>

      <span className="type-eyebrow relative text-gold-light/80">
        Award {award.index}
      </span>

      <span className="relative mt-7 block transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <Trophy size={92} />
      </span>

      <span aria-hidden="true" className="rule-gold relative mt-8 max-w-[190px]" />

      <h3 className="type-poster text-metal relative mt-6 text-[clamp(1.45rem,3.1vw,2.3rem)]">
        {line1}
        {line2 && (
          <>
            <br />
            {line2}
          </>
        )}
      </h3>

      <p className="type-eyebrow relative mt-4 text-[11px] text-mist">
        {award.subtitle}
      </p>

      <StarRow className="relative mt-6" size={14} />

      <p className="relative mt-7 max-w-[46ch] text-[15px] leading-relaxed text-mist">
        {award.description}
      </p>

      {/* Who it is for, between laurel fronds — the card's own motif. */}
      <span className="relative mt-9 flex items-center justify-center gap-3">
        <Laurel side="left" className="h-16 w-9 shrink-0 opacity-90" />
        <span className="type-name text-[clamp(0.72rem,1.5vw,0.85rem)] text-cream">
          {award.forWhom}
        </span>
        <Laurel side="right" className="h-16 w-9 shrink-0 opacity-90" />
      </span>
    </li>
  );
}

export function Categories() {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      id="categories"
      ref={scope}
      aria-labelledby="categories-heading"
      className="field-royal section-y relative isolate overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35"
    >
      <SparkleField className="-z-10 opacity-60" />

      <div className="container-page">
        {/* Centred header, full width — the old two-column split stranded the
            heading in a narrow rail and left the right half of the band empty. */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>The honours</Eyebrow>

          <SplitHeading
            as="h2"
            id="categories-heading"
            text={HEADING}
            className="type-display mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] text-cream"
            wordClassName="text-metal"
          />

          <p
            data-reveal=""
            className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-mist"
          >
            Two awards are presented at India&rsquo;s Best 100 — one for the
            centre, one for the people who run it. Both are decided on the
            year&rsquo;s evidence long before a name is read out in Mumbai.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {AWARDS.map((award) => (
            <AwardPanel key={award.index} award={award} />
          ))}
        </ul>
      </div>
    </section>
  );
}
