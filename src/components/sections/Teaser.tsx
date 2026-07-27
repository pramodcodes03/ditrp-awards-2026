"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { TEASER } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CornerFrame, SparkleField, StarRow } from "@/components/ui/Ornaments";

/**
 * The 2026 teaser film.
 *
 * Façade pattern: the poster and a play button render instantly, and the 87MB
 * video element is only mounted — and only begins downloading — after the
 * visitor clicks. Someone who scrolls past never pays for it. `preload="none"`
 * is belt-and-braces for the same reason.
 */
export function Teaser() {
  const scope = useRevealScope<HTMLElement>();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    setPlaying(true);
    // The element mounts this tick; play it on the next so the ref exists.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* Autoplay blocked — the native controls let the user start it. */
      });
    });
  };

  return (
    <section
      id="teaser"
      ref={scope}
      aria-labelledby="teaser-heading"
      className="field-royal section-y relative isolate overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold/35"
    >
      <SparkleField className="-z-10 opacity-60" />

      <div className="container-page">
        <SectionHeading
          eyebrow="First look"
          id="teaser-heading"
          heading={"Watch the\n*teaser*."}
          gold
          className="items-center text-center"
          headingClassName="text-center"
        >
          <p
            data-reveal=""
            className="mx-auto max-w-[52ch] text-[15px] leading-relaxed text-mist"
          >
            Ninety seconds of the day that is coming — the stage, the trophies
            and the hundred institutes about to take their place on it.
          </p>
        </SectionHeading>

        {/* The gold-framed screen. */}
        <div
          data-reveal=""
          className="ring-metal relative mx-auto mt-12 w-full max-w-4xl rounded-[10px] p-[3px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
        >
          <div className="relative aspect-video overflow-hidden rounded-[8px] bg-navy">
            <CornerFrame size={68} inset={12} />

            {playing ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full"
                controls
                playsInline
                preload="none"
                poster={TEASER.poster}
              >
                <source src={TEASER.src} type={TEASER.type} />
                Your browser does not support the video tag. You can
                <a href={TEASER.src}> download the teaser</a> instead.
              </video>
            ) : (
              <button
                type="button"
                onClick={play}
                aria-label="Play the DITRP 2026 teaser film"
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <Image
                  src={TEASER.poster}
                  alt="Winners of the 2024 DITRP awards on stage with their trophies"
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy/25 transition-colors duration-500 group-hover:bg-navy/10"
                />

                {/* Play button — pulsing gold coin. */}
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <span className="relative flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute h-[86px] w-[86px] rounded-full bg-gold/25 blur-md motion-safe:[animation:twinkle_3s_ease-in-out_infinite] sm:h-[104px] sm:w-[104px]"
                    />
                    <span className="ring-metal relative flex h-[68px] w-[68px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-[84px] sm:w-[84px]">
                      {/* triangle, optically nudged right of centre */}
                      <span
                        aria-hidden="true"
                        className="ml-1 h-0 w-0 border-y-[13px] border-l-[22px] border-y-transparent border-l-navy sm:border-y-[16px] sm:border-l-[27px]"
                      />
                    </span>
                  </span>

                  <span className="type-name rounded-full bg-navy/70 px-4 py-1.5 text-[11px] text-cream backdrop-blur-sm">
                    Watch the film
                    <span className="mx-2 text-gold">·</span>
                    {TEASER.duration}
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div data-reveal="" className="mt-8 flex justify-center">
          <StarRow size={14} />
        </div>
      </div>
    </section>
  );
}
