/** Domain types for the Nipige marketing site. */

export interface TemplateApp {
  /** App / panel name */
  n: string;
  /** Accent colour (hex) */
  c: string;
  /** Short description */
  d: string;
}

export interface TemplateFeature {
  /** Emoji icon */
  i: string;
  /** Feature name */
  n: string;
  /** Feature description */
  d: string;
}

/**
 * Four-tier monthly pricing for a solution: [Starter, Growth, Business, Enterprise].
 * Numbers are USD / month; the Enterprise entry is a "from" string (e.g. "5,499+").
 * `null` means the tier is not offered for that solution (e.g. Super App has no
 * Starter/Growth tier).
 */
export type SolutionPrices = [number | null, number | null, number, string];

export interface Template {
  id: string;
  /** Display name */
  nm: string;
  /** Emoji icon */
  ic: string;
  /** Accent colour (hex) */
  clr: string;
  /** Real photo shown as the card/hero banner, e.g. "/images/solutions/food-hero.jpg" */
  img?: string;
  /** Complexity label */
  cx: string;
  /** Starting price (USD / month) - equals the lowest offered tier in `prices`. */
  pr: number;
  /** Per-tier monthly pricing, drives the pricing-page solution selector. */
  prices: SolutionPrices;
  /** Featured ("top market") flag */
  top: boolean;
  desc: string;
  headline: string;
  apps: TemplateApp[];
  feats: TemplateFeature[];
  /** Ideal buyer description */
  buyers: string;
  /** SEO / page overrides */
  metaTitle?: string;
  metaDesc?: string;
  h1?: string;
  intro?: string;
  /** YouTube video ID for the "Product Demo Video" section (e.g. "dQw4w9WgXcQ"). Falls back to the "coming soon" placeholder when absent. */
  demoVideoId?: string;
  /** Slugs of case studies (from lib/data/cases) that are a genuine vertical match for this solution — rendered as proof links when present. */
  relatedCaseSlugs?: string[];
  faqs?: { q: string; a: string }[];
}

export interface CaseResult {
  /** Value, e.g. "35M" */
  v: string;
  /** Label, e.g. "Invoices / Month" */
  l: string;
}

/** A titled narrative block in a case-study story (Challenge, Vision, Build…). */
export interface CaseBlock {
  /** Heading, e.g. "The Challenge" */
  h: string;
  /** Body copy */
  b: string;
  /** Optional inline link — `anchor` must appear verbatim inside `b`; rendered as a real link there. */
  link?: { anchor: string; href: string };
}

export interface CaseStudy {
  /** URL slug */
  slug: string;
  nm: string;
  /** Classification, e.g. "Hyperlocal Marketplace" */
  cl: string;
  /** Country */
  co: string;
  /** Emoji / flag */
  ic: string;
  /** Status badge text */
  stat: string;
  /** Accent colour (hex) */
  clr: string;
  challenge: string;
  solution: string;
  results: CaseResult[];

  /** Remote brand-logo URL (falls back to a monogram tile if it fails). */
  logo?: string;
  /** One-line headline shown on the listing card. */
  highlight: string;
  /** Industry / vertical label. */
  industry?: string;
  /** Delivery year or status, e.g. "2024", "Phase I". */
  year?: string;
  /** Ordered narrative blocks rendered on the detail page. */
  story: CaseBlock[];
  /** Core features / capabilities delivered. */
  features?: string[];
  /** Larger metric grid (impact numbers) for the detail page. */
  metrics?: CaseResult[];
  /** Customer feedback / outcome bullets. */
  feedback?: string[];
  /** Technology stack chips. */
  tech?: string[];
  /** SEO title override — keeps <title> within ~60 chars without changing the on-page H1. */
  metaTitle?: string;
  /** On-page H1 override — falls back to `nm` when absent. Keep related to `metaTitle` for consistency. */
  h1?: string;
  /** SEO description override (120-160 chars) — falls back to `highlight` when absent. */
  metaDesc?: string;
  /** FAQ entries — rendered on-page and as FAQPage JSON-LD when present. */
  faqs?: { q: string; a: string }[];
}

export interface Testimonial {
  q: string;
  name: string;
  note?: string;
}

export interface PricingTier {
  n: string;
  /** Price - number (USD/mo) or a label like "Custom" */
  p: number | string;
  /** Annual sub-label */
  a: string;
  /** Tagline */
  d: string;
  /** Most-popular flag */
  pop?: number;
  /** Included features */
  f: string[];
  /** Excluded features */
  no: string[];
  /** CTA label */
  ct: string;
  /** Button background colour */
  bg: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** SEO title override (frontmatter `metaTitle`) — keeps <title> within ~60 chars without changing the on-page H1. */
  metaTitle?: string;
  /** SEO description override (frontmatter `metaDescription`) — keeps meta description within ~160 chars. */
  metaDescription?: string;
  date: string;
  /** Last-modified date (frontmatter `updatedDate`); falls back to `date` if absent. */
  updatedDate?: string;
  author: string;
  body: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  keywords?: string[];
  readingTime?: string;
  featured?: boolean;
  /** FAQ entries (frontmatter `faqs`) — rendered as FAQPage JSON-LD when present. */
  faqs?: { q: string; a: string }[];
}
