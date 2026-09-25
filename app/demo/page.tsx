import type { Metadata } from "next";
import { DemoForm } from "@/components/demo/DemoForm";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { pageFreshness } from "@/lib/data/pageFreshness";

const title = "Book a Nipige Demo: See Your Marketplace Live";
const description =
  "Book a personalised Nipige demo in 2026. See how to configure and launch your marketplace — including a restaurant app — in 14 days with $0 fees.";
const modified = pageFreshness.demo;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/demo",
  modifiedTime: modified,
});

const DEMO_FAQS = [
  {
    q: "How can I demonstrate a live no-code marketplace to investors quickly?",
    a: "Book a Nipige demo or configure a branded sandbox. Walk investors through ordering, payments, dispatch, and admin in a live environment within days — not months of custom build time.",
  },
  {
    q: "What happens on the demo call?",
    a: "We map your vertical, show the matching template, and walk through customer, provider, and admin flows. You leave with a clear launch path and pricing recommendation.",
  },
  {
    q: "Is there a free trial after the demo?",
    a: "Starter and Growth plans offer self-serve free trials. Business and Enterprise continue with guided onboarding after the demo.",
  },
  {
    q: "Can I see restaurant or services specifically?",
    a: "Yes. Tell us your vertical when booking — restaurant app, services marketplace, real estate, and others are available to walk through live.",
  },
  {
    q: "How is Nipige different from Sharetribe on a demo?",
    a: "We show vertical-ready apps and ops (dispatch, multi-app stacks) that often require more custom work on flexible builders. For a written comparison, see /why-nipige.",
  },
];

const demoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/demo#webpage`,
      url: `${siteConfig.url}/demo`,
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
          name: "Demo",
          item: `${siteConfig.url}/demo`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: DEMO_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const DEMO_POINTS = [
  "How to pick and configure your marketplace template",
  "Admin, vendor, and customer workflows in action",
  "$0 transaction fees and transparent pricing",
  "Native iOS & Android apps and web storefront",
  "Launch timeline: from first call to live platform in 14 days",
];

export default function DemoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(demoJsonLd) }} />
      <section className="sec" style={{ paddingTop: 104 }}>
        <div className="mx ct">
          <div className="sl">{"// book_demo"}</div>
          <h1 className="st">Book a Demo of Nipige</h1>
          <p className="sd">
            Book a personalised demo. See how to configure and launch your marketplace in 14 days with $0
            transaction fees.
          </p>
          <p className="sd" style={{ maxWidth: 560 }}>
            We&apos;ll walk you through the actual customer, provider, and admin apps for your vertical —
            restaurant, real estate, or services — configured with your branding, pricing, and zones,
            so you leave with a concrete launch plan instead of a generic slide deck.
          </p>
          <div
            style={{
              maxWidth: 560,
              margin: "0 auto 32px",
              textAlign: "left",
              background: "var(--cd)",
              border: "1px solid var(--wb)",
              borderRadius: 8,
              padding: 24,
            }}
          >
            <h2
              style={{
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 12,
                color: "var(--w)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              What you&apos;ll see
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {DEMO_POINTS.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 13,
                    color: "var(--wm)",
                    padding: "6px 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "var(--cy)", flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <DemoForm />
          <AnswerCapsule>
            A Nipige demo is a 20-minute live walkthrough of your specific marketplace vertical —
            real apps, not a slide deck — covering configuration, pricing tiers, and a launch
            timeline, with no obligation to buy.
          </AnswerCapsule>
          <section aria-label="Frequently asked questions" className="faq-list" style={{ maxWidth: 680, margin: "32px auto 0", textAlign: "left" }}>
            {DEMO_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}
