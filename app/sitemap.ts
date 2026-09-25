import type { MetadataRoute } from "next";
import { templates } from "@/lib/data/templates";
import { cases } from "@/lib/data/cases";
import { getAllPosts } from "@/lib/blog";
import { comparisons } from "@/lib/data/compare";
import { siteConfig } from "@/lib/seo";
import { pageFreshness, type PageFreshnessKey } from "@/lib/data/pageFreshness";

export const dynamic = "force-static";

const STATIC_PATHS: { path: string; freshnessKey?: PageFreshnessKey }[] = [
  { path: "", freshnessKey: "home" },
  { path: "/solutions", freshnessKey: "solutions" },
  { path: "/pricing", freshnessKey: "pricing" },
  { path: "/case-studies", freshnessKey: "case-studies" },
  { path: "/compare", freshnessKey: "compare" },
  { path: "/why-nipige", freshnessKey: "why-nipige" },
  { path: "/agency", freshnessKey: "agency" },
  { path: "/about", freshnessKey: "about" },
  { path: "/contact", freshnessKey: "contact" },
  { path: "/demo", freshnessKey: "demo" },
  { path: "/blogs", freshnessKey: "blogs" },
  { path: "/privacy-policy" },
  { path: "/terms-of-service" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = STATIC_PATHS.map(({ path, freshnessKey }) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
    ...(freshnessKey ? { lastModified: new Date(pageFreshness[freshnessKey]) } : {}),
  }));

  const templateRoutes = templates.map((t) => ({
    url: `${base}/solutions/${t.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // PetFlok is a quiet, unpromoted sub-page under Services — not part of `templates`.
  const petflokRoute = [
    {
      url: `${base}/solutions/services/pet-service`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  const caseRoutes = cases.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // "sharetribe-alternatives" is retired — 301-redirected to /compare/sharetribe-alternatives.
  const blogRoutes = getAllPosts()
    .filter((post) => post.slug !== "sharetribe-alternatives")
    .map((post) => ({
      url: `${base}/blogs/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      lastModified: new Date(post.updatedDate ?? post.date),
    }));

  const compareRoutes = comparisons.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
    ...(c.dateModified ? { lastModified: new Date(c.dateModified) } : {}),
  }));

  return [...staticRoutes, ...templateRoutes, ...petflokRoute, ...caseRoutes, ...blogRoutes, ...compareRoutes];
}
