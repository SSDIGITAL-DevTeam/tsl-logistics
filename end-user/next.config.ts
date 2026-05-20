import type { NextConfig } from "next";

const apiHostname = process.env.TSL_API_URL
  ? new URL(process.env.TSL_API_URL).hostname
  : 'api.tsllogistics.sg';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: apiHostname,
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
