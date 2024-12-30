import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/characters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
