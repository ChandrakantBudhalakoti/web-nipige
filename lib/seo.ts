import type { Metadata } from "next";
import type { BlogPost, CaseStudy, Template } from "@/lib/types";
import { getAuthorBio } from "@/lib/data/authors";
import { pageFreshness } from "@/lib/data/pageFreshness";

export const siteConfig = {
  name: "Nipige",
  company: "Trigital Technologies Pvt Ltd",
  url: "https://www.nipige.com",
  title: "Nipige - Launch Your Marketplace or Platform in 14 Days",
  description:
    "Pick a production-ready marketplace solution - restaurant, real estate, or services - configure it without code and launch on managed hosting in 14 days.",
  ogImage: "/og.png",
  locales: ["Hyderabad", "Austin, TX"],
} as const;

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  keywords?: string[];
  category?: string;
  /** Per-page OG/Twitter image override (e.g. a blog post's own hero). Falls back to siteConfig.ogImage. */
  image?: string;
}

/** Build a route-level Metadata object sharing the site-wide OpenGraph defaults. */
export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  keywords,
  category,
  image,
}: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const ogImageDims = image ? { width: 1200, height: 700 } : { width: 1200, height: 630 };

  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          title,
          description,
          url,
          siteName: siteConfig.name,
          images: [{ url: ogImage, ...ogImageDims }],
          type: "article",
          publishedTime,
          modifiedTime,
          authors,
          tags,
        }
      : {
          title,
          description,
          url,
          siteName: siteConfig.name,
          images: [{ url: ogImage, ...ogImageDims }],
          type: "website",
          ...(modifiedTime ? { modifiedTime } : {}),
        };

  // The root layout appends " · Nipige" to any plain-string title via its title.template.
  // If this title already names the brand (e.g. "Compare X vs. Nipige"), use an absolute
  // title so the template doesn't tack on a second, redundant "Nipige".
  const titleIncludesBrand = title.toLowerCase().includes(siteConfig.name.toLowerCase());

  return {
    title: titleIncludesBrand ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      site: "@nipigehq",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    ...(keywords?.length ? { keywords } : {}),
    ...(category ? { category } : {}),
  };
}

function orgPublisherJsonLd() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
  };
}

/**
 * Canonical Organization JSON-LD, rendered once site-wide in the root layout.
 * Other schemas (WebSite, WebPage, etc.) reference it by `@id` instead of
 * re-declaring the Organization, so there is a single source of truth.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.company,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}${siteConfig.ogImage}`,
  },
  description: siteConfig.description,
  foundingDate: "2013",
  sameAs: [
    "https://www.linkedin.com/company/nipige/",
    "https://x.com/nipigehq",
  ],
  address: [
    { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
    { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${siteConfig.url}/contact/`,
  },
};

function breadcrumbListItems(items: { name: string; path: string }[]) {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteConfig.url}${item.path}`,
  }));
}

/** JSON-LD breadcrumb list for a page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbListItems(items),
  };
}

/** JSON-LD for a blog post (BlogPosting) plus its WebPage, BreadcrumbList and, when present, FAQPage. */
export function blogPostJsonLd(post: BlogPost) {
  const url = `${siteConfig.url}/blogs/${post.slug}`;
  const authorBio = getAuthorBio(post.author);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.updatedDate ?? post.date,
        ...(post.image ? { image: `${siteConfig.url}${post.image}` } : {}),
        author: {
          "@type": "Organization",
          name: authorBio.name,
          url: siteConfig.url,
          jobTitle: authorBio.role,
          description: authorBio.bio,
        },
        publisher: orgPublisherJsonLd(),
        ...(post.keywords?.length ? { keywords: post.keywords } : {}),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: post.metaTitle ?? post.title,
        description: post.metaDescription ?? post.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        primaryImageOfPage: post.image ? `${siteConfig.url}${post.image}` : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbListItems([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
          { name: post.title, path: `/blogs/${post.slug}` },
        ]),
      },
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };
}

/** JSON-LD for a case-study detail page (Article + WebPage) plus its BreadcrumbList and, when present, FAQPage. */
export function caseStudyJsonLd(c: CaseStudy) {
  const url = `${siteConfig.url}/case-studies/${c.slug}`;
  const modified = pageFreshness["case-studies"];
  const headline = `${c.nm} - ${c.cl}`;
  const description = c.metaDesc ?? c.highlight;
  const image = `${siteConfig.url}/images/og/case-${c.slug}.webp`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline,
        description,
        url,
        image,
        datePublished: modified,
        dateModified: modified,
        author: orgPublisherJsonLd(),
        publisher: orgPublisherJsonLd(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      },
      {
        "@type": "WebPage",
        name: headline,
        description,
        url,
        dateModified: modified,
        publisher: orgPublisherJsonLd(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/case-studies/${c.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbListItems([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: c.nm, path: `/case-studies/${c.slug}` },
        ]),
      },
      ...(c.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: c.faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };
}

/** JSON-LD for a solution/template detail page (SoftwareApplication). Nested inside a page's `@graph` — no own `@context`. */
export function softwareAppJsonLd(t: Template) {
  return {
    "@type": "SoftwareApplication",
    name: `${t.nm} Platform`,
    description: t.desc,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android, Web",
    url: `${siteConfig.url}/solutions/${t.id}`,
    offers: {
      "@type": "Offer",
      price: t.pr,
      priceCurrency: "USD",
    },
    provider: orgPublisherJsonLd(),
  };
}

/**
 * Product schema for the homepage - one Offer per solution template, sourced
 * from `templates` so it can never drift out of sync with real pricing/copy.
 */
export function productJsonLd({
  name,
  description,
  templates,
}: {
  name: string;
  description: string;
  templates: Template[];
}) {
  return {
    "@type": "Product",
    "@id": `${siteConfig.url}/#product`,
    url: siteConfig.url,
    name,
    description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: templates.map((t) => ({
      "@type": "Offer",
      name: t.nm,
      description: t.headline,
      url: `${siteConfig.url}/solutions/${t.id}`,
      price: String(t.pr),
      priceCurrency: "USD",
    })),
  };
}

/** WebPage JSON-LD with optional dateModified for marketing pages. */
export function webPageJsonLd({
  name,
  description,
  path,
  dateModified,
  datePublished,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
  datePublished?: string;
  type?: "WebPage" | "AboutPage";
}) {
  const url = `${siteConfig.url}${path === "/" ? "/" : path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

/** FAQPage JSON-LD from visible Q&A pairs (must match on-page copy). */
export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
