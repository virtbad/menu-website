/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => "build",
  webpack5: true,
  reactStrictMode: false,
  rewrites: async () => {
    return [{ source: "/sitemap.xml", destination: "/api/sitemap" }];
  },
};

module.exports = nextConfig;
