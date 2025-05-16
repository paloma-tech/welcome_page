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
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,
  // Optimize build output
  swcMinify: true,
  // Use standalone output for better compatibility with DigitalOcean
  output: 'standalone',
  // Increase build timeout if needed
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },
};

module.exports = nextConfig;
