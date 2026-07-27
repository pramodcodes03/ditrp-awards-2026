import { BOOKING_URL, EVENT, NOMINATION_URL } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/lib/split-text";
import {
  CornerFrame,
  Laurel,
  SparkleField,
  StarRow,
  Trophy,
} from "@/components/ui/Ornaments";

/* Declared here, not inline: a JSX string attribute would not escape the "\n"
   that SplitHeading uses as its line break. Set roman, not italic — this is the
   page's second poster moment and it should read like the printed card. */
const HEADING = "Take the stage at\nIndia’s Best 100.";

/**
 * The closing poster. `#reserve` is the anchor both BOOKING_URL and
 * NOMINATION_URL resolve to, so the id is load-bearing — it must not move.
 *
 * The metal goes on the masked word spans rather than on the <h2>: a background
 * clipped to text does not follow a transformed descendant, and each word is
 * exactly that while it rises out of its mask.
 */
export function FinalCta() {
  return (
    <Section
      id="reserve"
      labelledBy="reserve-heading"
      field="royal"
      seams
      className="overflow-hidden"
    >
      <SparkleField className="-z-10 opacity-70" />
      <CornerFrame className="-z-10" size={104} inset={18} />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Ornaments take only their own props, so the reveal tag lives on a
            wrapper rather than being spread onto them. */}
        <div data-reveal="">
          <Trophy size={62} />
        </div>

        <p data-reveal="" className="type-eyebrow mt-6 text-gold-light/90">
          One day only
        </p>

        <div className="mt-5 flex w-full items-center justify-center gap-4 sm:gap-7">
          <Laurel
            side="left"
            className="hidden h-24 w-12 shrink-0 opacity-90 sm:block lg:h-28 lg:w-14"
          />
          <SplitHeading
            as="h2"
            id="reserve-heading"
            text={HEADING}
            className="type-poster min-w-0 flex-1 text-[clamp(1.7rem,5.4vw,3.8rem)]"
            wordClassName="text-metal"
          />
          <Laurel
            side="right"
            className="hidden h-24 w-12 shrink-0 opacity-90 sm:block lg:h-28 lg:w-14"
          />
        </div>

        <div data-reveal="" className="mt-7">
          <StarRow size={16} />
        </div>

        <p
          data-reveal=""
          className="mt-7 max-w-[54ch] text-[15px] leading-relaxed text-mist"
        >
          A hundred institutes, one stage in {EVENT.city}. Put your centre
          forward for the shortlist, or reserve the seats to watch your network
          collect its honours on {EVENT.dateLabel}.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
          <div data-reveal="" className="w-full sm:w-auto">
            <Button
              variant="metal"
              href={BOOKING_URL}
              className="w-full sm:w-auto"
            >
              Book your seat
            </Button>
          </div>
          <div data-reveal="" className="w-full sm:w-auto">
            <Button
              variant="outline"
              href={NOMINATION_URL}
              className="w-full sm:w-auto"
            >
              Nominate an institute
            </Button>
          </div>
        </div>

        <p data-fade="" className="mt-8 text-[13px] leading-relaxed text-mist/85">
          Nominations close {EVENT.nominationDeadline}.
        </p>

        <div aria-hidden="true" data-fade="" className="rule-gold mt-14 max-w-sm" />
      </div>
    </Section>
  );
}
