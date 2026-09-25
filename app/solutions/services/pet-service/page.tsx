import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PetflokAppMockup } from "@/components/solutions/PetflokAppMockup";
import { getTemplate } from "@/lib/data/templates";
import { tierNames } from "@/lib/data/pricing";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { hexToRgbTriplet } from "@/lib/color";

const ACCENT = "#F59E0B";
const PRICE = 699;
const RECOMMENDED_TIER = 1; // Growth
const RECOMMENDED_PRICE = 1299;

const title = "Pet Service Marketplace Software, 14-Day Launch";
const description =
  "Pet Service by Nipige is a no-code pet services marketplace — grooming, walking, boarding, sitting & vet booking — with $0 platform fees. Launch in 14 days.";
const modified = pageFreshness.solutions;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/solutions/services/pet-service",
  modifiedTime: modified,
});

const FEATURES = [
  { i: "🔍", n: "Service Search & Booking", d: "Search by pet type, service (grooming, walking, boarding, sitting, training, vet visits), location, and availability." },
  { i: "🐕", n: "Pet Profiles", d: "Owners create profiles per pet — breed, age, vaccination records, allergies, behavior notes — visible to matched providers." },
  { i: "👤", n: "Provider Matching & Dispatch", d: "Auto-assign or customer-choice matching by service type, ratings, proximity, and provider availability windows." },
  { i: "📋", n: "Booking & Scheduling", d: "Recurring bookings (e.g. weekly walks), one-time appointments, and calendar sync for providers." },
  { i: "✅", n: "Provider Verification", d: "Background checks, insurance/bonding uploads, certification tracking (e.g. pet first-aid, grooming certs)." },
  { i: "🏠", n: "Boarding & Day-Care Management", d: "Kennel/room availability, check-in/check-out, live photo/video updates for owners." },
  { i: "⭐", n: "Reviews & Ratings", d: "Two-way ratings with photo/video proof of service completion." },
  { i: "💬", n: "In-App Messaging", d: "Real-time chat between owners and providers, plus automated appointment reminders." },
  { i: "💰", n: "Secure Payments & Payouts", d: "Hold-and-release payments, tipping, subscription packages (e.g. monthly walking plans), automated provider payouts." },
  { i: "📊", n: "CRM & Notifications", d: "Owner and pet history, repeat-booking automation, omnichannel push/SMS/email reminders." },
];

const APPS = [
  { n: "Owner App", c: "#F59E0B", d: "Search, book, track & pay for pet services" },
  { n: "Provider App", c: "#D97706", d: "Job management, schedule, earnings, route/dispatch" },
  { n: "Admin Console", c: "#B45309", d: "Marketplace control, verification queue, analytics" },
];

const BUYERS =
  "Dog walking startups, pet grooming chains, mobile pet spas, boarding/day-care operators, pet-sitting networks, veterinary booking platforms.";

const MARKET_DATA = [
  {
    metric: "U.S. pet industry total spend",
    figure: "$158B (2025) → $165B projected for 2026",
    source: "APPA, 2026 State of the Industry Report",
  },
  {
    metric: "U.S. pet care & services market",
    figure: "$66.27B (2026), 6.72% CAGR to $91.74B by 2031",
    source: "Mordor Intelligence — United States Pet Care and Services Market",
  },
  {
    metric: "Pet services segment growth",
    figure: "Forecast at a 16.5% CAGR through 2031 — the fastest-growing segment in the U.S. pet market",
    source: "Mordor Intelligence — United States Pet Market",
  },
  {
    metric: "Non-medical pet services market (2025)",
    figure: "$14.3B, led by pet insurance, with grooming, boarding, and training close behind",
    source: "Packaged Facts / The Freedonia Group",
  },
  {
    metric: "Global pet-sitting market",
    figure: "$2.9B (2024) → projected $9.7B by 2034 at a 10.3% CAGR",
    source: "World Animal Foundation",
  },
  {
    metric: "U.S. dog-walking services market",
    figure: "$1.3B (2026); grew at an 8.9% CAGR from 2020–2025",
    source: "IBISWorld",
  },
  {
    metric: "U.S. pet grooming & boarding market (2024)",
    figure: "$15.1B",
    source: "IBISWorld",
  },
  {
    metric: "Average monthly pet spend per household (2024)",
    figure: "$318",
    source: "Mordor Intelligence",
  },
  {
    metric: "Owners willing to pay more for pet health/wellness services",
    figure: "67%",
    source: "Mordor Intelligence",
  },
  {
    metric: "Consecutive years of U.S. pet-industry growth",
    figure: "25+ years — through the dot-com bust, the 2008–09 recession, and COVID-19",
    source: "APPA-cited industry reporting",
  },
  {
    metric: "Gen X pet ownership growth (YoY)",
    figure: "+12% (dogs), +8% (cats)",
    source: "APPA, 2026 State of the Industry Report",
  },
];

