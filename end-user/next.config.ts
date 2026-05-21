import type { NextConfig } from "next";

const apiUrl = process.env.TSL_API_URL || 'https://api.tsllogistics.sg';
const apiParsed = new URL(apiUrl);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // In development, localhost resolves to ::1 (private IP) which Next.js 15+
    // blocks as SSRF protection even when listed in remotePatterns.
    // unoptimized: true lets the browser fetch directly, bypassing the optimizer.
    unoptimized: process.env.NODE_ENV !== 'production',
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
