import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 REQUIRED for Netlify static hosting
  images: {
    unoptimized: true, // 👈 REQUIRED for static export
  },
};

export default nextConfig;

