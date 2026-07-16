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

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brandName = getHeaderBrandName(pathname, searchParams.get("department"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
      <div className="h-[72px]" />

      <header
        className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white shadow-md"
      >
        <div
          className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between gap-8"
        >

          {/* ── Logo ── */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 hover:opacity-85 transition-opacity">
            <Image
              src="/images/logo-only-tsl.png"
              alt="TSL"
              width={64}
              height={80}
              className="h-10 w-auto"
              priority
            />
            <span className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#C8A84B]">{brandName}</span>
              <span className="text-[11px] font-semibold text-[#1a1a1a]">
                Trusted &middot; Reliable &middot; Delivered
              </span>
            </span>
          </Link>

          {/* ── Desktop Nav (centre) ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
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
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-[#C8A84B]"
                        : "text-[#444] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-[#C8A84B]" />
                    )}
                  </button>

                  {servicesOpen && (
                    <div
                      className="nav-dropdown absolute left-1/2 top-full z-50 mt-2 w-[min(360px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden border border-gray-100 bg-white shadow-2xl"
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
                                ? "text-[#C8A84B] font-semibold bg-[#C8A84B]/5"
                                : "text-[#333] hover:bg-[#C8A84B]/5 hover:text-[#C8A84B]"
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
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-[#C8A84B]"
                      : "text-[#444] hover:text-[#1a1a1a]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-[#C8A84B]" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* ── Right: CTA ── */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="btn-pill-gold !py-2.5 !px-5 !text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => {
              setMobileOpen((current) => !current);
              setServicesOpen(false);
            }}
            aria-label="Toggle menu"
            className="p-2 text-[#1a1a1a] transition-colors hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="mobile-menu-in max-h-[calc(100vh-72px)] overflow-y-auto border-t border-gray-100 bg-white shadow-lg md:hidden">
            <nav className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
              {visibleNavLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      aria-expanded={mobileServicesOpen}
                      className="flex w-full items-center justify-between border-b border-gray-100 py-3.5 text-sm font-semibold text-[#252525]"
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
                          className={`flex items-center gap-2 border-b border-gray-50 py-3 pl-4 text-sm transition-colors last:border-0 ${
                            pathname.startsWith(child.href)
                              ? "font-semibold text-[#C8A84B]"
                              : "text-[#444] hover:text-[#C8A84B]"
                          }`}
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
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex justify-center bg-[#C8A84B] hover:bg-[#9A7D2D] text-[#1a1a1a] font-bold text-sm py-3 px-5 transition-colors"
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
