/**
 * Single source of truth for every piece of copy and every placeholder.
 *
 * Anything in {{DOUBLE_BRACES}} is content the client still owes us.
 * Everything else is taken from the printed nominee cards for the 2026 show,
 * from photography of the 2024 edition, or from ditrpindia.org.
 */

/* ------------------------------------------------------------------
   Event
   ------------------------------------------------------------------ */

export const EVENT = {
  /** As printed on the 2026 nominee cards. */
  name: "India's Best 100 Institute Award Show 2026",
  shortName: "IBI Award Show 2026",
  organizer: "DITRP",
  /** Expansion printed under the logo. */
  organizerFull:
    "Digital Information Technology & Research for Professional",
  /** Printed on every card. */
  cin: "U74999MH2018OPC303654",

  /** {{SHOW_START_TIME}} — the cards give the date, not the hour. */
  startISO: "2026-09-27T18:00:00+05:30",
  /** {{SHOW_END_TIME}} */
  endISO: "2026-09-27T23:00:00+05:30",

  dateLabel: "Sunday, 27 September 2026",
  dateShort: "27 September 2026",
  dateNumeric: "27.09.2026",

  /** {{VENUE_NAME}} — the cards name the city only. */
  venue: "{{VENUE NAME}}",
  city: "Mumbai",
  /** {{VENUE_ADDRESS}} */
  address: "{{VENUE ADDRESS LINE}}, Mumbai, Maharashtra",

  /** {{NOMINATION_DEADLINE}} */
  nominationDeadline: "{{31 AUGUST 2026}}",

  contactEmail: "{{AWARDS@DITRPINDIA.ORG}}",
  contactPhone: "{{+91 00000 00000}}",
  website: "https://ditrpindia.org",
} as const;

export const SITE_URL = "https://awards.ditrpindia.org"; // {{PRODUCTION_URL}}

/** {{BOOKING_FORM_URL}} — anchors to the CTA band so nothing is a dead link. */
export const BOOKING_URL = "#reserve";
/** {{NOMINATION_FORM_URL}} */
export const NOMINATION_URL = "#reserve";
/** {{GOOGLE_MAPS_DIRECTIONS_URL}} */
export const DIRECTIONS_URL = "#venue";

/* ------------------------------------------------------------------
   Navigation
   ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Nominees", href: "#nominees" },
  { label: "Awards", href: "#categories" },
  { label: "2024", href: "#gallery" },
  { label: "Agenda", href: "#agenda" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ------------------------------------------------------------------
   Stats
   ------------------------------------------------------------------
   100 comes from the event's own name. The 500+/50,000+ figures are the
   ones DITRP publishes on ditrpindia.org. States & UTs is unconfirmed.
   ------------------------------------------------------------------ */

export const STATS = [
  { value: 100, suffix: "", label: "Institutes honoured" },
  { value: 500, suffix: "+", label: "Partner institutes" },
  { value: 50000, suffix: "+", label: "Students impacted" },
  { value: 24, suffix: "", label: "States & UTs" }, // {{XX}}
] as const;

/* ------------------------------------------------------------------
   2026 nominees — transcribed from the printed nominee cards.
   ------------------------------------------------------------------ */

export type Nominee = {
  name: string;
  institute: string;
  state: string;
  slug: string;
};

export const NOMINEES: readonly Nominee[] = [
  {
    name: "Mrs. Shabnam Kumari",
    institute: "Digital Institute of Global Information & Technology",
    state: "Bihar",
    slug: "digit-begusarai",
  },
  {
    name: "Mr. Rajesh Pandit",
    institute: "RK Computer Education",
    state: "Maharashtra",
    slug: "rk-computer-education",
  },
  {
    name: "Mr. Satish Verma",
    institute: "Aashish Computer Training Point",
    state: "Punjab",
    slug: "aashish-computer-training-point",
  },
  {
    name: "Mr. Aditya Patle",
    institute: "Libdex Career Academy",
    state: "Maharashtra",
    slug: "libdex-career-academy",
  },
  {
    name: "Mr. Tarun Kumar Maharana",
    institute: "Innovate Computer Education",
    state: "Odisha",
    slug: "innovate-computer-education",
  },
  {
    name: "Mr. Jay Kumar Tiwari",
    institute: "Jay Infotech",
    state: "Uttar Pradesh",
    slug: "jay-infotech",
  },
] as const;

/* ------------------------------------------------------------------
   The two honours presented on the night.
   ------------------------------------------------------------------ */

export type Award = {
  /** Ordinal shown on the panel: "01", "02". */
  index: string;
  title: string;
  /** Short line under the title. */
  subtitle: string;
  description: string;
  /** Who the award is for. */
  forWhom: string;
};

