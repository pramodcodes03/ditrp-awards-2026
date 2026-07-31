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

  /** The cards name the city only; the exact hall is confirmed nearer the date. */
  venue: "Mumbai",
  city: "Mumbai",
  address: "Mumbai, Maharashtra, India",

  nominationDeadline: "5 August 2026",

  contactEmail: "ditrpindia@gmail.com",
  contactPhone: "+91 84129 40001",
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

/** The DITRP team on stage at the 2024 award ceremony. */
export const TEAM_IMAGE = {
  src: "/awards/team-2024.jpg",
  alt: "The DITRP India team on stage at the India's Best 100 Institute Award Show, Mumbai",
  caption: "The DITRP team · Award Show, Mumbai",
  w: 2000,
  h: 1335,
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
    presenterSrc: "/awards/guests/sonu-sharma.jpg",
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
    presenterSrc: "/awards/guests/sathe-sir.jpg",
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

const GALLERY_2023: readonly GalleryPhoto[] = [
  {
    src: "/awards/2023/ceremony.jpg",
    alt: "The India's Best 100 Institute Award ceremony on stage in Mumbai, 12 March 2023, with chief guest Dr. Vivek Bindra",
    caption: "India's Best 100 · 2023",
    w: 1400,
    h: 1387,
  },
  {
    src: "/awards/2023/winner.jpg",
    alt: "A winning institute head receiving a trophy at the 2023 award show",
    caption: "A winner, 2023",
    w: 1400,
    h: 935,
  },
  {
    src: "/awards/2023/host.jpg",
    alt: "The host addressing the India's Best 100 Institute Award Show 2023",
    caption: "On stage, 2023",
    w: 1400,
    h: 935,
  },
] as const;

const GALLERY_2025: readonly GalleryPhoto[] = [
  {
    src: "/awards/2025/winner-1.jpg",
    alt: "A winner receiving the India's Best Academy of the Year 2025 award from Mr. Amzad Sathe",
    caption: "India's Best Academy · 2025",
    w: 1400,
    h: 788,
  },
  {
    src: "/awards/2025/winner-2.jpg",
    alt: "An institute head being felicitated on stage at the 2025 award ceremony",
    caption: "On stage, 2025",
    w: 1400,
    h: 788,
  },
  {
    src: "/awards/2025/winner-3.jpg",
    alt: "A winner receiving a gift on stage at the India's Best Academy of the Year 2025 ceremony",
    caption: "A winner, 2025",
    w: 1400,
    h: 788,
  },
] as const;

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
    blurb:
      "India's Best 100 Institute Award Show 2023 in Mumbai, with Dr. Vivek Bindra as chief guest — the edition that started it all.",
    status: "past",
    photos: GALLERY_2023,
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
    photos: GALLERY_2025,
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
  /** Official profile URLs, each opened in a new tab. */
  instagram?: string;
  facebook?: string;
  youtube?: string;
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
  src: "/awards/guests/sonu-sharma.jpg",
  instagram: "https://www.instagram.com/officesonusharma/",
  facebook: "https://www.facebook.com/officesonusharma",
  youtube: "https://www.youtube.com/channel/UCwrzhaGy4oAHu8clPCVol3g",
} as const;

/** Chief guests from the previous editions, shown beneath the 2026 guest. */
export const GUESTS: readonly Guest[] = [
  {
    name: "Ashneer Grover",
    title: "Entrepreneur & investor",
    editionLabel: "Chief Guest · 2024",
    note: "Took the stage as chief guest at the 2024 edition of the show.",
    src: "/awards/guests/ashneer-grover.jpg",
    instagram: "https://www.instagram.com/ashneer.grover/",
    facebook: "https://www.facebook.com/ashneer.grover/",
    youtube: "https://www.youtube.com/channel/UCE4JzawS1V8cMa8G1GCA53g",
  },
  {
    name: "Dr. Vivek Bindra",
    title: "Motivational speaker & business coach",
    editionLabel: "Chief Guest · 2023",
    note: "Founder & CEO of Bada Business and one of India's best-known business coaches — chief guest at the 2023 edition.",
    src: "/awards/guests/dr-vivek-bindra.jpg",
    instagram: "https://www.instagram.com/vivek_bindra/",
    facebook: "https://www.facebook.com/DailyMotivationByVivekBindra/",
    youtube: "https://www.youtube.com/channel/UCR-foyF-C6VuAlwy3KZMkgA",
  },
] as const;

