import Image from "next/image";
import { EVENT, PAST_GUEST } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CornerFrame,
  Laurel,
  SparkleField,
  StarRow,
} from "@/components/ui/Ornaments";

/* SplitHeading reads "\n" as a line break, which a JSX string attribute would
   not escape. */
const HEADING = "Who has stood\non this *stage*.";

/* Braces delimit a JSX expression, so placeholder copy has to arrive as a
   string rather than as literal JSX text. */
const CHIEF_GUEST_2026 = "{{2026 CHIEF GUEST TO BE ANNOUNCED}}";

/** The two shows the network ran in 2024. */
const EDITIONS_2024 = [
  "India's Best 100 Institute Award Show 2024",
  "Excellence in Education Awards 2024",
] as const;

/**
 * Social proof from the last edition — carefully bounded.
 *
 * Everything here is stated in the past tense and pinned to 2024: the guest
 * presented at that show. Nothing on this page says he is attending 2026, and
 * nothing calls him a judge or a jury member. The 2026 chief guest is an
 * explicit placeholder until the client fills it in.
 */
export function PastGuest() {
  return (
    <Section id="past-guest" labelledBy="past-guest-heading" seams>
      <SparkleField className="-z-10 opacity-50" />

      <SectionHeading
        eyebrow="From the 2024 stage"
        id="past-guest-heading"
        heading={HEADING}
        gold
        className="items-center text-center"
        headingClassName="text-center"
      />

      <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-start">
        {/* The photograph, matted in gold and labelled with its year. */}
        <figure
          data-reveal=""
          className="panel-gold relative rounded-[4px] p-2 lg:col-span-7"
        >
          <CornerFrame size={62} inset={10} />

          <div className="relative isolate aspect-[3/2] overflow-hidden rounded-[2px] bg-navy">
            <Image
              src={PAST_GUEST.src}
              alt={`${PAST_GUEST.name} presenting an award to an institute head at the 2024 show`}
              fill
              sizes="(min-width: 1024px) 56vw, 92vw"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-navy/22"
            />
            <span
              aria-hidden="true"
              className="field-vignette pointer-events-none absolute inset-0"
            />
            <p className="type-eyebrow absolute top-3 left-3 rounded-[3px] border border-gold/45 bg-navy/85 px-3 py-1.5 text-[11px] text-gold-light">
              2024
            </p>
          </div>

          <figcaption className="mt-4 px-1 pb-1 text-[13px] leading-relaxed text-mist">
            <span className="type-name text-cream">{PAST_GUEST.name}</span> on
            stage at the 2024 show.
          </figcaption>
        </figure>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <div data-reveal="" className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <Laurel side="left" className="h-16 w-8 shrink-0 opacity-90" />
              <h3 className="type-name min-w-0 text-[clamp(1.05rem,2.6vw,1.5rem)] leading-snug text-cream">
                {PAST_GUEST.name}
              </h3>
              <Laurel side="right" className="h-16 w-8 shrink-0 opacity-90" />
            </div>

            {/* Verbatim from the data, and deliberately past tense: he
                presented in 2024. Nothing here says he is coming in 2026. */}
            <p className="type-eyebrow mt-4 text-[11px] text-gold-light/90">
              {PAST_GUEST.note}
            </p>

            <StarRow className="mt-4 lg:justify-start" size={14} />

            <p className="mt-5 text-[15px] leading-relaxed text-mist">
              {EVENT.organizer} ran two award nights in 2024, with directors and
              faculty travelling in from institutes all over the country to
              collect their honours in person. The next show is in {EVENT.city}{" "}
              on {EVENT.dateLabel}.
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {EDITIONS_2024.map((edition) => (
                <li
                  key={edition}
                  className="flex items-start gap-3 text-left text-[13px] leading-snug text-cream"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-gold"
                  />
                  <span className="type-name text-[12px] tracking-[0.1em]">
                    {edition}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* This year's guest, still to come. */}
          <div
            data-reveal=""
            className="panel-gold relative flex flex-col items-center rounded-[4px] px-6 py-9 text-center"
          >
            <CornerFrame size={48} inset={8} />
            <p className="type-eyebrow text-gold-light/90">This year</p>
            <p className="type-poster text-metal mt-4 text-[clamp(1rem,2.4vw,1.35rem)]">
              {CHIEF_GUEST_2026}
            </p>
            <StarRow className="mt-5" size={13} />
            <p className="mt-4 max-w-[38ch] text-[13px] leading-relaxed text-mist">
              The chief guest for the 2026 show has not been announced yet. The
              name will appear here as soon as it is confirmed.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
