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

  /** Doors 08:30, commencement 09:30; the countdown targets commencement. */
  startISO: "2026-09-27T09:30:00+05:30",
  endISO: "2026-09-27T17:30:00+05:30",

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

/** The Mumbai key-visual shown in the Venue section. */
export const VENUE_IMAGE = {
  src: "/awards/mumbai-keyvisual.jpg",
  alt: "India's Best 100 Institute Award 2026 over the Mumbai skyline at dusk — the Bandra–Worli Sea Link, the Gateway of India and the city lights",
  w: 1600,
  h: 1068,
} as const;

/** The award-stage key-visual shown after the awards section. */
export const STAGE_IMAGE = {
  src: "/awards/stage-2026.jpg",
  alt: "The India's Best 100 Institute Award Show 2026 stage — a golden Excellence in Education trophy on a red carpet before a lit LED backdrop",
  w: 1600,
  h: 1200,
} as const;

/**
 * "Book your seat" is the Google Form, embedded on a dedicated /book page and
 * beautifully framed. Buttons link to /book (internal route); the raw short
 * link and embed URL live here.
 */
export const BOOKING_URL = "/book";
export const NOMINATION_URL = "/book";
/** Short link, kept for reference / an "open in Google Forms" fallback link. */
export const BOOKING_FORM_LINK = "https://forms.gle/kexp9vv2wCZCVCV89";
/** The embeddable Google Form URL used in the /book page iframe. */
export const BOOKING_FORM_EMBED =
  "https://docs.google.com/forms/d/e/1FAIpQLSfQnsvajQ0u7ytcWK3JyHS3QaNfGm7LX0pNAp1J8w1on9Bh3A/viewform?embedded=true";
/** {{GOOGLE_MAPS_DIRECTIONS_URL}} */
export const DIRECTIONS_URL = "#venue";

/** Internal routes. */
export const ROUTES = {
  nomineeBenefits: "/nominee-benefits",
  allNominees: "/nominees",
  book: "/book",
} as const;

/* ------------------------------------------------------------------
   Navigation
   ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Teaser", href: "#teaser" },
  { label: "Nominees", href: "#nominees" },
  { label: "Awards", href: "#categories" },
  { label: "Editions", href: "#editions" },
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
   Teaser film
   ------------------------------------------------------------------
   87MB H.264, so it is loaded on click (façade pattern), never on page
   load — a visitor who does not watch never downloads it.
   ------------------------------------------------------------------ */

export const TEASER = {
  src: "/ditrp-teaser-2026.mp4",
  poster: "/awards/teaser-poster.jpg",
  /** Runtime is ~1:45. */
  duration: "1:45",
  type: "video/mp4",
} as const;

/* ------------------------------------------------------------------
   The two honours presented on the day.
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
  /** The person presenting it — their photo replaces the trophy icon. */
  presenter: string;
  presenterRole: string;
  /** Photo path, or null for a marked placeholder. */
  presenterSrc: string | null;
};

export const AWARDS: readonly Award[] = [
  {
    index: "01",
    title: "India's Best 100\nInstitute Award",
    subtitle: "The centre",
    description:
      "The hundred computer training institutes that did the most for their students this year — seats filled, skills certified, careers started. One trophy each, presented on stage in Mumbai.",
    forWhom: "For the institute",
    presenter: "Mr. Sonu Sharma",
    presenterRole: "Presented by",
    presenterSrc: null, // {{SONU_SHARMA_PHOTO}}
  },
  {
    index: "02",
    title: "Excellence in\nEducation Award",
    subtitle: "The people",
    description:
      "For the directors and faculty behind those centres: the person who kept the doors open, taught the room, and turned a year of work into results worth reading out loud.",
    forWhom: "For the director & faculty",
    presenter: "Sathe Sir",
    presenterRole: "Presented by",
    presenterSrc: null, // {{SATHE_SIR_PHOTO}}
  },
] as const;

/* ------------------------------------------------------------------
   Editions — the show across the years.
   ------------------------------------------------------------------
   2023 photos not supplied yet: the edition renders as a marked
   placeholder and its photos slot in when {{2023 PHOTOS}} arrive.
   ------------------------------------------------------------------ */

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
};

