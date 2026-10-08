"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { captureUtmFromUrl } from "@/lib/utmTracker";

function Tracker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    captureUtmFromUrl();
  }, [searchParams, pathname]);

  return null;
}

export default function UtmTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
