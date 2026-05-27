import type { MetadataRoute } from "next";
import { getPublishedServices } from "@/lib/dal";

const BASE = "https://nexquora.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getPublishedServices();

  // Deduplicate slugs (finance has two DB rows but one URL)
  const seen = new Set<string>();
  const serviceEntries = services
    .filter((s) => {
      if (seen.has(s.slug)) return false;
      seen.add(s.slug);
      return true;
    })
    .map((s) => ({
      url:
        s.slug === "finance"
          ? `${BASE}/services/finance`
          : `${BASE}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceEntries,
    {
      url: `${BASE}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
