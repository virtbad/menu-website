/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => "build",
  webpack5: true,
  reactStrictMode: false,
  rewrites: async () => {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      { source: "/.well-known/microsoft-identity-association.json", destination: "/api/microsoftIdentityAssociation" },
    ];
  },
};

module.exports = nextConfig;