/* ------------------------------------------------------------------
   The founder — the person behind the network and the award show.
   ------------------------------------------------------------------ */

export const FOUNDER = {
  eyebrow: "Meet our Founder & Director",
  firstName: "Mr. Amzad",
  lastName: "Sathe",
  role: "Founder & Director",
  org: "DITRP India",
  portrait: "/awards/founder-amzad-sathe.jpg",
  paragraphs: [
    "Mr. Amzad Sathe is a visionary entrepreneur, education reformer, and the Founder & Director of DITRP India. With a powerful belief that quality education should be accessible to every individual, he has dedicated his life to empowering students, institutes, and educators across the country.",
    "Despite facing challenges in his early academic journey, Mr. Sathe proved that determination, self-learning, and continuous growth matter more than conventional qualifications. His inspiring journey from a computer trainer to building one of India's fastest-growing education networks reflects his unwavering commitment to transforming lives through skill-based education.",
    "In 2016, he founded DITRP India with a clear mission — to bridge the gap between education and industry by providing affordable, practical, and career-oriented learning opportunities for everyone. Today, under his leadership, DITRP has empowered thousands of students and partnered with a rapidly expanding network of institutes across India.",
    "Mr. Sathe's vision goes beyond certifications. He believes in creating confident, skilled, and financially independent individuals who are ready to succeed in the modern world. His leadership continues to inspire educators, entrepreneurs, and students to dream bigger, achieve more, and contribute to a stronger India.",
  ],
  quote:
    "Success is not defined by where you start, but by the courage to keep learning, growing, and never giving up.",
  quoteBy: "Mr. Amzad Sathe",
} as const;

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

export type Faq = {
  q: string;
  a: string;
  /** Optional bullet points rendered as a list beneath the answer. */
  points?: readonly string[];
};

