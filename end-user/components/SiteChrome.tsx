"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function SiteHeader() {
  return (
    <Suspense fallback={null}>
      <Header />
    </Suspense>
  );
}

export function SiteFooter() {
  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
}
