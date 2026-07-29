import type { MetadataRoute } from 'next';
import { getBlogSlugs } from '@/lib/api';
import { teamMembers } from '@/lib/team';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tsllogistics.sg').replace(/\/$/, '');
const now = new Date();

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/about`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/blog`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/our-team`, lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/tsl-logistics`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/tsl-mover`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/warehousing-services`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/tsl-express`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
];

// Team member profiles. The nested /business-card route is intentionally left
// out — those are personal contact cards, not pages we want ranking.
const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((member) => ({
  url: `${SITE_URL}/our-team/${member.slug}`,
  lastModified: now,
  priority: 0.5,
  changeFrequency: 'yearly',
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // The blog lives behind the API backend. If it is unreachable the sitemap
  // must still serve every static route rather than failing as a whole —
  // otherwise one backend outage de-lists the entire site.
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getBlogSlugs();
    blogRoutes = slugs.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 0.7,
      changeFrequency: 'monthly',
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...teamRoutes, ...blogRoutes];
}
