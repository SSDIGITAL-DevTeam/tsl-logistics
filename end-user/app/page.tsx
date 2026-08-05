import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Phone, Mail, MapPin, ArrowRight, Shield, Truck, ScanEye, Users, Settings, BadgeDollarSign } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import PermitDialog from "@/components/PermitDialog";
import JsonLd from "@/components/JsonLd";
import CompaniesThatMoveWithUs from "@/components/CompaniesThatMoveWithUs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsllogistics.sg";

export const metadata: Metadata = {
  // `title` is deliberately omitted: the root layout's `title.default` already
  // holds the exact homepage title and is used verbatim, whereas setting a
  // title here would run it through the "%s | TSL Logistics" template and
  // append a second suffix.
  description:
    "Streamline your logistic service provider, TSL Logistics the best logistics company in Singapore. Your trusted partner for transportation, warehousing, & distribution.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As a leading logistics company in Singapore, we offer transportation, warehousing, distribution, freight forwarding, and supply chain management.",
      },
    },
    {
      "@type": "Question",
      name: "What industries do you specialise in serving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialise in retail, manufacturing, healthcare, automotive, technology, and more — including dangerous goods and perishable goods handling.",
      },
    },
    {
      "@type": "Question",
      name: "How do you ensure the timely delivery of goods?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We utilise advanced tracking systems, efficient route planning, and strategic partnerships to ensure the timely delivery of goods to their destinations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer customs clearance services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide comprehensive customs clearance services to facilitate smooth import and export processes across international borders.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ],
};

const services = [
  {
    title: "TSL Logistics",
    image: "/images/service-mover.jpg",
    alt: "TSL Logistics truck",
    href: "/tsl-logistics",
  },
  {
    title: "TSL Movers",
    image: "/images/tsl-mover.jpg",
    alt: "TSL Mover truck",
    href: "/tsl-mover",
  },
  {
    title: "TSL Express",
    image: "/images/tsl-express.jpg",
    alt: "TSL Express delivery van",
    href: "/tsl-express",
  },
  {
    title: "TSL Warehousing",
    image: "/images/service-logistics.jpg",
    alt: "TSL Warehousing facility",
    href: "/warehousing-services",
  },
];

