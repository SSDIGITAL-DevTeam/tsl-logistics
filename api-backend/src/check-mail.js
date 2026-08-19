/**
 * SMTP diagnostic. Prints the effective mail config, authenticates against the
 * server, and optionally sends one test email.
 *
 * Run with: node --env-file=.env src/check-mail.js
 *           node --env-file=.env src/check-mail.js --to=you@example.com
 */
import { env } from './config/env.js';
import { getSmtpConfig, verifySmtp, sendMail, resolveLeadRecipient } from './lib/mailer.js';

const args = process.argv.slice(2);
const getFlag = (name) => {
  const hit = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : true;
};

const testTo = getFlag('to');
const { host, port, secure, user, pass } = getSmtpConfig();

console.log('\n── SMTP config ────────────────────────────────────────────');
console.log(`  SMTP_HOST    : ${host || '(empty)'}`);
console.log(`  SMTP_PORT    : ${port}`);
console.log(`  SMTP_SECURE  : ${secure}${env.SMTP_SECURE === undefined ? ' (derived from port)' : ''}`);
console.log(`  SMTP_USER    : ${user || '(empty)'}`);
console.log(`  SMTP_PASS    : ${pass ? `*** (${pass.length} chars)` : '(empty)'}`);
console.log(`  MAIL_FROM    : ${env.MAIL_FROM}`);

if (pass && pass !== pass.trim()) {
  console.warn('  ⚠️  SMTP_PASS has leading/trailing whitespace — check the .env value.');
}

const fromAddress = env.MAIL_FROM.includes('<')
  ? env.MAIL_FROM.slice(env.MAIL_FROM.indexOf('<') + 1, env.MAIL_FROM.indexOf('>'))
  : env.MAIL_FROM;
const fromDomain = fromAddress.split('@')[1];
const userDomain = user?.split('@')[1];
if (fromDomain && userDomain && fromDomain !== userDomain) {
  console.warn(
    `  ⚠️  MAIL_FROM domain (${fromDomain}) differs from the SMTP account domain (${userDomain}).\n` +
      '      On Gmail/Workspace this address must be registered as a "Send mail as" alias,\n' +
      '      otherwise the From header gets rewritten or the mail is rejected by SPF/DMARC.'
  );
}

console.log('\n── Lead notification routing ──────────────────────────────');
for (const source of [
  'tsl-logistics',
  'tsl-mover',
  'warehousing-services',
  'tsl-express',
  'contact',
  'service',
]) {
  const to = resolveLeadRecipient(source);
  console.log(`  ${source.padEnd(22)} → ${to || '❌ NO RECIPIENT (set LEAD_NOTIFY_TO)'}`);
}
console.log(`  BCC (all sources)      → ${env.LEAD_NOTIFY_BCC || '(none)'}`);

console.log('\n── Connection test ────────────────────────────────────────');
const result = await verifySmtp();

if (!result.ok) {
  if (result.reason === 'not-configured') {
    console.error('  ❌ SMTP not configured — SMTP_HOST and/or SMTP_USER is empty.');
  } else {
    console.error(`  ❌ Verify failed: ${result.error?.message}`);
    if (result.error?.code) console.error(`     code: ${result.error.code}`);
    if (result.error?.response) console.error(`     server said: ${result.error.response}`);
  }
  process.exit(1);
}

console.log('  ✅ Connected and authenticated successfully.');

if (typeof testTo === 'string') {
  console.log(`\n── Test email → ${testTo} ─────────────────────────────`);
  try {
    const info = await sendMail({
      to: testTo,
      subject: `TSL SMTP test — ${new Date().toISOString()}`,
      html: `<p>SMTP is working.</p>
             <p>Host: ${host}:${port} (secure: ${secure})<br>From: ${env.MAIL_FROM}</p>`,
      text: `SMTP is working. Host: ${host}:${port} (secure: ${secure}), From: ${env.MAIL_FROM}`,
    });
    console.log(`  ✅ Sent. messageId: ${info.messageId}`);
    if (info.response) console.log(`     server said: ${info.response}`);
    console.log('     Check the inbox AND the spam folder.');
  } catch (err) {
    console.error(`  ❌ Send failed: ${err.message}`);
    if (err.response) console.error(`     server said: ${err.response}`);
    process.exit(1);
  }
} else {
  console.log('\n  Tip: add --to=you@example.com to also send a real test email.');
}

console.log('');
