import Image from "next/image";
import { TEAM_IMAGE, EVENT } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SparkleField, StarRow } from "@/components/ui/Ornaments";

/**
 * The people who put the show on: the whole DITRP team, framed like the rest
 * of the collateral, with a short line on who makes the night happen.
 */
export function OurTeam() {
  return (
    <Section id="team" labelledBy="team-heading" field="deep" seams>
      <SparkleField className="-z-10 opacity-40" />

      <SectionHeading
        eyebrow="The people behind it"
        id="team-heading"
        heading={"Our\n*team*."}
        gold
        className="items-center text-center"
        headingClassName="text-center"
      >
        <p
          data-reveal=""
          className="mx-auto max-w-[56ch] text-[15px] leading-relaxed text-mist"
        >
          Behind every trophy handed out in {EVENT.city} is the DITRP team —
          the coordinators, hosts and crew who plan the year, fill the hall,
          and turn a stage into a night worth remembering.
        </p>
      </SectionHeading>

      {/* The team, framed. Native ratio is ~3:2, so object-cover fills clean. */}
      <div
        data-reveal=""
        className="ring-metal relative mx-auto mt-14 max-w-5xl rounded-[14px] p-[3px] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.95)]"
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded-[12px] bg-navy">
          <Image
            src={TEAM_IMAGE.src}
            alt={TEAM_IMAGE.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy/85 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center sm:p-8">
            <StarRow size={13} />
            <p className="type-name text-[clamp(0.8rem,2vw,1.05rem)] text-cream">
              {TEAM_IMAGE.caption}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
