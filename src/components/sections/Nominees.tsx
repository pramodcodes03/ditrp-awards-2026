"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { NOMINEES, ROUTES, type Nominee } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Laurel, RibbonBanner, SparkleField, StarRow } from "@/components/ui/Ornaments";

/**
 * The 2026 nominees.
 *
 * Each portrait is a tight crop of the nominee's own printed card, so the
 * scalloped gold medallion around the face is the real artwork rather than a
 * CSS approximation of it — which is why there is no ring drawn here.
 */
function NomineeCard({ nominee }: { nominee: Nominee }) {
  const named = !nominee.name.startsWith("{{");

  return (
    <li
      data-reveal=""
      className="panel-gold group relative flex w-[clamp(240px,80vw,300px)] shrink-0 snap-center flex-col items-center rounded-[4px] px-5 pt-9 pb-7 text-center sm:px-7"
    >
      {/* Medallion — the card's own gold frame, cropped from the artwork. */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -inset-3 rounded-full bg-gold/18 blur-xl transition-opacity duration-500 group-hover:opacity-100 motion-safe:opacity-70"
        />
        <Image
          src={`/awards/nominees/${nominee.slug}-portrait.jpg`}
          alt={
            named
              ? `${nominee.name}, nominee from ${nominee.institute}`
              : `Nominee portrait from ${nominee.institute}`
          }
          width={560}
          height={560}
          sizes="(max-width: 640px) 60vw, 200px"
          className="relative w-[clamp(140px,38vw,180px)] rounded-full transition-transform duration-500 ease-out group-hover:-translate-y-1"
        />
      </div>

      {/* Name on the gold ribbon, exactly as printed. */}
      <div className="mt-6">
        <RibbonBanner>{nominee.name}</RibbonBanner>
      </div>

      <p className="type-eyebrow mt-5 text-[11px] text-cream">As Nominee</p>

      <StarRow className="mt-3" size={13} />

      {/* Institute name between laurel branches. */}
      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <Laurel side="left" className="h-14 w-7 shrink-0 opacity-90 sm:h-16 sm:w-8" />
        <p className="type-name min-w-0 flex-1 text-[clamp(0.78rem,1.7vw,0.95rem)] leading-snug text-cream">
          {nominee.institute}
        </p>
        <Laurel side="right" className="h-14 w-7 shrink-0 opacity-90 sm:h-16 sm:w-8" />
      </div>

      <p className="mt-2.5 font-body text-[13px] font-medium tracking-[0.14em] text-gold uppercase">
        @ {nominee.state}
      </p>
    </li>
  );
}

export function Nominees() {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      id="nominees"
      ref={scope}
      aria-labelledby="nominees-heading"
      className={cn(
        "field-royal section-y relative isolate overflow-hidden",
        // Hairline gold seams top and bottom, as on the printed border.
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35",
      )}
    >
      <SparkleField className="-z-10 opacity-70" />

      <div className="container-page">
        <SectionHeading
          eyebrow="On the shortlist"
          id="nominees-heading"
          heading={"Meet the\n*nominees*."}
          gold
          className="items-center text-center"
          headingClassName="text-center"
        >
          <p
            data-reveal=""
            className="mx-auto max-w-[56ch] text-[15px] leading-relaxed text-mist"
          >
            Institutes put forward for India&rsquo;s Best 100 by their students,
            their faculty and their peers across the network. Every nomination is
            reviewed before the final hundred are called to the stage in Mumbai.
          </p>
        </SectionHeading>

        {/* Horizontal snap carousel — swipeable on touch and clipped by the
            scroller itself, so the page never scrolls sideways. Native
            overflow-x scrolling keeps tab order intact and scrolls any focused
            child into view. */}
        <div className="relative mt-14">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
            {NOMINEES.map((nominee) => (
              <NomineeCard key={nominee.slug} nominee={nominee} />
            ))}
          </ul>

          {/* Soft navy edge-fades so cards dissolve at the rims, not cut off. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-navy to-transparent sm:w-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-navy to-transparent sm:w-20"
          />
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <p data-reveal="" className="text-center text-[13px] text-mist/80">
            Nominations shown are a selection. The full list of 100 is announced
            on the day.
          </p>
          <Button data-reveal="" variant="metal" href={ROUTES.allNominees}>
            View all nominees
          </Button>
        </div>
      </div>
    </section>
  );
}
