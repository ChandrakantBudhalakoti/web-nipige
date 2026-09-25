import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Frontmatter `readingTime` may be a bare number (e.g. `9`) - normalize to "9 min read". */
function normalizeReadingTime(value: unknown): string {
  const str = String(value);
  return /^\d+$/.test(str) ? `${str} min read` : str;
}

/** Read and parse a single MDX/Markdown post. Returns null if absent. */
function readPost(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    metaTitle: data.metaTitle ? String(data.metaTitle) : undefined,
    metaDescription: data.metaDescription ? String(data.metaDescription) : undefined,
    date: String(data.date ?? ""),
    updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
    author: String(data.author ?? "Nipige Team"),
    body: content,
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    tags: data.tags ? (Array.isArray(data.tags) ? data.tags.map(String) : [String(data.tags)]) : undefined,
    keywords: data.keywords ? (Array.isArray(data.keywords) ? data.keywords.map(String) : [String(data.keywords)]) : undefined,
    readingTime: data.readingTime ? normalizeReadingTime(data.readingTime) : undefined,
    featured: Boolean(data.featured),
    faqs: Array.isArray(data.faqs)
      ? data.faqs.map((f: { q: unknown; a: unknown }) => ({ q: String(f.q), a: String(f.a) }))
      : undefined,
  };
}

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPost(file.replace(/\.mdx$/, "")))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  return readPost(slug);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
