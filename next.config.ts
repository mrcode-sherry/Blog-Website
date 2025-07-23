import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // optional — leave blank unless using a non-standard port
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
