import { insertLead, findLeads, findAllLeadsForExport, findLeadSources } from './leads.repository.js';
import { sendLeadNotification } from '../../lib/mailer.js';
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
  });

  // Fire-and-forget email notification
  sendLeadNotification(data).catch((err) =>
    logger.error({ err }, 'Lead notification email failed')
  );

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
