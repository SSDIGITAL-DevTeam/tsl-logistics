import type { MetadataRoute } from 'next';
import { getBlogPosts, getBlogSlugs } from '@/lib/api';
import { teamMembers } from '@/lib/team';

// Must match the page size used by app/blog/page.tsx, otherwise the paginated
// URLs listed here won't line up with the ones the listing actually renders.
const BLOG_PAGE_SIZE = 9;

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

  // Paginated listing pages. Page 1 is already covered by /blog above, so only
  // pages 2..n are added — each one self-canonicalises, so they are indexable
  // in their own right and otherwise only reachable by crawling the pager.
  let blogPageRoutes: MetadataRoute.Sitemap = [];
  try {
    const { totalPages } = await getBlogPosts({ page: 1, limit: BLOG_PAGE_SIZE });
    blogPageRoutes = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
      url: `${SITE_URL}/blog?page=${i + 2}`,
      lastModified: now,
      priority: 0.4,
      changeFrequency: 'weekly' as const,
    }));
  } catch {
    blogPageRoutes = [];
  }

  return [...staticRoutes, ...teamRoutes, ...blogPageRoutes, ...blogRoutes];
}
