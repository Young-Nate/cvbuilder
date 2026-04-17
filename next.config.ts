import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
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
    ];
  },
};

export default nextConfig;
