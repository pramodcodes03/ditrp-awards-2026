import Image from "next/image";
import { FOUNDER } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CornerFrame,
  Laurel,
  RibbonBanner,
  SparkleField,
  StarRow,
} from "@/components/ui/Ornaments";

/**
 * The founder's beat, set as an editorial spread: an award-framed portrait
 * with a metal nameplate ribbon on one side, his story and his own words —
 * signed off as a gold plaque — on the other.
 */
export function Founder() {
  return (
    <Section id="founder" labelledBy="founder-heading" seams>
      <SparkleField className="-z-10 opacity-50" />
      {/* A pool of warm gold light behind the portrait, for grandeur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(42% 46% at 26% 46%, rgba(239,199,94,0.14) 0%, rgba(239,199,94,0) 70%)",
        }}
      />

      <div className="grid gap-x-16 gap-y-20 lg:grid-cols-12 lg:items-center">
        {/* Portrait, framed and plated like the collateral. */}
        <div className="lg:col-span-5">
          <div data-reveal="" className="relative mx-auto max-w-md">
            {/* soft glow halo */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 -z-10 rounded-[28px] bg-gold/15 blur-2xl"
            />
            <CornerFrame className="z-10" size={92} inset={-14} />

            {/* double frame: metal ring + a thin gold mat */}
            <div className="ring-metal relative rounded-[18px] p-[3px] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.95)]">
              <div className="relative rounded-[15px] border border-gold/30 bg-navy p-2">
                <div className="relative aspect-[5/6] overflow-hidden rounded-[9px] bg-royal-lit">
                  <Image
                    src={FOUNDER.portrait}
                    alt={`${FOUNDER.firstName} ${FOUNDER.lastName}, ${FOUNDER.role}, ${FOUNDER.org}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-navy/65 to-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Award-style nameplate ribbon, straddling the frame edge. */}
            <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2">
              <RibbonBanner>{FOUNDER.role}</RibbonBanner>
            </div>
          </div>

          {/* Laurel + house line, echoing the plaques. */}
          <div
            data-reveal=""
            className="mt-14 flex items-center justify-center gap-4"
          >
            <Laurel side="left" className="h-10 w-6 shrink-0 opacity-90" />
            <p className="type-eyebrow text-center text-gold-light/85">
              {FOUNDER.org} &middot; Est. 2016
            </p>
            <Laurel side="right" className="h-10 w-6 shrink-0 opacity-90" />
          </div>
        </div>

        {/* The story. */}
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={FOUNDER.eyebrow}
            id="founder-heading"
            heading={`${FOUNDER.firstName}\n*${FOUNDER.lastName}.*`}
            gold
          >
            <div data-reveal="" className="flex items-center gap-4">
              <span aria-hidden="true" className="rule-gold-thin w-12" />
              <p className="type-name text-[clamp(0.8rem,1.6vw,0.98rem)] text-gold-light">
                {FOUNDER.role} &middot; {FOUNDER.org}
              </p>
              <StarRow size={13} />
            </div>
          </SectionHeading>

          <div className="mt-9 flex flex-col gap-5">
            {FOUNDER.paragraphs.map((para, index) => (
              <p
                key={index}
                data-reveal=""
                className={
                  index === 0
                    ? "max-w-[64ch] text-[17px] leading-relaxed text-pretty text-cream/90"
                    : "max-w-[64ch] text-[15px] leading-relaxed text-pretty text-mist"
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* His words, signed off as a gold plaque. */}
          <figure
            data-reveal=""
            className="panel-gold relative mt-11 isolate overflow-hidden rounded-[8px] px-7 py-9 sm:px-10 sm:py-10"
          >
            <CornerFrame className="-z-10" size={54} inset={12} />
            <div className="flex items-start gap-4 sm:gap-5">
              <span
                aria-hidden="true"
                className="type-display text-metal -mt-2 shrink-0 text-6xl leading-none opacity-80 select-none sm:text-7xl"
              >
                &ldquo;
              </span>
              <blockquote className="type-display text-[clamp(1.1rem,2.3vw,1.5rem)] leading-relaxed text-cream italic">
                {FOUNDER.quote}
              </blockquote>
            </div>
            <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 pl-1">
              <span aria-hidden="true" className="rule-gold-thin w-10" />
              <span className="type-name text-[0.95rem] text-metal">
                {FOUNDER.quoteBy}
              </span>
              <span className="type-eyebrow text-[10px] text-mist/70">
                {FOUNDER.role}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}
