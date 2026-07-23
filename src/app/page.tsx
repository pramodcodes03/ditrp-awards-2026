import { Hero } from "@/components/sections/Hero";
import { MarqueeRibbon } from "@/components/sections/MarqueeRibbon";
import { About } from "@/components/sections/About";
import { Nominees } from "@/components/sections/Nominees";
import { Categories } from "@/components/sections/Categories";
import { Gallery } from "@/components/sections/Gallery";
import { PastGuest } from "@/components/sections/PastGuest";
import { Agenda } from "@/components/sections/Agenda";
import { Venue } from "@/components/sections/Venue";
import { FinalCta } from "@/components/sections/FinalCta";
import { Partners } from "@/components/sections/Partners";
import { Faq } from "@/components/sections/Faq";
import { EVENT, FAQS, SITE_URL } from "@/lib/site";

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
        <Nominees />
        <Categories />
        <Gallery />
        <PastGuest />
        <Agenda />
        <Venue />
        <FinalCta />
        <Partners />
        <Faq />
      </main>
    </>
  );
}
