"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "@/lib/site";
import { NOMINEE_CARDS, type NomineeCardImage } from "@/lib/nominees-2026";
import { gsap, motionEnabled, useGSAP } from "@/lib/gsap";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SparkleField } from "@/components/ui/Ornaments";

/** How many cards ride the homepage strip; the rest live on /nominees. */
const PREVIEW_COUNT = 20;
/** Auto-slide speed, px per second. */
const SPEED = 46;

function shuffle(list: readonly NomineeCardImage[]): NomineeCardImage[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function Card({ card }: { card: NomineeCardImage }) {
  return (
    <div className="w-[clamp(190px,58vw,240px)] shrink-0">
      <div className="group overflow-hidden rounded-[10px] border border-gold/30 bg-royal-lit shadow-[0_26px_60px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[9/16]">
          <Image
            src={card.src}
            alt={`${card.name} — 2026 nominee`}
            fill
            sizes="240px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function Nominees() {
  const scope = useRevealScope<HTMLElement>();
  const scroller = useRef<HTMLDivElement>(null);
  const trackA = useRef<HTMLDivElement>(null);
  const trackB = useRef<HTMLDivElement>(null);

  // First render (and SSR) uses a stable slice so hydration matches; the order
  // is then randomised on mount, so every page open deals a new hand.
  const [cards, setCards] = useState<NomineeCardImage[]>(() =>
    NOMINEE_CARDS.slice(0, PREVIEW_COUNT),
  );
  useEffect(() => {
    // Deferred out of the effect body: a synchronous setState here is a
    // cascading render (and a react-hooks lint error).
    queueMicrotask(() =>
      setCards(shuffle(NOMINEE_CARDS).slice(0, PREVIEW_COUNT)),
    );
  }, []);

  // Continuous auto-slide, layered on a real horizontal scroller so it stays
  // swipeable and, under reduced motion, simply doesn't auto-advance.
  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const el = scroller.current;
      const a = trackA.current;
      const b = trackB.current;
      if (!el || !a || !b) return;

      // Exact distance from the start of track A to the start of its identical
      // copy — resetting by this makes the loop seamless, gaps included.
      const repeat = () => b.offsetLeft - a.offsetLeft;

      let paused = false;
      const tick = (_t: number, delta: number) => {
        if (paused) return;
        el.scrollLeft += (SPEED * delta) / 1000;
        const r = repeat();
        if (r > 0 && el.scrollLeft >= r) el.scrollLeft -= r;
      };
      gsap.ticker.add(tick);

      // Pause while the visitor is interacting, so auto and manual never fight.
      const pause = () => (paused = true);
      const resume = () => (paused = false);
      el.addEventListener("pointerenter", pause);
      el.addEventListener("pointerleave", resume);
      el.addEventListener("touchstart", pause, { passive: true });
      el.addEventListener("touchend", resume, { passive: true });
      el.addEventListener("focusin", pause);
      el.addEventListener("focusout", resume);

      return () => {
        gsap.ticker.remove(tick);
        el.removeEventListener("pointerenter", pause);
        el.removeEventListener("pointerleave", resume);
        el.removeEventListener("touchstart", pause);
        el.removeEventListener("touchend", resume);
        el.removeEventListener("focusin", pause);
        el.removeEventListener("focusout", resume);
      };
    },
    { dependencies: [cards] },
  );

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

      {/* Auto-sliding strip of the printed nominee cards, shuffled each visit.
          It is a real scroller too, so it can be swiped and, under reduced
          motion, browsed by hand. */}
      <div data-reveal="" className="relative mt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-navy to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-navy to-transparent sm:w-24"
        />

        <div
          ref={scroller}
          className="no-scrollbar flex gap-5 overflow-x-auto px-[var(--gutter)] pb-3 sm:gap-6"
        >
          <div ref={trackA} className="flex shrink-0 gap-5 sm:gap-6">
            {cards.map((card) => (
              <Card key={card.slug} card={card} />
            ))}
          </div>
          {/* Seamless-loop copy, hidden from assistive tech. */}
          <div ref={trackB} aria-hidden="true" className="flex shrink-0 gap-5 sm:gap-6">
            {cards.map((card) => (
              <Card key={`dup-${card.slug}`} card={card} />
            ))}
          </div>
        </div>
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
