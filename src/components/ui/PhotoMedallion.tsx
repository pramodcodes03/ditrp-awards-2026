import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A gold-ringed circular portrait. When `src` is null it renders a clearly
 * marked photo placeholder — never a stand-in face for a named person, so a
 * real guest is only ever shown once their own licensed photo is supplied.
 */
export function PhotoMedallion({
  src,
  alt,
  label,
  className,
  sizes = "260px",
}: {
  src: string | null;
  alt: string;
  /** Shown inside the placeholder when there is no photo. */
  label?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <div className="ring-metal absolute inset-0 rounded-full" />
      <div className="absolute inset-[6px] overflow-hidden rounded-full bg-royal-lit">
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-b from-royal-lit to-navy text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-1/3 w-1/3 text-gold/70"
              fill="currentColor"
            >
              <circle cx="12" cy="8" r="4.2" />
              <path d="M3.5 21c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5z" />
            </svg>
            <span className="type-eyebrow px-3 text-[9px] leading-tight text-gold-light/70">
              {label ?? "Photo to be added"}
            </span>
          </div>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-[6px] rounded-full ring-1 ring-gold/40"
      />
    </div>
  );
}