const whyUs = [
  {
    icon: Shield,
    title: "Reliable Delivery",
    body: "We ensure your shipments arrive safely and on time, every time.",
  },
  {
    icon: Truck,
    title: "End-to-End Solutions",
    body: "From warehousing to transport, everything you need is under one roof.",
  },
  {
    icon: ScanEye,
    title: "Real-Time Tracking",
    body: "Monitor your cargo with complete visibility at every stage.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    body: "Handled by logistics professionals with years of industry expertise.",
  },
  {
    icon: Settings,
    title: "Flexible Services",
    body: "Customisable solutions that adapt to your business needs.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Pricing",
    body: "High-quality logistics services without the high cost.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden md:min-h-[820px]">
        {/* Full-bleed hero photo via next/image */}
        <Image
          src="/images/hero-bg-new.jpg"
          alt="TSL Logistics fleet on the road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Strong bottom gradient for headline legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/18 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/18 to-transparent" />

        {/* Centered column content */}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 md:py-28">
          {/* `hero-in` sits here so the <h1> is a direct child — the entrance
              animation skips h1 so it never starts at opacity:0 (LCP). */}
          <div className="hero-in flex flex-col items-start gap-6 text-left">
            <h1 className="max-w-[900px] text-5xl font-bold leading-[1.08] text-white md:text-6xl lg:text-[68px]" style={{ textWrap: "balance" }}>
              Trusted · Reliable · Delivered
            </h1>
            <p className="max-w-[640px] text-sm leading-relaxed text-white md:text-base">
              TSL Logistics Pte Ltd was founded in 2003 by veteran logistics expert Mr. Alan Tay Soon Lai with the objective of establishing a client-focused logistics company in Singapore.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Services ── */}
      <section id="services">
        {/* Section header — light so it separates cleanly from the dark hero */}
        <div className="bg-white pt-14 pb-8">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-[#C8A84B] text-xs font-bold uppercase tracking-[0.22em] mb-2">What we do</p>
            <h2 className="text-[#1a1a1a] text-4xl md:text-5xl font-bold">Our Services</h2>
          </div>
        </div>

        {/* 2×2 Service cards */}
        <div className="bg-white pb-10 pt-6">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((svc, i) => (
              <Link
                key={i}
                href={svc.href}
                className="group block overflow-hidden"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Label row */}
                <div className="flex items-center justify-between px-5 py-4 bg-white">
                  <span className="font-semibold text-[#1a1a1a] text-base">{svc.title}</span>
                  <ArrowRight
                    size={18}
                    className="text-[#C8A84B] group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CompaniesThatMoveWithUs />

      {/* ── About Us ── */}
      <section className="section-soft overflow-hidden py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: text */}
          <div className="flex-1 anim-fade-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5 leading-tight">
              About Us
            </h2>
            <p className="text-[#555] leading-relaxed mb-3">
              At TSL Logistics, we are dedicated to moving businesses forward. As a trusted logistics
              partner, we provide end-to-end solutions that simplify complexity, enhance efficiency,
              and deliver reliability across every mile.
            </p>
            <p className="text-[#555] leading-relaxed mb-8">
              From domestic deliveries to global distribution, our team ensures your cargo reaches its
              destination safely, on time, and with complete transparency.
            </p>
            <Link href="/about" className="btn-pill-gold">
              Learn More
            </Link>
          </div>

          {/* Right: floating card with truck image */}
          <div className="lg:w-[52%] shrink-0 anim-fade-right flex items-center justify-center">
            <div className="relative w-full">
              <Image
                src="/images/about-team.jpg"
                alt="TSL Logistics team"
                width={760}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-14">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-grid">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="bg-[#f7f8fa] p-8 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <item.icon size={32} className="text-[#1a1a1a] mb-5" strokeWidth={1.5} />
                <h3 className="font-bold text-[#1a1a1a] text-base mb-2">{item.title}</h3>
                <p className="text-[#777] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Document & Permit Processing ── */}
      <section className="bg-[#152642] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: text */}
          <div className="flex-1 anim-fade-left">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Document &amp; Permit<br />Processing
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
              We simplify permit and documentation so you can focus on your business.
              From checklist to final approval, our team handles preparation, submission,
              and follow-up with government agencies — reducing delays and keeping you
              informed every step of the way.
            </p>
            <PermitDialog />
          </div>
          {/* Right: image */}
          <div className="md:w-[46%] shrink-0 anim-fade-right">
            <div className="overflow-hidden shadow-2xl">
              <Image
                src="/images/permit.png"
                alt="TSL Logistics team and fleet"
                width={760}
                height={480}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 46vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-[#152642] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #C8A84B 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10 anim-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A84B] mb-2">What our clients say</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Client Testimonials</h2>
          </div>
          <TestimonialsSlider />
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12 anim-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A84B] mb-2">Got questions?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-3">FAQs</h2>
            <div className="gold-divider" />
          </div>
          <div className="anim-fade-up">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* ── Contact / Map ── */}
      <section className="pt-28 pb-56 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10 anim-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A84B] mb-2">Get in touch</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">Find Us</h2>
            <div className="gold-divider" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[58%] anim-fade-left">
              <div className="overflow-hidden shadow-md border border-gray-100">
                <iframe
                  src="https://www.google.com/maps?q=8%40Tradehub%2021%2C%208%20Boon%20Lay%20Way%2C%20Singapore%20609964&output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TSL Logistics Location"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 anim-fade-right">
              <div className="flex items-start gap-4 bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] flex items-center justify-center shrink-0 rounded-full">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Call Us</h4>
                  <a href="tel:+6567772724" className="text-[#C8A84B] font-bold hover:underline text-lg">+65 6777 2724</a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] flex items-center justify-center shrink-0 rounded-full">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-2">Email Us</h4>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold text-[#1a1a1a]">Logistics — </span>
                      <a href="mailto:sales@tsllogistics.sg" className="text-[#C8A84B] font-semibold hover:underline">sales@tsllogistics.sg</a>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-[#1a1a1a]">Movers & Warehousing — </span>
                      <a href="mailto:ops@tslmovers.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslmovers.sg</a>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-[#1a1a1a]">Express — </span>
                      <a href="mailto:ops@tslexpress.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslexpress.sg</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] flex items-center justify-center shrink-0 rounded-full">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Our Location</h4>
                  <p className="text-[#666] text-sm leading-relaxed">Monday–Friday, 9am–5pm</p>
                  <p className="text-[#C8A84B] font-semibold text-sm mt-2">8 Boon Lay Way, #09-13</p>
                  <p className="text-[#C8A84B] font-semibold text-sm">8@Tradehub 21, Singapore 609964</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
