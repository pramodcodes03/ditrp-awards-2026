import { cn } from "@/lib/cn";

/**
 * The gold ornament set, rebuilt from the printed nominee cards.
 *
 * All of it is inline SVG rather than images: it has to scale from a 360px
 * phone to a 1920px display, recolour with the palette, and cost nothing to
 * download. Every piece is decorative and therefore `aria-hidden`.
 *
 * A single shared <defs> gradient would be ideal, but these render in many
 * places and duplicated ids break when two instances share a document — so
 * each component declares its own gradient with a unique id suffix.
 */

const GOLD_STOPS = (
  <>
    <stop offset="0%" stopColor="#FDF3C4" />
    <stop offset="22%" stopColor="#FBEBA6" />
    <stop offset="50%" stopColor="#EFC75E" />
    <stop offset="72%" stopColor="#B8862B" />
    <stop offset="100%" stopColor="#FBEBA6" />
  </>
);

/** Ornate corner bracket. Rotated by the frame to serve all four corners. */
function CornerPiece({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {GOLD_STOPS}
        </linearGradient>
      </defs>
      {/* outer sweep */}
      <path
        d="M2 118 V40 C2 19 19 2 40 2 H118"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* inner parallel */}
      <path
        d="M12 118 V44 C12 26 26 12 44 12 H118"
        stroke={`url(#${id})`}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Corner mark. A filled flourish reads as a smudge below ~80px, so the
          detail is drawn as strokes that stay crisp at every size. */}
      <path
        d="M22 58 C22 42 34 30 50 30"
        stroke={`url(#${id})`}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      <circle cx="41" cy="41" r="2.4" fill={`url(#${id})`} />
      <path
        d="M2 78 H2.5 M118 2 V2.5"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Ornate gold frame drawn just inside the edges of its positioned parent. */
export function CornerFrame({
  className,
  size = 96,
  inset = 14,
}: {
  className?: string;
  size?: number;
  inset?: number;
}) {
  const corners = [
    { key: "tl", style: { top: inset, left: inset }, rotate: "rotate-0" },
    { key: "tr", style: { top: inset, right: inset }, rotate: "rotate-90" },
    { key: "br", style: { bottom: inset, right: inset }, rotate: "rotate-180" },
    { key: "bl", style: { bottom: inset, left: inset }, rotate: "-rotate-90" },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {corners.map((corner) => (
        <div
          key={corner.key}
          className={cn("absolute", corner.rotate)}
          style={{ ...corner.style, width: size, height: size }}
        >
          <CornerPiece id={`corner-${corner.key}-${size}-${inset}`} />
        </div>
      ))}
    </div>
  );
}

/** Laurel branch. `side` mirrors it so a pair can flank a block of text. */
export function Laurel({
  side = "left",
  className,
}: {
  side?: "left" | "right";
  className?: string;
}) {
  const id = `laurel-${side}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 70 150"
      fill="none"
      className={cn(side === "right" && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {GOLD_STOPS}
        </linearGradient>
      </defs>
      {/* stem */}
      <path
        d="M58 6 C30 34 18 74 24 144"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* leaves, tapering down the stem */}
      {Array.from({ length: 8 }).map((_, index) => {
        const t = index / 7;
        const x = 56 - t * 33;
        const y = 16 + t * 116;
        const scale = 1 - t * 0.35;
        return (
          <ellipse
            key={index}
            cx={x - 13 * scale}
            cy={y}
            rx={15 * scale}
            ry={6.4 * scale}
            fill={`url(#${id})`}
            transform={`rotate(${-38 + t * 22} ${x - 13 * scale} ${y})`}
          />
        );
      })}
    </svg>
  );
}

