import type { MetadataRoute } from 'next';
import { getBlogSlugs } from '@/lib/api';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tsllogistics.sg').replace(/\/$/, '');
const now = new Date();

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/about`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/blog`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/tsl-logistics`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/tsl-mover`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/warehousing-services`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/tsl-express`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBlogSlugs();
  const blogRoutes: MetadataRoute.Sitemap = slugs.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(updatedAt),
    priority: 0.7,
    changeFrequency: 'monthly',
  }));
  return [...staticRoutes, ...blogRoutes];
}
