import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      {/* ── CTA Banner ── */}
      {/* overflow-visible so truck floats above the section */}
      <div
        className="bg-gold-gradient relative z-10 py-20"
        style={{ overflow: "visible" }}
      >
        {/* Subtle orb */}
        <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-white/20 blur-3xl pointer-events-none" />

        {/* Truck — relative to section, aligns to container right edge */}
        <div
          className="hidden md:block absolute -bottom-9 w-[300px] lg:w-[400px] pointer-events-none z-20"
          style={{ right: "max(1.5rem, calc(50% - 600px + 1.5rem))" }}
        >
          <Image
            src="/images/cta-truck.png"
            alt="TSL Logistics truck"
            width={300}
            height={300}
            className="w-full object-contain"
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <h2 className="text-[#1a1a1a] text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Quick &amp; Reliable
          </h2>
          <a
            href="tel:+6567772724"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-white font-semibold py-3 px-7 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Call Us Today <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="bg-[#111111] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <Link href="/">
                <Image
                  src="/images/new_logo4-640w.png"
                  alt="TSL Logistics"
                  width={200}
                  height={52}
                  className="h-12 w-auto mb-4 brightness-0 invert"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                TSL Logistics Pte Ltd – Your trusted partner for transportation,
                warehousing, &amp; distribution in Singapore.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.facebook.com/tsllogistics.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#C8A84B]/20 hover:bg-[#C8A84B] text-[#C8A84B] hover:text-[#1E1E1E] rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-[#C8A84B] mb-5 uppercase text-xs tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Our Team", href: "/our-team" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-[#C8A84B] mb-5 uppercase text-xs tracking-widest">
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "TSL Logistics", href: "/tsl-logistics" },
                  { label: "TSL Mover", href: "/tsl-mover" },
                  {
                    label: "Container & Tanker Haulier",
                    href: "/container-truck-tanker-haulier-services",
                  },
                  {
                    label: "Warehousing Services",
                    href: "/warehousing-services",
                  },
                  {
                    label: "Dangerous Goods Transport",
                    href: "/dangerous-goods-transport",
                  },
                  {
                    label: "Vehicle Rentals",
                    href: "/transportation-vehicles-rentals",
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-[#C8A84B] mb-5 uppercase text-xs tracking-widest">
                Contact Us
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="tel:+6567772724"
                    className="flex items-start gap-2.5 text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200"
                  >
                    <Phone
                      size={14}
                      className="shrink-0 mt-0.5 text-[#C8A84B]"
                    />
                    <span>+65 6777 2724</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sales@tsllogistics.sg"
                    className="flex items-start gap-2.5 text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200"
                  >
                    <Mail
                      size={14}
                      className="shrink-0 mt-0.5 text-[#C8A84B]"
                    />
                    <span>sales@tsllogistics.sg</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://goo.gl/maps/oFjmzyzy9dH5nnFr5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200"
                  >
                    <MapPin
                      size={14}
                      className="shrink-0 mt-0.5 text-[#C8A84B]"
                    />
                    <span>
                      3 Kaki Bukit Road 1 #02-01, Eunos Technolink, Singapore
                      415935
                    </span>
                  </a>
                </li>
                <li className="text-gray-500 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                  Mon–Fri, 9am–5pm
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 py-5">
          <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TSL Logistics Pte Ltd. All rights
              reserved.
            </p>
            <p className="text-gray-600 text-xs">Trusted since 2003</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
