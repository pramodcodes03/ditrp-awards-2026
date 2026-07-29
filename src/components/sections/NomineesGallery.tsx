"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { NOMINEE_CARDS } from "@/lib/nominees-2026";

/**
 * The full wall of printed nominee cards, shown as-is, with a click-to-enlarge
 * lightbox. Everything the card needs to say is already on the artwork, so the
 * grid carries no overlaid text.
 */
export function NomineesGallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + NOMINEE_CARDS.length) % NOMINEE_CARDS.length,
      ),
    [],
  );

  // Keyboard: Escape closes, arrows page through. Lock scroll while open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, close, step]);

  const active = open === null ? null : NOMINEE_CARDS[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {NOMINEE_CARDS.map((card, index) => (
          <li key={card.slug}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`View ${card.name} nominee card`}
              className="group block w-full overflow-hidden rounded-[10px] border border-gold/30 bg-royal-lit shadow-[0_22px_50px_-28px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <div className="relative aspect-[9/16]">
                <Image
                  src={card.src}
                  alt={`${card.name} — 2026 nominee`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} nominee card`}
          onClick={close}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-gold/40 text-cream transition-colors hover:bg-gold/15 sm:top-6 sm:right-6"
          >
            <span aria-hidden="true" className="relative block size-5">
              <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous nominee"
            className="absolute left-2 flex size-11 items-center justify-center rounded-full border border-gold/40 text-cream transition-colors hover:bg-gold/15 sm:left-6"
          >
            <span aria-hidden="true">‹</span>
          </button>

          {/* The card itself — stop propagation so a click on it doesn't close. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[9/16] h-[82vh] max-h-[82vh] w-auto max-w-[90vw] overflow-hidden rounded-[12px] border border-gold/40 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]"
          >
            <Image
              src={active.src}
              alt={`${active.name} — 2026 nominee`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next nominee"
            className="absolute right-2 flex size-11 items-center justify-center rounded-full border border-gold/40 text-cream transition-colors hover:bg-gold/15 sm:right-6"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      )}
    </>
  );
}