const FAQS = [
  {
    q: "What is a no-code pet services marketplace?",
    a: "Pet Service is a pre-built vertical on Nipige that lets you launch a pet services marketplace — grooming, walking, boarding, sitting, and vet booking — without writing code. Configure branding, service zones, and payments, then go live.",
  },
  {
    q: "How long does it take to launch a pet services app?",
    a: "Typically about 14 days — pick the Pet Service template, configure categories and provider verification rules, connect Stripe or PayPal, and launch Owner, Provider, and Admin apps.",
  },
  {
    q: "Can I manage recurring bookings, like weekly dog walks?",
    a: "Yes. Pet Service supports recurring and subscription-style bookings alongside one-time appointments, with automated reminders for owners and providers.",
  },
  {
    q: "Does Pet Service handle provider verification and insurance tracking?",
    a: "Yes — background checks, certification uploads (pet first-aid, grooming certifications), and insurance/bonding documentation are built into provider onboarding.",
  },
  {
    q: "Does Nipige take a commission on Pet Service bookings?",
    a: "No — $0 platform transaction fees. You pay only your payment processor (Stripe or PayPal).",
  },
  {
    q: "Can Pet Service scale to boarding and day-care, not just walking/grooming?",
    a: "Yes — the template includes kennel/room availability management and check-in/check-out flows for boarding and day-care operators.",
  },
];

const th: CSSProperties = {
  background: "var(--cd)",
  color: "var(--wd)",
  padding: "10px 12px",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textAlign: "left",
};

const td: CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid var(--wb)",
  color: "var(--wm)",
  fontSize: 13,
  verticalAlign: "top",
  lineHeight: 1.5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/solutions/services/pet-service#webpage`,
      url: `${siteConfig.url}/solutions/services/pet-service`,
      name: title,
      description,
      dateModified: modified,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
        { "@type": "ListItem", position: 3, name: "Services Marketplace", item: `${siteConfig.url}/solutions/services` },
        { "@type": "ListItem", position: 4, name: "Pet Service", item: `${siteConfig.url}/solutions/services/pet-service` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "SoftwareApplication",
      name: "Pet Service Platform",
      description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      url: `${siteConfig.url}/solutions/services/pet-service`,
      offers: { "@type": "Offer", price: PRICE, priceCurrency: "USD" },
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
  ],
};

