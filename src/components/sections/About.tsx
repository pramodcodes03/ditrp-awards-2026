import { cn } from "@/lib/cn";
import { EVENT, STATS, ROUTES } from "@/lib/site";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CornerFrame,
  Laurel,
  SparkleField,
  StarRow,
} from "@/components/ui/Ornaments";

/* Declared here, not inline: a JSX string attribute would not escape the "\n"
   that SplitHeading uses as its line break. The full stop sits *inside* the
   italic markers because SplitText splits on whitespace and joins words with a
   space — a trailing "." outside them would render as its own detached word. */
const HEADING = "One stage.\nOne hundred *institutes.*";

/**
 * Hairlines for the 2×2 plaque.
 *
 * Stacked on phones the cells only need a rule between each; from `sm` the
 * grid becomes two columns and the rules have to form a cross instead — so
 * cell 1 drops its top border and takes a left one.
 */
function cellRules(index: number) {
  return cn(
    index > 0 && "border-t border-gold/25",
    index === 1 && "sm:border-t-0 sm:border-l",
    index === 3 && "sm:border-l",
  );
}

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SparkleField className="-z-10 opacity-60" />

      <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About the show"
            id="about-heading"
            heading={HEADING}
            gold
          >
            <div data-reveal="">
              <StarRow className="justify-start" size={15} />
            </div>
          </SectionHeading>

          <div className="mt-9 flex flex-col gap-6">
            <p
              data-reveal=""
              className="max-w-[58ch] text-[17px] leading-relaxed text-pretty text-mist"
            >
              India&rsquo;s Best 100 Institute Award Show is the one day{" "}
              {EVENT.organizer} sets aside to call the roll.{" "}
              {EVENT.organizerFull} honours the hundred computer-training
              institutes that did the most for their students over the year —
              and the directors, faculty and centre heads standing behind them.
            </p>
            <p
              data-reveal=""
              className="max-w-[58ch] text-[15px] leading-relaxed text-pretty text-mist"
            >
              Two editions filled a hall in 2024 — India&rsquo;s Best 100 and
              the Excellence in Education Awards. The next is in {EVENT.city} on{" "}
              {EVENT.dateLabel}, where the final hundred are called to the
              stage.
            </p>

            <div data-reveal="" className="mt-2">
              <Button variant="metal" href={ROUTES.nomineeBenefits}>
                View nominee benefits
              </Button>
            </div>
          </div>
        </div>

        {/* The record, set as a gold plaque rather than four loose numbers. */}
        <div className="lg:col-span-5">
          <div className="panel-gold relative isolate rounded-[4px] px-6 py-9 sm:px-9 sm:py-10">
            <CornerFrame className="-z-10" size={58} inset={10} />

            <div
              data-reveal=""
              className="flex items-center justify-center gap-3"
            >
              <Laurel side="left" className="h-11 w-6 shrink-0 opacity-90" />
              <p className="type-eyebrow text-center text-gold-light/90">
                The record so far
              </p>
              <Laurel side="right" className="h-11 w-6 shrink-0 opacity-90" />
            </div>

            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  data-reveal=""
                  className={cn(
                    // col-reverse keeps the DOM in valid dt→dd order while the
                    // numeral still sits above its label.
                    "flex flex-col-reverse gap-2.5 px-2 py-7 text-center sm:px-4",
                    cellRules(index),
                  )}
                >
                  <dt className="type-eyebrow text-mist">{stat.label}</dt>
                  {/* Two size ramps, not one: stacked on a phone the numeral
                      has the whole plaque to itself, but from `sm` it lives in
                      half of a 5/12 column, where the widest value ("50,000+")
                      would overflow at anything above ~2.4rem. */}
                  <dd className="type-display text-metal text-[clamp(2.25rem,9vw,3rem)] sm:text-[clamp(1.85rem,2.5vw,2.35rem)]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
