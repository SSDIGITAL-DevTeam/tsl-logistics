import {
  and, asc, desc, eq, gte, inArray, isNotNull, isNull, like, lte, not, or, sql,
} from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { db } from '../../../drizzle/db.js';
import { leads } from '../../../drizzle/schema.js';
import { PAID_MEDIUMS } from '../../utils/attribution.js';

// Sources of the one-off CSV import (src/seed-leads.js). These were already
// handled offline and must never be emailed by the resend CLI.
export const LEGACY_SOURCE_PATTERN = 'TSL % Form';

export async function insertLead(data) {
  // Generate the id up front: MySQL INSERT returns a ResultSetHeader, not the row,
  // so callers would otherwise have no id to mark as notified.
  const row = { id: randomUUID(), ...data };
  await db.insert(leads).values(row);
  return row;
}

export async function markLeadNotified(id) {
  return db.update(leads).set({ notifiedAt: new Date() }).where(eq(leads.id, id));
}

export async function findLeadsPendingNotification({
  since,
  until,
  sources,
  ids,
  includeLegacy = false,
  limit,
} = {}) {
  const conditions = [isNull(leads.notifiedAt)];

  if (!includeLegacy) conditions.push(not(like(leads.source, LEGACY_SOURCE_PATTERN)));
  if (sources?.length) conditions.push(inArray(leads.source, sources));
  if (ids?.length) conditions.push(inArray(leads.id, ids));
  if (since) conditions.push(gte(leads.createdAt, new Date(since)));
  if (until) {
    const end = new Date(until);
    end.setHours(23, 59, 59, 999);
    conditions.push(lte(leads.createdAt, end));
  }

  const query = db
    .select()
    .from(leads)
    .where(and(...conditions))
    .orderBy(asc(leads.createdAt));

  return limit ? query.limit(limit) : query;
}

export async function findLeads({ page = 1, limit = 20, q, source, channel, dateFrom, dateTo }) {
  const offset = (page - 1) * limit;
  const where = buildWhere({ q, source, channel, dateFrom, dateTo });

  const [rows, [{ count }]] = await Promise.all([
    db.select().from(leads).where(where).orderBy(desc(leads.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql`count(*)`.mapWith(Number) }).from(leads).where(where),
  ]);

  return { rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
}

export async function findAllLeadsForExport({ q, source, channel, dateFrom, dateTo }) {
  const where = buildWhere({ q, source, channel, dateFrom, dateTo });
  return db.select().from(leads).where(where).orderBy(desc(leads.createdAt));
}

function buildWhere({ q, source, channel, dateFrom, dateTo }) {
  const conditions = [];

  if (q) {
    conditions.push(
      or(
        like(leads.name, `%${q}%`),
        like(leads.email, `%${q}%`),
        like(leads.phone, `%${q}%`),
        like(leads.enquiry, `%${q}%`),
        like(leads.notes, `%${q}%`)
      )
    );
  }
  if (source) conditions.push(eq(leads.source, source));
  // Mirrors isGoogleAdsLead() in src/utils/attribution.js — keep both in sync.
  if (channel === 'google-ads') {
    conditions.push(
      or(
        isNotNull(leads.gclid),
        isNotNull(leads.gbraid),
        isNotNull(leads.wbraid),
        and(
          eq(sql`lower(${leads.utmSource})`, 'google'),
          inArray(sql`lower(${leads.utmMedium})`, PAID_MEDIUMS)
        )
      )
    );
  }
  if (dateFrom) conditions.push(gte(leads.createdAt, new Date(dateFrom)));
  if (dateTo) {
    const end = new Date(dateTo);
    end.setHours(23, 59, 59, 999);
    conditions.push(lte(leads.createdAt, end));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function findLeadSources() {
  return db
    .selectDistinct({ source: leads.source })
    .from(leads)
    .orderBy(leads.source);
}