export default function PetServicePage() {
  const related = ["services", "restaurant", "realestate"]
    .map((id) => getTemplate(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        style={{
          padding: "128px 0 56px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--wb)",
        }}
      >
        <div className="mx">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: "Services Marketplace", href: "/solutions/services" },
              { name: "Pet Service" },
            ]}
          />
          <div className="td-hero-grid">
            <div className="td-hero-copy">
              <div className="td-hero-title-row">
                <span
                  className="td-hero-icon"
                  aria-hidden="true"
                  style={{ "--acc": ACCENT, "--acc-rgb": hexToRgbTriplet(ACCENT) } as CSSProperties}
                >
                  🐾
                </span>
                <h1 className="td-hero-title">Pet Service</h1>
              </div>
              <p className="td-hero-subhead">
                Pet Services Marketplace Software — build it on Nipige,{" "}
                <span className="td-hero-subhead-accent">without code</span>
              </p>
              <div className="td-hero-badge mn">{`STANDARD · FROM $${PRICE.toLocaleString()}/MO`}</div>
              <p className="td-hero-desc">
                Pet Service is Nipige&apos;s ready-to-launch pet services marketplace solution — built for
                founders who want to connect pet owners with groomers, walkers, sitters, trainers, and
                boarding providers in one platform. Booking, provider dispatch, vet-visit scheduling, and
                payments — no code required. Live in 14 days, with $0 platform transaction fees.
              </p>
              <div className="td-hero-actions">
                <CtaLink href="/demo" variant="primary">
                  Book a Demo →
                </CtaLink>
                <CtaLink href="/pricing" variant="ghost">
                  See Pricing
                </CtaLink>
              </div>
            </div>
            <div className="td-hero-visual">
              <PetflokAppMockup />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 0", background: "var(--bg)", borderBottom: "1px solid var(--wb)" }}>
        <div className="mx ct">
          <div
            style={{
              background: "var(--cd)",
              border: "1px solid var(--wb)",
              borderRadius: 8,
              padding: 48,
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>▶️</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Product Demo Video</div>
            <div style={{ fontSize: 13, color: "var(--wm)" }}>
              A 60-second walkthrough of Pet Service in action. Coming soon -{" "}
              <Link href="/demo" style={{ color: "var(--cy)" }}>
                book a live demo
              </Link>{" "}
              in the meantime.
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="mx td-main">
          <div>
            <div className="sl">{"// core_features"}</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-.5px",
                marginBottom: 20,
                fontFamily: "var(--font-jakarta)",
              }}
            >
              What you can build
            </h2>
            <div className="td-fg">
              {FEATURES.map((f) => (
                <div key={f.n} className="td-f">
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{f.i}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{f.n}</div>
                    <div style={{ fontSize: 12, color: "var(--wm)" }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sl">{"// apps_included"}</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-.5px",
                marginBottom: 20,
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {APPS.length} apps, one platform
            </h2>
            {APPS.map((a) => (
              <div
                key={a.n}
                style={{
                  background: "var(--cd)",
                  border: "1px solid var(--wb)",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: a.c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  {a.n[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{a.n}</div>
                  <div style={{ fontSize: 12, color: "var(--wm)" }}>{a.d}</div>
                </div>
              </div>
            ))}

            <div
              style={{
                background: "var(--cyg)",
                border: "1px solid var(--cyr)",
                borderRadius: 8,
                padding: 20,
                marginTop: 20,
              }}
            >
              <div
                className="mn"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--cy)",
                  letterSpacing: ".5px",
                  marginBottom: 6,
                }}
              >
                RECOMMENDED PLAN
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                Most Pet Service customers choose{" "}
                <span style={{ color: "var(--cyb)" }}>{tierNames[RECOMMENDED_TIER]}</span> at $
                {RECOMMENDED_PRICE.toLocaleString()}/mo
              </div>
              <div style={{ fontSize: 12, color: "var(--wm)" }}>
                Includes native mobile apps (iOS + Android), dedicated hosting, and {APPS.length} branded
                apps.
              </div>
              <Link
                href="/pricing"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--cy)",
                  marginTop: 8,
                  display: "inline-block",
                }}
              >
                See all pricing →
              </Link>
            </div>

            <div
              style={{
                background: "var(--cyg)",
                border: "1px solid var(--cyr)",
                borderRadius: 8,
                padding: 20,
                marginTop: 12,
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Ideal buyers</h3>
              <div style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.7 }}>{BUYERS}</div>
            </div>

            <div style={{ marginTop: 20 }}>
              <CtaLink href="/demo" variant="primary" block>
                Book a Demo for Pet Service →
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct" style={{ maxWidth: 900 }}>
          <div className="sl">{"// market_data"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 8 }}>
            Why launch a pet services marketplace now
          </h2>
          <p className="sd" style={{ marginBottom: 24 }}>
            Pet services is one of the fastest-growing, most recession-resistant categories in the U.S.
            pet economy — and still highly fragmented among independent groomers, walkers, and sitters.
          </p>
          <div style={{ overflowX: "auto", marginBottom: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={th}>Metric</th>
                  <th style={th}>Figure</th>
                  <th style={th}>Source</th>
                </tr>
              </thead>
              <tbody>
                {MARKET_DATA.map((row) => (
                  <tr key={row.metric}>
                    <td style={{ ...td, color: "var(--w)", fontWeight: 600, textAlign: "left" }}>{row.metric}</td>
                    <td style={{ ...td, textAlign: "left" }}>{row.figure}</td>
                    <td style={{ ...td, textAlign: "left", color: "var(--wd)", fontSize: 12 }}>{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "var(--wd)", textAlign: "left" }}>
            Figures compiled from third-party market research (APPA, Mordor Intelligence, IBISWorld,
            Packaged Facts / The Freedonia Group, World Animal Foundation) and cross-checked as of July
            2026. Consult each source directly for the latest updates.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct" style={{ maxWidth: 680 }}>
          <div className="sl">{"// faq"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 16 }}>
            Common questions
          </h2>
          <div className="faq-list">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
        <div className="mx ct">
          <div className="sl">{"// related_solutions"}</div>
          <h2 className="st" style={{ fontSize: 24, marginBottom: 8 }}>
            Related Nipige solutions
          </h2>
          <p className="sd" style={{ marginBottom: 24 }}>
            Explore more marketplace and platform templates.
          </p>
          <div
            className="td-related"
            style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
          >
            {related.map((r) => (
              <article key={r.id}>
                <Link
                  href={`/solutions/${r.id}`}
                  className="tdr-card"
                  style={
                    {
                      textDecoration: "none",
                      "--acc": r.clr,
                      "--acc-rgb": hexToRgbTriplet(r.clr),
                    } as CSSProperties
                  }
                >
                  <div className="tdr-icon-wrap">{r.ic}</div>
                  <div className="tdr-title">{r.nm} Platform</div>
                  <div className="tdr-desc">{r.desc}</div>
                  <span className="tdr-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
