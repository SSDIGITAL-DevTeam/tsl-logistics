import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { isGoogleAdsLead } from '../utils/attribution.js';
import { logger } from './logger.js';

// Subject is a header, not HTML — strip CR/LF rather than escaping.
const subjectSafe = (v) => String(v).replace(/[\r\n]+/g, ' ').slice(0, 200);

let transporter = null;

export function getSmtpConfig() {
  const port = env.SMTP_PORT ?? 465;
  return {
    host: env.SMTP_HOST,
    port,
    secure: env.SMTP_SECURE ?? port === 465,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  };
}

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER) return null;

  if (!transporter) {
    const { host, port, secure, user, pass } = getSmtpConfig();
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  return transporter;
}

/**
 * Opens a connection and authenticates without sending anything.
 * Returns the real SMTP error instead of swallowing it, so callers can report it.
 */
export async function verifySmtp() {
  const transport = getTransporter();
  if (!transport) {
    return { ok: false, reason: 'not-configured', error: null };
  }
  try {
    await transport.verify();
    return { ok: true, reason: 'verified', error: null };
  } catch (err) {
    return { ok: false, reason: 'verify-failed', error: err };
  }
}

export async function sendMail({ to, bcc, subject, html, text }) {
  const transport = getTransporter();
  if (!transport) {
    const err = new Error('SMTP not configured — set SMTP_HOST and SMTP_USER');
    logger.error({ to, bcc, subject }, err.message);
    throw err;
  }
  try {
    const mailOptions = { from: env.MAIL_FROM, to, subject, html, text };
    if (bcc) mailOptions.bcc = bcc;
    const info = await transport.sendMail(mailOptions);
    logger.info({ to, bcc, subject, messageId: info.messageId }, 'Email sent');
    return info;
  } catch (err) {
    logger.error({ err, to, bcc, subject }, 'Email send failed');
    throw err;
  }
}

const SOURCE_NOTIFY_MAP = {
  'tsl-logistics': env.LEAD_NOTIFY_TSL_LOGISTICS,
  'tsl-mover': env.LEAD_NOTIFY_TSL_MOVER,
  'warehousing-services': env.LEAD_NOTIFY_TSL_MOVER,
  'tsl-express': env.LEAD_NOTIFY_TSL_EXPRESS,
};

export function resolveLeadRecipient(source) {
  return SOURCE_NOTIFY_MAP[source] || env.LEAD_NOTIFY_TO || null;
}

// Lead fields are attacker-controlled free text (message/notes accept 5000
// chars), so nothing reaches the template unescaped — otherwise a visitor
// could plant markup or a phishing link in the sales team's inbox.
function esc(value) {
  if (value === null || value === undefined || value === '') return '-';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatLeadDate(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * @param {object} lead
 * @param {{ backlog?: boolean, to?: string, bcc?: string|null }} [options]
 *   backlog — mark the email as a re-send of an old lead, not a fresh enquiry.
 *   to / bcc — override routing (used by the resend CLI to target a single test inbox).
 */
export async function sendLeadNotification(lead, options = {}) {
  const to = options.to || resolveLeadRecipient(lead.source);
  if (!to) {
    const err = new Error(
      `No notification recipient for source "${lead.source}" — add it to SOURCE_NOTIFY_MAP or set LEAD_NOTIFY_TO`
    );
    logger.error({ leadId: lead.id, source: lead.source }, err.message);
    throw err;
  }

  const bcc = options.to ? undefined : options.bcc ?? env.LEAD_NOTIFY_BCC ?? undefined;
  const leadDate = formatLeadDate(lead.createdAt);

  const subject = options.backlog
    ? `[Backlog] New lead from ${lead.source} — ${lead.name}${leadDate ? ` (${leadDate})` : ''}`
    : `New lead from ${lead.source} — ${lead.name}`;

  const banner = options.backlog
    ? `<p style="padding:10px;background:#FFF4D6;border-left:4px solid #C8A84B">
         <strong>This is not a new lead.</strong> It was submitted${leadDate ? ` on ${esc(leadDate)}` : ''}
         but the notification email never went out because SMTP was not configured at the time.
         It is being re-sent now so it can be followed up.
       </p>`
    : '';

  // notes defaults to a copy of message at creation time (see leads.service.js) when
  // the form has no separate notes field — only show it when it's an actual addition.
  const notesRow =
    lead.notes && lead.notes !== lead.message
      ? `<tr><td><strong>Notes</strong></td><td>${esc(lead.notes)}</td></tr>`
      : '';

  await sendMail({
    to,
    bcc,
    subject: subjectSafe(subject),
    html: `
      <h2>New Lead Received</h2>
      ${banner}
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>From Google Ads?</strong></td><td>${isGoogleAdsLead(lead) ? '<strong>YES</strong>' : 'No'}</td></tr>
        <tr><td><strong>Name</strong></td><td>${esc(lead.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${esc(lead.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${esc(lead.phone)}</td></tr>
        <tr><td><strong>Source</strong></td><td>${esc(lead.source)}</td></tr>
        <tr><td><strong>Submitted</strong></td><td>${esc(leadDate)}</td></tr>
        <tr><td><strong>Page</strong></td><td>${esc(lead.pagePath)}</td></tr>
        <tr><td><strong>Enquiry</strong></td><td>${esc(lead.enquiry)}</td></tr>
        <tr><td><strong>Message</strong></td><td>${esc(lead.message)}</td></tr>
        ${notesRow}
      </table>
    `,
  });
}

export async function sendPasswordResetEmail(email, resetUrl) {
  await sendMail({
    to: email,
    subject: 'TSL Back-Office — Password Reset',
    html: `
      <p>You requested a password reset for your TSL Back-Office account.</p>
      <p><a href="${resetUrl}" style="padding:10px 20px;background:#C8A84B;color:#fff;text-decoration:none;border-radius:4px">Reset Password</a></p>
      <p>This link expires in 1 hour. If you did not request this, ignore this email.</p>
    `,
  });
}
