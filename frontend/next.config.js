/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // Serve static assets from the public URL
  assetPrefix: isProd ? 'http://localhost:30080' : '',
};

module.exports = nextConfig;
