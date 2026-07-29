"use client";

import Image from "next/image";
import { STAGE_IMAGE, EVENT } from "@/lib/site";
import { useRevealScope } from "@/lib/use-reveal";
import { StarRow } from "@/components/ui/Ornaments";

/**
 * A cinematic beat between the awards and the editions: the stage itself,
 * framed like the rest of the collateral. The image is ~4:3, so object-cover
 * on a 4:3 frame fills it with no crop.
 */
export function StageShowcase() {
  const scope = useRevealScope<HTMLElement>();

  return (
    <section
      ref={scope}
      aria-label={`The ${EVENT.name} stage`}
      className="bg-navy section-y relative isolate overflow-hidden"
    >
      <div className="container-page">
        <div
          data-reveal=""
          className="ring-metal relative mx-auto max-w-5xl rounded-[14px] p-[3px] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.95)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-navy sm:aspect-[16/10]">
            <Image
              src={STAGE_IMAGE.src}
              alt={STAGE_IMAGE.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy/80 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center sm:p-8">
              <StarRow size={13} />
              <p className="type-name text-[clamp(0.8rem,2vw,1.05rem)] text-cream">
                The stage is set
                <span className="mx-2 text-gold">·</span>
                {EVENT.city} {EVENT.dateShort.split(" ").at(-1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
