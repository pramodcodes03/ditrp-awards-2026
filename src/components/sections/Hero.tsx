"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  EASE,
  SCRUB,
  STAGGER,
  gsap,
  motionEnabled,
  useGSAP,
} from "@/lib/gsap";
import { BOOKING_URL, EVENT, NOMINATION_URL } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/sections/hero/Countdown";
import {
  CornerFrame,
  SparkleField,
  StarRow,
  Trophy,
} from "@/components/ui/Ornaments";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";

/** The gold confetti scatter from the cards. Decorative, canvas, browser-only. */
const DustCanvas = dynamic(
  () =>
    import("@/components/sections/hero/DustCanvas").then((m) => m.DustCanvas),
  { ssr: false, loading: () => null },
);

/**
 * The poster, brought to life — as a two-beat cinematic open.
 *
 * BEAT ONE: the 2024 hall fills the screen on its own, clean, with only a
 * "scroll" cue. BEAT TWO: as the visitor scrolls, a royal scrim fades in and
 * the poster (mark, headline, countdown, calls to action) rises into place.
 *
 * It is a sticky "stage": the section is tall, an inner panel sticks to the
 * viewport, and a scrubbed timeline drives the reveal against scroll — so it
 * is fully reversible. The confetti is held until the text appears.
 *
 * Motion off / reduced motion / no JS: the timeline never runs, the scrim
 * shows (`motion-on:opacity-0`), and every [data-reveal] renders visible, so
 * the poster reads immediately with no scroll required.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const section = scope.current;
      if (!section) return;

      const risers = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);

      // The reveal, scrubbed against the sticky travel: cue fades, the royal
      // scrim deepens, then the poster rises. Reversible on scroll-up.
      let fired = false;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          scrub: 0.6,
          onUpdate: (self) => {
            // Fire the poppers once, as the headline comes in.
            if (!fired && self.progress > 0.4) {
              fired = true;
              window.dispatchEvent(new Event("hero:reveal"));
            }
          },
        },
      });

      tl.to(cueRef.current, { opacity: 0, duration: 0.15 }, 0);
      tl.to(scrimRef.current, { opacity: 1, duration: 0.5 }, 0.05);
      tl.to(
        risers,
        { y: 0, opacity: 1, duration: 0.5, ease: EASE, stagger: STAGGER },
        0.15,
      );

      // A slow push-in on the photograph across the whole stage, for depth.
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { scale: 1.03 },
          {
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: SCRUB,
            },
          },
        );
      }
    },
    { scope },
  );

  return (
    <section id="top" ref={scope} aria-labelledby="hero-title" className="relative isolate">
      {/* The stage: sticks to the viewport while the section scrolls past. */}
      <div className="field-royal sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-14 sm:pt-28">
        {/* The 2024 hall — shown as a real photograph first, un-graded. */}
        <div
          ref={photoRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 will-change-transform"
        >
          <Image
            src="/awards/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
          {/* Kept on at all times, only enough to keep the navbar legible. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-navy/70 to-transparent" />
        </div>

        {/* The royal scrim that arrives WITH the text: colour-grades the hall
            into the blue palette and pools navy behind the headline so the
            gold type reads. Off at rest under motion; shown otherwise. */}
        <div
          ref={scrimRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-100 motion-on:opacity-0"
        >
          <div className="absolute inset-0 bg-royal/40 mix-blend-color" />
          <div className="field-vignette absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 52% at 50% 46%, rgba(1,20,60,0.85) 0%, rgba(1,20,60,0.6) 45%, rgba(1,20,60,0.18) 78%, rgba(1,20,60,0) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-navy/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy/80 to-transparent" />
        </div>

        <DustCanvas />
        <SparkleField className="-z-10" />
        <CornerFrame className="-z-10" size={110} inset={16} />

        {/* Party-poppers, held until the headline reveals (item 1). */}
        <ConfettiBurst
          waitForEvent="hero:reveal"
          className="pointer-events-none absolute inset-0 z-20"
        />

        <div ref={contentRef} className="container-page will-change-transform">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* The mark, in its white box, exactly as it sits on the cards. */}
            <div
              data-reveal=""
              className="rounded-lg bg-white px-4 py-2.5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.9)] sm:px-6 sm:py-3"
            >
              <Image
                src="/awards/brand/ditrp-logo.png"
                alt="DITRP — Digital Information Technology & Research for Professional"
                width={714}
                height={248}
                loading="eager"
                fetchPriority="high"
                className="h-9 w-auto sm:h-12"
              />
            </div>

            <p data-reveal="" className="type-eyebrow mt-7 text-gold-light/90">
              {EVENT.organizer} Presents
            </p>

            {/* The headline. Trophies flank it above lg, exactly as printed. */}
            <div
              data-reveal=""
              className="mt-4 flex w-full items-center justify-center gap-4 sm:gap-8"
            >
              <Trophy className="hidden shrink-0 lg:block" size={78} />
              <h1
                id="hero-title"
                className="type-poster text-metal text-[clamp(1.9rem,6.4vw,4.6rem)] drop-shadow-[0_2px_18px_rgba(239,199,94,0.25)]"
              >
                India&rsquo;s Best 100
                <br />
                Institute Award Show
                <br />
                <span className="text-[1.14em]">2026</span>
              </h1>
              <Trophy className="hidden shrink-0 lg:block" size={78} />
            </div>

            <div data-reveal="" className="mt-6">
              <StarRow size={17} />
            </div>

            {/* Date / venue bar, straight off the foot of the card. */}
            <div
              data-reveal=""
              className="mt-7 flex items-center justify-center gap-4 sm:gap-7"
            >
              <span className="rule-gold-thin hidden w-14 sm:block" />
              <p className="type-name text-[clamp(0.72rem,1.9vw,0.95rem)] text-cream">
                September 2026
                <span className="mx-2 text-gold sm:mx-3">·</span>
                Sunday 27
                <span className="text-[0.72em] align-super">th</span>
                <span className="mx-2 text-gold sm:mx-3">·</span>
                {EVENT.city}
              </p>
              <span className="rule-gold-thin hidden w-14 sm:block" />
            </div>

            <div data-reveal="" className="mt-9 w-full">
              <Countdown />
            </div>

            <div
              data-reveal=""
              className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4"
            >
              <Button variant="metal" href={BOOKING_URL} className="w-full sm:w-auto">
                Book your seat
              </Button>
              <Button
                variant="outline"
                href={NOMINATION_URL}
                className="w-full sm:w-auto"
              >
                Nominate an institute
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll cue — invites the reveal. Only under motion; fades on scroll. */}
        <div
          ref={cueRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2 opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] motion-on:opacity-100"
        >
          <span className="type-eyebrow text-[10px] text-gold-light">
            Scroll
          </span>
          <svg
            viewBox="0 0 24 24"
            className="size-5 animate-bounce text-gold-light"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Scroll runway that gives the sticky stage room to play the reveal. */}
      <div aria-hidden="true" className="pointer-events-none h-[110svh]" />
    </section>
  );
}
