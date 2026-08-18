import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from './logger.js';

let transporter = null;

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 465,
      secure: env.SMTP_SECURE ?? true,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendMail({ to, bcc, subject, html, text }) {
  const transport = getTransporter();
  if (!transport) {
    logger.warn({ to, bcc, subject }, 'SMTP not configured — email skipped');
    return;
  }
  try {
    const mailOptions = { from: env.MAIL_FROM, to, subject, html, text };
    if (bcc) mailOptions.bcc = bcc;
    await transport.sendMail(mailOptions);
    logger.info({ to, bcc, subject }, 'Email sent');
  } catch (err) {
    logger.error({ err, to, bcc, subject }, 'Email send failed');
  }
}

const SOURCE_NOTIFY_MAP = {
  'tsl-logistics': env.LEAD_NOTIFY_TSL_LOGISTICS,
  'tsl-mover': env.LEAD_NOTIFY_TSL_MOVER,
  'warehousing-services': env.LEAD_NOTIFY_TSL_MOVER,
  'tsl-express': env.LEAD_NOTIFY_TSL_EXPRESS,
};

export async function sendLeadNotification(lead) {
  const to = SOURCE_NOTIFY_MAP[lead.source] || env.LEAD_NOTIFY_TO;
  if (!to) return;

  const bcc = env.LEAD_NOTIFY_BCC || undefined;

  await sendMail({
    to,
    bcc,
    subject: `New lead from ${lead.source} — ${lead.name}`,
    html: `
      <h2>New Lead Received</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${lead.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${lead.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${lead.phone}</td></tr>
        <tr><td><strong>Source</strong></td><td>${lead.source}</td></tr>
        <tr><td><strong>Page</strong></td><td>${lead.pagePath ?? '-'}</td></tr>
        <tr><td><strong>Enquiry</strong></td><td>${lead.enquiry ?? '-'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${lead.message ?? '-'}</td></tr>
        <tr><td><strong>Notes</strong></td><td>${lead.notes ?? lead.message ?? '-'}</td></tr>
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
