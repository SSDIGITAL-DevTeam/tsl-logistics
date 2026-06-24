"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, ChevronRight, Menu, X } from "lucide-react";

const services = [
  { label: "TSL Logistics", href: "/tsl-logistics" },
  { label: "TSL Mover", href: "/tsl-mover" },
  { label: "Container, Truck & Tanker Haulier", href: "/container-truck-tanker-haulier-services" },
  { label: "Warehousing Services", href: "/warehousing-services" },
  { label: "Dangerous Goods Transport", href: "/dangerous-goods-transport" },
  { label: "Transportation Vehicle Rentals", href: "/transportation-vehicles-rentals" },
];

const navLinks: { label: string; href: string; children?: typeof services }[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "#", children: services },
  { label: "OUR TEAM", href: "/our-team" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage: transparent until scrolled. On other pages: always white.
  const transparent = isHome && !scrolled;

  const isActive = (href: string) => {
    if (href === "#") return services.some((s) => pathname.startsWith(s.href));
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Spacer so page content doesn't hide under fixed header on non-home pages */}
      {!isHome && <div className="h-[72px]" />}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-gradient-to-b from-black/55 to-transparent shadow-none"
            : "bg-white shadow-md border-b border-gray-100"
        }`}
      >
        <div
          className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between gap-8"
          style={transparent ? { textShadow: "0 1px 4px rgba(0,0,0,0.6)" } : undefined}
        >

          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 hover:opacity-85 transition-opacity">
            <Image
              src="/images/new_logo4-640w.png"
              alt="TSL Logistics"
              width={200}
              height={52}
              className="h-[44px] w-auto"
              priority
            />
          </Link>

          {/* ── Desktop Nav (centre) ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      transparent
                        ? isActive(link.href)
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                        : isActive(link.href)
                        ? "text-[#C8A84B]"
                        : "text-[#444] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {servicesOpen && (
                    <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden min-w-[300px] z-50">
                      <div className="py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setServicesOpen(false)}
                            className={`nav-dropdown-item flex items-center gap-2.5 px-5 py-3 text-sm border-b border-gray-50 last:border-0 transition-all ${
                              pathname.startsWith(child.href)
                                ? "text-[#C8A84B] font-semibold bg-[#C8A84B]/5"
                                : "text-[#333] hover:text-[#C8A84B] hover:bg-[#C8A84B]/5 hover:pl-6"
                            }`}
                          >
                            <ChevronRight size={11} className="text-[#C8A84B] shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setServicesOpen(false)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    transparent
                      ? isActive(link.href)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : isActive(link.href)
                      ? "text-[#C8A84B]"
                      : "text-[#444] hover:text-[#1a1a1a]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full ${transparent ? "bg-white" : "bg-[#C8A84B]"}`} />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* ── Right: phone + CTA ── */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="tel:+6567772724"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${
                transparent ? "text-white/90 hover:text-white" : "text-[#1a1a1a] hover:text-[#C8A84B]"
              }`}
            >
              <Phone size={14} />
              +65 6777 2724
            </a>
            <Link
              href="/contact"
              className="btn-pill-gold !py-2.5 !px-5 !text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-md transition-colors ${
              transparent ? "text-white hover:bg-white/10" : "text-[#1a1a1a] hover:bg-gray-100"
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg mobile-menu-in">
            <nav className="max-w-[1200px] mx-auto px-6 py-3 flex flex-col">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full py-3 text-sm font-semibold text-[#252525] border-b border-gray-100"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`text-[#C8A84B] transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileServicesOpen ? "max-h-[600px]" : "max-h-0"
                      }`}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                          className="flex items-center gap-2 pl-4 py-2.5 text-sm text-[#444] hover:text-[#C8A84B] border-b border-gray-50 last:border-0 transition-colors"
                        >
                          <ChevronRight size={10} className="text-[#C8A84B] shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className={`py-3 text-sm font-semibold border-b border-gray-100 transition-colors ${
                      isActive(link.href) ? "text-[#C8A84B]" : "text-[#252525] hover:text-[#C8A84B]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 pb-2 flex flex-col gap-3">
                <a
                  href="tel:+6567772724"
                  className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a]"
                >
                  <Phone size={14} className="text-[#C8A84B]" />
                  +65 6777 2724
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex justify-center bg-[#C8A84B] hover:bg-[#9A7D2D] text-[#1a1a1a] font-bold text-sm py-3 px-5 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
