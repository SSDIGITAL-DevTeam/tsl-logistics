import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Phone, Mail, MapPin } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import TestimonialsSlider from "@/components/TestimonialsSlider";

export const metadata: Metadata = {
  title: "Logistic Company in Singapore | Logistic Service Provider | TSL Logistic",
  description:
    "Streamline your logistic service provider, TSL Logistics the best logistics company in Singapore. Your trusted partner for transportation, warehousing, & distribution.",
};

const certifications = [
  { src: "/images/bizSAFE-Enterprise-Level-STAR-e1633345808369-1920w.jpeg", alt: "BizSAFE Enterprise Level Star" },
  { src: "/images/ISO-45001-VERTICAL-SAC-1920w.jpeg", alt: "ISO 45001 SAC" },
  { src: "/images/STA-Logo-1920w.png", alt: "STA Logo" },
  { src: "/images/ISO-45001-VERTICAL-SAC copy-1920w.jpeg", alt: "ISO 45001 Certified" },
];

const moversGallery = [
  {
    src: "/images/TSL Moving Furniture-1920w.jpeg",
    alt: "House movers",
    title: "RESIDENTIAL (HDB, CONDO, LANDED PROPERTY) / OFFICE / COMMERCIAL / FACTORY MOVING",
    text: "Right beside you from wherever you are, then alongside every step of the way to wherever you're going. We've got your journey and you covered.",
  },
  {
    src: "/images/TSL-Heavy-Furniture-1920w.jpeg",
    alt: "House movers singapore",
    title: "SERVER / MACHINE / PIANO / ORGAN / POOL TABLE / SAFE BOX MOVING",
    text: "Fragile? Priceless heirloom? Antiques? Your sentimental belongings are treated like our own --- with utmost care and placed exactly like they left.",
  },
];

const logisticsGallery = [
  {
    src: "/images/TSL Logistics Warehouse-1920w.jpeg",
    alt: "TSL Warehousing",
    title: "Warehousing",
    text: "At TSL we have some of the most well-equipped warehousing facilities in the region specifically designed to accommodate a diverse array of products and commodities.",
    href: "/warehousing-services",
  },
  {
    src: "/images/TSL Rental Vehicle-1280w.png",
    alt: "TSL Vehicle Rentals",
    title: "Rentals of Transportation Vehicles",
    text: "For over 20 years, TSL Logistics has earned customer appreciation for the innovative and diverse logistics solutions we have been offering.",
    href: "/transportation-vehicles-rentals",
  },
  {
    src: "/images/TSL Logistics DG TRUCK-1920w.png",
    alt: "TSL DG Trucking",
    title: "DG Trucking (Dangerous Goods) Trucking",
    text: "TSL Logistics delivery service ensures the safe and compliant transportation of dangerous goods. Our expert handlers are well trained in safety protocols.",
    href: "/dangerous-goods-transport",
  },
  {
    src: "/images/TSL Logistics Trucker Container-1920w.png",
    alt: "TSL Container Trucking",
    title: "Container, Truck and Tanker Haulier Services",
    text: "Whether you need long or short haulier services or need to rent heavy-duty tanker trucks to transport your precious cargo safely to its destination, we have got you covered.",
    href: "/container-truck-tanker-haulier-services",
  },
  {
    src: "/images/TSL-Logistics-van-1920w.jpeg",
    alt: "TSL Local Delivery",
    title: "Local Delivery",
    text: "TSL Logistics is positioned as one of the premier logistics delivery services in Singapore. We are home to a large team of delivery agents who are highly familiar with all localities.",
    href: "/tsl-logistics",
  },
  {
    src: "/images/Optical-TSL-Logistics-1920w.jpeg",
    alt: "Optical Supply Delivery",
    title: "Optical Supply Delivery",
    text: "Optical supplies are extra sensitive. You can rely on our optical supply delivery specialists to provide you with on-time deliveries providing cost-effective solutions.",
    href: "/tsl-logistics",
  },
  {
    src: "/images/TSL-Projects-1920w.jpeg",
    alt: "Project Cargo",
    title: "Project Cargo Handling",
    text: "As a leading logistics company in Singapore, we excel at handling project cargo with precision and expertise. Our specialised services encompass the transportation, warehousing, and delivery of oversized, heavy, and high-value cargo.",
    href: "/tsl-logistics",
  },
];

