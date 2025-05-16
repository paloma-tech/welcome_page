/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  // Add output configuration for static exports
  output: 'standalone',
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
