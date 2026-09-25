import { getPost } from "@/lib/blog";
import { getComparison } from "@/lib/data/compare";
import { getTemplate } from "@/lib/data/templates";

export type RelatedCardKind = "blog" | "compare" | "solution";

export interface RelatedCard {
  href: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  kind: RelatedCardKind;
}

/** Hero images for solution templates - ported from the solutions detail page. */
const SOLUTION_IMAGES: Record<string, string> = {
  restaurant: "/images/food-delivery-hero.svg",
  realestate: "/images/real-estate-hero.svg",
  services: "/images/services-hero.svg",
  fitness: "/images/fitness-hero.svg",
  grocery: "/images/grocery-hero.svg",
  travel: "/images/travel-hero.svg",
  entertainment: "/images/entertainment-hero.svg",
  sports: "/images/sports-hero.svg",
  superapp: "/images/superapp-hero.svg",
};

/** Resolve an internal href (/blogs/*, /compare/*, /solutions/*) to display card data. */
export function resolveRelatedCard(href: string): RelatedCard | null {
  const clean = href.replace(/\/$/, "");

  if (clean.startsWith("/blogs/")) {
    const post = getPost(clean.replace("/blogs/", ""));
    if (!post) return null;
    return {
      href: clean,
      title: post.title,
      description: post.description,
      image: post.image,
      imageAlt: post.imageAlt ?? post.title,
      kind: "blog",
    };
  }

  if (clean.startsWith("/compare/")) {
    const c = getComparison(clean.replace("/compare/", ""));
    if (!c) return null;
    return {
      href: clean,
      title: c.h1,
      description: c.metaDescription,
      kind: "compare",
    };
  }

  if (clean.startsWith("/solutions/")) {
    const id = clean.replace("/solutions/", "");
    const t = getTemplate(id);
    if (!t) return null;
    return {
      href: clean,
      title: t.metaTitle ?? `${t.nm} Platform`,
      description: t.metaDesc ?? t.desc,
      image: SOLUTION_IMAGES[id],
      imageAlt: `${t.nm} platform preview`,
      kind: "solution",
    };
  }

  return null;
}

export function resolveRelatedCards(hrefs: string[]): RelatedCard[] {
  return hrefs
    .map(resolveRelatedCard)
    .filter((card): card is RelatedCard => card !== null);
}
