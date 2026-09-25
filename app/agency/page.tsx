import type { Metadata } from "next";
import Link from "next/link";
import { AgencyForm } from "@/components/agency/AgencyForm";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { pageFreshness } from "@/lib/data/pageFreshness";

const title = "Agency Program | White-Label Marketplace Platform";
const description =
  "Launch white-label marketplaces for clients in 2 weeks (2026). Agencies get 25% wholesale pricing, 100% branding control, and $1,000+ margin per client.";
const modified = pageFreshness.agency;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/agency",
  modifiedTime: modified,
});

const AGENCY_FAQS = [
  {
    q: "Can I white-label and resell Nipige marketplaces?",
    a: "Yes. Buy at 25% wholesale, brand it as your own, and resell to clients — keeping $1,000+ margin per client on typical Food, Services, and Real Estate deals.",
  },
  {
    q: "Do I need developers?",
    a: "No. You configure pre-built verticals — including restaurant apps — without code and deliver a client platform in about 2 weeks.",
  },
  {
    q: "How does Nipige compare to building on Sharetribe or Bubble for clients?",
    a: "Sharetribe and Bubble can work for custom agency builds, but often need more developer time. Nipige ships vertical apps and dispatch so agencies can productize delivery in weeks. See /why-nipige for a balanced comparison.",
  },
  {
    q: "What if a client cancels or wants to leave?",
    a: "Plans are designed for agency flexibility. We help with data handoff and migration planning so clients are not locked into an opaque black box.",
  },
  {
    q: "Is there a guarantee on margins?",
    a: "Suggested client prices are guidance only — your margin depends on what you charge. Wholesale discounts start at 25% and improve with volume.",
  },
  {
    q: "How do I get started?",
    a: "Apply below. We review fit, share wholesale pricing, and help you pick the first vertical to productize for your pipeline.",
  },
];

const agencyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/agency#webpage`,
      url: `${siteConfig.url}/agency`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteConfig.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Agency",
          item: `${siteConfig.url}/agency`,
        },
      ],
    },
    {
      "@type": "Service",
      name: "Nipige Agency White-Label Program",
      provider: {
        "@type": "Organization",
        name: "Nipige",
        url: siteConfig.url,
        parentOrganization: {
          "@type": "Organization",
          name: "Trigital Technologies",
        },
      },
      description:
        "A white-label marketplace platform allowing agencies to resell production-ready marketplaces to clients at 25% wholesale pricing with full branding control.",
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          description: "25% wholesale discount for agency partners",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: AGENCY_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

const AGENCY_STATS = [
  { v: "25%", l: "Wholesale Discount" },
  { v: "100%", l: "White-Label" },
  { v: "$1K+", l: "Margin / Client" },
];

const AGENCY_PRICING: { solution: string; cost: string; client: string; margin: string }[] = [
  { solution: "Services Marketplace", cost: "$974", client: "$2,000–$4,000", margin: "$1,026+" },
  { solution: "Restaurant", cost: "$1,274", client: "$3,000–$6,000", margin: "$1,726+" },
  { solution: "Real Estate", cost: "$1,274", client: "$3,000–$6,000", margin: "$1,726+" },
];

const VOLUME_TIERS: { off: string; range: string; label: string }[] = [
  { off: "25% off", range: "1–4 instances", label: "Standard" },
  { off: "30% off", range: "5–9 instances", label: "Volume" },
  { off: "35% off", range: "10+ instances", label: "Strategic" },
];

const HEAD_CELL: React.CSSProperties = {
  background: "var(--cd)",
  color: "var(--wd)",
  padding: "8px 10px",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
};

const BODY_CELL: React.CSSProperties = {
  padding: "8px 10px",
  borderBottom: "1px solid var(--wb)",
  color: "var(--wm)",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 800,
  letterSpacing: "-.5px",
  marginBottom: 16,
  fontFamily: "var(--font-jakarta)",
  textAlign: "center",
};

export default function AgencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyJsonLd) }} />
      <section className="sec" style={{ paddingTop: 104 }}>
        <div className="mx ct" style={{ maxWidth: 760 }}>
          {/* Hero */}
          <div className="sl">{"// AGENCY_PROGRAM"}</div>
          <h1 className="st">White-Label Marketplace Platform for Agencies</h1>
          <p className="sd" style={{ maxWidth: 560 }}>
            Nipige lets agencies design, launch, and resell production marketplaces for clients —{" "}
            <Link href="/solutions" style={{ color: "var(--cy)", textDecoration: "underline" }}>
              no development team required
            </Link>
            . Buy at 25% wholesale, resell under 100% your own brand, and keep{" "}
            <Link href="/pricing" style={{ color: "var(--cy)", textDecoration: "underline" }}>
              $1,000+ margin per client
            </Link>
            . Deliver a live platform in 2 weeks, not 6 months.
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="#apply" className="btn bp">
              Become a Partner →
            </a>
          </div>

          {/* How the Agency Program Works */}
          <section aria-labelledby="agency-how-it-works" style={{ margin: "32px 0", textAlign: "left" }}>
            <h2 id="agency-how-it-works" style={sectionHeadingStyle}>How the Agency Program Works</h2>
            <div className="ag-grid">
              {AGENCY_STATS.map((s, i) => (
                <div className="agency-card" key={s.l} style={{ padding: 20 }}>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: "var(--cy)",
                      fontFamily: "var(--font-jakarta)",
                    }}
                    aria-label={
                      i === 0
                        ? "25% wholesale discount for agency partners"
                        : i === 1
                          ? "100% white-label branding for agency clients"
                          : "$1000+ profit margin per client with Nipige"
                    }
                  >
                    {s.v}
                  </div>
                  <div className="mn" style={{ fontSize: 10, color: "var(--wd)" }}>
                    {s.l.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--wm)",
                lineHeight: 1.7,
                textAlign: "left",
                marginTop: 16,
              }}
            >
              Buy at 25% off list price. Resell at your price. Your brand on everything — logo, domain,
              and client-facing UI. We handle infrastructure, hosting, and updates, so you focus on
              client relationships and growth.
            </p>
          </section>

          {/* Why Agencies Choose Nipige */}
          <section aria-labelledby="agency-why-choose" style={{ margin: "32px 0", textAlign: "left" }}>
            <h2 id="agency-why-choose" style={sectionHeadingStyle}>Why Agencies Choose Nipige</h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--wm)",
                lineHeight: 1.7,
                textAlign: "left",
                marginBottom: 20,
              }}
            >
              <strong style={{ color: "var(--w)" }}>White-label included</strong> at Business tier and
              above. Your brand on everything — consumer apps, admin panel, emails, push notifications.
              No Nipige branding visible to your clients.
            </p>
            <AnswerCapsule>
              Agencies join Nipige&apos;s partner program to resell white-label marketplace
              platforms at 25% off list price, launching client projects in about 2 weeks with
              full branding control and $1,000+ margin per client.
            </AnswerCapsule>
            <div className="faq-list">
              {AGENCY_FAQS.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">{item.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Pricing & Margin Breakdown */}
          <section aria-labelledby="agency-pricing" style={{ margin: "32px 0", textAlign: "left" }}>
            <h2 id="agency-pricing" style={sectionHeadingStyle}>Pricing & Margin Breakdown</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ ...HEAD_CELL, textAlign: "left" }}>Solution</th>
                    <th style={HEAD_CELL}>Your Cost</th>
                    <th style={HEAD_CELL}>Suggested Client Price</th>
                    <th style={{ ...HEAD_CELL, color: "var(--cy)" }}>Your Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {AGENCY_PRICING.map((r) => (
                    <tr key={r.solution}>
                      <td style={{ ...BODY_CELL, color: "var(--w)", fontWeight: 600 }}>{r.solution}</td>
                      <td style={{ ...BODY_CELL, textAlign: "center" }}>{r.cost}/mo</td>
                      <td style={{ ...BODY_CELL, textAlign: "center" }}>{r.client}/mo</td>
                      <td style={{ ...BODY_CELL, textAlign: "center", color: "var(--cy)", fontWeight: 700 }}>
                        {r.margin}/mo
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ag-grid" style={{ margin: "20px 0" }}>
              {VOLUME_TIERS.map((t) => (
                <div className="agency-card" key={t.label} style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--cy)", fontFamily: "var(--font-jakarta)" }}>
                    {t.off}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--wm)", marginTop: 4 }}>{t.range}</div>
                  <div className="mn" style={{ fontSize: 10, color: "var(--wd)", marginTop: 2 }}>
                    {t.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Apply to the Agency Program */}
          <section id="apply" aria-labelledby="agency-apply" style={{ margin: "32px 0", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl">{"// apply"}</div>
            </div>
            <h2 id="agency-apply" style={sectionHeadingStyle}>Apply to the Agency Program</h2>
            <AgencyForm />
          </section>
        </div>
      </section>
    </>
  );
}
