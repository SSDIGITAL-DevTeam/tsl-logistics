import {
  insertLead,
  findLeads,
  findAllLeadsForExport,
  findLeadSources,
  markLeadNotified,
} from './leads.repository.js';
import { sendLeadNotification } from '../../lib/mailer.js';
import { isGoogleAdsLead } from '../../utils/attribution.js';
import { env } from '../../config/env.js';
import { logger } from '../../lib/logger.js';

export async function createLeadService(data, req) {
  if (env.RECAPTCHA_SECRET && data.recaptchaToken) {
    await verifyRecaptcha(data.recaptchaToken);
  }

  const lead = await insertLead({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    enquiry: data.enquiry?.trim() || null,
    message: data.message?.trim() || null,
    notes: data.notes?.trim() || data.message?.trim() || null,
    source: data.source,
    pagePath: data.pagePath || null,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']?.slice(0, 255) || null,
    utmSource: data.utmSource || null,
    utmMedium: data.utmMedium || null,
    utmCampaign: data.utmCampaign || null,
    gclid: data.gclid || null,
    gbraid: data.gbraid || null,
    wbraid: data.wbraid || null,
  });

  // Fire-and-forget email notification. notified_at stays NULL when it fails, so
  // `npm run mail:resend` picks the lead up later.
  sendLeadNotification({ ...data, ...lead, createdAt: new Date() })
    .then(() => markLeadNotified(lead.id))
    .catch((err) => logger.error({ err, leadId: lead.id }, 'Lead notification email failed'));

  return lead;
}

export async function listLeadsService(query) {
  return findLeads(query);
}

export async function exportLeadsService(query) {
  const rows = await findAllLeadsForExport(query);
  return rows.map((r) => ({
    Name: r.name,
    Email: r.email,
    Phone: r.phone,
    Enquiry: r.enquiry ?? '',
    Message: r.message ?? '',
    Notes: r.notes ?? '',
    Source: r.source,
    Page: r.pagePath ?? '',
    'UTM Source': r.utmSource ?? '',
    'UTM Medium': r.utmMedium ?? '',
    'UTM Campaign': r.utmCampaign ?? '',
    GCLID: r.gclid ?? '',
    GBRAID: r.gbraid ?? '',
    WBRAID: r.wbraid ?? '',
    'Google Ads': isGoogleAdsLead(r) ? 'Yes' : 'No',
    Date: r.createdAt.toISOString().split('T')[0],
  }));
}

export async function getLeadSourcesService() {
  return findLeadSources();
}

async function verifyRecaptcha(token) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET}&response=${token}`,
    { method: 'POST' }
  );
  const data = await res.json();
  if (!data.success || data.score < 0.5) {
    throw Object.assign(new Error('reCAPTCHA validation failed'), { status: 400 });
  }
}
