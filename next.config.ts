import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Use webpack instead of Turbopack for build (needed for @react-pdf/renderer pako resolution)
  turbopack: {},
  webpack: (config) => {
    // Fix pako internal module resolution for @react-pdf/pdfkit
    config.resolve.alias = {
      ...config.resolve.alias,
      'pako/lib/zlib/inflate.js': require.resolve('pako'),
      'pako/lib/zlib/deflate.js': require.resolve('pako'),
      'pako/lib/zlib/constants.js': require.resolve('pako'),
      'pako/lib/zlib/zstream.js': require.resolve('pako'),
    };
    return config;
  },
};

export default nextConfig;
