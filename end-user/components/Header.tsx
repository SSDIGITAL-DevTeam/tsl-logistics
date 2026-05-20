"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, ChevronDown, ChevronRight, Menu, X } from "lucide-react";

const services = [
  { label: "TSL LOGISTICS", href: "/tsl-logistics" },
  { label: "TSL MOVER", href: "/tsl-mover" },
  { label: "CONTAINER, TRUCK, AND TANKER HAULIER SERVICES", href: "/container-truck-tanker-haulier-services" },
  { label: "WAREHOUSING SERVICES", href: "/warehousing-services" },
  { label: "TSL DG TRUCKING – DANGEROUS GOODS HANDLING", href: "/dangerous-goods-transport" },
  { label: "TSL TRANSPORTATION VEHICLE RENTALS", href: "/transportation-vehicles-rentals" },
];

const navLinks: { label: string; href: string; children?: typeof services }[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "#", children: services },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  // Always close the SERVICES dropdown when the route changes
  useEffect(() => { setDesktopOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#") return services.some((s) => pathname.startsWith(s.href));
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Top Info Bar — scrolls away with the page ── */}
      <div className="bg-[#1E1E1E]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-1 md:gap-0">
            <a
              href="tel:+6567772724"
              className="flex items-center gap-2 text-[#C8A84B] text-sm hover:text-white transition-colors duration-200"
            >
              <Phone size={13} />
              <span>6777 2724</span>
            </a>
            <a
              href="https://goo.gl/maps/oFjmzyzy9dH5nnFr5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#C8A84B] transition-colors duration-200 text-center"
            >
              <MapPin size={13} className="shrink-0 text-[#C8A84B]" />
              <span>3 Kaki Bukit Road 1 #02-01 Eunos Technolink Singapore 415935</span>
            </a>
            <a
              href="https://www.facebook.com/tsllogistics.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#C8A84B] text-sm hover:text-white transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <span>TSL Logistics FB Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Logo Row — scrolls away with the page ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-center">
          <Link href="/" className="transition-opacity hover:opacity-85">
            <Image
              src="/images/new_logo4-640w.png"
              alt="TSL Logistics Logo"
              width={410}
              height={105}
              className="h-[56px] w-auto md:h-[72px] transition-all duration-300"
              priority
            />
          </Link>
        </div>
      </div>

      {/* ── Sticky: ONLY the gold nav bar ── */}
      <header className="sticky top-0 z-50 shadow-md">
        {/* Navigation Row (gold) */}
        <div className="bg-[#C8A84B]">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center justify-center h-12">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="nav-item relative h-12 group"
                  onMouseEnter={() => link.children && setDesktopOpen(true)}
                  onMouseLeave={() => link.children && setDesktopOpen(false)}
                >
                  {link.children ? (
                    <>
                      <button
                        className={`flex items-center gap-1.5 px-4 h-12 text-sm font-semibold transition-colors duration-200 uppercase tracking-wide ${
                          isActive(link.href) || desktopOpen ? "text-white" : "text-[#1a1a1a] hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={13} className={`transition-transform duration-300 ${desktopOpen ? "rotate-180" : ""}`} />
                        <span
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-white transition-all duration-300 ${
                            isActive(link.href) || desktopOpen ? "w-8" : "w-0"
                          }`}
                        />
                      </button>
                      {desktopOpen && (
                        <div
                          className="nav-dropdown is-open absolute top-full bg-white shadow-2xl border-t-[3px] border-[#C8A84B] min-w-[340px] z-50 rounded-b-xl overflow-hidden"
                          style={{ left: "50%", transform: "translateX(-50%)" }}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setDesktopOpen(false)}
                              className={`nav-dropdown-item flex items-center gap-2 px-5 py-3 text-sm transition-colors duration-200 border-b border-gray-50 last:border-0 ${
                                pathname.startsWith(child.href)
                                  ? "bg-[#C8A84B]/15 text-[#9A7D2D] font-semibold"
                                  : "text-[#252525] hover:bg-[#C8A84B]/12 hover:text-[#9A7D2D] hover:pl-6"
                              }`}
                            >
                              <ChevronRight size={11} className="shrink-0 text-[#C8A84B]" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative flex items-center px-4 h-12 text-sm font-semibold transition-colors duration-200 uppercase tracking-wide ${
                        isActive(link.href) ? "text-white" : "text-[#1a1a1a] hover:text-white"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-white transition-all duration-300 ${
                          isActive(link.href) ? "w-8" : "w-0 group-hover:w-8"
                        }`}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center justify-between py-3">
              <span className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wide">Menu</span>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-[#1a1a1a] p-1 hover:text-white transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {mobileOpen && (
            <div className="md:hidden bg-white border-t-2 border-[#C8A84B] shadow-lg max-h-[70vh] overflow-y-auto mobile-menu-in">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-[#252525] border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <span>{link.label}</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 text-[#C8A84B] ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`bg-gray-50 overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-[600px]" : "max-h-0"}`}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                            className="flex items-center gap-2 px-8 py-2.5 text-sm text-[#252525] hover:text-[#C8A84B] hover:pl-9 border-b border-gray-100 last:border-0 transition-all"
                          >
                            <ChevronRight size={10} className="text-[#C8A84B] shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 text-sm font-semibold border-b border-gray-100 transition-colors ${
                        isActive(link.href)
                          ? "text-[#C8A84B] bg-[#C8A84B]/5"
                          : "text-[#252525] hover:text-[#C8A84B] hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
