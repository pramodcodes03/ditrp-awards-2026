"use client";

import { useEffect, useState } from "react";

export type CountdownStatus = "pending" | "before" | "live" | "after";

export type Countdown = {
  /** False until after the first client effect — render placeholders till then. */
  mounted: boolean;
  status: CountdownStatus;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const PLACEHOLDER: Countdown = {
  mounted: false,
  status: "pending",
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
};

function pad(n: number, width = 2) {
  return Math.max(0, Math.floor(n)).toString().padStart(width, "0");
}

function compute(startMs: number, endMs: number, nowMs: number): Countdown {
  if (nowMs >= endMs) {
    return { ...PLACEHOLDER, mounted: true, status: "after" };
  }
  if (nowMs >= startMs) {
    return { ...PLACEHOLDER, mounted: true, status: "live" };
  }

  const diff = Math.max(0, startMs - nowMs);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    mounted: true,
    status: "before",
    // Days can exceed two digits early on; pad to at least two.
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor(totalSeconds / 3600) % 24),
    minutes: pad(Math.floor(totalSeconds / 60) % 60),
    seconds: pad(totalSeconds % 60),
  };
}

/**
 * Ticking countdown to an absolute instant.
 *
 * Server and first client render both produce `--` placeholders, so there is
 * no hydration mismatch; real digits appear from the first effect onward.
 */
export function useCountdown(startISO: string, endISO: string): Countdown {
  const [state, setState] = useState<Countdown>(PLACEHOLDER);

  useEffect(() => {
    const startMs = new Date(startISO).getTime();
    const endMs = new Date(endISO).getTime();

    const tick = () => setState(compute(startMs, endMs, Date.now()));

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startISO, endISO]);

  return state;
}
