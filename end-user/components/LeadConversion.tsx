"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { LEAD_COOKIE } from "@/lib/leadConversion";

interface LeadConversionProps {
  /** Precise lead source, e.g. "warehousing-services". */
  source: string;
  /** Ads account group, e.g. "tsl-mover", or "general" for non-service leads. */
  group: string;
  leadId: string;
}

/**
 * Survives a full remount within the same document. The useRef below already
 * covers React StrictMode's double-invoked effects in dev; this covers the rest.
 */
const firedLeadIds = new Set<string>();

/**
 * Renders nothing. Fires the lead conversion exactly once, then burns the gate
 * cookie so the thank-you page can never be reached — and therefore never
 * counted — a second time.
 */
export default function LeadConversion({ source, group, leadId }: LeadConversionProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || firedLeadIds.has(leadId)) return;
    fired.current = true;
    firedLeadIds.add(leadId);

    // Google Ads, via GTM. The container's Custom Event triggers key off
    // `event` + `lead_group`; no conversion ID or label exists in this repo.
    // `lead_group` is the Ads account, `lead_source` is the finer-grained
    // service (warehousing-services and tsl-mover share one group).
    // `lead_id` is wired to the Ads tag's Transaction ID so Ads itself discards
    // a duplicate if one ever gets through.
    sendGTMEvent({
      event: "lead_submit",
      lead_source: source,
      lead_group: group,
      lead_id: leadId,
    });

    // GA4, straight through gtag.js — deliberately NOT a GA4 tag inside the GTM
    // container. Routing this through GTM would double-count against the
    // <GoogleAnalytics> config in app/layout.tsx.
    //
    // With NEXT_PUBLIC_GA_ID unset (local dev) this logs a harmless
    // "@next/third-parties: GA has not been initialized" warning. That is
    // expected, not a bug to fix.
    sendGAEvent("event", "generate_lead", {
      lead_source: source,
      lead_group: group,
      lead_id: leadId,
    });

    // Burn the gate cookie. From here a refresh, a back/forward that misses
    // bfcache, or a shared URL all fail the server-side check and bounce to "/".
    // The attributes must match the Set-Cookie from /api/contact, otherwise the
    // browser writes a second cookie instead of expiring the first.
    document.cookie =
      `${LEAD_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax` +
      (window.location.protocol === "https:" ? "; Secure" : "");
  }, [source, group, leadId]);

  return null;
}
