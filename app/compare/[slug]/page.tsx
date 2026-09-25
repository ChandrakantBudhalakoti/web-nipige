import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { comparisons, getComparison } from "@/lib/data/compare";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { ComparisonPage } from "@/lib/data/compare";

function compareJsonLd(c: ComparisonPage) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/compare/${c.slug}#webpage`,
      url: `${siteConfig.url}/compare/${c.slug}`,
      name: c.metaTitle,
      description: c.metaDescription,
      inLanguage: "en",
      ...(c.dateModified ? { dateModified: c.dateModified } : {}),
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "Article",
      headline: c.h1,
      description: c.metaDescription,
      url: `${siteConfig.url}/compare/${c.slug}`,
      ...(c.dateModified ? { datePublished: c.dateModified, dateModified: c.dateModified } : {}),
      author: { "@id": `${siteConfig.url}/#organization` },
      publisher: { "@id": `${siteConfig.url}/#organization` },
      mainEntityOfPage: { "@id": `${siteConfig.url}/compare/${c.slug}#webpage` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
        { "@type": "ListItem", position: 3, name: c.h1, item: `${siteConfig.url}/compare/${c.slug}` },
      ],
    },
  ];

  if (c.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: c.faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  } else {
    graph.push({
      "@type": "ItemList",
      name: `${c.competitor} vs Nipige feature comparison`,
      itemListElement: c.rows.map((row, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: row.label,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) {
    return buildMetadata({
      title: "Comparison not found",
      description: "",
      path: "/compare",
    });
  }
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/compare/${c.slug}`,
    image: `/images/og/compare-${c.slug}.webp`,
  });
}

/** Known phrases in FAQ copy that should render as internal links, without altering the stored text. */
const FAQ_AUTO_LINKS: { phrase: string; href: string }[] = [
  { phrase: "the enterprise end of the market", href: "/compare/mirakl-alternatives" },
  { phrase: "the build vs buy decision", href: "/blogs/build-vs-buy-a-marketplace" },
  { phrase: "how to choose marketplace software", href: "/blogs/how-to-choose-marketplace-software" },
];

function renderFaqAnswer(text: string) {
  for (const { phrase, href } of FAQ_AUTO_LINKS) {
    const idx = text.indexOf(phrase);
    if (idx === -1) continue;
    return (
      <>
        {text.slice(0, idx)}
        <Link
          href={href}
          className="underline decoration-dotted underline-offset-2 text-slate-900 dark:text-[#ffffff] hover:text-[#0f62fe] dark:hover:text-[#22d3ee]"
        >
          {phrase}
        </Link>
        {text.slice(idx + phrase.length)}
      </>
    );
  }
  return text;
}

function renderCell(value: string) {
  if (value === "✓") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 font-bold text-lg">
        ✓
      </span>
    );
  }
  if (value === "✗") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/15 text-red-500 dark:text-red-400 font-bold text-lg">
        ×
      </span>
    );
  }
  return (
    <span className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700 dark:text-[#c9d3e3]">
      {value}
    </span>
  );
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-[#080e1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareJsonLd(c)) }}
      />
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Compare", href: "/compare" },
              { name: c.h1 },
            ]}
            className="text-xs mb-5"
            linkClassName="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            currentClassName="text-slate-700 dark:text-slate-200 font-medium"
            separatorClassName="mx-2 text-slate-400 dark:text-slate-500"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            {c.h1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {c.intro}
          </p>
        </div>
      </section>

      {/* Intro text */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {c.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-base md:text-lg text-slate-700 dark:text-[#c9d3e3] leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {c.tableCaption ? (
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-[#ffffff] mb-3 text-center">
              {c.tableCaption}
            </h2>
          ) : null}
          {c.tableNote ? (
            <p className="text-xs md:text-sm text-slate-500 dark:text-[#7c8cae] text-center mb-6 italic">
              {c.tableNote}
            </p>
          ) : null}
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg">
            {/* Table header */}
            <div className="hidden md:grid md:grid-cols-[1.2fr_1fr_1fr] bg-slate-50 dark:bg-[#111d33] border-b border-slate-200 dark:border-white/10">
              <div className="px-6 py-5 text-sm font-semibold text-slate-500 dark:text-[#c9d3e3] uppercase tracking-wide">
                Feature
              </div>
              <div className="px-6 py-5 text-center">
                <span className="inline-block text-lg font-bold text-slate-900 dark:text-[#ffffff]">
                  {c.competitor}
                </span>
              </div>
              <div className="px-6 py-5 text-center bg-[#eef6ff] dark:bg-[#06b6d4]/10">
                <span className="inline-flex items-center gap-2 text-lg font-bold text-[#0f62fe] dark:text-[#22d3ee]">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0f62fe] dark:bg-[#22d3ee]" />
                  Nipige
                </span>
              </div>
            </div>

            {/* Table rows */}
            {c.rows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] border-b border-slate-100 dark:border-white/5 last:border-b-0 ${
                  idx % 2 === 0 ? "bg-white dark:bg-[#080e1a]" : "bg-slate-50/50 dark:bg-white/[0.02]"
                }`}
              >
                <div className="px-5 py-4 md:px-6 md:py-5 font-semibold text-slate-900 dark:text-[#ffffff] flex items-center">
                  {row.label}
                </div>

                {/* Mobile label for competitor */}
                <div className="md:hidden px-5 pb-2 pt-0 text-xs font-semibold text-slate-500 dark:text-[#c9d3e3] uppercase tracking-wide">
                  {c.competitor}
                </div>
                <div className="px-5 pb-4 md:px-6 md:py-5 md:text-center flex items-start md:justify-center">
                  {renderCell(row.competitor)}
                </div>

                {/* Mobile label for Nipige */}
                <div className="md:hidden px-5 pb-2 pt-3 text-xs font-semibold text-[#0f62fe] dark:text-[#22d3ee] uppercase tracking-wide">
                  Nipige
                </div>
                <div className="px-5 pb-4 md:px-6 md:py-5 md:text-center flex items-start md:justify-center bg-[#f8fbff] dark:bg-[#06b6d4]/5">
                  {renderCell(row.nipige)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0c1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-[#ffffff]">
            {c.ctaHeading ?? "Ready to build with Nipige?"}
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-[#c9d3e3] max-w-2xl mx-auto">
            {c.ctaBody ?? (
              <>
                See why founders, enterprises, and agencies choose Nipige over {c.competitor}. Book a
                personalized demo or start your pilot today.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {c.ctaPrimaryLabel ? (
              <Link href={c.ctaPrimaryHref ?? "/demo"} className="btn bp">
                {c.ctaPrimaryLabel}
              </Link>
            ) : (
              <Link href="/demo" className="btn bp">
                Book a Demo
              </Link>
            )}
            {c.ctaSecondaryLabel ? (
              <Link href={c.ctaSecondaryHref ?? "/demo"} className="btn bg">
                {c.ctaSecondaryLabel}
              </Link>
            ) : (
              <>
                <Link href="/pricing" className="btn bg">
                  See Pricing
                </Link>
                <Link href="/contact" className="btn bg">
                  Contact Sales
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How they differ */}
      {c.differences?.length ? (
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-[#ffffff] mb-8">
              How Nipige and {c.competitor} differ
            </h2>
            <div className="space-y-6">
              {c.differences.map((d) => (
                <p
                  key={d.title}
                  className="text-base md:text-lg text-slate-700 dark:text-[#c9d3e3] leading-relaxed"
                >
                  <strong className="text-slate-900 dark:text-[#ffffff]">{d.title}</strong> {d.body}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Who should choose which */}
      {c.whoShouldChooseCompetitor || c.whoShouldChooseNipige ? (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0c1628]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {c.whoShouldChooseCompetitor ? (
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080e1a] p-8">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-[#ffffff] mb-4">
                  Who should choose {c.competitor}
                </h2>
                <p className="text-base text-slate-700 dark:text-[#c9d3e3] leading-relaxed">
                  {c.whoShouldChooseCompetitor}
                </p>
              </div>
            ) : null}
            {c.whoShouldChooseNipige ? (
              <div className="rounded-2xl border border-[#0f62fe]/30 dark:border-[#22d3ee]/30 bg-[#f8fbff] dark:bg-[#06b6d4]/[0.06] p-8">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-[#ffffff] mb-4">
                  Who should consider Nipige
                </h2>
                <p className="text-base text-slate-700 dark:text-[#c9d3e3] leading-relaxed">
                  {c.whoShouldChooseNipige}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Migration */}
      {c.migration ? (
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-[#ffffff] mb-6">
              {c.migration.heading ?? `Switching from ${c.competitor} to Nipige: what to plan for`}
            </h2>
            <p className="text-base md:text-lg text-slate-700 dark:text-[#c9d3e3] leading-relaxed mb-6">
              {c.migration.intro}
            </p>
            <ul className="space-y-3 mb-6">
              {c.migration.steps.map((step) => (
                <li
                  key={step.label}
                  className="text-base text-slate-700 dark:text-[#c9d3e3] leading-relaxed pl-5 relative"
                >
                  <span className="absolute left-0 text-[#0f62fe] dark:text-[#22d3ee]">•</span>
                  <strong className="text-slate-900 dark:text-[#ffffff]">{step.label}</strong> {step.body}
                </li>
              ))}
            </ul>
            {c.migration.outro ? (
              <p className="text-base md:text-lg text-slate-700 dark:text-[#c9d3e3] leading-relaxed">
                {c.migration.outro}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {c.faqs?.length ? (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0c1628]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-[#ffffff] mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {c.faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080e1a] px-6 py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-[#ffffff]">
                    {item.q}
                    <span className="text-slate-400 dark:text-[#7c8cae] transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-[#c9d3e3] leading-relaxed">
                    {renderFaqAnswer(item.a)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
