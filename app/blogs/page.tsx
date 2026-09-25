import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { buildMetadata, siteConfig } from "@/lib/seo";

const title = "Marketplace Business Model Examples & Blog";
const description =
  "Marketplace business model examples, food delivery app economics, scaling playbooks, and Sharetribe alternatives — practical notes from production (2026).";
const modified = pageFreshness.blogs;

const BLOG_FAQS = [
  {
    q: "What topics does the Nipige blog cover?",
    a: "Marketplace business models, cost breakdowns for building food delivery and real estate apps, platform comparisons (Sharetribe, Mirakl, and others), and step-by-step build guides for launching a multi-vendor marketplace — practical notes from production, not just theory.",
  },
  {
    q: "Who writes the articles?",
    a: "The Nipige team, drawing on what we see building and running marketplace platforms for customers across food delivery, real estate, and services.",
  },
  {
    q: "Is this blog only about Nipige's own product?",
    a: "No. Most guides cover the broader decision — build vs. buy, cost breakdowns, and platform comparisons — so you can make the right call whether or not Nipige is the right fit. Where Nipige is relevant, we say so explicitly.",
  },
  {
    q: "How often is new content published?",
    a: "New guides are added regularly as we cover new verticals and update cost or platform data, and existing posts are updated when the underlying figures change.",
  },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/blogs",
  modifiedTime: modified,
});

function buildJsonLd(visiblePosts: ReturnType<typeof getAllPosts>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/blogs#webpage`,
        url: `${siteConfig.url}/blogs`,
        name: title,
        description,
        dateModified: modified,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "Blog",
        "@id": `${siteConfig.url}/blogs#blog`,
        url: `${siteConfig.url}/blogs`,
        name: title,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        blogPost: visiblePosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${siteConfig.url}/blogs/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updatedDate ?? post.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blogs` },
        ],
      },
      {
        "@type": "ItemList",
        name: title,
        numberOfItems: visiblePosts.length,
        itemListElement: visiblePosts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: post.title,
          url: `${siteConfig.url}/blogs/${post.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: BLOG_FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  // Retired — 301-redirected to /compare/sharetribe-alternatives; kept out of listing/sitemap but not deleted.
  const visiblePosts = posts.filter((p) => p.slug !== "sharetribe-alternatives");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(visiblePosts)) }}
      />
      <section className="sec" style={{ paddingTop: 104 }}>
        <div className="mx ct">
          <div className="sl">{"// blogs"}</div>
          <h1 className="st">Marketplace Business Model Examples &amp; Platform Notes</h1>
          <p className="sd">Launch playbooks, architecture, and lessons from production — updated for 2026.</p>
        </div>

        <div className="mx">
          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--wm)" }}>No posts yet - check back soon.</p>
          ) : (
            <div className="blog-grid">
              {visiblePosts.map((post) => (
                <article key={post.slug}>
                  <Link href={`/blogs/${post.slug}`} className="blog-card">
                    {post.image ? (
                      <div className="blog-card-image">
                        <Image src={post.image} alt={post.imageAlt ?? post.title} width={640} height={360} />
                      </div>
                    ) : null}
                    <div className="mn" style={{ fontSize: 11, color: "var(--cy)", marginBottom: 10 }}>
                      {formatDate(post.date)}
                      {post.readingTime ? ` · ${post.readingTime}` : ""}
                    </div>
                    <h2
                      style={{
                        fontSize: 17,
                        fontWeight: 800,
                        letterSpacing: "-.3px",
                        marginBottom: 8,
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.65, marginBottom: 12 }}>
                      {post.description}
                    </p>
                    {post.tags?.length ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cy)" }}>Read →</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mx ct" style={{ maxWidth: 680, marginTop: 48 }}>
          <div className="sl">{"// faq"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 16 }}>
            Common questions
          </h2>
          <div className="faq-list" style={{ textAlign: "left" }}>
            {BLOG_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
