"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollTrigger, gsap, motionEnabled, useGSAP } from "@/lib/gsap";
import { FAQS } from "@/lib/site";

/* Declared here, not inline: a JSX string attribute would not escape the "\n"
   that SplitHeading uses as its line break. */
const HEADING = "Questions,\n*answered*.";

/* The one place on this page that animates a non-transform property.
   An accordion panel has no transform equivalent — scaleY distorts the text
   and clip-path leaves the collapsed box occupying its full height in flow —
   so the height tween below is a deliberate, contained exception to the
   "transform and opacity only" rule. It is confined to this file. */
const PANEL_DUR = 0.45;
const PANEL_EASE = "power2.out";

/* Panels ship collapsed in the server-rendered HTML (hidden + height 0) and are
   only ever opened by script, so where there is no script the answers would be
   unreachable copy. Both of these environments un-collapse them instead. */
const NO_JS_CSS =
  "@media (scripting: none), print {" +
  "#faq [data-faq-panel]{display:block!important;height:auto!important}" +
  "}";

function openPanel(el: HTMLElement) {
  gsap.killTweensOf(el);
  el.removeAttribute("hidden");

  if (!motionEnabled()) {
    el.style.height = "auto";
    ScrollTrigger.refresh();
    return;
  }

  gsap.fromTo(
    el,
    { height: 0 },
    {
      height: "auto",
      duration: PANEL_DUR,
      ease: PANEL_EASE,
      onComplete: () => {
        // GSAP measures "auto" once and lands on that pixel value. Handing the
        // box back to `auto` stops a later reflow — resize, rotate, a late
        // webfont swap — from clipping the answer inside overflow-hidden.
        el.style.height = "auto";
        ScrollTrigger.refresh();
      },
    },
  );
}

function closePanel(el: HTMLElement) {
  gsap.killTweensOf(el);

  if (!motionEnabled()) {
    el.style.height = "0px";
    el.setAttribute("hidden", "");
    ScrollTrigger.refresh();
    return;
  }

  gsap.to(el, {
    height: 0,
    duration: PANEL_DUR,
    ease: PANEL_EASE,
    // `hidden` only lands once the box has finished collapsing, so a closing
    // panel is never display:none mid-tween.
    onComplete: () => {
      el.setAttribute("hidden", "");
      ScrollTrigger.refresh();
    },
  });
}

export function Faq() {
  // Accordion: exactly one panel open at a time, all closed by default.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panels = useRef<Array<HTMLDivElement | null>>([]);
  const applied = useRef<number | null>(null);
  const scope = useRef<HTMLDivElement>(null);

  /* Panels are driven imperatively rather than from JSX: the closing tween has
     to finish before `hidden` lands, and React must not rewrite `hidden` or
     `height` underneath a running tween. Both props are therefore rendered once
     and never change value, so React's diff leaves them alone forever.
     Running inside useGSAP means every tween is registered on the component's
     gsap context and reverted on unmount. */
  useGSAP(
    () => {
      const previous = applied.current;
      if (previous === openIndex) return;
      applied.current = openIndex;

      if (previous !== null) {
        const el = panels.current[previous];
        if (el) closePanel(el);
      }

      if (openIndex !== null) {
        const el = panels.current[openIndex];
        if (el) openPanel(el);
      }
    },
    { scope, dependencies: [openIndex] },
  );

  return (
    <Section id="faq" labelledBy="faq-heading" field="deep" seams>
      <style>{NO_JS_CSS}</style>

      <SectionHeading
        eyebrow="Good to know"
        id="faq-heading"
        heading={HEADING}
        gold
      />

      <div ref={scope} className="mt-14 max-w-3xl md:mt-20">
        <ul className="border-t border-gold/30">
          {FAQS.map((faq, index) => {
            const buttonId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;
            const isOpen = openIndex === index;

            return (
              <li key={faq.q} data-reveal="" className="border-b border-gold/30">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full cursor-pointer items-start gap-4 py-6 text-left sm:gap-6"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.4em] w-6 shrink-0 font-display text-[12px] leading-none tracking-[0.14em] text-gold/60 tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="type-display flex-1 text-[clamp(1.05rem,2vw,1.35rem)] text-cream">
                      {faq.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-[0.1em] grid size-9 shrink-0 place-items-center rounded-full border border-gold/30 transition-colors duration-300 ease-out group-hover:border-gold/60 group-hover:bg-gold/10 group-aria-expanded:border-gold/60 group-aria-expanded:bg-gold/10"
                    >
                      <ChevronDown
                        strokeWidth={1.5}
                        className="size-4 text-gold transition-transform duration-300 ease-out group-aria-expanded:rotate-180"
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  data-faq-panel=""
                  ref={(node) => {
                    panels.current[index] = node;
                  }}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden
                  style={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-7 pl-10 font-body text-[15px] leading-relaxed text-mist sm:pl-12">
                    {faq.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
