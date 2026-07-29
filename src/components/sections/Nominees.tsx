"use client";

import Image from "next/image";
import { ROUTES } from "@/lib/site";
import { NOMINEE_CARDS } from "@/lib/nominees-2026";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SparkleField } from "@/components/ui/Ornaments";

/** A preview strip on the homepage; the full set lives on /nominees. */
const PREVIEW = NOMINEE_CARDS.slice(0, 14);

export function Nominees() {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      id="nominees"
      ref={scope}
      aria-labelledby="nominees-heading"
      className="field-royal section-y relative isolate overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35"
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
            their faculty and their peers across the network — {NOMINEE_CARDS.length}{" "}
            nominees and counting.
          </p>
        </SectionHeading>
      </div>

      {/* Full-bleed carousel of the printed nominee cards, shown as-is. */}
      <div data-reveal="" className="relative mt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-navy to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-navy to-transparent sm:w-20"
        />

        <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-3 sm:gap-6">
          {PREVIEW.map((card) => (
            <li
              key={card.slug}
              className="w-[clamp(200px,62vw,258px)] shrink-0 snap-center"
            >
              <div className="group overflow-hidden rounded-[10px] border border-gold/30 bg-royal-lit shadow-[0_26px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out hover:-translate-y-1.5">
                <div className="relative aspect-[9/16]">
                  <Image
                    src={card.src}
                    alt={`${card.name} — 2026 nominee`}
                    fill
                    sizes="258px"
                    className="object-cover"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page">
        <div data-reveal="" className="mt-12 flex justify-center">
          <Button variant="metal" href={ROUTES.allNominees}>
            View all {NOMINEE_CARDS.length} nominees
          </Button>
        </div>
      </div>
    </section>
  );
}
