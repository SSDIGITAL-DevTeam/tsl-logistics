import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ThankYou from "@/components/ThankYou";
import {
  LEAD_COOKIE,
  groupForSource,
  isConversionGroup,
  parseLeadCookie,
} from "@/lib/leadConversion";

type Props = { params: Promise<{ group: string }> };

// cookies() already forces this, but the explicit export documents that the
// gate depends on per-request rendering — a future PPR/cacheComponents opt-in
// must never serve a prerendered shell to a visitor with no cookie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thank You",
  // Conversion pages must never be indexed: they are thin duplicate content,
  // and a thank-you page ranking in Search would let organic traffic land on a
  // URL that Google Ads counts as a conversion. No canonical either — you do
  // not canonicalise a noindex page.
  robots: { index: false, follow: false },
};

export default async function ThankYouGroupPage({ params }: Props) {
  const { group } = await params;

  // An unknown segment is a URL that genuinely does not exist. 404 before
  // touching cookies, so typos and scrapers get an honest status.
  if (!isConversionGroup(group)) notFound();

  const parsed = parseLeadCookie((await cookies()).get(LEAD_COOKIE)?.value);

  // No cookie: direct URL access, a refresh after the conversion already fired,
  // or a submission older than LEAD_COOKIE_MAX_AGE. Bounce home — friendlier
  // than a 404 for what is often a real person hitting refresh.
  //
  // redirect() throws NEXT_REDIRECT: never wrap these in try/catch, or the gate
  // silently swings open.
  if (!parsed) redirect("/");

  // A cookie/URL mismatch can only be tampering — the forms derive both from
  // the same map. Never let a tsl-mover lead be counted in the tsl-express Ads
  // account.
  if (groupForSource(parsed.source) !== group) redirect("/");

  return <ThankYou source={parsed.source} group={group} leadId={parsed.leadId} />;
}
