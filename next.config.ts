import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "h4478cf7xp.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
