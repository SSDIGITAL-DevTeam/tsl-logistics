"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { getHeaderBrandName } from "@/lib/headerBrand";

const services = [
  { label: "TSL Logistics", href: "/tsl-logistics" },
  { label: "TSL Mover", href: "/tsl-mover" },
  { label: "TSL Express", href: "/tsl-express" },
  { label: "Warehousing Services", href: "/warehousing-services" },
];

const navLinks: {
  label: string;
  href: string;
  children?: typeof services;
  hidden?: boolean;
}[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "#", children: services },
  { label: "OUR TEAM", href: "/our-team" },
  { label: "BLOG", href: "/blog", hidden: true },
  { label: "CONTACT US", href: "/contact", hidden: true },
];

const visibleNavLinks = navLinks.filter((link) => !link.hidden);

const HEADER_H = 84;
const HEADER_H_SCROLLED = 64;

export default function HeaderV2() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brandName = getHeaderBrandName(pathname, searchParams.get("department"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const isActive = (href: string) => {
    if (href === "#") return services.some((s) => pathname.startsWith(s.href));
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleCloseServices = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearCloseTimer();
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div style={{ height: HEADER_H }} />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-white/90 shadow-[0_10px_30px_rgba(16,24,32,0.08)] backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <div
          className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 transition-[height] duration-300 md:px-8"
          style={{ height: scrolled ? HEADER_H_SCROLLED : HEADER_H }}
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85">
            <Image
              src="/images/logo-only-tsl.png"
              alt="TSL"
              width={64}
              height={80}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-10"}`}
              priority
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-[#C8A84B]">{brandName}</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#151515]">
                Trusted &middot; Reliable &middot; Delivered
              </span>
            </span>
          </Link>

          {/* ── Desktop capsule nav ── */}
          <nav className="hidden items-center gap-1 rounded-full bg-[#f5f6f8] p-1.5 md:flex">
            {visibleNavLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  ref={dropdownRef}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") {
                      clearCloseTimer();
                      setServicesOpen(true);
                    }
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") {
                      scheduleCloseServices();
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="menu"
                    onClick={() => setServicesOpen((current) => !current)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      isActive(link.href)
                        ? "bg-white text-[#151515] shadow-sm"
                        : "text-[#555] hover:text-[#151515]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {servicesOpen && (
                    <div
                      className="nav-dropdown absolute left-1/2 top-full z-50 mt-3 w-[min(360px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden border border-gray-100 bg-white shadow-2xl"
                      role="menu"
                    >
                      <div className="py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setServicesOpen(false)}
                            role="menuitem"
                            className={`nav-dropdown-item flex items-center gap-2.5 border-b border-gray-50 px-5 py-3 text-sm transition-all last:border-0 ${
                              pathname.startsWith(child.href)
                                ? "bg-[#C8A84B]/5 font-semibold text-[#C8A84B]"
                                : "text-[#333] hover:bg-[#C8A84B]/5 hover:text-[#C8A84B]"
                            }`}
                          >
                            <ChevronRight size={11} className="shrink-0 text-[#C8A84B]" />
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
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive(link.href)
                      ? "bg-white text-[#151515] shadow-sm"
                      : "text-[#555] hover:text-[#151515]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── CTA + mobile toggle ── */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-[#121212] transition hover:opacity-90 active:scale-[0.98] md:inline-flex"
            >
              Contact Us
            </Link>

            <button
              onClick={() => {
                setMobileOpen((current) => !current);
                setServicesOpen(false);
              }}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full text-[#151515] transition-colors hover:bg-gray-100 md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="mobile-menu-in v2-no-radius max-h-[calc(100vh-84px)] overflow-y-auto border-t border-gray-100 bg-white shadow-lg md:hidden">
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-4">
              {visibleNavLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="rounded-2xl bg-[#f5f6f8] p-1.5">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      aria-expanded={mobileServicesOpen}
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-[#151515]"
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
                          className={`m-1.5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm transition-colors ${
                            pathname.startsWith(child.href)
                              ? "font-semibold text-[#C8A84B]"
                              : "text-[#444]"
                          }`}
                        >
                          <ChevronRight size={10} className="shrink-0 text-[#C8A84B]" />
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
                    className={`rounded-2xl bg-[#f5f6f8] px-4 py-3 text-sm font-bold transition-colors ${
                      isActive(link.href) ? "text-[#C8A84B]" : "text-[#151515]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-[#121212]"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
