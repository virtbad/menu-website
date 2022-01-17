/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => "build",
  webpack5: true,
  reactStrictMode: false,
};

module.exports = nextConfig;
