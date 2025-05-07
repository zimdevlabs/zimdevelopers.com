import type { NextConfig } from "next";

const getConfig = () => {
  // TODO: importing the env.js synchronously here is an experiment its safe to remove if causing errors
  import("./src/env.js");

  return {
    images: {
      remotePatterns: [
        { hostname: "lh3.googleusercontent.com" },
        { hostname: "avatars.githubusercontent.com" },
        { hostname: "ewxtfugdovg4wwyt.public.blob.vercel-storage.com" },
      ],
    },
    async redirects() {
      return [
        {
          source: "/join-group",
          destination: "https://chat.whatsapp.com/FfXS39iLv7k36jrskKjOfX",
          permanent: false, // Uses 307 status code (temporary redirect)
        },
      ];
    },
  } as NextConfig;
};

export default getConfig();
