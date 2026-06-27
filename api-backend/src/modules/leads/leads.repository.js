import { and, desc, eq, gte, like, lte, or, sql } from 'drizzle-orm';
import { db } from '../../../drizzle/db.js';
import { leads } from '../../../drizzle/schema.js';

export async function insertLead(data) {
  const [result] = await db.insert(leads).values(data);
  return result;
}

export async function findLeads({ page = 1, limit = 20, q, source, dateFrom, dateTo }) {
  const offset = (page - 1) * limit;
  const where = buildWhere({ q, source, dateFrom, dateTo });

  const [rows, [{ count }]] = await Promise.all([
    db.select().from(leads).where(where).orderBy(desc(leads.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql`count(*)`.mapWith(Number) }).from(leads).where(where),
  ]);

  return { rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
}

export async function findAllLeadsForExport({ q, source, dateFrom, dateTo }) {
  const where = buildWhere({ q, source, dateFrom, dateTo });
  return db.select().from(leads).where(where).orderBy(desc(leads.createdAt));
}

function buildWhere({ q, source, dateFrom, dateTo }) {
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
