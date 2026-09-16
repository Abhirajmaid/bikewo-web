import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    // Headroom for any proxied multipart bodies; CMS uploads use signed PUT.
    proxyClientMaxBodySize: "22mb",
  },
};

export default nextConfig;
