import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import {optimizedImageHosts} from './src/lib/remoteImages';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // The old site used /jp/... for Japanese pages
  async redirects() {
    return [
      {source: '/jp', destination: '/ja', permanent: true},
      {source: '/jp/:path*', destination: '/ja/:path*', permanent: true},
      // Once launched, send anyone with an old "coming soon" link to the real site
      ...(process.env.MAINTENANCE_MODE === 'true'
        ? []
        : [{source: '/coming-soon', destination: '/', permanent: false}]),
    ];
  },
  images: {
    remotePatterns: optimizedImageHosts.map((hostname) => ({protocol: 'https' as const, hostname}))
  }
};

export default withNextIntl(nextConfig);
