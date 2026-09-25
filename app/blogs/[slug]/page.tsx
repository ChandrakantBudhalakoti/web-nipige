import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { blogPostJsonLd, buildMetadata } from "@/lib/seo";
import { extractToc, slugify } from "@/lib/toc";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedReading } from "@/components/blog/RelatedReading";
import { WriterBio } from "@/components/blog/WriterBio";
import { resolveRelatedCards } from "@/lib/relatedCard";
import { getImageDimensions } from "@/lib/imageDimensions";

/** Flatten ReactMarkdown heading children (text, bold, code spans, etc.) to plain text. */
function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return headingText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Post not found", description: "", path: "/blogs" });

  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.description,
    path: `/blogs/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updatedDate ?? post.date,
    authors: [post.author],
    tags: post.tags,
    keywords: post.keywords,
    image: post.image,
  });
}

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // "sharetribe-alternatives" is retired — 301-redirected to /compare/sharetribe-alternatives.
  const otherPostHrefs = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.slug !== "sharetribe-alternatives")
    .map((p) => `/blogs/${p.slug}`);
  const relatedItems = resolveRelatedCards(otherPostHrefs);
  const toc = extractToc(post.body);
  const usedHeadingSlugs = new Map<string, number>();
  function headingId(children: ReactNode): string {
    const base = slugify(headingText(children));
    const count = usedHeadingSlugs.get(base) ?? 0;
    usedHeadingSlugs.set(base, count + 1);
    return count > 0 ? `${base}-${count}` : base;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }}
      />
      <article className="sec" style={{ paddingTop: 104 }}>
      <div className={toc.length > 1 ? "blog-post-container" : "mx"}>
        <div className={toc.length > 1 ? "blog-post-grid" : undefined} style={toc.length > 1 ? undefined : { maxWidth: 720, margin: "0 auto" }}>
          <div className="blog-post-main" style={toc.length > 1 ? undefined : { maxWidth: 720, margin: "0 auto" }}>
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blogs" },
                { name: post.title },
              ]}
            />
            <div className="mn" style={{ fontSize: 11, color: "var(--cy)", margin: "20px 0 8px" }}>
              {formatDate(post.date)} · {post.author}
            </div>
            <h1
              style={{
                fontSize: "clamp(28px,3.5vw,40px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                marginBottom: 28,
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {post.title}
            </h1>

            {post.image ? (
              <div className="blog-img-frame" style={{ margin: "0 0 24px" }}>
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  width={1200}
                  height={700}
                  priority
                  style={{ width: "100%", height: "auto", borderRadius: 10, display: "block" }}
                />
              </div>
            ) : null}

            <div className="prose-nipige" style={{ margin: 0 }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
                  img: ({ src, alt }) => {
                    const dims = typeof src === "string" ? getImageDimensions(src) : null;
                    return (
                      <span
                        className="blog-img-frame"
                        style={{ display: "block", aspectRatio: dims ? `${dims.width} / ${dims.height}` : undefined }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- inline markdown images are SVGs read at build time; next/image can't optimize local SVGs */}
                        <img
                          src={typeof src === "string" ? src : undefined}
                          alt={alt ?? ""}
                          width={dims?.width}
                          height={dims?.height}
                          loading="lazy"
                          decoding="async"
                          style={{ maxWidth: "100%", height: "auto", borderRadius: 10, display: "block" }}
                        />
                      </span>
                    );
                  },
                  table: ({ children }) => (
                    <div className="prose-table-wrap">
                      <table>{children}</table>
                    </div>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>

            <WriterBio author={post.author} />

            <RelatedReading items={relatedItems} />
          </div>

          {toc.length > 1 ? (
            <aside className="blog-toc-aside">
              <TableOfContents items={toc} />
            </aside>
          ) : null}
        </div>
      </div>
    </article>
    </>
  );
}
