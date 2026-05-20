import type { MetadataRoute } from 'next';
import { getBlogSlugs } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tsllogistics.sg';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/contact`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/tsl-logistics`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/tsl-mover`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/warehousing-services`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/dangerous-goods-transport`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/container-truck-tanker-haulier-services`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/transportation-vehicles-rentals`, priority: 0.9, changeFrequency: 'monthly' },
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
