"use client";

import { useRef } from "react";
import { gsap, motionEnabled, useGSAP } from "@/lib/gsap";

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  life: number;
  ttl: number;
};

const COLORS = ["#F1C974", "#F6ECA4", "#FFF4E8", "#1D357F", "#C9833B"];

/**
 * A one-shot party-popper confetti burst, drawn on a canvas over its parent.
 *
 * It fires once — as the hero becomes visible — then removes its own ticker
 * callback and stops. Two angled bursts fan up from the lower corners, then
 * fall under gravity with a little drag and spin, exactly like a popper.
 *
 * It waits out the preloader curtain (if present) so the burst is actually
 * seen rather than happening behind the overlay, and renders nothing at all
 * under reduced motion.
 */
export function ConfettiBurst({
  className,
  waitForEvent,
}: {
  className?: string;
  /** When set, fire on this window event (once) instead of a load timer. */
  waitForEvent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    if (!motionEnabled()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let pieces: Piece[] = [];

    const spawnBurst = (originX: number, angle: number) => {
      const count = 70;
      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 0.9;
        const speed = 6 + Math.random() * 9;
        const a = angle + spread;
        pieces.push({
          x: originX,
          y: height + 10,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
          w: 6 + Math.random() * 6,
          h: 8 + Math.random() * 8,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          life: 0,
          ttl: 90 + Math.random() * 60,
        });
      }
    };

    const gravity = 0.22;
    const drag = 0.992;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = 0;
      for (const p of pieces) {
        p.life += 1;
        if (p.life > p.ttl) continue;
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > height + 40) continue;
        alive += 1;

        const fade = Math.max(0, 1 - (p.life - p.ttl * 0.6) / (p.ttl * 0.4));
        ctx.save();
        ctx.globalAlpha = Math.min(1, fade);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive === 0) stop();
    };

    const tick = () => draw();

    const start = () => {
      if (running) return;
      running = true;
      resize();
      // Two poppers firing inward-and-up from the lower corners.
      spawnBurst(width * 0.12, -Math.PI / 2.5);
      spawnBurst(width * 0.88, -Math.PI + Math.PI / 2.5);
      gsap.ticker.add(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(tick);
      pieces = [];
      ctx.clearRect(0, 0, width, height);
    };

    // Wait out the preloader curtain so the burst is seen, then fire once.
    const doc = document.documentElement;
    let fireTimer = 0;
    let observer: MutationObserver | null = null;

    const scheduleFire = (delay: number) => {
      fireTimer = window.setTimeout(start, delay);
    };

    if (waitForEvent) {
      // Held until the hero text reveals on scroll (see Hero's timeline).
      window.addEventListener(waitForEvent, start, { once: true });
    } else if (doc.dataset.preloader === "on") {
      observer = new MutationObserver(() => {
        if (doc.dataset.preloader !== "on") {
          observer?.disconnect();
          observer = null;
          scheduleFire(450);
        }
      });
      observer.observe(doc, { attributes: true, attributeFilter: ["data-preloader"] });
    } else {
      scheduleFire(750);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(fireTimer);
      if (waitForEvent) window.removeEventListener(waitForEvent, start);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      stop();
    };
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
