/**
 * Google Ads attribution rules, shared by the notification email, the CSV
 * export and the admin list filter so all three agree on what "Google Ads"
 * means.
 *
 * Two signals can identify a paid click:
 *   1. Auto-tagging (on by default in Google Ads) appends gclid — or, since
 *      iOS 14.5, gbraid / wbraid where a gclid cannot be set. Any of the three
 *      is proof of a paid click.
 *   2. Manual tagging via UTM. utm_source=google alone is NOT enough — that
 *      also covers organic search and Business Profile links tagged by hand.
 *      The paid medium is what distinguishes an ad.
 */
export const PAID_MEDIUMS = ['cpc', 'ppc', 'paidsearch', 'paid'];

export function isGoogleAdsLead(lead) {
  if (lead.gclid || lead.gbraid || lead.wbraid) return true;
  return (
    lead.utmSource?.toLowerCase() === 'google' &&
    PAID_MEDIUMS.includes(lead.utmMedium?.toLowerCase() ?? '')
  );
}
