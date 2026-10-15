import type { MetadataRoute } from "next";
import { site, routes } from "@/config/site";
import { publishedLocations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}${routes.quote}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}${routes.about}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}${routes.contact}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}${routes.terms}`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...publishedLocations.map((l) => ({ url: `${site.url}${routes.city(l.slug)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
