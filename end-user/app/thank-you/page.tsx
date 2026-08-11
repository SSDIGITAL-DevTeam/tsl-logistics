import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ThankYou from "@/components/ThankYou";
import { LEAD_COOKIE, groupForSource, parseLeadCookie } from "@/lib/leadConversion";

// See app/thank-you/[group]/page.tsx for why this is explicit.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const parsed = parseLeadCookie((await cookies()).get(LEAD_COOKIE)?.value);
  if (!parsed) redirect("/");

  // A source that belongs to an Ads account must be counted on that account's
  // own URL, never here. Self-heal rather than bounce a real lead home.
  const group = groupForSource(parsed.source);
  if (group) redirect(`/thank-you/${group}`);

  // "contact", ServicePageLayout's "service" default, and any future source
  // with no Ads account land here. Group "general" matches no Ads trigger, so
  // these leads can never pollute an Ads account — GA4 still records them.
  return <ThankYou source={parsed.source} group="general" leadId={parsed.leadId} />;
}
