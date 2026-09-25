import type { Metadata } from "next";
import Link from "next/link";
import { PricingTable } from "@/components/pricing/PricingTable";
import { PlanLimits } from "@/components/pricing/PlanLimits";
import { CtaLink } from "@/components/ui/CtaLink";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { tiers } from "@/lib/data/pricing";
import { pageFreshness } from "@/lib/data/pageFreshness";

const title = "Marketplace Builder Pricing - $0 Transaction Fees";
const description =
  "Nipige marketplace builder pricing for 2026: transparent plans from $699/mo, $0 transaction fees, free trial. Includes restaurant and multi-vendor apps.";
const modified = pageFreshness.pricing;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/pricing",
  modifiedTime: modified,
});

const PRICING_FAQS = [
  {
    q: "How much does a no-code marketplace cost with Nipige?",
    a: "Nipige uses flat monthly plans with $0 platform transaction fees, priced by vertical: services plans start from $699 a month, and food and real estate from $899 a month. You pay only your payment processor's standard rate on top, with no per-order commission. See the plans for current tiers.",
  },
  {
    q: "What is the real marketplace software cost, beyond the sticker price?",
    a: "Marketplace software cost has two parts: the platform fee and everything around it. Nipige's marketplace builder pricing is flat and all-inclusive ($699+/mo); your only other line item is payment processor fees, since Nipige charges $0 platform transaction fees. See what to look for in marketplace software for the full picture beyond price.",
  },
  {
    q: "How much will a no-code marketplace cost for a startup?",
    a: "Most startups start on Starter or Growth ($699–$1,699/mo depending on vertical). Budget separately for payment processor fees and optional app-store developer accounts. There is no Nipige take-rate on GMV.",
  },
  {
    q: "What hidden costs should founders watch when building a no-code marketplace MVP?",
    a: "Watch processor fees, SMS/push notification overages if you exceed plan limits, custom integrations beyond the template, and go-live content (menus, providers). Nipige itself is flat monthly pricing with $0 platform transaction fees.",
  },
  {
    q: "Does Nipige take a commission on sales?",
    a: "No. Nipige never takes a percentage of your sales. You pay a flat monthly subscription with $0 platform transaction fees, so all of each order's margin stays with you, minus only your payment processor's standard fee. That is the core difference from aggregators that charge per-order commission.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — Starter and Growth have a self-serve free trial, no card required. Business and Enterprise are demo-led so we can scope verticals and compliance needs.",
  },
  {
    q: "Can I change or cancel my plan later?",
    a: "Yes. Nipige plans are billed monthly, so you can upgrade or downgrade as your marketplace grows and your vendor count changes. Because it is a subscription and not a one-time build, you are never locked into a large upfront cost. Confirm exact cancellation and refund terms on the pricing page.",
  },
  {
    q: "What's included in each plan?",
    a: "All-inclusive — software, managed hosting, support, and (from Growth) native iOS and Android apps. Restaurant and other vertical templates select their own tier pricing on the same structure.",
  },
  {
    q: "How do I estimate total cost of a no-code marketplace MVP?",
    a: "Add (1) your Nipige plan, (2) payment processor fees, (3) any third-party SMS/maps usage, and (4) optional agency or content work. Use the plan table above, then book a demo for a written estimate.",
  },
  {
    q: "What are the main marketplace monetization strategies?",
    a: "The four common models are commission/take-rate, flat subscription, listing fees, and freemium-plus-upsells. Take-rate scales with GMV, but it caps founder margin at high volume. A flat-subscription model like Nipige's keeps 100% of GMV instead — which favors high-volume, thin-margin verticals like restaurant delivery.",
  },
  {
    q: "Is a commission-based or subscription-based marketplace model better?",
    a: "Commission works when GMV per transaction is low and volume is unpredictable. Subscription works once volume is steady, because a flat fee stops taking a growing cut as you scale. Nipige uses a flat subscription with $0 platform transaction fees specifically so growth doesn't cost you margin.",
  },
  {
    q: "How much commission do most marketplaces charge?",
    a: "Take-rate marketplaces typically charge 8–30% depending on vertical — service marketplaces often 8–25%, retail lower. Nipige charges $0 platform commission instead of a take-rate; you pay only your payment processor.",
  },
  {
    q: "Can a marketplace make money without taking a commission?",
    a: "Yes — with a flat subscription fee instead of a percentage of GMV. That's Nipige's model. Operators pay one monthly platform fee and keep the rest of each transaction's value, beyond processor costs. This changes the unit economics at scale, compared to take-rate competitors.",
  },
  {
    q: "What's the best monetization model for a multi-vendor marketplace?",
    a: "It depends on vendor count and order value. High-volume, low-margin verticals like restaurant delivery favor $0-commission subscription pricing so margin isn't eroded per order. Lower-volume, high-value verticals like real estate can absorb a commission since each transaction carries more value.",
  },
  {
    q: "How do wallet and loyalty features affect marketplace monetization?",
    a: "Wallet and loyalty programs increase repeat-order frequency and reduce churn, raising customer lifetime value without raising your take-rate. Nipige's Growth tier and above include wallet and loyalty tooling as part of the flat subscription, not a separate monetization layer.",
  },
  {
    q: "Should marketplace pricing be flat-fee or usage-based?",
    a: "Flat-fee pricing gives predictable costs as you scale — the model Nipige uses. Usage-based (per-transaction) pricing is common with take-rate marketplaces. But platform cost then grows in step with revenue, which compresses margin exactly when volume is highest.",
  },
  {
    q: "How does Nipige's $0 take-rate model compare to commission-based platforms?",
    a: "Commission-based platforms take a cut of every order, so platform cost scales with GMV. Nipige charges a flat monthly fee and $0 platform transaction fees, so a marketplace doing $50K/month and one doing $500K/month pay the same platform cost — only processor fees scale.",
  },
  {
    q: "Is Nipige PCI compliant for payments?",
    a: "Card data is handled entirely by Stripe or PayPal, both PCI DSS compliant processors, and Nipige never stores raw card numbers. Payments run through hosted, tokenized checkout, so you get PCI-compliant payment handling without managing that compliance burden yourself.",
  },
  {
    q: "Do I get branded mobile apps?",
    a: "Yes. From the Growth plan up, Nipige includes native iOS and Android apps published under your own brand, alongside the web app. The Starter plan is web-only. Native apps ship as part of the plan, with no separate app-development cost.",
  },
];

