import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tsl.digital-pa.com.sg"),
  title: "Logistic Company in Singapore | Logistic Service Provider | TSL Logistic",
  description:
    "Streamline your logistic service provider, TSL Logistics the best logistics company in Singapore. Your trusted partner for transportation, warehousing, & distribution.",
  keywords: "logistics company singapore, logistic service provider, TSL logistics",
  openGraph: {
    title: "Logistic Company in Singapore | TSL Logistic",
    description:
      "TSL Logistics - Your trusted partner for transportation, warehousing, & distribution in Singapore.",
    images: ["/images/BANNER new-1920w.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-montserrat)]">
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
