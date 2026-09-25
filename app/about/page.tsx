import type { Metadata } from "next";
import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { pageFreshness } from "@/lib/data/pageFreshness";

const title = "About Nipige | No-Code Marketplace Builder by Trigital";
const description =
  "Nipige is built by Trigital Technologies — 13+ years in enterprise billing (2026). Launch a no-code marketplace in 14 days with $0 transaction fees.";
const modified = pageFreshness.about;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/about",
  modifiedTime: modified,
});

const ABOUT_FAQS = [
  {
    q: "What is Nipige?",
    a: "Nipige is a no-code marketplace builder by Trigital Technologies. It turns 13+ years of enterprise billing R&D into vertical-ready platforms — including restaurant and services — that launch in about 14 days with $0 platform fees.",
  },
  {
    q: "Who builds Nipige?",
    a: "Trigital Technologies (founded 2013, Hyderabad) builds Nipige. The same team that engineered enterprise subscription and monetization systems now ships configurable marketplace software for founders and agencies.",
  },
  {
    q: "How is Nipige different from Sharetribe or Bubble?",
    a: "Sharetribe and Bubble excel at flexible or simple builds; Nipige ships vertical apps, native dispatch, and flat pricing with $0 platform fees so you spend less time assembling ops stacks. See /why-nipige for a balanced comparison.",
  },
  {
    q: "Is Nipige production-ready or just a prototype tool?",
    a: "Production-ready. Nipige includes multi-tenant isolation, PCI-aware payments via Stripe/PayPal, real-time dispatch, native mobile apps, and managed hosting used by live platforms across multiple countries.",
  },
  {
    q: "Where can I see proof?",
    a: "Browse case studies such as Fast Forge, Teka, LIRS, and Heartland Workforce, then book a demo to walk through a live environment.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteConfig.url}/about#webpage`,
      url: `${siteConfig.url}/about`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      mainEntity: {
        "@type": "Organization",
        name: "Nipige",
        foundingDate: "2013",
        description:
          "Nipige is a no-code marketplace builder created by Trigital Technologies, leveraging 13+ years of enterprise billing expertise to help businesses launch production platforms in 14 days with zero platform transaction fees.",
        parentOrganization: {
          "@type": "Organization",
          name: "Trigital Technologies",
        },
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/about#page`,
      url: `${siteConfig.url}/about`,
      name: title,
      description,
      dateModified: modified,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: ABOUT_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const FOUNDATION_STATS = [
  { v: "2013", l: "Founded" },
  { v: "100+", l: "Team" },
  { v: "13+", l: "Years R&D" },
  { v: "4", l: "Countries" },
];

const NGB_FEATURES = [
  { i: "📋", n: "Subscription Management", d: "Plans, trials, auto-renewal, dunning, revenue recognition." },
  { i: "💰", n: "Monetization Engine", d: "Usage billing, metered pricing, multi-currency settlement." },
  { i: "🛒", n: "E-Commerce & Marketplace", d: "Catalogues, multi-vendor, inventory, order processing." },
  { i: "🚚", n: "Logistics & Delivery", d: "GPS dispatch, route optimization, fleet analytics." },
  { i: "👥", n: "CRM & Self-Care", d: "Customer 360, self-service portals, omnichannel notifications." },
  { i: "🏢", n: "Enterprise ERP", d: "Accounts receivable, tax, financial reporting, RBAC, audit." },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <section className="sec" style={{ paddingTop: 104 }}>
        <div className="mx" style={{ maxWidth: 760 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="sl">{"// ABOUT US"}</div>
          </div>
          <h1 className="st" style={{ textAlign: "center" }}>
            13 Years of Enterprise Billing Expertise. Now Built Into One No-Code Platform.
          </h1>
          <p className="sd" style={{ maxWidth: 640 }}>
            Nipige is built by Trigital Technologies, founded in 2013. For over 13 years, we engineered
            billing and monetization infrastructure for enterprise clients — the kind of systems that
            can&apos;t afford to fail. Today, we&apos;ve turned that expertise into a{" "}
            <Link href="/solutions" style={{ color: "var(--cy)" }}>
              no-code marketplace builder
            </Link>{" "}
            that lets any business launch a production-ready platform in just 14 days, with{" "}
            <Link href="/pricing" style={{ color: "var(--cy)" }}>
              $0 platform transaction fees
            </Link>
            .
          </p>
          <div className="hero-btns" style={{ justifyContent: "flex-start" }}>
            <CtaLink href="/solutions" variant="primary">
              See How It Works →
            </CtaLink>
            <CtaLink href="/demo" variant="ghost">
              Start Building Free →
            </CtaLink>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 48px", borderTop: "1px solid var(--wb)" }}>
        <div className="mx" style={{ maxWidth: 740, paddingTop: 48 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="sl">{"// OUR_STORY"}</div>
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-.8px",
              marginBottom: 16,
              fontFamily: "var(--font-jakarta)",
              textAlign: "center",
            }}
          >
            Our Story
          </h2>
          <p style={{ fontSize: 15, color: "var(--wm)", lineHeight: 1.8, marginBottom: 16 }}>
            Founded in 2013 in Hyderabad, Trigital Technologies spent 13+ years building billing,
            revenue management, and digital commerce systems for enterprise clients. From Magnaquest
            and Paktolus to Josh Software, our team learned how to make platforms that scale under
            real transaction volume.
          </p>
          <div className="ab-stats">
            {FOUNDATION_STATS.map((s) => (
              <div
                key={s.l}
                style={{
                  textAlign: "center",
                  padding: 20,
                  borderRadius: 8,
                  background: "var(--cd)",
                  border: "1px solid var(--wb)",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "var(--cy)",
                    fontFamily: "var(--font-jakarta)",
                  }}
                >
                  {s.v}
                </div>
                <div className="mn" style={{ fontSize: 10, color: "var(--wd)" }}>
                  {s.l.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
        <div className="mx" style={{ maxWidth: 740 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="sl">{"// THE_TRANSFORMATION"}</div>
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-.8px",
              marginBottom: 16,
              fontFamily: "var(--font-jakarta)",
              textAlign: "center",
            }}
          >
            From Enterprise Clients to No-Code Simplicity
          </h2>
          <p style={{ fontSize: 15, color: "var(--wm)", lineHeight: 1.8, marginBottom: 16 }}>
            Before Nipige, we built <strong style={{ color: "var(--w)" }}>NGB</strong> — a
            comprehensive Subscription Management &amp; Monetization Platform with extensive ERP
            capabilities.
          </p>

          <div className="ab-feats">
            {NGB_FEATURES.map((f) => (
              <div
                key={f.n}
                style={{
                  background: "var(--cd)",
                  border: "1px solid var(--wb)",
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                  {f.i} {f.n}
                </div>
                <p style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.6, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "var(--cyg)",
              border: "1px solid var(--cyr)",
              borderRadius: 8,
              padding: 20,
              marginTop: 16,
            }}
          >
            <p style={{ fontSize: 14, color: "var(--wm)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--w)" }}>NGB → Nipige:</strong> NGB&apos;s subscription
              engine, payment orchestration, and ERP became Nipige&apos;s core. We added marketplace
              logic, delivery dispatch, mobile apps, AI recommendations, and configurable solutions
              on top — then made it all configurable without code.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
        <div className="mx" style={{ maxWidth: 740 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="sl">{"// WHY_CHOOSE_NIPIGE"}</div>
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-.8px",
              marginBottom: 16,
              fontFamily: "var(--font-jakarta)",
              textAlign: "center",
            }}
          >
            Why Businesses Choose Nipige in 2026
          </h2>
          <p style={{ fontSize: 15, color: "var(--wm)", lineHeight: 1.8, marginBottom: 16 }}>
            Most no-code tools ship prototypes. Nipige ships production infrastructure — the same
            kind we used to build for enterprise billing. That means multi-tenant isolation, PCI-ready
            payments, real-time dispatch, native mobile apps, and 24/7 infrastructure, all ready in
            14 days.
          </p>
          <div className="faq-list" style={{ marginTop: 24, marginBottom: 24 }}>
            {ABOUT_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
          <div
            style={{
              background: "var(--cd)",
              border: "1px solid var(--wb)",
              borderRadius: 8,
              padding: 36,
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-.5px",
                marginBottom: 6,
                fontFamily: "var(--font-jakarta)",
              }}
            >
              Ready to build your platform?
            </h3>
            <p style={{ fontSize: 14, color: "var(--wm)", marginBottom: 20 }}>
              Talk to our founders directly.
            </p>
            <CtaLink href="/demo" variant="primary">
              Book a Founder Call →
            </CtaLink>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
        <div className="mx" style={{ maxWidth: 740 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="sl">{"// EXPLORE"}</div>
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-.5px",
              marginBottom: 16,
              fontFamily: "var(--font-jakarta)",
              textAlign: "center",
            }}
          >
            Explore Nipige
          </h2>
          <p style={{ fontSize: 15, color: "var(--wm)", lineHeight: 1.7, marginBottom: 16 }}>
            See the solutions we have shipped, how we price them, and how founders go live in 14
            days.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/solutions" className="btn bp" style={{ fontSize: 13 }}>
              All Solutions →
            </Link>
            <Link href="/case-studies" className="btn bp" style={{ fontSize: 13 }}>
              Case Studies →
            </Link>
            <Link href="/pricing" className="btn bp" style={{ fontSize: 13 }}>
              Pricing →
            </Link>
            <Link href="/demo" className="btn bp" style={{ fontSize: 13 }}>
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
