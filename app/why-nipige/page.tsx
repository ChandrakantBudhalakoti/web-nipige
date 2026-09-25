import type { Metadata } from "next";
import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { whyNipigeFaqs, whyNipigeProof, whyNipigeRows } from "@/lib/data/whyNipige";
import { buildMetadata, siteConfig } from "@/lib/seo";

const title = "Nipige vs Alternatives | Why Choose Nipige (2026)";
const description =
  "Nipige vs Sharetribe, CS-Cart, Mirakl, and Bubble: side-by-side comparison of launch speed, mobile apps, dispatch, fees, and fit for marketplace founders.";
const modified = pageFreshness["why-nipige"];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/why-nipige",
  modifiedTime: modified,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/why-nipige#webpage`,
      url: `${siteConfig.url}/why-nipige`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Why Nipige", item: `${siteConfig.url}/why-nipige` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: whyNipigeFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const DETAIL_LINKS = [
  { href: "/compare/sharetribe-alternatives", label: "Nipige vs Sharetribe" },
  { href: "/compare/cs-cart-alternatives", label: "Nipige vs CS-Cart" },
  { href: "/compare/mirakl-alternatives", label: "Nipige vs Mirakl" },
  { href: "/compare/bubble-alternatives", label: "Nipige vs Bubble" },
  { href: "/compare/arcadier-alternatives", label: "Nipige vs Arcadier" },
];

const thStyle: React.CSSProperties = {
  background: "var(--cd)",
  color: "var(--wd)",
  padding: "10px 12px",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textAlign: "left",
  position: "sticky",
  top: 0,
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid var(--wb)",
  color: "var(--wm)",
  fontSize: 13,
  verticalAlign: "top",
  lineHeight: 1.5,
};

export default function WhyNipigePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="sec" style={{ paddingTop: 104 }} aria-labelledby="why-nipige-h1">
        <div className="mx" style={{ maxWidth: 960 }}>
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Why Nipige" }]} />
          <div style={{ textAlign: "center" }}>
            <div className="sl">{"// why_nipige"}</div>
          </div>
          <h1 id="why-nipige-h1" className="st" style={{ textAlign: "center" }}>
            Nipige vs alternatives: which marketplace platform fits?
          </h1>
          <p className="sd" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            A balanced 2026 comparison of Nipige vs Sharetribe, CS-Cart, Mirakl, and Bubble — so you can
            pick the right tool for launch speed, apps, dispatch, and total cost.
          </p>
          <div style={{ textAlign: "center" }}>
            <LastUpdated date={modified} />
          </div>

          <section aria-labelledby="why-nipige-different">
            <h2 id="why-nipige-different" className="st" style={{ fontSize: 22, marginTop: 36, marginBottom: 8, textAlign: "center" }}>
              What makes Nipige different?
            </h2>
            <AnswerCapsule>
              Nipige combines four things most alternatives split apart: ready vertical templates, a fully
              managed and white-label platform, the multi-app stack (customer, vendor, driver, admin), and
              $0 platform transaction fees, live in about 14 days. The difference is the combination: a
              turnkey branded marketplace you own, not a kit you assemble.
            </AnswerCapsule>
          </section>

          <section aria-labelledby="why-nipige-table">
            <h2 id="why-nipige-table" className="st" style={{ fontSize: 22, marginTop: 40, marginBottom: 16, textAlign: "center" }}>
              Side-by-side comparison table
            </h2>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Capability</th>
                    <th style={{ ...thStyle, color: "var(--cy)" }}>Nipige</th>
                    <th style={thStyle}>Sharetribe</th>
                    <th style={thStyle}>CS-Cart</th>
                    <th style={thStyle}>Mirakl</th>
                    <th style={thStyle}>Bubble</th>
                  </tr>
                </thead>
                <tbody>
                  {whyNipigeRows.map((row) => (
                    <tr key={row.label}>
                      <td style={{ ...tdStyle, color: "var(--w)", fontWeight: 600 }}>{row.label}</td>
                      <td style={{ ...tdStyle, color: "var(--w)" }}>{row.nipige}</td>
                      <td style={tdStyle}>{row.sharetribe}</td>
                      <td style={tdStyle}>{row.csCart}</td>
                      <td style={tdStyle}>{row.mirakl}</td>
                      <td style={tdStyle}>{row.bubble}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--wd)", marginBottom: 32, textAlign: "center" }}>
              Competitor strengths are acknowledged in the “Where they shine” and “Trade-offs” rows. Feature
              details may change — verify on each vendor’s site and our{" "}
              <Link href="/compare" style={{ color: "var(--cy)" }}>
                compare pages
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="why-nipige-proof">
            <h2 id="why-nipige-proof" className="st" style={{ fontSize: 22, marginBottom: 16, textAlign: "center" }}>
              Proof and evidence
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {whyNipigeProof.map((p) => (
                <li
                  key={p.claim}
                  style={{
                    background: "var(--cd)",
                    border: "1px solid var(--wb)",
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.claim}</div>
                  <div style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.6 }}>{p.evidence}</div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="why-nipige-deepdive">
            <h2 id="why-nipige-deepdive" className="st" style={{ fontSize: 22, marginBottom: 12, textAlign: "center" }}>
              Deep-dive pages
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
              {DETAIL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--cy)",
                    border: "1px solid var(--cyr)",
                    background: "var(--cyg)",
                    borderRadius: 6,
                    padding: "8px 12px",
                    textDecoration: "none",
                  }}
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="why-nipige-switch">
            <h2 id="why-nipige-switch" className="st" style={{ fontSize: 22, marginBottom: 8, textAlign: "center" }}>
              Steps to switch to Nipige
            </h2>
            <ol style={{ fontSize: 14, color: "var(--wm)", lineHeight: 1.8, marginBottom: 32, textAlign: "center" }}>
              <li>Map your current features to a Nipige vertical (food, services, retail, etc.).</li>
              <li>Export users, catalog, and open orders from your current stack.</li>
              <li>Configure branding, payments (Stripe/PayPal), and zones in Nipige.</li>
              <li>Run a parallel pilot, then cut over DNS and app store listings.</li>
              <li>Retire or archive the old stack once metrics stabilize.</li>
            </ol>
          </section>

          <section aria-labelledby="why-nipige-cta">
            <div className="fo" style={{ marginBottom: 40 }}>
              <h2 id="why-nipige-cta" className="st" style={{ fontSize: 22, marginBottom: 8 }}>
                Ready to choose Nipige?
              </h2>
              <p style={{ fontSize: 14, color: "#404040", maxWidth: 440, margin: "0 auto 16px" }}>
                Book a demo or review transparent pricing — then launch on a vertical template.
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
          </section>

          <section aria-labelledby="why-nipige-faq">
            <div style={{ textAlign: "center" }}>
              <div className="sl">{"// faq"}</div>
            </div>
            <h2 id="why-nipige-faq" className="st" style={{ fontSize: 22, marginBottom: 16, textAlign: "center" }}>
              Common questions
            </h2>
            <div className="faq-list">
              {whyNipigeFaqs.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