export type Edition = {
  year: string;
  /** Headline label for the milestone. */
  label: string;
  /** One line of context. */
  blurb: string;
  status: "past" | "next";
  /** Empty until photos for that year are supplied. */
  photos: readonly GalleryPhoto[];
};

const GALLERY_2024: readonly GalleryPhoto[] = [
  {
    src: "/awards/2024/trophies.jpg",
    alt: "Rows of gold star trophies for the Bihar Excellence in Education Awards 2024",
    caption: "The trophies, before the show",
    w: 1600,
    h: 1068,
  },
  {
    src: "/awards/2024/winners-group.jpg",
    alt: "The full group of 2024 winners on stage holding certificates and trophies",
    caption: "The winners of 2024",
    w: 1800,
    h: 1202,
  },
  {
    src: "/awards/2024/star-award.jpg",
    alt: "A DITRP institute head receiving a gold star trophy on stage in 2024",
    caption: "On stage",
    w: 1400,
    h: 935,
  },
  {
    src: "/awards/2024/presentation-red.jpg",
    alt: "An award being presented at India's Best 100 Institute Award Show 2024",
    caption: "India's Best 100 · 2024",
    w: 1400,
    h: 935,
  },
  {
    src: "/awards/2024/stage.jpg",
    alt: "The Bihar Excellence in Education Awards 2024 stage and LED backdrop",
    caption: "The stage",
    w: 1600,
    h: 1068,
  },
  {
    src: "/awards/2024/star-award-2.jpg",
    alt: "A winning institute director receiving a star trophy in 2024",
    caption: "A winner, 2024",
    w: 1400,
    h: 935,
  },
] as const;

export const EDITIONS: readonly Edition[] = [
  {
    year: "2023",
    label: "Where it began",
    blurb: "The first editions that built the network's biggest day.",
    status: "past",
    photos: [], // {{2023 PHOTOS}}
  },
  {
    year: "2024",
    label: "The day that scaled it",
    blurb:
      "India's Best 100 and the Bihar Excellence in Education Awards — a full hall, a hundred trophies, one unforgettable stage.",
    status: "past",
    photos: GALLERY_2024,
  },
  {
    year: "2025",
    label: "India's Best Academy of the Year",
    blurb:
      "The 2025 edition crowned India's Best Academy of the Year — the standard the 2026 show now builds on.",
    status: "past",
    photos: [], // {{2025 PHOTOS}}
  },
  {
    year: "2026",
    label: "The next stage",
    blurb: "Mumbai, 27 September. The biggest edition yet — and you can be in the room.",
    status: "next",
    photos: [],
  },
] as const;

/* ------------------------------------------------------------------
   Guests of honour.
   ------------------------------------------------------------------ */

export type Guest = {
  name: string;
  /** Public role / what they are known for. */
  title: string;
  /** Which edition they appear at. */
  editionLabel: string;
  note: string;
  /** Photo path, or null for a marked placeholder. */
  src: string | null;
};

/**
 * Featured Chief Guest for 2026.
 * {{SONU_SHARMA_OFFICIAL_PHOTO}} — drop a licensed photo at
 * public/awards/guests/sonu-sharma.jpg and set `src` to that path.
 */
export const CHIEF_GUEST_2026: Guest = {
  name: "Sonu Sharma",
  title: "Motivational speaker & entrepreneur",
  editionLabel: "Chief Guest · 2026",
  note: "Founder of Dynamic India Group, one of India's most-watched speakers on business and self-belief — joining the stage in Mumbai to hand the network its honours.",
  src: null, // {{SONU_SHARMA_PHOTO}}
} as const;

/**
 * Past & honorary guests, shown beneath the 2026 chief guest.
 * {{DR_VIVEK_BINDRA_PHOTO}} — drop a licensed photo and set `src`.
 */
export const GUESTS: readonly Guest[] = [
  {
    name: "Ashneer Grover",
    title: "Entrepreneur & investor",
    editionLabel: "Chief Guest · 2023",
    note: "Took the stage as chief guest at a previous edition of the show.",
    src: "/awards/2024/ashneer-grover.jpg",
  },
  {
    name: "Dr. Vivek Bindra",
    title: "Motivational speaker & business coach",
    editionLabel: "Guest of Honour",
    note: "One of India's best-known business coaches, joining the roll of honoured guests.",
    src: null, // {{DR_VIVEK_BINDRA_PHOTO}}
  },
] as const;

