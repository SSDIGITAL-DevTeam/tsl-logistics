"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import HeaderV2 from "@/components/HeaderV2";
import Footer from "@/components/Footer";
import FooterV2 from "@/components/FooterV2";

// Routes that already have a v2 redesign. Add a path here once that page's
// v2 content ships — Header v2 / Footer v2 only render on these routes (and
// their sub-routes, e.g. "/our-team" also covers "/our-team/alan-tay") so
// unfinished pages keep the full v1 experience even when Theme V2 is active.
const V2_READY_ROUTES = [
  "/",
  "/about",
  "/our-team",
  "/tsl-logistics",
  "/tsl-mover",
  "/tsl-express",
  "/warehousing-services",
  "/contact",
];

function isV2Ready(pathname: string) {
  return V2_READY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  if (!isV2Ready(pathname)) {
    return (
      <Suspense fallback={null}>
        <Header />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="theme-v1-only">
        <Header />
      </div>
      <div className="theme-v2-only">
        <HeaderV2 />
      </div>
    </Suspense>
  );
}

export function SiteFooter() {
  const pathname = usePathname();

  if (!isV2Ready(pathname)) {
    return (
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="theme-v1-only">
        <Footer />
      </div>
      <div className="theme-v2-only">
        <FooterV2 />
      </div>
    </Suspense>
  );
}
