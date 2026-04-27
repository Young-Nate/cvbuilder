import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/blog/index.html',
      },
      {
        source: '/blog/',
        destination: '/blog/index.html',
      },
      {
        source: '/blog/:slug',
        destination: '/blog/:slug/index.html',
      },
      {
        source: '/blog/:slug/',
        destination: '/blog/:slug/index.html',
      },
    ];
  },
};

export default nextConfig;