const FAQ_AUTO_LINKS: { phrase: string; href: string }[] = [
  { phrase: "what to look for in marketplace software", href: "/blogs/how-to-choose-marketplace-software" },
];

function renderFaqAnswer(text: string) {
  for (const { phrase, href } of FAQ_AUTO_LINKS) {
    const idx = text.indexOf(phrase);
    if (idx === -1) continue;
    return (
      <>
        {text.slice(0, idx)}
        <Link href={href} style={{ color: "var(--cy)" }}>
          {phrase}
        </Link>
        {text.slice(idx + phrase.length)}
      </>
    );
  }
  return text;
}

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/pricing#webpage`,
      url: `${siteConfig.url}/pricing`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Nipige Marketplace Platform",
      description,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      url: `${siteConfig.url}/pricing`,
      offers: tiers
        .filter((t): t is typeof t & { p: number } => typeof t.p === "number")
        .map((t) => ({
          "@type": "Offer",
          name: `${t.n} plan`,
          price: t.p,
          priceCurrency: "USD",
          url: `${siteConfig.url}/pricing`,
          availability: "https://schema.org/InStock",
        })),
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
          name: "Pricing",
          item: `${siteConfig.url}/pricing`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQS.map((item) => ({
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

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 800,
  letterSpacing: "-.8px",
  marginBottom: 16,
  fontFamily: "var(--font-jakarta)",
  textAlign: "center",
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <section className="sec" style={{ paddingTop: 104 }} aria-labelledby="pricing-h1">
        <div className="mx ct">
          <div className="sl">{"// pricing"}</div>
          <h1 id="pricing-h1" className="st">Marketplace Builder Pricing With $0 Transaction Fees</h1>
          <p className="sd" style={{ marginBottom: 8 }}>
            Software + hosting + support + updates. One subscription. Zero transaction fees — 2026 plans.
          </p>
          <section aria-labelledby="pricing-plans" style={{ marginTop: 36 }}>
            <h2 id="pricing-plans" style={sectionHeadingStyle}>Plans overview</h2>
            <PricingTable />
          </section>

          <section aria-labelledby="pricing-included" style={{ marginTop: 48, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <h2 id="pricing-included" style={sectionHeadingStyle}>What&apos;s included</h2>
            <p style={{ fontSize: 14, color: "var(--wm)", lineHeight: 1.7, marginBottom: 16 }}>
              Every Nipige plan is all-inclusive: the full marketplace platform, managed cloud hosting,
              ongoing updates, and customer support. Growth, Business and Enterprise also include native
              iOS and Android apps. There are no hidden platform fees or usage charges from Nipige.
            </p>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "8px 16px",
                fontSize: 13,
                color: "var(--wm)",
                textAlign: "left",
                listStyle: "none",
              }}
            >
              {[
                "Marketplace software",
                "Managed hosting",
                "Customer support",
                "Platform updates",
                "Native iOS & Android apps (Growth+)",
                "$0 platform transaction fees",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--cy)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="pricing-vs-sharetribe" style={{ marginTop: 48, maxWidth: 720, marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
            <h2 id="pricing-vs-sharetribe" style={sectionHeadingStyle}>Nipige vs Sharetribe and other alternatives on cost</h2>
            <p style={{ fontSize: 15, color: "var(--w)", lineHeight: 1.7, marginTop: 8, marginBottom: 16, maxWidth: 720 }}>
              Sharetribe and similar builders often trade simplicity for limits, or flexibility for
              developer cost. Nipige packages vertical apps (including restaurant) with flat pricing
              and $0 platform fees so founders can estimate TCO without a surprise take-rate. See the
              full side-by-side on{" "}
              <Link href="/why-nipige" style={{ color: "var(--cy)", fontWeight: 600 }}>
                Why Nipige
              </Link>{" "}
              and{" "}
              <Link href="/compare/sharetribe-alternatives" style={{ color: "var(--cy)", fontWeight: 600 }}>
                Sharetribe alternatives
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="pricing-zero-fees" style={{ marginTop: 48 }}>
            <h2 id="pricing-zero-fees" style={sectionHeadingStyle}>$0 transaction fees explained</h2>
            <div
              style={{
                background: "var(--cyg)",
                border: "1px solid var(--cyr)",
                borderRadius: 8,
                padding: 32,
                textAlign: "center",
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--w)", marginBottom: 8 }}>
                $0 Transaction Fees
              </p>
              <p style={{ fontSize: 13, color: "var(--wm)", maxWidth: 480, margin: "0 auto" }}>
                Nipige charges zero platform fees. Payment processor fees go to Stripe/PayPal, not us.
              </p>
            </div>
          </section>

          <section aria-labelledby="pricing-tier-comparison" style={{ marginTop: 48 }}>
            <h2 id="pricing-tier-comparison" style={sectionHeadingStyle}>Starter vs Growth vs Business vs Enterprise</h2>
            <PlanLimits />
          </section>

          <section aria-labelledby="pricing-founding-rate" className="fo" style={{ marginTop: 48 }}>
            <div className="fo-bd">First 20 · USA & Canada</div>
            <h2 id="pricing-founding-rate" className="st" style={{ fontSize: 24, marginBottom: 8 }}>
              Founding rate: <span style={{ color: "var(--am)" }}>20% off for 12 months.</span>
            </h2>
            <p style={{ fontSize: 14, color: "#404040", maxWidth: 440, margin: "0 auto 20px" }}>
              Be one of our first 20 US/Canada customers.
            </p>
            <CtaLink href="/demo" variant="primary" small>
              Get Pricing / Start Free Trial →
            </CtaLink>
          </section>

          <section aria-labelledby="pricing-faq" style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <div className="ct">
              <div className="sl">{"// faq"}</div>
              <h2 id="pricing-faq" className="st" style={{ fontSize: 24 }}>
                Common questions
              </h2>
            </div>
            <AnswerCapsule>
              Nipige pricing runs $699–$4,499+/mo across Starter, Growth, Business, and Enterprise
              tiers, with the exact figure depending on your vertical (restaurant, real estate, or
              services). Every tier includes $0 platform transaction fees — you only pay your
              payment processor.
            </AnswerCapsule>
            <div className="faq-list">
              {PRICING_FAQS.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">{renderFaqAnswer(item.a)}</div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
