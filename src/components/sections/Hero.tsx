"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  DUR,
  EASE,
  SCRUB,
  STAGGER,
  gsap,
  markRevealed,
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

/** The gold confetti scatter from the cards. Decorative, canvas, browser-only. */
const DustCanvas = dynamic(
  () =>
    import("@/components/sections/hero/DustCanvas").then((m) => m.DustCanvas),
  { ssr: false, loading: () => null },
);

/**
 * The poster, brought to life.
 *
 * Deliberately built as a direct translation of the printed nominee card:
 * royal-blue field, ornate gold corner frame, the DiTRP mark in its white
 * box, the headline in struck gold, trophies flanking it, a star row, and the
 * date/venue bar along the bottom.
 *
 * The headline reveals on LOAD rather than on scroll, so this section does not
 * use <Section>/useRevealScope — that hook binds [data-reveal] to
 * ScrollTriggers and would fight this timeline. Everything tagged in here is
 * animated in here; nothing else may carry a reveal attribute or it stays
 * invisible forever.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const root = scope.current;
      if (!root) return;

      const risers = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const faders = gsap.utils.toArray<HTMLElement>("[data-fade]", root);

      // Held back so it reads after the preloader curtain has parted.
      const intro = gsap.timeline({ delay: 0.3 });

      if (risers.length) {
        intro.to(risers, {
          y: 0,
          opacity: 1,
          duration: DUR,
          ease: EASE,
          stagger: STAGGER,
          onComplete: () => markRevealed(risers),
        });
      }
      if (faders.length) {
        intro.to(
          faders,
          {
            opacity: 1,
            duration: DUR,
            ease: EASE,
            stagger: STAGGER,
            onComplete: () => markRevealed(faders),
          },
          0.4,
        );
      }

      // Exit: the hall photograph drifts, the poster recedes.
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: SCRUB,
        },
      });
      if (photoRef.current) {
        exit.to(photoRef.current, { yPercent: 12, ease: "none" }, 0);
      }
      if (contentRef.current) {
        exit.to(
          contentRef.current,
          { opacity: 0, scale: 0.96, ease: "none" },
          0,
        );
      }
    },
    { scope },
  );

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="field-royal relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* The 2024 hall, legible as a real photograph rather than a texture.
          The scrim is deliberately shaped rather than flat: the edges stay
          deep so the gold frame reads, while the centre — where the headline
          and CTAs sit — gets its own soft navy pool for contrast. A flat wash
          dark enough for the type would have dimmed the whole photo again. */}
      <div
        ref={photoRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src="/awards/2024/hall-group.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="scale-105 object-cover opacity-70 saturate-[0.85]"
        />
        {/* Colour-grades the hall into the blue palette without hiding it. */}
        <div className="absolute inset-0 bg-royal/35 mix-blend-color" />
        {/* Edge falloff. */}
        <div className="field-vignette absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 52% at 50% 46%, rgba(1,20,60,0.82) 0%, rgba(1,20,60,0.55) 45%, rgba(1,20,60,0.12) 78%, rgba(1,20,60,0) 100%)",
          }}
        />
        {/* Keeps the navbar and the bottom edge readable. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-navy/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy/80 to-transparent" />
      </div>

      <DustCanvas />
      <SparkleField className="-z-10" />
      <CornerFrame className="-z-10" size={110} inset={16} />

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

          <p
            data-reveal=""
            className="type-eyebrow mt-7 text-gold-light/90"
          >
            {EVENT.organizer} Presents
          </p>

          {/* The headline. Trophies flank it above lg, exactly as printed. */}
          <div className="mt-4 flex w-full items-center justify-center gap-4 sm:gap-8">
            <Trophy className="hidden shrink-0 lg:block" size={78} />
            <h1
              id="hero-title"
              data-reveal=""
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
    </section>
  );
}
