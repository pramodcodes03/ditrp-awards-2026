import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

import { InlineScript } from "./inline-script";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/sections/Navbar";
import { Preloader } from "@/components/sections/Preloader";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/* Playfair Display is the ceremony voice — heavy, high-contrast, the closest
   web face to the poster serif on the printed nominee cards. Poppins is the
   geometric sans those cards set every name and institute in. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const DESCRIPTION =
  "India's Best 100 Institute Award Show 2026 — DITRP honours the country's finest computer training institutes. Sunday, 27 September 2026, Mumbai. Nominate your institute or book your seat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "India's Best 100 Institute Award Show 2026 — DITRP",
    template: "%s | India's Best 100 Institute Award Show 2026",
  },
  description: DESCRIPTION,
  applicationName: "India's Best 100 Institute Award Show 2026",
  keywords: [
    "India's Best 100 Institute Award Show",
    "DITRP award show 2026",
    "computer training institute awards India",
    "best computer institute award",
    "DITRP India",
    "institute award show Mumbai",
  ],
  authors: [{ name: "DITRP" }],
  creator: "DITRP",
  publisher: "DITRP",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "India's Best 100 Institute Award Show 2026",
    title: "India's Best 100 Institute Award Show 2026",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "India's Best 100 Institute Award Show 2026",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05123A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs inside <head>, before the browser paints any of <body>.
 *
 * It deliberately *adds* the attribute rather than removing one: the server
 * emits no `data-motion`, so if JavaScript is disabled or throws, the
 * attribute never appears, the CSS hidden states never apply, and the page
 * renders fully visible. Motion is opt-in and failure falls open.
 */
const MOTION_SCRIPT = `(function(){try{
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;
d.setAttribute('data-motion','on');
try{if(!sessionStorage.getItem('ditrp-preloader-seen')){
d.setAttribute('data-preloader','on');
/* Independent dead-man's switch. The component clears this attribute when its
   timeline finishes, but that code can only run if the app bundle loaded and
   executed. This timer lives in the inline script instead, so a failed chunk,
   a thrown error or a very slow network can never leave the curtain up over a
   scroll-locked page. */
setTimeout(function(){d.removeAttribute('data-preloader')},2600);
}}catch(e){}
}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The inline script mutates this element before hydration. Without this,
      // React treats the added attribute as a hydration mismatch, re-renders
      // from here, and throws the correction away.
      suppressHydrationWarning
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <head>
        <InlineScript html={MOTION_SCRIPT} />
      </head>
      <body className="min-h-svh bg-navy font-body text-cream antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-royal focus:px-5 focus:py-3 focus:text-sm focus:text-gold"
        >
          Skip to content
        </a>

        <Preloader />

        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>

        {/* Fixed film grain over everything. Decorative. */}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
