import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import FloatingHelpWidget from "@/components/FloatingHelpWidget";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";

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
  logo: `${SITE_URL}/icon.png`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-montserrat)]">
        <JsonLd data={organizationLd} />
        <ScrollToTop />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingHelpWidget />
        {/* Must live inside <body> — as a direct child of <html> this was
            invalid nesting and the browser relocated it during parsing. */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
