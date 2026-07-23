"use client";

import { useRef, useState } from "react";
import { gsap, motionEnabled, useGSAP } from "@/lib/gsap";

/**
 * Gold dust drifting through the spotlight beams.
 *
 * Driven by gsap.ticker rather than its own rAF loop so it shares one frame
 * budget with Lenis and every ScrollTrigger on the page.
 */

const COUNT = 60;
/** Anything above 2 is invisible on screen and expensive to fill. */
const MAX_DPR = 2;

type Particle = {
  x: number;
  y: number;
  r: number;
  /** px per 60fps frame, upward */
  rise: number;
  /** horizontal sway amplitude, px */
  amp: number;
  /** radians per 60fps frame */
  swaySpeed: number;
  phase: number;
  alpha: number;
};

export function DustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled] = useState(() => motionEnabled());

  useGSAP(
    () => {
      if (!enabled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rand = gsap.utils.random;
      let width = 0;
      let height = 0;
      const particles: Particle[] = [];

      const spawn = (yTop: number, yBottom: number): Particle => ({
        x: rand(0, width),
        y: rand(yTop, yBottom),
        r: rand(0.6, 2),
        rise: rand(0.08, 0.34),
        amp: rand(3, 16),
        swaySpeed: rand(0.004, 0.014),
        phase: rand(0, Math.PI * 2),
        alpha: rand(0.16, 0.62),
      });

      const measure = () => {
        const rect = canvas.getBoundingClientRect();
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        // setTransform first, otherwise scale() compounds on every resize.
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        if (particles.length === 0) {
          for (let i = 0; i < COUNT; i += 1) particles.push(spawn(0, height));
        } else {
          for (const p of particles) {
            p.x = gsap.utils.clamp(0, width, p.x);
            p.y = gsap.utils.clamp(-4, height + 4, p.y);
          }
        }
      };

      measure();

      let resizeId = 0;
      const onResize = () => {
        window.clearTimeout(resizeId);
        resizeId = window.setTimeout(measure, 150);
      };
      window.addEventListener("resize", onResize, { passive: true });

      const render = () => {
        const d = gsap.ticker.deltaRatio(60);
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
          p.y -= p.rise * d;
          // swaySpeed is already radians-per-frame; scaling it again by 60
          // turned a 10-second drift into a two-frame strobe.
          p.phase += p.swaySpeed * d;

          if (p.y < -4) {
            const fresh = spawn(height + 4, height + 40);
            Object.assign(p, fresh);
          }

          const twinkle = 0.6 + 0.4 * Math.sin(p.phase * 0.7);
          ctx.beginPath();
          ctx.arc(p.x + Math.sin(p.phase) * p.amp, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241, 201, 116, ${(p.alpha * twinkle).toFixed(3)})`;
          ctx.fill();
        }
      };

      gsap.ticker.add(render);

      return () => {
        gsap.ticker.remove(render);
        window.clearTimeout(resizeId);
        window.removeEventListener("resize", onResize);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
