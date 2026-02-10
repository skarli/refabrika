import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    quietDeps: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
