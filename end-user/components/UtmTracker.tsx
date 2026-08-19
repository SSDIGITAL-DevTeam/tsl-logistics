"use client";

import { useEffect } from "react";
import { captureUtmFromUrl } from "@/lib/utmTracker";

export default function UtmTracker() {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  return null;
}
