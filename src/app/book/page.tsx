import type { Metadata } from "next";
import Link from "next/link";
import {
  BOOKING_FORM_EMBED,
  BOOKING_FORM_LINK,
  EVENT,
  NOMINEE_BENEFITS,
} from "@/lib/site";
import { CornerFrame, Laurel, SparkleField, StarRow } from "@/components/ui/Ornaments";

export const metadata: Metadata = {
  title: "Book your seat",
  description:
    "Reserve your seat for India's Best 100 Institute Award Show 2026 — Sunday, 27 September 2026, Mumbai.",
};

/** Four of the benefits, shown as a quick "what's included" list beside the form. */
const HIGHLIGHTS = NOMINEE_BENEFITS.slice(0, 4);

export default function BookPage() {
  return (
    <main
      id="main"
      className="field-royal relative isolate min-h-svh overflow-hidden pt-28 pb-24 sm:pt-36 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35"
    >
      <SparkleField className="-z-10 opacity-50" />
      <CornerFrame className="-z-10" size={96} inset={16} />

      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="type-eyebrow flex items-center justify-center gap-3 text-gold-light/90">
            <span aria-hidden="true" className="rule-gold-thin w-8 sm:w-12" />
            Reserve your place
            <span aria-hidden="true" className="rule-gold-thin w-8 sm:w-12" />
          </p>
          <h1 className="type-poster text-metal mt-5 text-[clamp(2.2rem,6vw,3.6rem)]">
            Book your seat.
          </h1>
          <div className="mt-5 flex justify-center">
            <StarRow size={15} />
          </div>
          <p className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-relaxed text-mist">
            {EVENT.dateLabel} · {EVENT.city}. Fill in the form and our team
            confirms your seats by email. Seats are reserved, not sold at the
            door.
          </p>
        </div>

        {/* Two columns: the pitch, and the embedded form. */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left — what you're booking into. */}
          <aside className="lg:col-span-5">
            <div className="panel-gold relative isolate rounded-[6px] px-6 py-8 sm:px-8">
              <CornerFrame className="-z-10" size={54} inset={10} />

              <div className="flex items-center gap-3">
                <Laurel side="left" className="h-10 w-6 shrink-0 opacity-90" />
                <p className="type-eyebrow text-gold-light/90">On the day</p>
                <Laurel side="right" className="h-10 w-6 shrink-0 opacity-90" />
              </div>

              <p className="type-display text-metal mt-5 text-[clamp(1.8rem,4vw,2.4rem)]">
                {EVENT.dateNumeric}
              </p>
              <p className="type-name mt-2 text-[13px] text-cream">
                {EVENT.city}
                <span className="mx-2 text-gold">·</span>
                India&rsquo;s Best 100
              </p>

              <span aria-hidden="true" className="rule-gold my-7 block max-w-[200px]" />

              <p className="type-eyebrow text-gold-light/80">Your seat includes</p>
              <ul className="mt-4 flex flex-col gap-3">
                {HIGHLIGHTS.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px] leading-snug text-mist">
                      {benefit.title}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[13px] text-mist/80">
                Nominations close {EVENT.nominationDeadline}.
              </p>
            </div>

            <Link
              href="/"
              className="mt-6 inline-flex text-[13px] tracking-[0.14em] text-mist uppercase transition-colors hover:text-gold"
            >
              ← Back to home
            </Link>
          </aside>

          {/* Right — the Google Form, framed like a ticket. */}
          <div className="lg:col-span-7">
            <div className="ring-metal rounded-[12px] p-[3px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden rounded-[10px] bg-white">
                <iframe
                  src={BOOKING_FORM_EMBED}
                  title="Book your seat — India's Best 100 Institute Award Show 2026 registration form"
                  className="block h-[1180px] w-full sm:h-[1050px]"
                  loading="lazy"
                >
                  Loading…
                </iframe>
              </div>
            </div>
            <p className="mt-4 text-center text-[13px] text-mist/80">
              Trouble loading the form?{" "}
              <a
                href={BOOKING_FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4 hover:text-gold-light"
              >
                Open it in Google Forms
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
