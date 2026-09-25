import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { comparisons } from "@/lib/data/compare";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { hexToRgbTriplet } from "@/lib/color";
import { CtaLink } from "@/components/ui/CtaLink";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";

const title = "Compare Nipige to Other Marketplace Platforms";
const description =
  "Compare Nipige vs Sharetribe, Mirakl, Bubble, Arcadier, and CS-Cart — pricing, features, launch speed, and total cost of ownership, side by side.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/compare",
  image: "/images/og/compare-index.webp",
});

/** Per-competitor accent color for card tinting and the hero quick-nav chips. */
const COMPETITOR_ACCENTS: Record<string, string> = {
  "sharetribe-alternatives": "#3B82F6",
  "cs-cart-alternatives": "#F97316",
  "mirakl-alternatives": "#8B5CF6",
  "arcadier-alternatives": "#10B981",
  "bubble-alternatives": "#EC4899",
};
const DEFAULT_ACCENT = "#06B6D4";

const COMPARE_FAQS = [
  {
    q: "Which platforms does Nipige compare against?",
    a: "Sharetribe, CS-Cart, Mirakl, Arcadier, and Bubble - the platforms founders most often shortlist alongside Nipige when evaluating marketplace software.",
  },
  {
    q: "How do I choose the right comparison for my marketplace?",
    a: "Start with the platform you're already considering. Each comparison covers pricing, launch speed, mobile apps, dispatch, and total cost of ownership for that specific matchup.",
  },
  {
    q: "Are these comparisons impartial?",
    a: "We source-check competitor pricing and features against public data and vendor sites, and disclose where figures are estimates. Nipige is one option among several - the goal is to help you pick the right fit, not just Nipige.",
  },
  {
    q: "What if the platform I'm considering isn't listed here?",
    a: "Book a demo and tell us what you're evaluating - we can walk through a direct comparison even if we haven't published a dedicated page for it yet.",
  },
];

const compareJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/compare#webpage`,
      url: `${siteConfig.url}/compare`,
      name: title,
      description,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: COMPARE_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function CompareIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareJsonLd) }} />

      <section className="hero hero-solo">
        <div className="hero-versus-glow" aria-hidden="true" />
        <div className="mx">
          <div className="hero-copy">
            <div className="hpill">
              <div className="hdot" />
              <span>5 head-to-head comparisons · source-checked</span>
            </div>
            <h1>
              Nipige vs. <em>the competition.</em>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "var(--wm)",
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Honest, source-checked comparisons — pricing, features, launch speed, and total cost of
              ownership — so you can pick the right platform for your marketplace.
            </p>

            <div className="hero-vswitch">
              {comparisons.map((c) => {
                const clr = COMPETITOR_ACCENTS[c.slug] ?? DEFAULT_ACCENT;
                return (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="hero-vswitch-item"
                    style={{ "--acc-rgb": hexToRgbTriplet(clr) } as CSSProperties}
                  >
                    <span className="hero-vswitch-icon">{c.competitorShort[0]}</span>
                    {c.competitorShort}
                    <span className="hero-vswitch-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="mx">
          <div className="cmp-grid">
            {comparisons.map((c) => {
              const clr = COMPETITOR_ACCENTS[c.slug] ?? DEFAULT_ACCENT;
              return (
                <article key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="cmp-card"
                    style={{ "--acc-rgb": hexToRgbTriplet(clr) } as CSSProperties}
                  >
                    <div className="cmp-card-label">
                      <span className="cmp-card-monogram">{c.competitorShort[0]}</span>
                      Nipige vs. {c.competitorShort}
                    </div>
                    <div className="cmp-card-title">{c.h1}</div>
                    <p className="cmp-card-desc">{c.intro}</p>
                    <span className="cmp-card-cta">
                      Read comparison
                      <span className="cmp-card-arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" style={{ borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct" style={{ maxWidth: 720 }}>
          <div className="sl">{"// faq"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 16 }}>
            Frequently asked questions
          </h2>
          <AnswerCapsule>
            Nipige differs from Sharetribe, Mirakl, Bubble, Arcadier, and CS-Cart mainly on
            vertical-ready templates, native GPS dispatch, and flat pricing with $0 platform
            transaction fees — trading some flexibility for a faster, more turnkey launch.
          </AnswerCapsule>
          <div className="faq-list" style={{ textAlign: "left" }}>
            {COMPARE_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct" style={{ maxWidth: 640 }}>
          <div className="fo">
            <h2 className="st" style={{ fontSize: 24, marginBottom: 8 }}>
              Not sure which platform fits your marketplace?
            </h2>
            <p style={{ fontSize: 14, color: "#404040", maxWidth: 440, margin: "0 auto 16px" }}>
              Book a 20-minute walkthrough and we&apos;ll help you scope the right fit — platform,
              vertical, and pricing.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <CtaLink href="/demo" variant="primary" small>
                Book a Demo →
              </CtaLink>
              <CtaLink href="/pricing" variant="ghost" small>
                See Pricing
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
