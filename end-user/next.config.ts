import type { NextConfig } from "next";

const apiUrl = process.env.TSL_API_URL || 'https://api.tsllogistics.sg';
const apiParsed = new URL(apiUrl);
const allowedDevOrigins = [
  '192.168.100.217',
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins,
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
