import Link from "next/link";
import type { Metadata } from "next";
import {
  Coffee,
  UtensilsCrossed,
  Ticket,
  Camera,
  Radio,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

import { NOMINEE_BENEFITS, type Benefit, BOOKING_URL } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { CornerFrame, StarRow } from "@/components/ui/Ornaments";

export const metadata: Metadata = {
  title: "Nominee Benefits",
  description:
    "Everything a nominee at India's Best 100 Institute Award Show 2026 receives — breakfast to media exposure, and a seat in the room in Mumbai.",
};

/**
 * A dedicated, mostly-static page: the benefits list is short enough that it
 * reads best in place, so there is no scroll-reveal here and nothing is tagged
 * `data-reveal` (which, without a reveal scope, would leave it hidden forever
 * under html[data-motion="on"]).
 */

/** Maps each `Benefit.icon` key from site.ts to a lucide icon. */
const ICONS: Record<Benefit["icon"], LucideIcon> = {
  coffee: Coffee,
  utensils: UtensilsCrossed,
  ticket: Ticket,
  camera: Camera,
  radio: Radio,
  megaphone: Megaphone,
};

export default function NomineeBenefitsPage() {
  return (
    <main id="main">
      <section className="field-royal relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35">
        <CornerFrame size={84} inset={18} className="-z-10 opacity-40" />

        <div className="container-page flex flex-col items-center text-center">
          {/* Eyebrow */}
          <p className="type-eyebrow flex items-center gap-3 text-gold-light/90">
            <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
            <span>Nominee Benefits</span>
            <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
          </p>

          <h1 className="type-display text-metal mt-6 text-[clamp(2.1rem,5.4vw,3.6rem)]">
            What every nominee gets.
          </h1>

          <p className="mt-6 max-w-[56ch] font-body text-[15px] leading-relaxed text-mist sm:text-[16px]">
            A nomination is not just a line on a card. From the moment you arrive
            in Mumbai, every nominee is looked after — fed, filmed and put in front
            of the network. Here is everything the day includes.
          </p>

          <StarRow className="mt-8" size={15} />

          {/* Benefits grid */}
          <ul className="mt-14 grid w-full gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {NOMINEE_BENEFITS.map((benefit) => {
              const Icon = ICONS[benefit.icon];
              return (
                <li
                  key={benefit.title}
                  className="panel-gold flex flex-col rounded-[4px] px-6 py-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 ring-1 ring-gold/30">
                    <Icon
                      aria-hidden="true"
                      size={24}
                      strokeWidth={1.6}
                      className="text-gold"
                    />
                  </span>

                  <h2 className="type-name mt-5 text-[15px] text-cream">
                    {benefit.title}
                  </h2>

                  <p className="mt-2.5 font-body text-[14px] leading-relaxed text-mist">
                    {benefit.detail}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="mt-14 flex flex-col items-center gap-6">
            <Button variant="metal" href={BOOKING_URL}>
              Book your seat
            </Button>

            <Link
              href="/"
              className="font-body text-[13px] font-medium tracking-[0.08em] text-mist transition-colors duration-300 hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
