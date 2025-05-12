import { Metadata } from "next";
import { truncateOnWord } from "./utils";
import { siteConfig } from "./constants";

type PageMetadataRecipe = {
  title: string;
  description: string;
  pageUrl: string;
  imageUrl: string;
};

export const preparePageMetadata = (recipe: PageMetadataRecipe): Metadata => ({
  metadataBase: new URL("https://www.zimdevelopers.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon-mask",
        url: "/safari-pinned-tab.png",
        color: "#000000",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: "/robots.txt",
  other: {
    "application-TileColor": "#008080",
  },

  twitter: {
    site: siteConfig.twitterUsername,
    creator: siteConfig.twitterUsername,
    card: "summary_large_image",
    title: recipe.title,
    description: recipe.description,
    images: {
      url: recipe.imageUrl,
      height: 675,
      width: 1200,
    },
  },
  openGraph: {
    description: truncateOnWord(recipe.description, 160),
    url: `${siteConfig.url.web}${recipe.pageUrl}`,
    type: "website",
    siteName: siteConfig.name,
    title: recipe.title,
    images: {
      url: recipe.imageUrl,
      height: 675,
      width: 1200,
    },
    locale: "en_US",
  },
  alternates: {
    canonical: `${siteConfig.url.web}${recipe.pageUrl}`,
  },
  title: recipe.title,
  description: recipe.description,
});
