import type { NextConfig } from "next";

const getConfig = () => {
  // TODO: importing the env.js synchronously here is an experiment its safe to remove if causing errors
  import("./src/env.js");

  return {
    images: {
      remotePatterns: [
        { hostname: "lh3.googleusercontent.com" },
        { hostname: "avatars.githubusercontent.com" },
        { hostname: "1fo3qvrb3npovkpi.public.blob.vercel-storage.com" },
      ],
    },
  } as NextConfig;
};

export default getConfig();
