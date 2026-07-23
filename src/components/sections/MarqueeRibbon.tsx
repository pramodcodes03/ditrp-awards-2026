import { Marquee } from "@/components/ui/Marquee";
import { MARQUEE_ITEMS } from "@/lib/site";

/**
 * `Marquee` loops by translating its track exactly -50%, i.e. by the width of
 * one copy of the children. Four short items measure ~1500px at the top of the
 * type clamp, so on any viewport wider than that the seam exposes a blank gap.
 * Repeating the list inside one copy makes it ~4500px — wider than 4K — so the
 * band is always full.
 */
const TRACK_GROUPS = [0, 1, 2];

/** ~40px/s, the same drift as one un-repeated pass at 38s. */
const LOOP_SECONDS = 110;

/**
 * The full-bleed band between the hero and the page proper: a lit royal strip
 * ruled off top and bottom in gold, exactly like the border on the cards.
 *
 * Both this wrapper and <Marquee> clip, so the over-wide track can never reach
 * the document and force a horizontal scrollbar.
 */
export function MarqueeRibbon() {
  return (
    <div className="relative isolate w-full overflow-hidden border-y border-gold/30 bg-linear-to-r from-navy via-azure to-navy py-4 sm:py-5">
      {/* The border is the continuous hairline; these two lay the lit gold rule
          over it so the band is ruled off exactly as the cards are. */}
      <span aria-hidden="true" className="rule-gold-thin absolute inset-x-0 top-0" />
      <span
        aria-hidden="true"
        className="rule-gold-thin absolute inset-x-0 bottom-0"
      />

      <Marquee
        speed={LOOP_SECONDS}
        // Soften the hard cut at both edges. Gated on motion-safe so a static
        // ribbon under reduced motion never fades out its leading item.
        className="motion-safe:[mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]"
      >
        {TRACK_GROUPS.map((group) => (
          // Only the first pass is announced; the repeats exist purely to fill
          // the track. (Marquee already aria-hides its own duplicate copy.)
          <div
            key={group}
            className="flex shrink-0 items-center"
            aria-hidden={group === 0 ? undefined : true}
          >
            {MARQUEE_ITEMS.map((item) => (
              // Every item carries its own trailing separator so the duplicated
              // track still reads evenly across the loop seam.
              <span key={item} className="flex shrink-0 items-center">
                <span className="type-name text-[clamp(0.85rem,1.9vw,1.25rem)] whitespace-nowrap text-gold">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="px-[clamp(1.25rem,3vw,2.75rem)] text-[clamp(0.7rem,1.4vw,1rem)] text-star/80"
                >
                  &#10022;
                </span>
              </span>
            ))}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
