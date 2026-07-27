"use client";

import { useRef } from "react";
import { SCRUB, gsap, motionEnabled, useGSAP } from "@/lib/gsap";
import { AGENDA, EVENT } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* Declared here, not inline: a JSX string attribute would not escape the "\n"
   that SplitHeading uses as its line break. */
const HEADING = "How the\n*day* unfolds.";

/**
 * The line's hidden state has to be server-rendered CSS, not a gsap.set() —
 * same contract as [data-reveal] in globals.css. Gated on data-motion so that
 * with reduced motion or JS off the line is simply drawn in full.
 *
 * pathLength="1" normalises the geometry, so dasharray/dashoffset of 1 means
 * "exactly one line length" regardless of how tall the timeline renders.
 */
const LINE_HIDDEN_CSS = `html[data-motion="on"] [data-agenda-line]{stroke-dashoffset:1}`;

/* The rail spans the whole list, so it overshoots the last dot by the height of
   that entry's copy. Fading the tail hides the overshoot and reads deliberate. */
const RAIL_FADE = "linear-gradient(to bottom, #000 calc(100% - 72px), transparent)";

export function Agenda() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;

      const root = scope.current;
      if (!root) return;

      const line = root.querySelector("[data-agenda-line]");
      if (!line) return;

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 80%",
          scrub: SCRUB,
        },
      });
    },
    { scope },
  );

  return (
    // Flat navy rather than the lit field: the drawn gold rail and its dots
    // need an even backdrop, and the dots' ring colour has to match it exactly.
    <Section id="agenda" labelledBy="agenda-heading" field="deep" seams>
      {/* Desktop composition: the heading holds a sticky left column while the
          run of show scrolls past on the right, so both halves of the container
          carry weight. Below lg the two stack and the timeline is full width. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-x-24">
        {/* self-start is what gives sticky somewhere to travel: a stretched grid
            item is already as tall as its row and could never move inside it. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Run of show"
            id="agenda-heading"
            heading={HEADING}
            gold
            headingClassName="lg:text-[clamp(2.4rem,3.4vw,3.4rem)]"
          >
            <p
              data-reveal=""
              className="max-w-[34ch] font-body text-[13px] tracking-[0.18em] text-mist uppercase"
            >
              {EVENT.dateLabel}
              <span aria-hidden="true" className="mx-2 text-gold">
                &middot;
              </span>
              {EVENT.city}
            </p>
          </SectionHeading>
        </div>

        {/* Also self-start, so this column is only ever as tall as the list and
            the rail's h-full cannot be stretched past the final entry. */}
        <div
          ref={scope}
          className="relative mt-14 md:mt-20 lg:mt-0 lg:self-start"
        >
          <style>{LINE_HIDDEN_CSS}</style>

          {/* Deliberately NO viewBox: the CTM stays identity, so 1 user unit is
              1px and the stroke needs no vector-effect. A scaled viewBox plus
              non-scaling-stroke makes browsers resolve the dash pattern in an
              unscaled space, which turns the draw into a 1px dotted line.

              left must stay in lockstep with the dots and with the first grid
              column of the rows below — all three read 9.5rem from md up. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-2 h-full w-px -translate-x-1/2 md:left-[9.5rem]"
            style={{ maskImage: RAIL_FADE, WebkitMaskImage: RAIL_FADE }}
          >
            <line
              data-agenda-line=""
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              pathLength={1}
              strokeDasharray="1"
              strokeWidth={1}
              className="stroke-gold/50"
            />
          </svg>

          {/* role="list" survives Safari's list-semantics removal under
              list-style:none (Tailwind preflight). */}
          <ol role="list" className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {AGENDA.map((entry, index) => (
              <li
                key={entry.time}
                data-reveal=""
                className="relative pl-8 md:grid md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-x-12 md:pl-0 xl:grid-cols-[9.5rem_minmax(0,1fr)_auto]"
              >
                {/* The ring punches the rail out behind the node, so it has to
                    be the section's own flat navy — hence field="deep". */}
                <span
                  aria-hidden="true"
                  className="absolute top-[0.55rem] left-2 size-[10px] -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_rgba(241,201,116,0.5)] ring-4 ring-navy md:left-[9.5rem]"
                />

                <span className="type-display text-metal block text-[clamp(1.1rem,2vw,1.5rem)] tabular-nums md:pr-8 md:text-right">
                  {entry.time}
                </span>

                <div className="mt-2 md:mt-0">
                  <h3 className="type-name text-[clamp(0.95rem,1.7vw,1.2rem)] text-cream">
                    {entry.title}
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-mist lg:mt-3 xl:max-w-[62ch]">
                    {entry.detail}
                  </p>
                </div>

                {/* Terminates the row at the container edge so the widest rows
                    do not trail off into empty space. xl and not lg on purpose:
                    an extra track plus its 3rem gap costs ~82px, and at 1024 the
                    copy column is only ~400px to begin with — there the numeral
                    would be bought with the measure. Top padding is the dot's
                    own offset, so the numeral sits on the dot's line. */}
                <span
                  aria-hidden="true"
                  className="hidden font-display text-[13px] tracking-[0.2em] text-gold/55 tabular-nums xl:block xl:pt-[0.55rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
