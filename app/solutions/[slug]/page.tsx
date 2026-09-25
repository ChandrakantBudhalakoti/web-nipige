import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/ui/CtaLink";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { templates, getTemplate } from "@/lib/data/templates";
import { getCase } from "@/lib/data/cases";
import { CaseCard } from "@/components/cases/CaseCard";
import { tierNames } from "@/lib/data/pricing";
import { pageFreshness } from "@/lib/data/pageFreshness";
import { buildMetadata, siteConfig, softwareAppJsonLd } from "@/lib/seo";
import { FoodAppMockup } from "@/components/solutions/FoodAppMockup";
import { RoleFeatureGrid } from "@/components/solutions/RoleFeatureGrid";
import { RealEstateAppMockup } from "@/components/solutions/RealEstateAppMockup";
import { ServicesAppMockup } from "@/components/solutions/ServicesAppMockup";
import { DemoVideo } from "@/components/solutions/DemoVideo";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { hexToRgbTriplet } from "@/lib/color";

const FOOD_LAUNCH_STEPS = [
  "Configure restaurants, menus, and delivery zones in admin.",
  "Connect Stripe or PayPal and set delivery fees / surge rules.",
  "Onboard drivers in the Driver App and test GPS dispatch.",
  "Brand customer iOS/Android/web apps and run a pilot order.",
  "Go live and monitor orders from the admin console.",
];

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return buildMetadata({ title: "Solution not found", description: "", path: "/solutions" });

  const title = t.metaTitle ?? `${t.nm} Platform - from $${t.pr.toLocaleString()}/mo`;
  const description = t.metaDesc ?? `${t.desc} Launch your ${t.nm.toLowerCase()} platform with Nipige in 14 days.`;

  return buildMetadata({
    title,
    description,
    path: `/solutions/${t.id}`,
    modifiedTime: pageFreshness.solutions,
    image: t.img,
  });
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  const modified = pageFreshness.solutions;
  const recTier = t.prices[1] != null ? 1 : 2;
  const recPrice = t.prices[recTier] as number;
  const relatedTemplates = templates
    .filter((x) => x.id !== t.id)
    .slice(0, 2); // only 2 cards for now — bump back to 3 to restore the third
  const relatedCases = (t.relatedCaseSlugs ?? [])
    .map((slug) => getCase(slug))
    .filter((rc): rc is NonNullable<typeof rc> => Boolean(rc));
  const isFood = t.id === "restaurant";
  const isServices = t.id === "services";
  const buyersParts = isServices ? t.buyers.split("Pet services") : null;

  const h1 = t.h1 ?? `${t.nm} Platform`;
  const intro =
    t.intro ??
    `Launch your own ${t.nm.toLowerCase()} marketplace or platform with branded iOS, Android, and web apps, integrated payments, real-time dispatch, and ongoing infrastructure support — all from one flat monthly subscription.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/solutions/${t.id}#webpage`,
        url: `${siteConfig.url}/solutions/${t.id}`,
        name: t.metaTitle ?? `${t.nm} Platform`,
        description: t.metaDesc ?? t.desc,
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
          {
            "@type": "ListItem",
            position: 3,
            name: t.nm,
            item: `${siteConfig.url}/solutions/${t.id}`,
          },
        ],
      },
      ...(t.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: t.faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]
        : []),
      ...(isFood
        ? [
            {
              "@type": "HowTo",
              name: "How to launch a restaurant app on Nipige",
              totalTime: "P14D",
              step: FOOD_LAUNCH_STEPS.map((text, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                text,
              })),
            },
          ]
        : []),
      softwareAppJsonLd(t),
    ],
  };

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
              { name: t.nm },
            ]}
          />
          <div className="td-hero-grid">
            <div className="td-hero-copy">
              <div className="td-hero-title-row">
                <span
                  className="td-hero-icon"
                  aria-hidden="true"
                  style={
                    {
                      "--acc": t.clr,
                      "--acc-rgb": hexToRgbTriplet(t.clr),
                    } as CSSProperties
                  }
                >
                  {t.ic}
                </span>
                <h1 className="td-hero-title">{h1}</h1>
              </div>
              <p className="td-hero-subhead">
                Build it on Nipige — <span className="td-hero-subhead-accent">without code</span>
              </p>
              <div className="td-hero-badge mn">
                {t.cx.toUpperCase()} · FROM ${t.pr.toLocaleString()}/MO
              </div>
              <p className="td-hero-desc">{intro}</p>
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
              {isFood ? (
                <FoodAppMockup />
              ) : t.id === "realestate" ? (
                <RealEstateAppMockup />
              ) : t.id === "services" ? (
                <ServicesAppMockup />
              ) : (
                <div className="td-hero-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt={`${t.nm} platform preview`} loading="eager" width={800} height={600} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 0", background: "var(--bg)", borderBottom: "1px solid var(--wb)" }}>
        <div className="mx ct">
          {t.demoVideoId ? (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <DemoVideo videoId={t.demoVideoId} title={`${t.nm} solution demo video`} />
            </div>
          ) : (
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
                A 60-second walkthrough of the {t.nm} solution in action. Coming soon -{" "}
                <Link href="/demo" style={{ color: "var(--cy)" }}>
                  book a live demo
                </Link>{" "}
                in the meantime.
              </div>
            </div>
          )}
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
              {isFood ? "Restaurant app features you can ship" : "What you can build"}
            </h2>
            <div className="td-fg">
              {t.feats.map((f) => (
                <div key={f.n} className="td-f">
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{f.i}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{f.n}</div>
                    <div style={{ fontSize: 12, color: "var(--wm)" }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {isFood ? (
              <div style={{ marginTop: 36 }}>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: "-.5px",
                    marginBottom: 16,
                    fontFamily: "var(--font-jakarta)",
                  }}
                >
                  Steps to launch your restaurant app
                </h2>
                <ol style={{ paddingLeft: 20, fontSize: 14, color: "var(--wm)", lineHeight: 1.8 }}>
                  {FOOD_LAUNCH_STEPS.map((step) => (
                    <li key={step} style={{ marginBottom: 6 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
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
              {t.apps.length} apps, one platform
            </h2>
            {t.apps.map((a) => (
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
                Most {t.nm} customers choose{" "}
                <span style={{ color: "var(--cyb)" }}>{tierNames[recTier]}</span> at $
                {recPrice.toLocaleString()}/mo
              </div>
              <div style={{ fontSize: 12, color: "var(--wm)" }}>
                Includes native mobile apps, dedicated hosting, and {t.apps.length} branded apps.
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
              <div style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.7 }}>
                {buyersParts && buyersParts.length === 2 ? (
                  <>
                    {buyersParts[0]}
                    <Link href="/solutions/services/pet-service" className="buyers-highlight">
                      Pet services
                    </Link>
                    {buyersParts[1]}
                  </>
                ) : (
                  t.buyers
                )}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <CtaLink href="/demo" variant="primary" block>
                Book a Demo for {t.nm} →
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {isFood ? (
        <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
          <div className="mx ct">
            <div className="sl">{"// who_gets_what"}</div>
            <h2 className="st" style={{ fontSize: 24, marginBottom: 8 }}>
              Every role gets its own app
            </h2>
            <p className="sd" style={{ marginBottom: 24 }}>
              Four connected apps, one platform - see exactly what each side can do.
            </p>
          </div>
          <div className="mx">
            <RoleFeatureGrid />
          </div>
        </section>
      ) : null}

      {relatedCases.length > 0 ? (
        <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }} aria-labelledby="solution-proof-h2">
          <div className="mx ct">
            <div className="sl">{"// in_production"}</div>
            <h2 id="solution-proof-h2" className="st" style={{ fontSize: 24, marginBottom: 8 }}>
              Built on this template
            </h2>
            <p className="sd" style={{ marginBottom: 24 }}>
              See a real {t.nm.toLowerCase()} platform running on Nipige.
            </p>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              {relatedCases.map((rc) => (
                <CaseCard key={rc.slug} c={rc} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {t.faqs?.length ? (
        <section style={{ padding: "48px 0", borderTop: "1px solid var(--wb)" }}>
          <div className="mx ct" style={{ maxWidth: 680 }}>
            <div className="sl">{"// faq"}</div>
            <h2 className="st" style={{ fontSize: 24, marginBottom: 16 }}>
              Common questions
            </h2>
            <AnswerCapsule>
              Nipige&apos;s {t.nm} template is a no-code, white-label marketplace platform —
              branded customer, provider, and admin apps configured without code, launched in
              about 14 days from ${t.pr}/mo with $0 platform transaction fees.
            </AnswerCapsule>
            <div className="faq-list">
              {t.faqs.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
            {relatedTemplates.map((r) => (
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