export const FAQS: readonly Faq[] = [
  {
    q: "What is the India's Best 100 Institute Award Show 2026?",
    a: "It is a prestigious national award ceremony organized by DITRP India to recognize and honor the achievements of outstanding educational institutes across India.",
  },
  {
    q: "When and where will the event be held?",
    a: "The event will take place on 27th September 2026 in Mumbai, Maharashtra.",
  },
  {
    q: "Who can participate in this award show?",
    a: "All educational institutes, training centers, coaching institutes, computer institutes, skill development centers, and academic organizations are eligible to participate.",
  },
  {
    q: "Who are the Chief Guests?",
    a: "The event will feature:",
    points: [
      "Mr. Sonu Sharma — Motivational Speaker & Business Coach",
      "Mr. Amzad Sathe — Director, DITRP India",
    ],
  },
  {
    q: "Who will present the Best Institute Award?",
    a: "The Best Institute Award will be presented by Mr. Sonu Sharma.",
  },
  {
    q: "What are the benefits of participating?",
    a: "Participants will receive:",
    points: [
      "National-level recognition",
      "Prestigious award and appreciation",
      "Professional 4K photography & videography",
      "LIVE social media coverage",
      "Media exposure through 5+ renowned media houses",
      "Enhanced institute credibility and brand value",
      "Excellent marketing and promotional opportunities",
    ],
  },
  {
    q: "Will my institute receive media coverage?",
    a: "Yes. The event will be covered by 5+ renowned media houses, and highlights will also be shared on DITRP India's official social media platforms.",
  },
  {
    q: "Will the event be LIVE streamed?",
    a: "Yes. The complete event will be LIVE streamed on DITRP India's official social media channels.",
  },
  {
    q: "Will participants receive professional photographs and videos?",
    a: "Yes. Every participant will have access to professional 4K photography and videography during the event.",
  },
  {
    q: "Is this a national-level award?",
    a: "Yes. The India's Best 100 Institute Award Show is a national platform recognizing excellence in education across India.",
  },
  {
    q: "Why should my institute participate?",
    a: "Participation helps your institute:",
    points: [
      "Build trust and credibility",
      "Increase brand visibility",
      "Gain nationwide recognition",
      "Strengthen marketing efforts",
      "Showcase achievements before industry leaders",
    ],
  },
  {
    q: "How can I get more information?",
    a: `For complete event details, registration, and support, contact the DITRP India team at ${EVENT.contactPhone} or ${EVENT.contactEmail}.`,
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

// Partners are announced closer to the date; the section is not shown until
// real sponsors are confirmed. Add entries here (with a logo under
// /awards/partners/) to bring the Partners section back.
export const PARTNERS: readonly Partner[] = [];

/* ------------------------------------------------------------------
   Nominee benefits — shown on the dedicated /nominee-benefits page.
   ------------------------------------------------------------------ */

export type Benefit = {
  /** Emoji shown in the benefit's medallion. */
  emoji: string;
  title: string;
  detail: string;
};

export const NOMINEE_BENEFITS: readonly Benefit[] = [
  {
    emoji: "🍽️",
    title: "Morning Breakfast",
    detail: "Start your day with a delicious breakfast.",
  },
  {
    emoji: "🍛",
    title: "Lunch & Evening Snacks",
    detail: "Complimentary lunch and refreshments.",
  },
  {
    emoji: "🎟️",
    title: "Full-Day Event Pass",
    detail: "Access to the complete award ceremony.",
  },
  {
    emoji: "📸",
    title: "4K Photos & Videos",
    detail: "Professional coverage of your special moments.",
  },
  {
    emoji: "📱",
    title: "Live Social Media Coverage",
    detail: "Feature on DITRP's official social platforms.",
  },
  {
    emoji: "📰",
    title: "Media Exposure",
    detail: "Coverage by leading media partners.",
  },
  {
    emoji: "🤝",
    title: "Networking Opportunity",
    detail: "Meet institute owners and education leaders.",
  },
  {
    emoji: "🏅",
    title: "Premium Award Presentation",
    detail: "Receive your award on the grand stage.",
  },
  {
    emoji: "🎤",
    title: "Meet Chief Guests",
    detail: "Interact with renowned industry personalities.",
  },
  {
    emoji: "📺",
    title: "LED Screen Spotlight",
    detail: "Your institute showcased on the main event screen.",
  },
  {
    emoji: "🎥",
    title: "Red Carpet Experience",
    detail: "Walk the red carpet with professional coverage.",
  },
  {
    emoji: "🌟",
    title: "Brand Recognition",
    detail: "Increase your institute's credibility nationwide.",
  },
  {
    emoji: "🎖️",
    title: "Certificate of Participation",
    detail: "Official participation certificate.",
  },
  {
    emoji: "🏆",
    title: "Luxury Trophy",
    detail: "Premium-quality award trophy.",
  },
  {
    emoji: "🎬",
    title: "Stage Introduction",
    detail: "Professional announcement of your institute.",
  },
  {
    emoji: "📢",
    title: "Institute Promotion",
    detail: "Brand visibility before and after the event.",
  },
  {
    emoji: "🎙️",
    title: "Interview Opportunity",
    detail: "Selected nominees may be interviewed.",
  },
  {
    emoji: "💡",
    title: "Learning & Inspiration",
    detail: "Gain insights from successful industry leaders.",
  },
  {
    emoji: "🎊",
    title: "Group Celebration & Closing Ceremony",
    detail: "Celebrate achievements with all winners.",
  },
  {
    emoji: "🚀",
    title: "Future Partnership Opportunities",
    detail: "Become part of the DITRP education network.",
  },
  {
    emoji: "🎥",
    title: "Highlight Reel Feature",
    detail: "Chance to appear in the official event highlights.",
  },
  {
    emoji: "💬",
    title: "Community Access",
    detail: "Join an exclusive network of award-winning institutes.",
  },
] as const;