export const AWARDS: readonly Award[] = [
  {
    index: "01",
    title: "India's Best 100\nInstitute Award",
    subtitle: "The centre",
    description:
      "The hundred computer training institutes that did the most for their students this year — seats filled, skills certified, careers started. One trophy each, presented on stage in Mumbai.",
    forWhom: "For the institute",
  },
  {
    index: "02",
    title: "Excellence in\nEducation Award",
    subtitle: "The people",
    description:
      "For the directors and faculty behind those centres: the person who kept the doors open, taught the room, and turned a year of work into results worth reading out loud.",
    forWhom: "For the director & faculty",
  },
] as const;

/* ------------------------------------------------------------------
   2024 edition — real photography from the previous show.
   ------------------------------------------------------------------ */

export const GALLERY_2024 = [
  {
    src: "/awards/2024/winners-group.jpg",
    alt: "Winners of the Excellence in Education Awards 2024 on stage with their star trophies",
    caption: "Excellence in Education Awards 2024",
    w: 1600,
    h: 1066,
  },
  {
    src: "/awards/2024/hall-group.jpg",
    alt: "A full hall of DITRP institute heads holding their 2024 certificates and trophies",
    caption: "Bihar Excellence in Education Awards 2024",
    w: 1600,
    h: 1068,
  },
  {
    src: "/awards/2024/ibi-stage.jpg",
    alt: "The India's Best 100 Institute Award Show 2024 group photograph on stage",
    caption: "India's Best 100 Institute Award Show 2024",
    w: 1200,
    h: 539,
  },
  {
    src: "/awards/2024/ashneer-grover.jpg",
    alt: "Ashneer Grover presenting a DITRP award to an institute head at the 2024 show",
    caption: "Ashneer Grover presenting · 2024",
    w: 1536,
    h: 1024,
  },
  {
    src: "/awards/2024/winners-standee.jpg",
    alt: "Winners on stage between India's Best 100 Institute Award Show 2024 banners",
    caption: "The 2024 winners on stage",
    w: 1000,
    h: 668,
  },
] as const;

/** Past chief guest, from the 2024 photography. */
export const PAST_GUEST = {
  name: "Ashneer Grover",
  note: "presented the honours at the 2024 edition",
  src: "/awards/2024/ashneer-grover.jpg",
} as const;

/* ------------------------------------------------------------------
   Evening agenda — {{FINAL_RUN_OF_SHOW}}
   ------------------------------------------------------------------ */

export const AGENDA = [
  {
    time: "5:00 PM",
    title: "Red carpet & registration",
    detail: "Arrivals, photographs and the guest lounge open.",
  },
  {
    time: "6:00 PM",
    title: "Opening ceremony",
    detail: "Lamp lighting and the welcome address.",
  },
  {
    time: "6:30 PM",
    title: "Keynote",
    detail: "{{KEYNOTE SPEAKER}} on the decade ahead for skills training.",
  },
  {
    time: "7:00 PM",
    title: "The 100 honours",
    detail: "All categories, presented across two acts.",
  },
  {
    time: "9:00 PM",
    title: "Dinner & networking",
    detail: "The night's real business, over a long table.",
  },
] as const;

/* ------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: "Who can be nominated?",
    a: "Any computer training institute working with DITRP may be nominated, and centre heads may nominate a peer institute. Students and faculty can also submit a nomination for their own centre. Every entry is reviewed before the final 100 are shortlisted.",
  },
  {
    q: "What does the award show recognise?",
    a: "India's Best 100 Institute Award Show honours the hundred institutes that did the most for their students over the year — placements made, classrooms filled, districts reached — along with the directors and faculty behind them.",
  },
  {
    q: "What is the dress code?",
    a: "Formal or formal Indian evening wear. It is an award night, and there will be a great many photographs.",
  },
  {
    q: "How do I get seats?",
    a: "Seats are reserved rather than sold at the door. Use the booking link on this page to request seats for your institute; confirmations are sent by email.",
  },
  {
    q: "Where is the 2026 show being held?",
    a: `The show is in Mumbai on ${"Sunday, 27 September 2026"}. The venue and travel details will be confirmed on this page closer to the date.`,
  },
  {
    q: "Who do I contact about the awards?",
    a: `Write to ${EVENT.contactEmail} or call ${EVENT.contactPhone}. You can also reach the DITRP team through ditrpindia.org.`,
  },
] as const;

/* ------------------------------------------------------------------
   Marquee
   ------------------------------------------------------------------ */

export const MARQUEE_ITEMS = [
  "27 · 09 · 2026",
  "INDIA'S BEST 100",
  "MUMBAI",
  "CELEBRATING EXCELLENCE",
] as const;

/* ------------------------------------------------------------------
   Partners — {{SPONSOR_LOGOS}}
   ------------------------------------------------------------------ */

export const PARTNERS = [
  "{{TITLE SPONSOR}}",
  "{{POWERED BY}}",
  "{{KNOWLEDGE PARTNER}}",
  "{{MEDIA PARTNER}}",
  "{{HOSPITALITY PARTNER}}",
  "{{TECH PARTNER}}",
] as const;
