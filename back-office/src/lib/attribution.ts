import type { Lead } from '../types';

/**
 * Google Ads attribution rules. Mirrors api-backend/src/utils/attribution.js
 * and the `channel=google-ads` filter in leads.repository.js — keep the three
 * in sync so the badge, the filter and the CSV export never disagree.
 *
 * gclid / gbraid / wbraid come from auto-tagging and are proof of a paid
 * click. utm_source=google on its own is not: organic search and Business
 * Profile links get tagged that way too, so a paid medium must accompany it.
 */
const PAID_MEDIUMS = ['cpc', 'ppc', 'paidsearch', 'paid'];

type AttributionFields = Pick<
  Lead,
  'utmSource' | 'utmMedium' | 'gclid' | 'gbraid' | 'wbraid'
>;

export function isGoogleAdsLead(lead: AttributionFields): boolean {
  if (lead.gclid || lead.gbraid || lead.wbraid) return true;
  return (
    lead.utmSource?.toLowerCase() === 'google' &&
    PAID_MEDIUMS.includes(lead.utmMedium?.toLowerCase() ?? '')
  );
}

/** Badge text for the leads table, or null when there is nothing to show. */
export function getChannelLabel(lead: AttributionFields): string | null {
  if (isGoogleAdsLead(lead)) return 'Google Ads';
  return lead.utmSource || null;
}
