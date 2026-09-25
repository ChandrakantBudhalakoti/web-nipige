import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { CtaLink } from "@/components/ui/CtaLink";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { templates } from "@/lib/data/templates";
import { hexToRgbTriplet } from "@/lib/color";

const title = "Marketplace Solutions - 3 Ready-to-Launch Verticals";
const description =
  "Browse Nipige's multi-vendor marketplace software solutions for 2026: restaurant, real estate, and services apps, configured without code and live in 14 days.";
const modified = pageFreshness.solutions;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/solutions",
  modifiedTime: modified,
  image: "/images/og/solutions-index.webp",
});

const SOLUTIONS_FAQS = [
  {
    q: "What vertical solutions are available?",
    a: "3 verticals: restaurant, real estate, and services — each with branded iOS, Android, and web apps.",
  },
  {
    q: "Which solution should I pick for a restaurant app?",
    a: "Choose Restaurant. It includes multi-restaurant ordering, driver GPS dispatch, surge pricing, wallet, and loyalty — configure without code.",
  },
  {
    q: "What platform supports customer app, provider app, and admin console?",
    a: "Every Nipige solution ships with the multi-app stack for that vertical (e.g. customer, restaurant, driver, and admin for food). See each solution page for the exact apps included.",
  },
  {
    q: "How long does it take to launch?",
    a: "Most teams configure branding, catalogs, zones, and payments and go live in about 14 days on managed hosting.",
  },
  {
    q: "How does this compare to a general flexible no-code builder?",
    a: "Flexible builders excel when you want fully custom UX; Nipige's multi-vendor marketplace software wins when you need vertical ops (dispatch, multi-vendor apps) packaged. See how Nipige compares on /compare.",
  },
  {
    q: "Which marketplace platform can launch my site in 14 days?",
    a: "Nipige — pick a vertical template (food, real estate, or services), configure branding, zones, and payments, then launch branded iOS, Android, and web apps in about 14 days on managed hosting, without writing code.",
  },
  {
    q: "What's a good no-code multi-vendor platform?",
    a: "Nipige is a no-code multi-vendor platform: it ships customer, provider, and admin apps per vertical, multi-tenant data isolation, payments, and $0 platform fees — configured through admin, not custom development.",
  },
  {
    q: "What's the best marketplace app builder for launching multiple native apps?",
    a: "Nipige builds the full app stack per vertical — customer, provider or driver, and admin — as branded iOS, Android, and web apps from one configuration, rather than a single generic storefront app.",
  },
  {
    q: "What do I need to launch an on-demand marketplace?",
    a: "A vertical template with booking or ordering, provider or driver dispatch, payments, and admin controls. Nipige packages all four per vertical so you configure and launch in about 14 days instead of building each piece separately.",
  },
];

const templatesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/solutions#webpage`,
      url: `${siteConfig.url}/solutions`,
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
          name: "Solutions",
          item: `${siteConfig.url}/solutions`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Nipige marketplace solutions",
      numberOfItems: templates.length,
      itemListElement: templates.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.nm,
        url: `${siteConfig.url}/solutions/${t.id}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: SOLUTIONS_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const HOW_IT_WORKS = [
  {
    i: "🎯",
    n: "Pick a solution",
    d: "Choose from 3 ready-to-launch marketplace solutions — including a restaurant app — built for real industries.",
    clr: "#06B6D4",
  },
  {
    i: "🎨",
    n: "Configure your brand",
    d: "Add your logo, colours, catalogues, vendors, and business rules - no code needed.",
    clr: "#8B5CF6",
  },
  {
    i: "🚀",
    n: "Launch in 14 days",
    d: "Get branded iOS, Android, and web apps with payments, dispatch, and hosting included.",
    clr: "#F59E0B",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(templatesJsonLd) }} />

      <section className="hero hero-solo">
        <div className="hero-spectrum-glow" aria-hidden="true" />
        <div className="mx">
          <div className="hero-copy">
            <div className="hpill">
              <div className="hdot" />
              <span>3 production verticals · live in 14 days</span>
            </div>
            <h1>
              Marketplace solutions, <em>ready to launch.</em>
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
              Multi-vendor marketplace software, packaged by industry — including a restaurant app.
              Every solution ships with branded apps, admin, payments, CRM, and delivery. Configure it
              and launch in 14 days.
            </p>
            <div className="hero-btns">
              <CtaLink href="/demo" variant="primary">
                Book a Demo →
              </CtaLink>
              <CtaLink href="/pricing" variant="ghost">
                View Pricing
              </CtaLink>
            </div>
            <div className="hero-trust">
              <span className="hero-trust-item">
                <span className="hero-trust-dot" />
                Native iOS + Android apps
              </span>
              <span className="hero-trust-item">
                <span className="hero-trust-dot" />
                $0 platform transaction fees
              </span>
              <span className="hero-trust-item">
                <span className="hero-trust-dot" />
                Managed hosting included
              </span>
            </div>

            <div className="hero-vswitch">
              {templates.slice(0, 3).map((t) => (
                <Link
                  key={t.id}
                  href={`/solutions/${t.id}`}
                  className="hero-vswitch-item"
                  style={{ "--acc-rgb": hexToRgbTriplet(t.clr) } as CSSProperties}
                >
                  <span className="hero-vswitch-icon">{t.ic}</span>
                  {t.nm}
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
          <TemplateGrid />
        </div>
      </section>

      <HowItWorks
        heading="How solutions work"
        description="From pick to launch in three steps — no code, no dev team."
        steps={HOW_IT_WORKS}
      />

      <section className="sec" style={{ borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct" style={{ maxWidth: 720 }}>
          <div className="sl">{"// pricing"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 12 }}>
            Pricing
          </h2>
          <p className="sd" style={{ marginBottom: 20 }}>
            Starter plans from $699/mo. All solutions include $0 platform transaction fees, managed hosting,
            and ongoing support.
          </p>
          <Link href="/pricing" className="btn bp">
            See all plans →
          </Link>
          <AnswerCapsule>
            Nipige offers 3 ready-to-launch marketplace verticals — Restaurant, Real Estate &amp;
            Property, and Services Marketplace — each with branded customer, provider, and admin
            apps, configured without code and launched in about 14 days with $0 platform
            transaction fees.
          </AnswerCapsule>
          <div className="faq-list" style={{ marginTop: 32, textAlign: "left" }}>
            {SOLUTIONS_FAQS.map((item) => (
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
