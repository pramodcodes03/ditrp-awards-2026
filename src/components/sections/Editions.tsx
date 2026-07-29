"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { EDITIONS, type Edition } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/site";
import { SparkleField, StarRow } from "@/components/ui/Ornaments";

/**
 * The photo collage for a past edition. Each shot opens on click in a lightbox
 * with arrow-key paging; keyed by year so the state resets between editions.
 */
function EditionGallery({ edition }: { edition: Edition }) {
  const photos = edition.photos;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

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

  const active = open === null ? null : photos[open];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            onClick={() => setOpen(index)}
            aria-label={`View photo: ${photo.caption}`}
            className={cn(
              "group relative block overflow-hidden rounded-[4px] border border-gold/25 bg-royal-lit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              index === 0 && "col-span-2 lg:row-span-2",
            )}
          >
            <div className={cn("relative", index === 0 ? "aspect-[4/3]" : "aspect-[3/2]")}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/10 to-transparent" />
            </div>
            <span className="type-eyebrow absolute inset-x-0 bottom-0 p-3 text-left text-[10px] text-gold-light">
              {photo.caption}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
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

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 flex size-11 items-center justify-center rounded-full border border-gold/40 text-cream transition-colors hover:bg-gold/15 sm:left-6"
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[86vh] w-auto max-w-[92vw] flex-col items-center"
          >
            <div
              className="relative overflow-hidden rounded-[10px] border border-gold/40 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]"
              style={{ aspectRatio: `${active.w} / ${active.h}` }}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.w}
                height={active.h}
                sizes="92vw"
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>
            <figcaption className="type-eyebrow mt-4 text-[11px] text-gold-light">
              {active.caption}
            </figcaption>
          </figure>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 flex size-11 items-center justify-center rounded-full border border-gold/40 text-cream transition-colors hover:bg-gold/15 sm:right-6"
            >
              <span aria-hidden="true">›</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}

/** The body shown for the selected year. */
function EditionPanel({ edition, id, labelledBy }: { edition: Edition; id: string; labelledBy: string }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy} tabIndex={0} className="mt-10 focus-visible:outline-2 focus-visible:outline-gold">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h3 className="type-display text-[clamp(1.4rem,3vw,2rem)] text-cream">
          {edition.year}
          <span className="mx-3 text-gold/50">·</span>
          <span className="text-metal">{edition.label}</span>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mist">{edition.blurb}</p>
      </div>

      {edition.photos.length > 0 ? (
        <EditionGallery key={edition.year} edition={edition} />
      ) : edition.status === "next" ? (
        // 2026 — the upcoming beat.
        <div className="panel-gold mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[6px] px-6 py-12 text-center">
          <StarRow size={16} />
          <p className="type-poster text-metal text-[clamp(1.6rem,4vw,2.6rem)]">
            27 · 09 · 2026
          </p>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-mist">
            The next edition is being written in Mumbai. Watch the teaser, then
            take your place in the room.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="metal" href={BOOKING_URL}>Book your seat</Button>
            <Button variant="outline" href="#teaser">Watch the teaser</Button>
          </div>
        </div>
      ) : (
        // 2023 — photos not supplied yet.
        <div className="mx-auto max-w-2xl rounded-[6px] border border-dashed border-gold/30 bg-navy/40 px-6 py-14 text-center">
          <p className="type-eyebrow text-gold-light/70">Gallery coming soon</p>
          <p className="mx-auto mt-4 max-w-[40ch] text-[14px] leading-relaxed text-mist">
            Photographs from the {edition.year} edition are being added. Check
            back — or ask us for the highlights.
          </p>
        </div>
      )}
    </div>
  );
}

export function Editions() {
  const scope = useRevealScope<HTMLElement>();
  const baseId = useId();
  // Default to the richest past edition (2024).
  const defaultYear = EDITIONS.find((e) => e.photos.length > 0)?.year ?? EDITIONS[0].year;
  const [active, setActive] = useState(defaultYear);
  const activeEdition = EDITIONS.find((e) => e.year === active) ?? EDITIONS[0];

  const tabId = (year: string) => `${baseId}-tab-${year}`;
  // One panel whose content swaps, so every tab's aria-controls resolves — a
  // per-year id would leave the two inactive tabs pointing at nothing.
  const panelId = `${baseId}-panel`;

  // Arrow-key roving between year tabs.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const i = EDITIONS.findIndex((e) => e.year === active);
    let next = i;
    if (event.key === "ArrowRight") next = (i + 1) % EDITIONS.length;
    else if (event.key === "ArrowLeft") next = (i - 1 + EDITIONS.length) % EDITIONS.length;
    else return;
    event.preventDefault();
    const year = EDITIONS[next].year;
    setActive(year);
    document.getElementById(tabId(year))?.focus();
  };

  return (
    <section
      id="editions"
      ref={scope}
      aria-labelledby="editions-heading"
      className="bg-navy section-y relative isolate overflow-hidden"
    >
      <SparkleField className="-z-10 opacity-40" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Across the years"
          id="editions-heading"
          heading={"The show,\n*year on year*."}
          gold
          className="items-center text-center"
          headingClassName="text-center"
        >
          <p data-reveal="" className="mx-auto max-w-[52ch] text-[15px] leading-relaxed text-mist">
            This is not a first attempt. India&rsquo;s Best 100 has been built
            edition on edition — and 2026 is the biggest yet.
          </p>
        </SectionHeading>

        {/* Year timeline / tablist. */}
        <div
          data-reveal=""
          role="tablist"
          aria-label="Award show editions"
          onKeyDown={onKeyDown}
          className="relative mx-auto mt-14 flex max-w-2xl items-start justify-between"
        >
          {/* the rail */}
          <span aria-hidden="true" className="absolute top-[11px] right-[8%] left-[8%] h-px bg-gold/30" />

          {EDITIONS.map((edition) => {
            const selected = edition.year === active;
            const isNext = edition.status === "next";
            return (
              <button
                key={edition.year}
                id={tabId(edition.year)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(edition.year)}
                className="group relative flex flex-col items-center gap-3"
              >
                {/* node */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-colors duration-300",
                    selected ? "ring-metal border-transparent" : "border-gold/40 bg-navy group-hover:border-gold",
                  )}
                >
                  {isNext && (
                    <span className={cn("h-2 w-2 rotate-45", selected ? "bg-navy" : "bg-gold")} />
                  )}
                  {!isNext && selected && <span className="h-2 w-2 rounded-full bg-navy" />}
                </span>
                <span
                  className={cn(
                    "type-name text-[clamp(1rem,2.4vw,1.5rem)] transition-colors duration-300",
                    selected ? "text-metal" : "text-mist group-hover:text-cream",
                  )}
                >
                  {edition.year}
                </span>
                {isNext && (
                  <span className="type-eyebrow text-[9px] text-gold-light/80">Next</span>
                )}
              </button>
            );
          })}
        </div>

        <EditionPanel edition={activeEdition} id={panelId} labelledBy={tabId(active)} />
      </div>
    </section>
  );
}
