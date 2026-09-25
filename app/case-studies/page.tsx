import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CaseCard } from "@/components/cases/CaseCard";
import { Testimonials } from "@/components/home/Testimonials";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { cases } from "@/lib/data/cases";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { hexToRgbTriplet } from "@/lib/color";

const title = "Case Studies - Production-Grade, Battle-Tested";
const description =
  "Live Nipige platforms across India, Nigeria, South Africa, and the USA (2026): Teka, LIRS, The Lions App, Calonex, Fast Forge, and Heartland Workforce.";
const modified = pageFreshness["case-studies"];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/case-studies",
  modifiedTime: modified,
  image: "/images/og/case-studies-index.webp",
});

const CASE_FAQS = [
  {
    q: "What proof does Nipige have in production?",
    a: "Live platforms include Fast Forge (high daily order volume, company-reported), Teka, LIRS tax systems, The Lions App, Calonex, and Heartland Workforce — across India, Nigeria, South Africa, and the USA.",
  },
  {
    q: "Can Nipige handle real transaction volume?",
    a: "Yes. Case studies show production workloads such as high invoice or order throughput on managed Nipige infrastructure, not just demo sandboxes.",
  },
  {
    q: "How does this compare to building on Sharetribe or custom code?",
    a: "Custom builds and flexible tools can win on unique UX, but these case studies show Nipige shipping multi-app marketplaces and delivery ops without multi-year engineering. See /why-nipige for a balanced comparison.",
  },
  {
    q: "Where should I go next after reading a case study?",
    a: "Open the matching solution template, review pricing, or book a demo to map your use case to a proven vertical.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/case-studies#webpage`,
      url: `${siteConfig.url}/case-studies`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteConfig.url}/case-studies` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: CASE_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const countryCount = new Set(cases.map((c) => c.co)).size;

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero hero-solo">
        <div className="hero-proof-glow" aria-hidden="true" />
        <div className="mx">
          <div className="hero-copy">
            <div className="hpill">
              <div className="hdot" />
              <span>
                {cases.length} live platforms · {countryCount} countries
              </span>
            </div>
            <h1>
              Case studies: <em>production-grade, battle-tested.</em>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "var(--wm)",
                lineHeight: 1.7,
                marginBottom: 8,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Live platforms, real transactions, 24/7 across India, Nigeria, South Africa, and the USA
              — 2026.
            </p>
            <LastUpdated date={modified} />

            <div className="hero-vswitch" style={{ marginTop: 28 }}>
              {cases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="hero-vswitch-item"
                  style={{ "--acc-rgb": hexToRgbTriplet(c.clr) } as CSSProperties}
                >
                  <span className="hero-vswitch-icon">{c.ic}</span>
                  {c.nm}
                  <span className="hero-vswitch-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="mx">
          <div className="case-grid">
            {cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials label="// testimonials" title="What our customers say" background="var(--bg2)" />

      <section className="sec" style={{ borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct" style={{ maxWidth: 720 }}>
          <div className="sl">{"// faq"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 16 }}>
            Frequently asked questions
          </h2>
          <div className="faq-list" style={{ textAlign: "left" }}>
            {CASE_FAQS.map((item) => (
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
