"use client";

import { useRef } from "react";
import { gsap, motionEnabled, useGSAP } from "@/lib/gsap";
import { EVENT } from "@/lib/site";
import { useCountdown } from "@/lib/use-countdown";

/**
 * The hero's heartbeat. Four gold-bordered panels, subtly ticking.
 *
 * The hook renders `--` on the server and on the first client render, which is
 * what keeps hydration clean; everything here just draws what it is given.
 */

/**
 * Outgoing digits leave upward, incoming arrive from below. ~250ms total.
 *
 * The timeline is built once and restarted on each change — a fresh tween per
 * tick would pile thousands of objects into the GSAP context over a session.
 * `immediateRender: false` keeps the paused timeline from stamping its `from`
 * state onto the digits at build time.
 */
function Digits({ value }: { value: string }) {
  const scope = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const flip = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  useGSAP(
    () => {
      const from = previous.current;
      previous.current = value;
      if (from === value || !motionEnabled()) return;

      const root = scope.current;
      if (!root) return;
      const incoming = root.querySelector<HTMLElement>("[data-digit-in]");
      const outgoing = root.querySelector<HTMLElement>("[data-digit-out]");
      if (!incoming || !outgoing) return;

      outgoing.textContent = from;

      if (!flip.current) {
        flip.current = gsap
          .timeline({ paused: true })
          .fromTo(
            outgoing,
            { yPercent: 0, opacity: 1 },
            {
              yPercent: -110,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
              immediateRender: false,
            },
            0,
          )
          .fromTo(
            incoming,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.25,
              ease: "power2.out",
              immediateRender: false,
            },
            0,
          );
      }

      flip.current.restart();
    },
    { scope, dependencies: [value] },
  );

  return (
    // The padding/negative-margin pairs widen the mask just enough that the
    // display face's overshoot is not clipped at leading-none. Horizontal as
    // well as vertical: `overflow-hidden` clips the right side bearing of
    // Playfair's lining figures, which visibly shaves the second digit.
    <span
      ref={scope}
      className="relative block overflow-hidden -mx-[0.1em] -my-[0.14em] px-[0.1em] py-[0.14em]"
    >
      <span className="relative block">
        {/* The metal sits on the digit spans themselves, not on the cell: a
            background clipped to text on an ancestor does not follow a
            transformed descendant, and these two are transformed every tick. */}
        <span
          data-digit-in=""
          className="text-metal block tabular-nums will-change-transform"
        >
          {value}
        </span>
        <span
          data-digit-out=""
          aria-hidden="true"
          className="text-metal pointer-events-none absolute inset-0 block tabular-nums opacity-0 will-change-transform"
        />
      </span>
    </span>
  );
}

function Cell({ value, label }: { value: string; label: string }) {
  return (
    // Horizontal padding and label tracking are dialled back below `sm`:
    // at 360px each cell is ~74px wide and "MINUTES" at 11px/0.2em is 57px,
    // which overflowed the panel.
    <div className="panel-gold rounded-[4px] px-2 py-4 text-center sm:px-5 sm:py-5">
      <span className="type-display block leading-none [font-size:clamp(1.6rem,4.8vw,3rem)]">
        <Digits value={value} />
      </span>
      <span className="type-eyebrow mt-2.5 block text-[9px] tracking-[0.14em] text-mist sm:mt-3.5 sm:text-[11px] sm:tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <p className="panel-gold type-display mx-auto max-w-xl rounded-[4px] px-6 py-7 text-center text-cream [font-size:clamp(1.05rem,2.4vw,1.6rem)]">
      {children}
    </p>
  );
}

export function Countdown() {
  const countdown = useCountdown(EVENT.startISO, EVENT.endISO);
  const { mounted, status, days, hours, minutes, seconds } = countdown;

  const cells = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  // The grid is aria-hidden and aria-live is off, so this one sentence is the
  // whole assistive-tech surface for the counting states. Deliberately coarse:
  // it changes at most once an hour, never once a second. The live/after
  // states read out their own visible copy, so they get no duplicate.
  const summary = mounted
    ? `${Number(days)} days and ${Number(hours)} hours until ${EVENT.name} on ${EVENT.dateLabel}.`
    : `Counting down to ${EVENT.name} on ${EVENT.dateLabel}.`;

  return (
    <div role="timer" aria-live="off">
      {status === "live" ? (
        <Message>We&rsquo;re live &mdash; see you inside</Message>
      ) : status === "after" ? (
        <Message>That&rsquo;s a wrap &mdash; see you at the next edition.</Message>
      ) : (
        <>
          <p className="sr-only">{summary}</p>
          <div
            aria-hidden="true"
            className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3"
          >
            {cells.map((cell) => (
              <Cell key={cell.label} value={cell.value} label={cell.label} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
