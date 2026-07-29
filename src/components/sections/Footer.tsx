"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { useRevealScope } from "@/lib/use-reveal";
import {
  BOOKING_URL,
  EVENT,
  NAV_LINKS,
  NOMINATION_URL,
} from "@/lib/site";

const LINK_CLASS =
  "inline-flex min-h-11 items-center gap-3 font-body text-[14px] text-mist " +
  "transition-colors duration-300 ease-out hover:text-cream";

const ICON_CLASS = "size-4 shrink-0 text-gold";

const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "Book your seat", href: BOOKING_URL },
  { label: "Nominate an institute", href: NOMINATION_URL },
];

/** "ditrpindia.org" — the link label, derived rather than retyped. */
const WEBSITE_LABEL = EVENT.website.replace(/^https?:\/\//, "");

/* The contact glyphs come from lucide-react, but lucide v1 dropped every brand
   mark — so the four social glyphs are inlined here on the same 24px / 1.5
   stroke grid as the rest of the icon set. */
function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
    >
      {children}
    </svg>
  );
}

/** One placeholder per platform — replace all four with the real handles. */
const SOCIALS = [
  {
    label: "Instagram",
    href: "{{INSTAGRAM_URL}}",
    icon: (
      <SocialIcon>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </SocialIcon>
    ),
  },
  {
    label: "LinkedIn",
    href: "{{LINKEDIN_URL}}",
    icon: (
      <SocialIcon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </SocialIcon>
    ),
  },
  {
    label: "YouTube",
    href: "{{YOUTUBE_URL}}",
    icon: (
      <SocialIcon>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </SocialIcon>
    ),
  },
  {
    label: "Facebook",
    href: "{{FACEBOOK_URL}}",
    icon: (
      <SocialIcon>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </SocialIcon>
    ),
  },
];

export function Footer() {
  const scope = useRevealScope<HTMLElement>();

  // Homepage-anchor links (#about, …) must jump home first from any other
  // route; real routes (/book) are left alone.
  const onHome = usePathname() === "/";
  const resolve = (href: string) =>
    !onHome && href.startsWith("#") ? `/${href}` : href;

  return (
    <footer ref={scope} className="relative isolate bg-navy py-16 lg:py-24">
      {/* Gold seam along the top edge, as on the border of the printed card. */}
      <span
        aria-hidden="true"
        className="rule-gold absolute inset-x-0 top-0 block"
      />

      {/* House lights coming back up over the top edge. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-gold/8 to-transparent"
      />

      <div className="container-page">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr] lg:gap-16">
          {/* Who we are ------------------------------------------------ */}
          <div data-reveal="" className="max-w-md">
            {/* The mark sits on white here too — the artwork is red and navy
                on white and must never be knocked out of its box. */}
            <div className="inline-block rounded-lg bg-white px-4 py-2.5 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.9)]">
              <Image
                src="/awards/brand/ditrp-logo.png"
                alt={`${EVENT.organizer} — ${EVENT.organizerFull}`}
                width={714}
                height={248}
                loading="lazy"
                className="h-10 w-auto"
              />
            </div>

            <div aria-hidden="true" className="rule-gold mt-6 max-w-[88px]" />

            <p className="mt-5 font-body text-[15px] leading-relaxed text-mist">
              {EVENT.organizer} works with computer training institutes the
              length of the country — the classrooms, the directors and the
              faculty who turn skills training into placements. {EVENT.name} is
              the one day a year the whole network sits in the same room: a
              hundred institutes called to the stage in {EVENT.city}, and the
              people behind them named out loud.
            </p>

            {/* The legal line printed on every card. */}
            <p className="mt-6 font-body text-[12px] leading-relaxed text-mist/70">
              {EVENT.organizerFull}
              <span aria-hidden="true" className="mx-2 text-gold/60">
                ·
              </span>
              CIN: {EVENT.cin}
            </p>
          </div>

          {/* Quick links ---------------------------------------------- */}
          <div data-reveal="">
            <h2 className="type-eyebrow text-gold-light/90">Explore</h2>
            <nav aria-label="Footer" className="mt-5">
              <ul className="flex flex-col gap-0.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={resolve(link.href)} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact & socials ---------------------------------------- */}
          <div data-reveal="">
            <h2 className="type-eyebrow text-gold-light/90">Get in touch</h2>

            <ul className="mt-5 flex flex-col gap-0.5">
              <li>
                <a
                  href={`mailto:${EVENT.contactEmail}`}
                  className={LINK_CLASS}
                >
                  <Mail aria-hidden="true" className={ICON_CLASS} />
                  <span className="break-all">{EVENT.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${EVENT.contactPhone.replace(/\s+/g, "")}`}
                  className={LINK_CLASS}
                >
                  <Phone aria-hidden="true" className={ICON_CLASS} />
                  {EVENT.contactPhone}
                </a>
              </li>
              <li>
                <a
                  href={EVENT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  <Globe aria-hidden="true" className={ICON_CLASS} />
                  {WEBSITE_LABEL}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            <address className="mt-4 flex gap-3 font-body text-[14px] leading-relaxed text-mist not-italic">
              <MapPin aria-hidden="true" className={`${ICON_CLASS} mt-1`} />
              <span>{EVENT.address}</span>
            </address>

            <ul className="mt-7 flex flex-wrap items-center gap-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${EVENT.organizer} on ${social.label} (opens in a new tab)`}
                    className="flex size-11 items-center justify-center rounded-full border border-gold/25 text-mist transition-[color,border-color,background-color] duration-300 ease-out hover:border-gold/60 hover:bg-gold/10 hover:text-gold-light"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar --------------------------------------------------
            Deliberately NOT tagged data-reveal / data-fade: it sits within
            ~150px of the document bottom, so a `top 80%` ScrollTrigger start
            resolves past max scroll on any viewport taller than ~735px and
            would never fire, leaving it permanently at opacity 0. */}
        <div className="mt-16 flex flex-col gap-2 border-t border-gold/20 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p className="font-body text-[13px] text-mist/80">
            © 2026 {EVENT.organizer}. All rights reserved.
          </p>
          <p className="font-body text-[13px] text-mist/80">
            {EVENT.dateLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
