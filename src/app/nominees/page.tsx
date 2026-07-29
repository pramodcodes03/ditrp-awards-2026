import type { Metadata } from "next";

import { NOMINEE_CARDS } from "@/lib/nominees-2026";
import { Button } from "@/components/ui/Button";
import { StarRow } from "@/components/ui/Ornaments";
import { NomineesGallery } from "@/components/sections/NomineesGallery";

export const metadata: Metadata = {
  title: "All Nominees",
  description:
    "The shortlist for India's Best 100 Institute Award Show 2026 — every nominated institute, shown on its official card. The full 100 are announced on the day.",
};

export default function NomineesPage() {
  return (
    <main id="main">
      <section className="field-royal relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35">
        <div className="container-page">
          <div className="flex flex-col items-center text-center">
            <p className="type-eyebrow flex items-center gap-3 text-gold-light/90">
              <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
              <span>The shortlist</span>
              <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
            </p>

            <h1 className="type-display text-metal mt-6 text-[clamp(2.1rem,5.4vw,3.6rem)]">
              All nominees.
            </h1>

            <p className="mt-6 max-w-[60ch] font-body text-[15px] leading-relaxed text-mist sm:text-[16px]">
              Every institute put forward for India&rsquo;s Best 100, shown on
              its official nominee card — {NOMINEE_CARDS.length} in all. Tap any
              card to see it full size. The final hundred are announced on the
              day, on stage in Mumbai.
            </p>

            <StarRow className="mt-8" size={15} />
          </div>

          <div className="mt-14">
            <NomineesGallery />
          </div>

          <div className="mt-14 flex justify-center">
            <Button variant="outline" href="/">
              &larr; Back to home
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
