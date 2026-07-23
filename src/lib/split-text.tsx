import { Fragment } from "react";
import { cn } from "@/lib/cn";

/**
 * Word-splitter for masked headline reveals.
 *
 * Each *word* gets its own `overflow-hidden` mask so the inner span can slide
 * up from `yPercent: 110`. The initial hidden state lives in CSS
 * (`html[data-motion="on"] [data-word]`), so there is no flash of un-animated
 * text, and with reduced motion or no JS the words simply render in place.
 *
 * Text syntax:
 *   "\n"        forces a line break
 *   "*word*"    sets that run in display italic (for drama)
 *
 * Tokenising happens on WHITESPACE first and italic markers second, so a run
 * like "*stage*." stays a single token. Splitting on the markers first would
 * strand the full stop as its own "word" — which, at display sizes, wraps onto
 * a line of its own and looks like a typo.
 *
 * Pure and server-renderable; the animation is driven by the parent via
 * `[data-split]` / `[data-word]`.
 */

type Run = { text: string; italic: boolean };

/** One token = one mask. A token may mix roman and italic runs. */
function tokenize(line: string): Run[][] {
  const tokens: Run[][] = [];
  let token: Run[] = [];
  let buffer = "";
  let italic = false;

  const flushRun = () => {
    if (buffer) {
      token.push({ text: buffer, italic });
      buffer = "";
    }
  };
  const flushToken = () => {
    flushRun();
    if (token.length) {
      tokens.push(token);
      token = [];
    }
  };

  for (const character of line) {
    if (character === "*") {
      flushRun();
      italic = !italic;
    } else if (/\s/.test(character)) {
      flushToken();
    } else {
      buffer += character;
    }
  }
  flushToken();

  return tokens;
}

export function SplitText({
  text,
  wordClassName,
}: {
  text: string;
  wordClassName?: string;
}) {
  return (
    <>
      {text.split("\n").map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br aria-hidden="true" />}
          {tokenize(line).map((runs, tokenIndex) => (
            <Fragment key={tokenIndex}>
              <span
                className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
                aria-hidden="true"
              >
                <span
                  data-word=""
                  className={cn(
                    "inline-block will-change-transform",
                    wordClassName,
                  )}
                >
                  {runs.map((run, runIndex) =>
                    run.italic ? (
                      <em key={runIndex} className="font-normal italic">
                        {run.text}
                      </em>
                    ) : (
                      <Fragment key={runIndex}>{run.text}</Fragment>
                    ),
                  )}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}

/**
 * A heading whose words reveal from behind masks.
 *
 * The full string is repeated into an `sr-only` span so assistive tech and
 * copy/paste get one clean sentence; the split spans themselves are
 * `aria-hidden`, which also stops screen readers reading word-fragment soup.
 */
export function SplitHeading({
  as: Tag = "h2",
  text,
  className,
  wordClassName,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  text: string;
  className?: string;
  wordClassName?: string;
  id?: string;
}) {
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");
  return (
    <Tag id={id} data-split="" className={cn("text-balance", className)}>
      <span className="sr-only">{plain}</span>
      <SplitText text={text} wordClassName={wordClassName} />
    </Tag>
  );
}