/** A row of five gold stars — the rating motif from the cards. */
export function StarRow({
  count = 5,
  className,
  size = 18,
}: {
  count?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
        >
          <defs>
            <linearGradient id={`star-${index}-${size}`} x1="0" y1="0" x2="0" y2="1">
              {GOLD_STOPS}
            </linearGradient>
          </defs>
          <path
            d="M12 1.6l3.1 6.6 7.1 1-5.2 5.2 1.3 7.3-6.3-3.5-6.3 3.5 1.3-7.3L1.8 9.2l7.1-1z"
            fill={`url(#star-${index}-${size})`}
          />
        </svg>
      ))}
    </div>
  );
}

/** Four-point sparkle. Twinkles on a loop unless motion is off. */
export function Sparkle({
  className,
  size = 26,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      className={cn("motion-safe:[animation:twinkle_3.6s_ease-in-out_infinite]", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <defs>
        <radialGradient id={`sp-${size}-${delay}`}>
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="55%" stopColor="#EFC75E" />
          <stop offset="100%" stopColor="#EFC75E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M20 0 C21.5 13.5 26.5 18.5 40 20 C26.5 21.5 21.5 26.5 20 40 C18.5 26.5 13.5 21.5 0 20 C13.5 18.5 18.5 13.5 20 0Z"
        fill={`url(#sp-${size}-${delay})`}
      />
    </svg>
  );
}

/** Gold trophy, as printed either side of the card headline. */
export function Trophy({
  className,
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  const id = `trophy-${size}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 80"
      width={size}
      height={(size * 80) / 64}
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {GOLD_STOPS}
        </linearGradient>
      </defs>
      {/* handles */}
      <path
        d="M14 12H6c-2 0-3 1.4-3 3.4C3 25 9 32 16 33"
        stroke={`url(#${id})`}
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M50 12h8c2 0 3 1.4 3 3.4C61 25 55 32 48 33"
        stroke={`url(#${id})`}
        strokeWidth="3"
        fill="none"
      />
      {/* cup */}
      <path
        d="M14 6h36v18c0 11-8 19-18 19S14 35 14 24V6Z"
        fill={`url(#${id})`}
      />
      {/* stem and base */}
      <path d="M29 43h6v11h-6z" fill={`url(#${id})`} />
      <path d="M20 54h24v6H20z" fill={`url(#${id})`} />
      <path d="M14 60h36v8H14z" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * The gold ribbon banner that carries the nominee's name on every card:
 * a lit centre panel with darker folded tails tucked behind each end.
 */
export function RibbonBanner({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative inline-flex isolate", className)}>
      {/* folded tails */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 -left-4 -z-10 h-[64%] w-10 -translate-y-1/2 bg-gold-deep"
        style={{ clipPath: "polygon(0 0, 100% 22%, 100% 78%, 0 100%)" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -right-4 -z-10 h-[64%] w-10 -translate-y-1/2 bg-gold-deep"
        style={{ clipPath: "polygon(100% 0, 0 22%, 0 78%, 100% 100%)" }}
      />
      <span
        className="ring-metal relative block px-6 py-2.5 text-center sm:px-9 sm:py-3"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 78%, 3% 50%, 0 22%)",
        }}
      >
        <span className="type-name block text-[clamp(0.95rem,2.2vw,1.35rem)] text-navy">
          {children}
        </span>
      </span>
    </div>
  );
}

/** Scattered sparkles across a blue field. Purely atmospheric. */
export function SparkleField({ className }: { className?: string }) {
  const sparkles = [
    { top: "8%", left: "6%", size: 30, delay: 0 },
    { top: "18%", left: "88%", size: 22, delay: 0.7 },
    { top: "62%", left: "4%", size: 18, delay: 1.4 },
    { top: "72%", left: "92%", size: 26, delay: 2.1 },
    { top: "38%", left: "78%", size: 14, delay: 1.1 },
    { top: "48%", left: "16%", size: 16, delay: 2.6 },
  ];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {sparkles.map((sparkle, index) => (
        <span
          key={index}
          className="absolute"
          style={{ top: sparkle.top, left: sparkle.left }}
        >
          <Sparkle size={sparkle.size} delay={sparkle.delay} />
        </span>
      ))}
    </div>
  );
}
