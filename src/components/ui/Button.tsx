import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "metal" | "outline" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full " +
  "font-body text-[12px] font-semibold uppercase tracking-[0.16em] sm:text-[13px] " +
  "px-7 py-3.5 min-h-12 transition-all duration-300 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold";

const VARIANTS: Record<Variant, string> = {
  /**
   * The primary action. Solid gold with a lit top edge and a dark under-shadow
   * so it reads as struck metal rather than a flat yellow pill — the same
   * treatment the ribbon banners get on the printed cards.
   */
  metal:
    "ring-metal text-navy hover:brightness-110 " +
    "hover:shadow-[0_14px_38px_-14px_rgba(239,199,94,0.85)]",
  outline:
    "border border-gold/55 text-gold-light hover:border-gold hover:bg-gold/12",
  ghost: "text-mist hover:text-cream",
};

export function Button({
  href,
  variant = "outline",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
