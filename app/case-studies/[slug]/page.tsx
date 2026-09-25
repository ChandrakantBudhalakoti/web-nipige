import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { CaseCard } from "@/components/cases/CaseCard";
import { CtaLink } from "@/components/ui/CtaLink";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cases, getCase } from "@/lib/data/cases";
import { buildMetadata, caseStudyJsonLd } from "@/lib/seo";
import { pageFreshness } from "@/lib/data/pageFreshness";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c)
    return buildMetadata({ title: "Case study not found", description: "", path: "/case-studies" });

  return buildMetadata({
    title: c.metaTitle ?? `${c.nm} - ${c.cl}`,
    description: c.metaDesc ?? c.highlight,
    path: `/case-studies/${c.slug}`,
    type: "article",
    modifiedTime: pageFreshness["case-studies"],
    image: `/images/og/case-${c.slug}.webp`,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const relatedCases = cases.filter((x) => x.slug !== c.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(c)) }}
      />
      <section style={{ padding: "96px 0 0" }}>
        <div className="mx">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Case Studies", href: "/case-studies" },
              { name: c.nm },
            ]}
          />
        </div>
      </section>

      <CaseDetail c={c} />

      {relatedCases.length > 0 ? (
        <section className="sec" style={{ borderTop: "1px solid var(--wb)" }} aria-labelledby="related-cases-h2">
          <div className="mx ct">
            <div className="sl">{"// related_case_studies"}</div>
            <h2 id="related-cases-h2" className="st" style={{ fontSize: 24, marginBottom: 8 }}>
              More Nipige case studies
            </h2>
            <p className="sd" style={{ marginBottom: 24 }}>
              See how other teams run production platforms on Nipige.
            </p>
          </div>
          <div className="mx">
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                maxWidth: 760,
                margin: "0 auto",
              }}
            >
              {relatedCases.map((rc) => (
                <CaseCard key={rc.slug} c={rc} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="sec" style={{ background: "var(--bg2)" }}>
        <div className="mx ct" style={{ maxWidth: 560 }}>
          <h3
            className="st"
            style={{ fontSize: 24 }}
          >
            Build something like {c.nm}.
          </h3>
          <p className="sd">Tell us your idea and we&apos;ll show the solution that fits.</p>
          <CtaLink href="/demo" variant="primary">
            Book a Demo →
          </CtaLink>
        </div>
      </section>
    </>
  );
}
