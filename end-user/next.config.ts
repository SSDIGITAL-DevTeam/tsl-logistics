import type { NextConfig } from "next";

const apiUrl = process.env.TSL_API_URL || 'https://api.tsllogistics.sg';
const apiParsed = new URL(apiUrl);
const allowedDevOrigins = [
  '192.168.100.217',
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []),
];

/**
 * URLs from the previous site that still rank but no longer exist.
 *
 * Every entry was found by cross-checking 90 days of Search Console pages
 * against a live HTTP check — each source below was returning 404 while still
 * earning impressions, and each destination was verified to return 200.
 * Together they were bleeding ~180 clicks and ~12,000 impressions per quarter.
 *
 * The articles simply moved under /blog/; three of them also had "singapore-s"
 * normalised to "singapores" in the new slug, so those cannot be handled by a
 * single wildcard rule.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  // Old service pages — /tsl-logistics covers both container haulage and DG.
  { source: '/container-truck-tanker-haulier-services', destination: '/tsl-logistics' },
  { source: '/dangerous-goods-transport', destination: '/tsl-logistics' },

  // Old blog index (capitalised).
  { source: '/Blog', destination: '/blog' },

  // Articles that used to live at the site root.
  {
    source: '/navigating-singapore-s-regulations-a-guide-to-transporting-dangerous-goods-safely',
    destination: '/blog/navigating-singapores-regulations-a-guide-to-transporting-dangerous-goods-safely',
  },
  {
    source: '/unlocking-business-potential-singapore-s-free-trade-zones-and-warehousing',
    destination: '/blog/unlocking-business-potential-singapores-free-trade-zones-and-warehousing',
  },
  {
    source: '/understanding-the-role-of-container-transport-in-singapore-international-trade',
    destination: '/blog/understanding-the-role-of-container-transport-in-singapores-international-trade',
  },
  {
    source: '/challenges-and-solutions-navigating-singapores-logistics-landscape',
    destination: '/blog/challenges-and-solutions-navigating-singapores-logistics-landscape',
  },
  {
    source: '/types-of-warehousing-in-singapore-and-how-to-select-the-best',
    destination: '/blog/types-of-warehousing-in-singapore-and-how-to-select-the-best',
  },
  {
    source: '/understanding-dg-trucking-the-importance-of-safe-transport-for-dangerous-goods',
    destination: '/blog/understanding-dg-trucking-the-importance-of-safe-transport-for-dangerous-goods',
  },
  {
    source: '/top-5-advantages-of-employing-a-full-service-transportation-company-for-your-business',
    destination: '/blog/top-5-advantages-of-employing-a-full-service-transportation-company-for-your-business',
  },
  {
    source: '/10-factors-to-consider-when-selecting-a-logistics-partner-for-your-business',
    destination: '/blog/10-factors-to-consider-when-selecting-a-logistics-partner-for-your-business',
  },
  {
    source: '/5-essential-tips-for-improving-your-supply-chain-efficiency',
    destination: '/blog/5-essential-tips-for-improving-your-supply-chain-efficiency',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins,
  async redirects() {
    // permanent: true emits 308, which Google treats as equivalent to a 301 —
    // ranking signals transfer to the destination instead of being lost.
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  images: {
    // In development, localhost resolves to ::1 (private IP) which Next.js 15+
    // blocks as SSRF protection even when listed in remotePatterns.
    // unoptimized: true lets the browser fetch directly, bypassing the optimizer.
    unoptimized: process.env.NODE_ENV !== 'production',
    // AVIF first (~20% smaller than WebP), WebP as the fallback for browsers
    // without AVIF support. Default is ['image/webp'] only.
    formats: ['image/avif', 'image/webp'],
    // Default tops out at 3840, which put a 4K variant in the hero's preload
    // srcset. 2048 is the widest worth serving for this design.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: apiParsed.protocol.replace(':', '') as 'http' | 'https',
        hostname: apiParsed.hostname,
        port: apiParsed.port || '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
