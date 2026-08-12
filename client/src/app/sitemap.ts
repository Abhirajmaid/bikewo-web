import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Only list URLs meant to be indexed.
 * Placeholder routes export `robots: { index: false }` — keep them out of the
 * sitemap until they ship real content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
