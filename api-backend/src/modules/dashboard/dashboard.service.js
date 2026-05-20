import { eq, sql, desc } from 'drizzle-orm';
import { db } from '../../../drizzle/db.js';
import { leads, blogPosts } from '../../../drizzle/schema.js';

export async function getDashboardStatsService() {
  const [
    [{ totalLeads }],
    [{ totalPosts }],
    leadsBySource,
    postsByStatus,
    recentLeads,
  ] = await Promise.all([
    db.select({ totalLeads: sql`count(*)`.mapWith(Number) }).from(leads),
    db.select({ totalPosts: sql`count(*)`.mapWith(Number) }).from(blogPosts),
    db
      .select({ source: leads.source, count: sql`count(*)`.mapWith(Number) })
      .from(leads)
      .groupBy(leads.source)
      .orderBy(desc(sql`count(*)`)),
    db
      .select({ status: blogPosts.status, count: sql`count(*)`.mapWith(Number) })
      .from(blogPosts)
      .groupBy(blogPosts.status),
    db
      .select({
        id: leads.id,
        name: leads.name,
        email: leads.email,
        source: leads.source,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(5),
  ]);

  return { totalLeads, totalPosts, leadsBySource, postsByStatus, recentLeads };
}
