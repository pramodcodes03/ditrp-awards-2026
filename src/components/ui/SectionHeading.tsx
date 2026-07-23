import { cn } from "@/lib/cn";
import { SplitHeading } from "@/lib/split-text";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Standard section header: gold eyebrow, then a Playfair heading whose words
 * rise out of masks. `heading` takes the SplitText syntax — "\n" forces a
 * line break and "*word*" sets that run in display italic.
 */
export function SectionHeading({
  eyebrow,
  heading,
  as = "h2",
  id,
  className,
  headingClassName,
  gold = false,
  children,
}: {
  eyebrow?: string;
  heading: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  headingClassName?: string;
  /** Set the heading in struck gold rather than cream. */
  gold?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <SplitHeading
        as={as}
        id={id}
        text={heading}
        className={cn(
          "type-display text-[clamp(1.9rem,4.6vw,3.4rem)] text-cream",
          headingClassName,
        )}
        // `text-metal` clips a gradient to the text box and sets
        // -webkit-text-fill-color: transparent. That property inherits, but the
        // background does not follow a transformed descendant — and every word
        // here is transformed out of a mask. Put on the heading, the words
        // inherit "paint nothing" and the whole line renders invisible. It has
        // to sit on each moving span so the metal travels with the glyphs.
        wordClassName={gold ? "text-metal" : undefined}
      />
      {children}
    </div>
  );
}
