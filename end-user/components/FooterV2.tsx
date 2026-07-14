import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import CtaBandV2 from "@/components/CtaBandV2";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/our-team" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "TSL Logistics", href: "/tsl-logistics" },
  { label: "TSL Movers", href: "/tsl-mover" },
  { label: "TSL Express", href: "/tsl-express" },
  { label: "Warehousing Services", href: "/warehousing-services" },
];

export default function FooterV2() {
  return (
    <footer>
      {/* ── CTA Banner ── */}
      <CtaBandV2
        eyebrow="Ready to ship?"
        cta="Call Us Today"
        ctaHref="https://wa.me/6588119292?text=Hi%20TSL%20Logistics%2C%20I%20would%20like%20to%20make%20an%20enquiry."
      />

      {/* ── Main Footer ── */}
      <div className="border-t border-gray-100 bg-white text-[#1a1a1a]">
        <div className="mx-auto max-w-[1220px] px-5 py-14 md:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo & About */}
            <div className="lg:col-span-1">
              <Link href="/">
                <Image
                  src="/images/tsl-logo.png"
                  alt="TSL Logistics"
                  width={247}
                  height={51}
                  className="mb-4 h-10 w-auto"
                />
              </Link>
              <a
                href="https://www.facebook.com/tsllogistics.sg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A84B]/10 text-[#9A7D2D] transition-all duration-200 hover:bg-[#C8A84B] hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#9A7D2D]">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-[#555] transition-colors duration-200 hover:text-[#9A7D2D]"
                    >
                      <span className="h-1 w-1 shrink-0 bg-[#C8A84B] opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#9A7D2D]">
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-[#555] transition-colors duration-200 hover:text-[#9A7D2D]"
                    >
                      <span className="h-1 w-1 shrink-0 bg-[#C8A84B] opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#9A7D2D]">
                Contact Us
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="tel:+6567772724"
                    className="flex items-start gap-2.5 text-sm text-[#555] transition-colors duration-200 hover:text-[#9A7D2D]"
                  >
                    <Phone size={14} className="mt-0.5 shrink-0 text-[#C8A84B]" />
                    <span>+65 6777 2724</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#555]">
                  <Mail size={14} className="mt-0.5 shrink-0 text-[#C8A84B]" />
                  <span className="space-y-1">
                    <span className="block">
                      <span className="text-[#999]">Trucking: </span>
                      <a href="mailto:sales@tsllogistics.sg" className="transition-colors duration-200 hover:text-[#9A7D2D]">
                        sales@tsllogistics.sg
                      </a>
                    </span>
                    <span className="block">
                      <span className="text-[#999]">Movers: </span>
                      <a href="mailto:ops@tslmovers.sg" className="transition-colors duration-200 hover:text-[#9A7D2D]">
                        ops@tslmovers.sg
                      </a>
                    </span>
                    <span className="block">
                      <span className="text-[#999]">Express: </span>
                      <a href="mailto:ops@tslexpress.sg" className="transition-colors duration-200 hover:text-[#9A7D2D]">
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
                    className="flex items-start gap-2.5 text-sm text-[#555] transition-colors duration-200 hover:text-[#9A7D2D]"
                  >
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#C8A84B]" />
                    <span>
                      3 Kaki Bukit Road 1 #02-01, Eunos Technolink, Singapore
                      415935
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-1.5 text-xs text-[#777]">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse bg-green-500" />
                  Mon–Fri, 9am–5pm
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 py-5">
          <div className="mx-auto flex max-w-[1220px] flex-col items-center justify-between gap-2 px-5 md:flex-row md:px-8">
            <p className="text-sm text-[#777]">
              © {new Date().getFullYear()} TSL Logistics Pte Ltd. All rights
              reserved.
            </p>
            <p className="text-xs text-[#999]">Trusted since 2003</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
