import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import FloatingHelpWidget from "@/components/FloatingHelpWidget";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import UtmTracker from "@/components/UtmTracker";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsllogistics.sg";

const TITLE_DEFAULT =
  "Logistic Company in Singapore | Logistic Service Provider | TSL Logistics";
const DESCRIPTION =
  "TSL Logistics — Singapore's trusted logistics partner since 2003. Expert in transportation, warehousing, distribution, moving, and dangerous goods transport.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | TSL Logistics",
  },
  description: DESCRIPTION,
  keywords:
    "logistics company singapore, logistic service provider, TSL logistics, warehousing singapore, moving company singapore, container haulier singapore",
  authors: [{ name: "TSL Logistics Pte Ltd" }],
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "TSL Logistics",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/BANNER new-1920w.png",
        width: 1920,
        height: 600,
        alt: "TSL Logistics — Singapore's Trusted Logistics Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: ["/images/BANNER new-1920w.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "TSL Logistics Pte Ltd",
  url: SITE_URL,
  // The horizontal wordmark, not the square favicon: Google renders this in
  // the Knowledge Panel, where a lockup with the company name reads better.
  // It also must not live at /icon.png — a file there would shadow the
  // app/icon.png favicon route and silently replace the tab icon.
  logo: `${SITE_URL}/logo-wordmark.png`,
  description:
    "Singapore's trusted logistics partner since 2003. Specialising in transportation, warehousing, distribution, moving, and dangerous goods handling.",
  foundingDate: "2003",
  telephone: "+6567772724",
  email: "sales@tsllogistics.sg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 Boon Lay Way #09-13, 8@Tradehub 21",
    addressLocality: "Singapore",
    postalCode: "609964",
    addressCountry: "SG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 1.3387,
    longitude: 103.7056,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  sameAs: ["https://www.tsllogistics.sg/"],
};

/**
 * A GA4 measurement ID looks like `G-` followed by an alphanumeric code.
 * The check is deliberately stricter than "is this set": the `.env.example`
 * placeholder `G-XXXXXXXXXX` reached production once, and an invalid ID still
 * costs ~144ms of main-thread work and two long tasks while collecting nothing.
 */
function resolveGaId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (!id) return null;
  if (!/^G-[A-Z0-9]{6,}$/i.test(id)) return null;
  if (/^G-X+$/i.test(id)) return null; // the placeholder
  return id;
}

/**
 * A GTM container ID looks like `GTM-` followed by an alphanumeric code. Same
 * reasoning as resolveGaId: a bogus ID still costs a script fetch and a
 * main-thread parse while collecting nothing, and leaves a 404 in the Network
 * tab that reads like a broken deploy. The `GTM-X+` check is load-bearing —
 * real container IDs are 6-7 alphanumerics, so the `.env.example` placeholder
 * `GTM-XXXXXXX` passes the shape test and would otherwise ship.
 */
function resolveGtmId(): string | null {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!id) return null;
  if (!/^GTM-[A-Z0-9]{6,}$/i.test(id)) return null;
  if (/^GTM-X+$/i.test(id)) return null; // the placeholder
  return id;
}

/**
 * Google Ads Google Tag (gtag.js) accounts for each service division:
 * - TSL Logistics: AW-942191124
 * - TSL Movers:    AW-11309674954
 * - TSL Express:   AW-18369880459
 */
const GOOGLE_ADS_IDS = [
  "AW-942191124",   // TSL Logistics
  "AW-11309674954", // TSL Movers
  "AW-18369880459", // TSL Express
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = resolveGaId();
  const gtmId = resolveGtmId();

  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-montserrat)]">
        <JsonLd data={organizationLd} />
        <UtmTracker />
        <ScrollToTop />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingHelpWidget />
        {/* Google tag (gtag.js) for Google Ads (Logistics, Movers, Express) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_IDS[0]}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${GOOGLE_ADS_IDS.map((id) => `gtag('config', '${id}');`).join("\n            ")}
          `}
        </Script>
        {/* Both tag loaders must live inside <body> — as direct children of
            <html> this was invalid nesting and the browser relocated it during
            parsing. (The Next docs' own GTM example does exactly that; don't
            copy it.) Both use next/script afterInteractive, so their position
            in the tree does not delay first paint.

            GTM carries Google Ads conversion tags ONLY. GA4 is loaded
            separately below and must never be configured inside the container
            as well — that would double-count every pageview and every lead.
            See the note in .env.example.

            No <noscript> iframe on purpose: both forms call preventDefault()
            and fetch(), and neither <form> has an `action`, so a visitor
            without JS can never submit — let alone reach a thank-you page.
            The iframe also only runs Page-View-class tags, never a
            dataLayer.push, which is what our conversion trigger listens for. */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
