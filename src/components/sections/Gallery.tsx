"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { SCRUB, gsap, motionEnabled, useGSAP } from "@/lib/gsap";
import { GALLERY_2024 } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CornerFrame, SparkleField, StarRow } from "@/components/ui/Ornaments";

/* Declared here rather than inline: a JSX string attribute would not escape the
   "\n" that SplitHeading reads as a line break. */
const HEADING = "Moments from\nthe *2024* stage.";

type Photo = (typeof GALLERY_2024)[number];

type Column = {
  photos: readonly Photo[];
  /** Width inside the 12-column desktop grid — deliberately unequal. */
  span: string;
  /** Staggered start, so the collage never reads as a row of equal cards. */
  offset: string;
  sizes: string;
  /** yPercent travelled either side of centre. Bigger reads as "closer". */
  shift: number;
  /** Closing typographic plate. Only the short column carries one. */
  tile?: boolean;
};

/**
 * Three columns of unequal width, unequal length and unequal parallax speed.
 * Photos are grouped so the two big hall shots anchor the widest column and the
 * panorama sits where a narrow column can carry its full width.
 */
const COLUMNS: readonly Column[] = [
  {
    photos: [GALLERY_2024[0], GALLERY_2024[1]],
    span: "lg:col-span-5",
    offset: "",
    sizes: "(min-width: 1024px) 40vw, 92vw",
    shift: 4,
  },
  {
    photos: [GALLERY_2024[3], GALLERY_2024[2]],
    span: "lg:col-span-4",
    offset: "lg:mt-16",
    sizes: "(min-width: 1024px) 32vw, 92vw",
    shift: 9,
  },
  {
    photos: [GALLERY_2024[4]],
    span: "lg:col-span-3",
    offset: "lg:mt-28",
    sizes: "(min-width: 1024px) 24vw, 92vw",
    shift: 13,
    tile: true,
  },
];

/**
 * A photograph in a mat, framed the way the printed cards frame everything:
 * a gold edge around a blue panel. The navy wash and vignette sit *over* the
 * image because these are hot-lit hall photographs — white shirts and white
 * standees blow straight out against the royal field without them.
 */
function Plate({ photo, sizes }: { photo: Photo; sizes: string }) {
  return (
    <figure data-reveal="" className="group">
      <div className="panel-gold rounded-[4px] p-1.5">
        <div className="relative isolate overflow-hidden rounded-[2px] bg-navy">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            sizes={sizes}
            className="h-auto w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-navy/25 transition-opacity duration-500 ease-out group-hover:opacity-50"
          />
          <span
            aria-hidden="true"
            className="field-vignette pointer-events-none absolute inset-0"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(1,20,60,0.6)]"
          />
        </div>
      </div>
      <figcaption className="type-eyebrow mt-3.5 text-[11px] leading-snug text-gold-light/90">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

/** Fills out the short column and closes the collage on a typographic note. */
function EditionsTile() {
  return (
    <div
      data-reveal=""
      className="panel-gold relative rounded-[4px] px-6 py-9 text-center"
    >
      <CornerFrame size={46} inset={8} />
      <p className="type-eyebrow text-gold-light/90">Previous editions</p>
      <p className="type-poster text-metal mt-3 text-[clamp(2.4rem,7vw,3.2rem)]">
        2024
      </p>
      <StarRow className="mt-4" size={13} />
      <p className="mt-5 text-[13px] leading-relaxed text-mist">
        India&rsquo;s Best 100 Institute Award Show and the Excellence in
        Education Awards, both held in 2024.
      </p>
    </div>
  );
}

export function Gallery() {
  const scope = useRevealScope<HTMLElement>();

  useGSAP(
    () => {
      if (!motionEnabled()) return;

      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      // Only where the columns actually stand side by side. Stacked on a phone
      // the same offsets would just tear gaps into a single column.
      mm.add("(min-width: 1024px)", () => {
        const columns = gsap.utils.toArray<HTMLElement>("[data-column]", root);

        for (const column of columns) {
          const shift = Number(column.dataset.column) || 0;

          // Symmetric about the midpoint, so the collage sits exactly as laid
          // out at the moment the section is centred in the viewport and only
          // drifts while it is half off-screen.
          gsap.fromTo(
            column,
            { yPercent: shift },
            {
              yPercent: -shift,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: SCRUB,
              },
            },
          );
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="gallery"
      ref={scope}
      aria-labelledby="gallery-heading"
      className={cn(
        "field-royal section-y relative isolate overflow-hidden",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gold/35",
      )}
    >
      <SparkleField className="-z-10 opacity-60" />

      <div className="container-page">
        <SectionHeading
          eyebrow="The 2024 edition"
          id="gallery-heading"
          heading={HEADING}
          gold
          className="items-center text-center"
          headingClassName="text-center"
        >
          <p
            data-reveal=""
            className="mx-auto max-w-[58ch] text-[15px] leading-relaxed text-mist"
          >
            Two editions ran in 2024 — India&rsquo;s Best 100 Institute Award
            Show and the Excellence in Education Awards. Institute heads
            travelled in from across the network to collect their trophies in
            person.
          </p>
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {COLUMNS.map((column) => (
            <div
              key={column.span}
              data-column={column.shift}
              className={cn(
                "flex flex-col gap-10 lg:gap-8 lg:will-change-transform",
                column.span,
                column.offset,
              )}
            >
              {column.photos.map((photo) => (
                <Plate key={photo.src} photo={photo} sizes={column.sizes} />
              ))}
              {column.tile && <EditionsTile />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
