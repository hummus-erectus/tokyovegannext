import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

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
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "books.google.co.jp"
      },
      {
        protocol: "https",
        hostname: "lanternpub.wpenginepowered.com"
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Allow Cloudinary images
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ]
  }
};

export default withNextIntl(nextConfig);
