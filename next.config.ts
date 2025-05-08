import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        { hostname: "lh3.googleusercontent.com" },
        { hostname: "avatars.githubusercontent.com" },
        { hostname: "ewxtfugdovg4wwyt.public.blob.vercel-storage.com" },
      ],
    },
};

export default nextConfig;
