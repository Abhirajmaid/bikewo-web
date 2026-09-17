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
  // Pretty public PDF URLs → Railway media proxy (not real WordPress).
  async rewrites() {
    return [
      {
        source:
          "/wp-content/uploads/2026/09/Bikewo-Annual-Report-2025-26.pdf",
        destination:
          "/api/media/investors/1789563345572-bikewo-annual-report-2025-26-compressed.pdf",
      },
    ];
  },
};

export default nextConfig;
