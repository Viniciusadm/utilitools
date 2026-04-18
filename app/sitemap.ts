import type { MetadataRoute } from "next";

import { NAV_TOOLS } from "@/lib/nav-tools";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const home = {
    url: base,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };
  const tools = NAV_TOOLS.map((tool) => ({
    url: `${base}${tool.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [home, ...tools];
}
