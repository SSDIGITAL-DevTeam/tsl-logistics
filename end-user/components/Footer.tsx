"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Phone, MapPin, Mail } from "lucide-react";
import { getHeaderBrandName } from "@/lib/headerBrand";

export default function Footer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brandName = getHeaderBrandName(pathname, searchParams.get("department"));

  return (
    <footer>
      {/* ── CTA Banner ── */}
      <div className="v2-no-radius relative z-10 min-h-[360px] overflow-hidden bg-[#111] md:min-h-[410px]">
        <Image
          src="/images/footer-cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-r md:from-black/45 md:via-black/20 md:to-transparent" />
        <div className="pointer-events-none absolute bottom-[-15px] right-[-40px] z-10 w-[95vw] max-w-[420px] opacity-70 md:bottom-[-50px] md:right-[-20px] md:w-[48vw] md:max-w-[900px] md:opacity-100">
          <Image
            src="/images/cta-bg.png"
            alt=""
            width={2160}
            height={1440}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="relative z-20 mx-auto flex min-h-[360px] max-w-[1200px] items-center px-6 py-14 md:min-h-[410px]">
          <div className="max-w-[560px]">
            <h2 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl">
              Quick &amp; Reliable
            </h2>
            <p className="mb-10 max-w-[540px] text-sm leading-relaxed text-white/90 md:text-base">
              We deliver fast, secure, and dependable logistics solutions that
              help businesses move goods efficiently while maintaining complete
              visibility and confidence throughout the shipping process.
            </p>
            <a
              href="https://wa.me/6588119292?text=Hi%20TSL%20Logistics%2C%20I%20would%20like%20to%20make%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[230px] items-center justify-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f2f2f2] active:scale-[0.98]"
            >
              Call Us Today <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="bg-[#111111] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <Link href="/" className="mb-4 flex items-center gap-2.5">
                <Image
                  src="/images/logo-only-tsl.png"
                  alt="TSL"
                  width={64}
                  height={80}
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-[#C8A84B]">{brandName}</span>
              </Link>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.facebook.com/tsllogistics.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#C8A84B]/20 hover:bg-[#C8A84B] text-[#C8A84B] hover:text-[#1E1E1E] flex items-center justify-center transition-all duration-200"
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
                  { label: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                  { label: "TSL Movers", href: "/tsl-mover" },
                  {
                    label: "TSL Express",
                    href: "/tsl-express",
                  },
                  {
                    label: "Warehousing Services",
                    href: "/warehousing-services",
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#C8A84B] text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                  <Mail
                    size={14}
                    className="shrink-0 mt-0.5 text-[#C8A84B]"
                  />
                  <span className="space-y-1">
                    <span className="block">
                      <span className="text-gray-500">Logistics: </span>
                      <a href="mailto:sales@tsllogistics.sg" className="hover:text-[#C8A84B] transition-colors duration-200">
                        sales@tsllogistics.sg
                      </a>
                    </span>
                    <span className="block">
                      <span className="text-gray-500">Movers & Warehousing: </span>
                      <a href="mailto:ops@tslmovers.sg" className="hover:text-[#C8A84B] transition-colors duration-200">
                        ops@tslmovers.sg
                      </a>
                    </span>
                    <span className="block">
                      <span className="text-gray-500">Express: </span>
                      <a href="mailto:ops@tslexpress.sg" className="hover:text-[#C8A84B] transition-colors duration-200">
                        ops@tslexpress.sg
                      </a>
                    </span>
                  </span>
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
                  <span className="w-1.5 h-1.5 bg-green-500 inline-block animate-pulse" />
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
