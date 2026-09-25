import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { AiVsProduction } from "@/components/home/AiVsProduction";
import { CasesPreview } from "@/components/home/CasesPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FoundingOffer } from "@/components/home/FoundingOffer";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { buildMetadata, productJsonLd, siteConfig } from "@/lib/seo";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { templates } from "@/lib/data/templates";

const title = "No-Code Marketplace Builder | Launch in 14 Days, Nipige";
const description =
  "Nipige is a no-code marketplace builder to launch multi-vendor platforms — including restaurant apps, services, and real estate — in 14 days with $0 fees.";
const modified = pageFreshness.home;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/",
  modifiedTime: modified,
  image: siteConfig.ogImage,
});

const HOME_FAQS = [
  {
    q: "What is a no-code marketplace builder?",
    a: "A no-code marketplace builder lets you launch a multi-vendor marketplace by configuring ready software instead of writing code. Nipige is a no-code, white-label builder: you set up your vendors, payments, and zones and go live with customer, vendor, and admin apps in about 14 days, with $0 platform transaction fees.",
  },
  {
    q: "Can I launch a marketplace MVP in two weeks without coding?",
    a: "Yes. Nipige ships vertical-ready templates for food, real estate, and services, so you configure branding, payments, and zones and launch a branded marketplace in about 14 days without writing code. You get real customer, vendor, and admin apps on managed hosting, not just a prototype.",
  },
  {
    q: "How do I integrate Stripe or PayPal into a no-code marketplace?",
    a: "Connect Stripe or PayPal in the admin console. Checkout, payouts, and refunds run through your processor; Nipige charges $0 platform transaction fees so you only pay processor rates.",
  },
  {
    q: "How to ensure PCI compliance for payments in a no-code marketplace?",
    a: "Card data is handled by Stripe or PayPal, which are PCI DSS compliant processors. Nipige never stores raw card numbers; you follow your processor’s hosted or tokenized checkout guidance for PCI-aware launches.",
  },
  {
    q: "What vertical templates are available for a no-code marketplace?",
    a: "3 production verticals: restaurant app, real estate, and services — each with branded iOS, Android, and web apps.",
  },
  {
    q: "What support options exist for founders during launch?",
    a: "Every plan includes customer support plus hosting and updates. Growth and above add native apps; Business and Enterprise include guided onboarding and demo-led setup for investor-ready launches.",
  },
  {
    q: "Will a no-code marketplace handle early user traffic and scaling?",
    a: "Yes for early and growth traffic. Nipige runs on production-grade infrastructure; platforms such as Fast Forge process high daily order volumes on Nipige (company-reported). You can migrate to a custom codebase later if needed.",
  },
  {
    q: "Does Nipige charge transaction fees?",
    a: "No. Nipige charges a flat monthly subscription with $0 platform transaction fees. It never takes a percentage of your sales, so you keep your full commission and pay only your payment processor's standard rate, unlike marketplaces that take a cut of every transaction you process.",
  },
  {
    q: "What is the best no-code app builder for a marketplace?",
    a: "General no-code app builders (Bubble, Adalo) hand you a blank canvas — you assemble a marketplace yourself. If you're weighing the best app builder no-code founders actually launch on, Nipige is built specifically for multi-vendor marketplace software: dispatch, provider apps, and payouts ship pre-built instead of being wired up from scratch.",
  },
  {
    q: "What is the best no-code app builder for launching in days, not months?",
    a: "It depends on what you're building. For a generic app, a flexible no-code app builder gives you the most freedom. For a two-sided marketplace specifically, Nipige is faster because the multi-vendor marketplace software — vendor onboarding, dispatch, payouts — is already built, not assembled from a blank canvas.",
  },
  {
    q: "What's the best digital marketplace platform for launching quickly?",
    a: "General digital marketplace platforms give you commerce building blocks and leave dispatch, vendor apps, and payouts for you to assemble. Nipige is a digital marketplace platform built per vertical — those pieces ship configured, not blank — so launch takes about 14 days.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: `${siteConfig.url}/`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Nipige",
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      url: `${siteConfig.url}/`,
      description:
        "No-code marketplace builder that lets founders launch production-ready marketplace platforms — including restaurant apps — in 14 days.",
      offers: {
        "@type": "Offer",
        price: "699",
        priceCurrency: "USD",
      },
    },
    productJsonLd({ name: title, description, templates }),
    {
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@type": "HowTo",
      url: `${siteConfig.url}/`,
      name: "How to launch a marketplace in three steps",
      description: "Follow this path to ship a production no-code marketplace without writing application code.",
      totalTime: "P14D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Pick a solution",
          text: "Choose one of 3 verticals — restaurant, real estate, or services — each with customer, provider, and admin apps ready.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Configure it",
          text: "Set branding, pricing rules, service zones, and Stripe or PayPal. No code and no custom frontend team required.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Launch",
          text: "Go live with web and native apps, payments, and dispatch on managed hosting — typically in about 14 days.",
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <Hero />
      <StatsBar />
      <HowItWorks />

      <section className="sec" style={{ background: "var(--bg2)", borderTop: "1px solid var(--wb)" }}>
        <div className="mx">
          <div className="ct">
            <div className="sl">{"// what_you_can_build"}</div>
            <h2 className="st">What you can build</h2>
            <p className="sd">
              3 production-ready verticals of multi-vendor marketplace software — including a
              restaurant app — with native iOS, Android, and web apps included.
            </p>
          </div>
          <TemplateGrid />
        </div>
      </section>

      <AiVsProduction />
      <CasesPreview />
      <Testimonials />
      <FoundingOffer />

      <section className="sec" style={{ background: "var(--bg)", borderTop: "1px solid var(--wb)" }}>
        <div className="mx" style={{ maxWidth: 720 }}>
          <div className="ct">
            <div className="sl">{"// faq"}</div>
            <h2 className="st">Common questions about no-code marketplaces</h2>
          </div>

          <AnswerCapsule>
            Nipige is a no-code marketplace builder: pick a vertical template (restaurant, real
            estate, or services), configure branding, payments, and zones without writing code, and
            launch branded iOS, Android, and web apps in about 14 days — with $0 platform
            transaction fees.
          </AnswerCapsule>

          <div className="faq-list" style={{ marginTop: 24 }}>
            {HOME_FAQS.map((item) => (
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
