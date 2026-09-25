export interface TocItem {
  text: string;
  slug: string;
}

/** Convert heading text to a URL-safe anchor slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/** Extract H2 headings from a blog post's markdown body as a flat table of contents. */
export function extractToc(markdown: string): TocItem[] {
  const used = new Map<string, number>();
  const items: TocItem[] = [];

  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const text = match[1].replace(/[*_`]/g, "").trim();
    const base = slugify(text);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    items.push({ text, slug: count > 0 ? `${base}-${count}` : base });
  }

  return items;
}
