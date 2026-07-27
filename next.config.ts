import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pinna projektroten till DENNA mapp så Next inte förväxlar den med ~/package.json.
  turbopack: {
    root: path.resolve('.'),
  },
  outputFileTracingRoot: path.resolve('.'),
};

export default nextConfig;
