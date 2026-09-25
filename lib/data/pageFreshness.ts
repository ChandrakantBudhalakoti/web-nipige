/**
 * Per-page last-updated ISO dates. Keep in sync with visible LastUpdated UI
 * and WebPage/Article dateModified in JSON-LD.
 */
export const pageFreshness = {
  home: "2026-07-12",
  about: "2026-07-12",
  agency: "2026-07-12",
  blogs: "2026-07-12",
  "case-studies": "2026-07-12",
  demo: "2026-07-12",
  pricing: "2026-07-12",
  solutions: "2026-07-12",
  "why-nipige": "2026-07-12",
  compare: "2026-07-12",
  contact: "2026-07-12",
} as const;

export type PageFreshnessKey = keyof typeof pageFreshness;

/** Format an ISO date (YYYY-MM-DD) for visible display, e.g. "July 12, 2026". */
export function formatLastUpdated(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
