/**
 * Lead conversion plumbing shared by the forms (client), /api/contact (server)
 * and the thank-you pages (server). Keep this module free of `next/headers`,
 * `server-only` and any Node built-in so all three can import it.
 *
 * No Google Ads conversion ID or label appears anywhere in this repo — those
 * live only in the GTM container. The code's whole job is to push an event
 * naming the conversion group; GTM decides which Ads account hears about it.
 */

/**
 * One entry per Google Ads *account*, not per service. The thank-you URL is
 * what an Ads account keys its conversion off, so two services sharing an
 * account must share a URL.
 */
export const CONVERSION_GROUPS = ["tsl-logistics", "tsl-express", "tsl-mover"] as const;
export type ConversionGroup = (typeof CONVERSION_GROUPS)[number];

/**
 * Lead source (what the form sends) -> Ads account group (what the URL says).
 *
 * `warehousing-services` intentionally maps onto `tsl-mover`: those two share a
 * single Ads account, exactly as they share a notification inbox in
 * api-backend/src/lib/mailer.js (SOURCE_NOTIFY_MAP). The *precise* source is
 * still carried in the dataLayer event, so GA4 can tell them apart even though
 * the URL cannot.
 *
 * A new service with no entry here falls through to /thank-you and fires no Ads
 * conversion at all. That is deliberate: silently missing a conversion is
 * recoverable, silently attributing it to the wrong Ads account is not.
 */
const SOURCE_TO_GROUP: Record<string, ConversionGroup> = {
  "tsl-logistics": "tsl-logistics",
  "tsl-express": "tsl-express",
  "tsl-mover": "tsl-mover",
  "warehousing-services": "tsl-mover",
};

/** Short-lived, non-httpOnly proof-of-submission. Burned by the client after firing. */
export const LEAD_COOKIE = "tsl_lead";
export const LEAD_COOKIE_MAX_AGE = 300; // seconds

/**
 * Cookie value is `<source>.<uuid>`. Both halves are restricted to characters
 * that survive any cookie serializer without percent-encoding, and `.` can
 * never appear inside either half, so splitting on the first dot is exact.
 */
const SOURCE_PATTERN = /^[a-z0-9][a-z0-9-]{0,39}$/;
const LEAD_ID_PATTERN = /^[0-9a-f-]{8,40}$/;

/**
 * Only ever applied to the cookie value. The `source` forwarded to the backend
 * must stay byte-for-byte what the form sent, because SOURCE_NOTIFY_MAP keys
 * off it to decide which inbox gets the lead.
 */
export function sanitizeSource(raw: unknown): string {
  const value = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  return SOURCE_PATTERN.test(value) ? value : "contact";
}

export function parseLeadCookie(raw: string | undefined): { source: string; leadId: string } | null {
  if (!raw) return null;

  const dot = raw.indexOf(".");
  if (dot <= 0 || dot === raw.length - 1) return null;

  const source = raw.slice(0, dot);
  const leadId = raw.slice(dot + 1);
  if (!SOURCE_PATTERN.test(source)) return null;
  if (!LEAD_ID_PATTERN.test(leadId)) return null;

  return { source, leadId };
}

export function groupForSource(source: string | null | undefined): ConversionGroup | null {
  if (!source) return null;
  return SOURCE_TO_GROUP[source] ?? null;
}

export function isConversionGroup(value: string): value is ConversionGroup {
  return (CONVERSION_GROUPS as readonly string[]).includes(value);
}

/** Where a given source's thank-you page lives. Used by both forms. */
export function thankYouPath(source: string | null | undefined): string {
  const group = groupForSource(source);
  return group ? `/thank-you/${group}` : "/thank-you";
}

export interface ThankYouCopy {
  heading: string;
  message: string;
  ctaHref: string;
  ctaLabel: string;
}

/**
 * Keyed by *source*, not group: warehousing-services shares the tsl-mover URL
 * but must not be answered with copy about moving support.
 */
const DEFAULT_COPY: ThankYouCopy = {
  heading: "Thank you for contacting us.",
  message: "We will get back to you as soon as possible.",
  ctaHref: "/",
  ctaLabel: "Back to Home",
};

const COPY_BY_SOURCE: Record<string, ThankYouCopy> = {
  "tsl-logistics": {
    heading: "Thank you for your enquiry.",
    message:
      "Our logistics team will get back to you as soon as possible with the right haulage and trucking support.",
    ctaHref: "/tsl-logistics",
    ctaLabel: "Back to Container Haulage",
  },
  "tsl-express": {
    heading: "Thank you for your enquiry.",
    message:
      "Our express team will get back to you as soon as possible with the right courier and delivery support.",
    ctaHref: "/tsl-express",
    ctaLabel: "Back to Courier Services",
  },
  // Copy lifted verbatim from the SuccessModal this flow replaces.
  "tsl-mover": {
    heading: "Thank you for your quotation request.",
    message: "Our team will get back to you with the right moving support.",
    ctaHref: "/tsl-mover",
    ctaLabel: "Back to Movers",
  },
  "warehousing-services": {
    heading: "Thank you for your enquiry.",
    message:
      "Our warehousing team will get back to you as soon as possible with the right storage and 3PL support.",
    ctaHref: "/warehousing-services",
    ctaLabel: "Back to Warehousing",
  },
};

export function copyForSource(source: string): ThankYouCopy {
  return COPY_BY_SOURCE[source] ?? DEFAULT_COPY;
}