const documentPermits = [
  "Import Permit Application for dutiable goods (Intoxicating liquors, tobacco products, motor vehicles, petroleum products) and non-dutiable goods.",
  "Export & Transhipment Permit Application with or without Certificate of Origin",
  "Export of locally manufactured goods",
  "Re-export (transhipment) permit",
  "Temporary export of goods for re-import",
  "Temporary consignment import under Temporary Import Scheme",
  "Import of Controlled or non-controlled trade samples for exhibition/trade.",
  "Temporary Import for repair",
  "Re-imported goods of temporary export",
  "Application For Preferential Certificate Of Origin (Customs FORM D, E, AK, CECA etc)",
  "Singapore Customs",
  "Singapore Chinese Chamber of Commerce and Industry",
  "Singapore Indian Chamber of Commerce and Industry",
  "Singapore International Chamber of Commerce",
  "Singapore Malay Chamber of Commerce and Industry",
  "Singapore Manufacturing Federation",
  "Shut Out Permit, i.e. calling back of shipment to exporter",
  "Hand Carry Export Permit Application – Goods to be brought exit from Singapore within 12 hours after the granted permit.",
  "Storage Permit Application for licensed warehouse",
  "Major Exporter Scheme (MES) Permit Application",
  "Goods Handling Declarations for all transport modes",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section
        className="relative min-h-[480px] md:min-h-[580px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/BANNER new-1920w.png')" }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-in relative z-10 max-w-[1200px] mx-auto px-4 py-20 text-center w-full">
          <div className="inline-block bg-[#C8A84B]/20 border border-[#C8A84B]/40 rounded-full px-4 py-1.5 text-[#C8A84B] text-xs font-semibold uppercase tracking-widest mb-5">
            Singapore&rsquo;s Trusted Logistics Partner Since 2003
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-tight mb-6">
            Delivering value to our clients &ndash; On time, Every time!
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            TSL Logistics Pte Ltd. was founded in 2003 by veteran logistics expert Mr. Alan Tay Soon Lai with the
            objective of establishing a client-focused{" "}
            <a href="https://www.tsllogistics.sg/" className="text-[#C8A84B] underline hover:no-underline" target="_blank" rel="noopener noreferrer">
              logistics company in Singapore
            </a>
            . Since then, TSL has grown to become one of Singapore&rsquo;s most renowned integrated logistics
            solutions providers for global, regional, and local businesses and a &ldquo;go-to&rdquo; name when it
            comes to trust and service excellence.
          </p>
          <Link
            href="/tsl-logistics"
            className="inline-flex items-center gap-2 bg-[#F05921] hover:bg-[#d44d1a] text-white font-semibold py-3.5 px-10 rounded-full uppercase text-sm tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Star size={14} />
            OUR SERVICES
          </Link>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 anim-fade-up">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">
            Trusted &amp; Certified
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-4 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={300}
                  height={300}
                  className="w-full h-[160px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Logistic Services ── */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12 anim-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-[#252525] mb-3">
              Our Logistic Services
            </h2>
            <div className="gold-divider" />
            <p className="text-[#555] leading-relaxed max-w-2xl mx-auto mt-4">
              At TSL Logistics, we&rsquo;ve worked hard to make ourselves a one-stop-solution provider for a diverse range
              of logistics services. So why would you go anywhere else when all you need is TSL?
            </p>
          </div>

          <div className="flex justify-center md:justify-end mb-8">
            <Link
              href="/tsl-logistics"
              className="inline-flex items-center gap-2 bg-[#F05921] hover:bg-[#d44d1a] text-white font-semibold py-3 px-6 rounded-full uppercase text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg shrink-0"
            >
              <Star size={14} />
              MORE SERVICES
            </Link>
          </div>

          {/* TSL Movers */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#C8A84B] rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-[#252525]">TSL Movers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-grid">
              {moversGallery.map((item, i) => (
                <Link
                  key={i}
                  href="/tsl-mover"
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6 border-t-2 border-[#C8A84B]">
                    <h3 className="font-bold text-[#C8A84B] text-sm mb-2 leading-snug">{item.title}</h3>
                    <p className="text-[#555] text-sm leading-relaxed mb-4">{item.text}</p>
                    <span className="inline-flex items-center gap-1 text-[#F05921] font-semibold text-sm group-hover:gap-2 transition-all">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* TSL Logistics Services */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#C8A84B] rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-[#252525]">TSL Logistics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-grid">
              {logisticsGallery.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-4 border-t-2 border-[#C8A84B]">
                    <h3 className="font-bold text-[#C8A84B] text-xs mb-2 leading-snug">{item.title}</h3>
                    <p className="text-[#555] text-xs leading-relaxed line-clamp-3">{item.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Document & Permit Processing ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-[40%] shrink-0 anim-fade-left">
              <div className="relative rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/containers2-1280w.jpeg"
                  alt="Containers"
                  width={488}
                  height={600}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white font-bold text-lg leading-tight">Document &amp; Permit Processing</p>
                  <div className="w-10 h-0.5 bg-[#C8A84B] mt-2" />
                </div>
              </div>
            </div>
            <div className="flex-1 anim-fade-right">
              <h3 className="text-2xl font-bold text-[#252525] mb-2">Document &amp; Permit Processing</h3>
              <div className="gold-divider-left mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {documentPermits.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-100">
                    <span className="text-[#C8A84B] font-bold text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                    <p className="text-sm text-[#252525] leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-[#1E1E1E] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle at 1px 1px, #C8A84B 1px, transparent 0)", backgroundSize: "32px 32px"}} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10 anim-fade-up">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A84B] mb-2">What Our Clients Say</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Client Testimonials</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 md:p-12 anim-fade-left">
              <TestimonialsSlider />
            </div>
            <div className="lg:w-[360px] shrink-0 hidden lg:block anim-fade-right">
              <Image
                src="/images/TSL_Logistics_van-removebg-preview-91e3de1b-89c50125-1280w.png"
                alt="TSL Logistics Van"
                width={577}
                height={302}
                className="w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="text-center mb-12 anim-fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-[#252525] mb-3">FAQs</h2>
            <div className="gold-divider" />
          </div>
          <div className="anim-fade-up">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* ── Contact / Map Section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10 anim-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-[#252525] mb-3">Find Us</h2>
            <div className="gold-divider" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Map */}
            <div className="lg:w-[58%] anim-fade-left">
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.944552496003!2d103.9013238!3d1.3345077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913cceed8c5de5dc!2sTSL%20Logistics%20Pte%20Ltd!5e0!3m2!1sen!2ssg!4v1655692768220!5m2!1sen!2ssg"
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

            {/* Contact cards */}
            <div className="flex-1 flex flex-col gap-4 anim-fade-right">
              {/* Call */}
              <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-1">Call Us</h4>
                  <a href="tel:+6567772724" className="text-[#C8A84B] font-bold hover:underline text-lg">+65 6777 2724</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] rounded-full flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-2">Email Us</h4>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-bold text-[#252525]">Trucking Enquiry — </span>
                      <a href="mailto:sales@tsllogistics.sg" className="text-[#C8A84B] font-semibold hover:underline">sales@tsllogistics.sg</a>
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-[#252525]">Movers Enquiry — </span>
                      <a href="mailto:ops@tslmovers.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslmovers.sg</a>
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-[#252525]">Express Team — </span>
                      <a href="mailto:ops@tslexpress.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslexpress.sg</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-1">Our Locations</h4>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Our doors, ears and break room are always open.<br />
                    (Monday–Friday, from 9am-5pm)
                  </p>
                  <p className="text-[#C8A84B] font-semibold text-sm mt-2">Blk 3 Kaki Bukit Road 1 #02-01</p>
                  <p className="text-[#C8A84B] font-semibold text-sm">Eunos Technolink Singapore 415935</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
