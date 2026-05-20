import type { NextConfig } from "next";

const apiUrl = process.env.TSL_API_URL || 'https://api.tsllogistics.sg';
const apiParsed = new URL(apiUrl);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
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
