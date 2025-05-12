import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  return [{ id: "misc" }];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  switch (id) {
    case "misc":
      return await generateMiscSitemap();
    default:
      return [];
  }
}

function generateMiscSitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://www.zimdevelopers.com`,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