/* ------------------------------------------------------------------
   Run of show — {{FINAL_RUN_OF_SHOW}}
   ------------------------------------------------------------------ */

export const AGENDA = [
  {
    time: "8:30 AM",
    title: "Registration & Welcome",
    detail: "Arrivals, the red carpet and the guest lounge open.",
  },
  {
    time: "9:30 AM",
    title: "Event Commencement",
    detail: "Lamp lighting and the opening address.",
  },
  {
    time: "10:00 AM",
    title: "Grand Entry of Sathe Sir",
    detail: "The chief mentor takes the stage.",
  },
  {
    time: "10:30 AM",
    title: "Motivational & Success Seminar",
    detail: "A keynote session led by Sathe Sir.",
  },
  {
    time: "1:00 PM",
    title: "Lunch Break",
    detail: "Lunch and networking for every guest.",
  },
  {
    time: "2:00 PM",
    title: "Excellence in Education Award 2026",
    detail: "The honours, presented by Sathe Sir.",
  },
  {
    time: "3:00 PM",
    title: "India's Best 100 Institute Award 2026",
    detail: "The hundred trophies, presented by Mr. Sonu Sharma.",
  },
  {
    time: "5:00 PM",
    title: "Group Photo Session & Networking",
    detail: "Every winner, on stage, on camera.",
  },
  {
    time: "5:30 PM",
    title: "Vote of Thanks & Conclusion",
    detail: "The close of the day.",
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
    a: "Formal, or formal Indian wear. It is a ceremony with a red carpet and a great many photographs.",
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
   Partners & sponsors
   ------------------------------------------------------------------
   To add or manage a partner: drop the logo (transparent PNG/SVG) into
   public/awards/partners/ and set `logo` to that path. With `logo: null`
   a labelled placeholder box renders instead, so the section is never empty.
   (A true upload-from-the-browser admin needs a CMS/back end — see the note
   in the redesign summary; this folder + list is the no-backend way to
   manage the logos today.)
   ------------------------------------------------------------------ */

export type Partner = {
  name: string;
  tier: string;
  /** Logo path under /awards/partners/, or null for a placeholder box. */
  logo: string | null;
};

export const PARTNERS: readonly Partner[] = [
  { name: "{{TITLE SPONSOR}}", tier: "Title Sponsor", logo: null },
  { name: "{{POWERED BY}}", tier: "Powered by", logo: null },
  { name: "{{KNOWLEDGE PARTNER}}", tier: "Knowledge Partner", logo: null },
  { name: "{{MEDIA PARTNER}}", tier: "Media Partner", logo: null },
  { name: "{{HOSPITALITY PARTNER}}", tier: "Hospitality Partner", logo: null },
  { name: "{{TECH PARTNER}}", tier: "Tech Partner", logo: null },
] as const;

/* ------------------------------------------------------------------
   Nominee benefits — shown on the dedicated /nominee-benefits page.
   ------------------------------------------------------------------ */

export type Benefit = {
  /** lucide-react icon key, mapped in the component. */
  icon: "coffee" | "utensils" | "ticket" | "camera" | "radio" | "megaphone";
  title: string;
  detail: string;
};

export const NOMINEE_BENEFITS: readonly Benefit[] = [
  {
    icon: "coffee",
    title: "Morning Breakfast",
    detail: "The day starts with breakfast for every nominee and guest.",
  },
  {
    icon: "utensils",
    title: "Lunch & Evening Snacks",
    detail: "A full lunch and evening snacks, on us, through the day.",
  },
  {
    icon: "ticket",
    title: "Full-Day Event Pass",
    detail: "Access to the entire programme, from red carpet to close.",
  },
  {
    icon: "camera",
    title: "4K Photos & Videos",
    detail: "Professionally shot 4K photos and video of your moment on stage.",
  },
  {
    icon: "radio",
    title: "Live Social Media Coverage",
    detail: "Your win, shared live across DITRP's social channels.",
  },
  {
    icon: "megaphone",
    title: "Media Exposure + Networking",
    detail: "Press coverage and a room full of the network's best to meet.",
  },
] as const;
