import Image from "next/image";
import type { Metadata } from "next";

import { NOMINEES, type Nominee } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Laurel, RibbonBanner, StarRow } from "@/components/ui/Ornaments";

export const metadata: Metadata = {
  title: "All Nominees",
  description:
    "The shortlist for India's Best 100 Institute Award Show 2026 — a selection of the institutes and directors nominated across the network. The full 100 are announced on the day.",
};

/**
 * The complete nominees listing. A static page: the card markup is replicated
 * from the homepage Nominees section (its internal NomineeCard is not exported)
 * but with the `data-reveal` tags dropped, since there is no reveal scope here.
 */
function NomineeCard({ nominee }: { nominee: Nominee }) {
  const named = !nominee.name.startsWith("{{");

  return (
    <li className="panel-gold group relative flex flex-col items-center rounded-[4px] px-5 pt-9 pb-7 text-center sm:px-7">
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
        <RibbonBanner>{named ? nominee.name : "Nominee"}</RibbonBanner>
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

export default function NomineesPage() {
  return (
    <main id="main">
      <section className="field-royal relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35">
        <div className="container-page flex flex-col items-center text-center">
          {/* Eyebrow */}
          <p className="type-eyebrow flex items-center gap-3 text-gold-light/90">
            <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
            <span>The shortlist</span>
            <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
          </p>

          <h1 className="type-display text-metal mt-6 text-[clamp(2.1rem,5.4vw,3.6rem)]">
            All nominees.
          </h1>

          <p className="mt-6 max-w-[58ch] font-body text-[15px] leading-relaxed text-mist sm:text-[16px]">
            Institutes and directors put forward for India&rsquo;s Best 100 by
            their students, their faculty and their peers. The names below are a
            selection &mdash; the full list of 100 is announced on the day, on
            stage in Mumbai.
          </p>

          <StarRow className="mt-8" size={15} />

          <ul className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NOMINEES.map((nominee) => (
              <NomineeCard key={nominee.slug} nominee={nominee} />
            ))}
          </ul>

          <div className="mt-14">
            <Button variant="outline" href="/">
              &larr; Back to home
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
