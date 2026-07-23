import { cn } from "@/lib/cn";

/** Gold label above every section heading, flanked by a short rule. */
export function Eyebrow({
  children,
  className,
  withRule = true,
}: {
  children: React.ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <p
      data-reveal=""
      className={cn(
        "type-eyebrow flex items-center gap-3 text-gold-light/90",
        className,
      )}
    >
      {withRule && (
        <span aria-hidden="true" className="rule-gold-thin w-8 shrink-0 sm:w-12" />
      )}
      <span>{children}</span>
    </p>
  );
}
