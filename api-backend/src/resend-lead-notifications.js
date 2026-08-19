/**
 * Re-sends lead notification emails for leads whose notification never went out
 * (notified_at IS NULL). Safe to re-run: each successful send is recorded, so an
 * interrupted run resumes where it stopped.
 *
 * Dry-run by default — nothing is sent and nothing is written until --live.
 *
 *   node --env-file=.env src/resend-lead-notifications.js
 *   node --env-file=.env src/resend-lead-notifications.js --to=you@example.com --limit=2
 *   node --env-file=.env src/resend-lead-notifications.js --live
 *
 * Flags:
 *   --live              actually send and stamp notified_at
 *   --to=addr           send everything to one inbox instead of the routed
 *                       recipients (BCC disabled, notified_at NOT updated)
 *   --source=a,b        only these sources
 *   --since=YYYY-MM-DD  / --until=YYYY-MM-DD   filter by created_at
 *   --id=uuid           only this lead (repeatable)
 *   --limit=N           cap the number of leads
 *   --include-legacy    include the CSV-imported "TSL ... Form" leads (don't)
 *   --mark-only         stamp notified_at without sending (retire old rows)
 *   --delay=ms          gap between sends (default 1500)
 */
import { pool } from '../drizzle/db.js';
import {
  findLeadsPendingNotification,
  markLeadNotified,
} from './modules/leads/leads.repository.js';
import { sendLeadNotification, resolveLeadRecipient } from './lib/mailer.js';
import { ensureUtmColumns } from './lib/ensureUtmColumns.js';

const args = process.argv.slice(2);
const getFlag = (name) => {
  const hit = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : true;
};
const getAll = (name) =>
  args.filter((a) => a.startsWith(`--${name}=`)).map((a) => a.slice(a.indexOf('=') + 1));

const live = getFlag('live') === true;
const markOnly = getFlag('mark-only') === true;
const includeLegacy = getFlag('include-legacy') === true;
// Value flags are only honoured in --flag=value form; a bare --flag yields true.
const getValue = (name) => (typeof getFlag(name) === 'string' ? getFlag(name) : undefined);
const getNumber = (name, fallback) => {
  const n = parseInt(getValue(name) ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
};

const overrideTo = getValue('to');
const since = getValue('since');
const until = getValue('until');
const sources = (getValue('source') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const ids = getAll('id');
const limit = getNumber('limit', undefined);
const delayMs = getNumber('delay', 1500);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fmtDate = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? ''));
const truncate = (s, n) => {
  const v = String(s ?? '');
  return v.length > n ? `${v.slice(0, n - 1)}…` : v;
};

/**
 * The UTM/GCLID columns are normally created by ensureUtmColumns() on server boot,
 * which never runs for a CLI script — so a server that hasn't restarted since that
 * feature shipped still lacks them. notified_at comes from `npm run migrate`.
 */
async function ensureSchema() {
  await ensureUtmColumns();

  const [cols] = await pool.query('SHOW COLUMNS FROM `leads` LIKE "notified_at"');
  if (!Array.isArray(cols) || cols.length === 0) {
    throw new Error(
      'Column `notified_at` is missing — run `npm run migrate` first, then verify with:\n' +
        "  SHOW COLUMNS FROM leads LIKE 'notified_at';"
    );
  }
}

async function main() {
  await ensureSchema();

  const leads = await findLeadsPendingNotification({
    since,
    until,
    sources: sources.length ? sources : undefined,
    ids: ids.length ? ids : undefined,
    includeLegacy,
    limit,
  });

  console.log('\n── Pending lead notifications ─────────────────────────────');
  console.log(`  mode          : ${markOnly ? 'MARK-ONLY' : live ? 'LIVE SEND' : 'DRY RUN'}`);
  console.log(`  recipients    : ${overrideTo ? `${overrideTo} (override)` : 'routed per source'}`);
  console.log(`  legacy import : ${includeLegacy ? 'INCLUDED ⚠️' : 'excluded'}`);
  console.log(`  matched       : ${leads.length} lead(s)\n`);

  if (leads.length === 0) {
    console.log('  Nothing to do — every matching lead already has notified_at set.\n');
    return 0;
  }

  const bySource = leads.reduce((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {});
  console.log('  By source:');
  for (const [source, count] of Object.entries(bySource).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(count).padStart(4)}  ${source}`);
  }

  console.log('\n  Date        Source                  Name                  Recipient');
  console.log('  ' + '─'.repeat(88));
  const missingRecipient = [];
  for (const lead of leads) {
    const to = overrideTo || resolveLeadRecipient(lead.source);
    if (!to) missingRecipient.push(lead);
    console.log(
      `  ${fmtDate(lead.createdAt).padEnd(11)} ${truncate(lead.source, 22).padEnd(23)} ` +
        `${truncate(lead.name, 21).padEnd(22)} ${to || '❌ NO RECIPIENT'}`
    );
  }

  if (missingRecipient.length > 0) {
    console.warn(
      `\n  ⚠️  ${missingRecipient.length} lead(s) have no recipient for their source.` +
        '\n      Set LEAD_NOTIFY_TO in .env or add the source to SOURCE_NOTIFY_MAP in src/lib/mailer.js.'
    );
  }

  if (!live && !markOnly) {
    console.log('\n  DRY RUN — nothing sent. Re-run with --live to send for real.\n');
    return 0;
  }

  if (markOnly) {
    for (const lead of leads) await markLeadNotified(lead.id);
    console.log(`\n  ✅ Marked ${leads.length} lead(s) as notified without sending.\n`);
    return 0;
  }

  console.log(`\n── Sending (${delayMs}ms apart) ────────────────────────────\n`);
  let sent = 0;
  const failed = [];

  for (const [i, lead] of leads.entries()) {
    const label = `[${i + 1}/${leads.length}] ${fmtDate(lead.createdAt)} ${truncate(lead.name, 24)}`;
    try {
      await sendLeadNotification(lead, { backlog: true, to: overrideTo });
      // With --to the real recipients never saw it, so leave notified_at alone.
      if (!overrideTo) await markLeadNotified(lead.id);
      sent += 1;
      console.log(`  ✅ ${label}`);
    } catch (err) {
      failed.push({ lead, err });
      console.error(`  ❌ ${label} — ${err.message}`);
    }
    if (i < leads.length - 1) await sleep(delayMs);
  }

  console.log('\n── Summary ────────────────────────────────────────────────');
  console.log(`  sent   : ${sent}`);
  console.log(`  failed : ${failed.length}`);
  if (overrideTo) {
    console.log('\n  --to was used, so notified_at was NOT updated. These leads will');
    console.log('  still appear on the next run — that is intentional.');
  }
  if (failed.length > 0) {
    console.log('\n  Failed leads (still notified_at IS NULL, re-run to retry):');
    for (const { lead, err } of failed) {
      console.log(`    ${lead.id}  ${lead.email}  — ${err.message}`);
    }
  }
  console.log('');
  return failed.length > 0 ? 1 : 0;
}

let exitCode = 0;
try {
  exitCode = await main();
} catch (err) {
  console.error('\n❌ Resend failed:', err);
  exitCode = 1;
} finally {
  await pool.end();
}

process.exitCode = exitCode;
