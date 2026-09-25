import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateIso: string): string {
  const date = new Date(dateIso);
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
}

export function GET() {
  // "sharetribe-alternatives" is retired — 301-redirected to /compare/sharetribe-alternatives.
  const posts = getAllPosts().filter((post) => post.slug !== "sharetribe-alternatives");

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blogs/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.metaTitle ?? post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.metaDescription ?? post.description)}</description>
      <author>${escapeXml(post.author)}</author>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = posts.length ? toRfc822(posts[0].date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog</title>
    <link>${siteConfig.url}/blogs</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
