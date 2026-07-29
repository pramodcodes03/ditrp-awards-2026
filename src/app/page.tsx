import { Hero } from "@/components/sections/Hero";
import { MarqueeRibbon } from "@/components/sections/MarqueeRibbon";
import { About } from "@/components/sections/About";
import { Teaser } from "@/components/sections/Teaser";
import { Nominees } from "@/components/sections/Nominees";
import { Categories } from "@/components/sections/Categories";
import { StageShowcase } from "@/components/sections/StageShowcase";
import { Editions } from "@/components/sections/Editions";
import { ChiefGuest } from "@/components/sections/ChiefGuest";
import { Agenda } from "@/components/sections/Agenda";
import { Venue } from "@/components/sections/Venue";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { EVENT, FAQS, SITE_URL, TEASER } from "@/lib/site";

/**
 * Event + FAQPage structured data.
 *
 * Injected as a raw <script type="application/ld+json"> — the documented
 * approach; `next/script` is explicitly not for this and there is no Metadata
 * API field for JSON-LD. Escaping "<" is mandatory: without it a "</script>"
 * inside any string would break out of the tag.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#event`,
      name: EVENT.name,
      description:
        "India's Best 100 Institute Award Show 2026 honours the country's finest computer training institutes, along with the directors and faculty behind them.",
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      url: SITE_URL,
      image: [`${SITE_URL}/opengraph-image`],
      location: {
        "@type": "Place",
        name: EVENT.venue,
        address: {
          "@type": "PostalAddress",
          streetAddress: EVENT.address,
          addressLocality: EVENT.city,
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
      organizer: {
        "@type": "Organization",
        name: EVENT.organizer,
        legalName: EVENT.organizerFull,
        url: EVENT.website,
      },
      performer: { "@type": "Organization", name: EVENT.organizer },
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/#teaser`,
      name: `${EVENT.name} — Official Teaser`,
      description:
        "The official teaser film for India's Best 100 Institute Award Show 2026, presented by DITRP in Mumbai.",
      thumbnailUrl: [`${SITE_URL}${TEASER.poster}`],
      contentUrl: `${SITE_URL}${TEASER.src}`,
      uploadDate: "2026-07-01",
      duration: "PT1M45S",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main id="main">
        <Hero />
        <MarqueeRibbon />
        <About />
        <Teaser />
        <ChiefGuest />
        <Nominees />
        <Categories />
        <StageShowcase />
        <Editions />
        <Agenda />
        <Venue />
        <FinalCta />
        <Faq />
      </main>
    </>
  );
}
