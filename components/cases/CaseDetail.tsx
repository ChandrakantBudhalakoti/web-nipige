import Link from "next/link";
import type { CaseBlock, CaseStudy } from "@/lib/types";
import { CaseLogo } from "@/components/cases/CaseLogo";

/** Renders a story block's body as plain text, unless it carries a `link` — then the
 * anchor substring becomes a real Next.js Link, split out of the surrounding text. */
function StoryBody({ block }: { block: CaseBlock }) {
  if (!block.link) return <>{block.b}</>;

  const { anchor, href } = block.link;
  const i = block.b.indexOf(anchor);
  if (i === -1) return <>{block.b}</>;

  return (
    <>
      {block.b.slice(0, i)}
      <Link href={href}>{anchor}</Link>
      {block.b.slice(i + anchor.length)}
    </>
  );
}

/** Beautifully arranged detail layout for a single client case study. */
export function CaseDetail({ c }: { c: CaseStudy }) {
  return (
    <article className="case-detail" style={{ ["--case-clr" as string]: c.clr }}>
      {/* ---------- Hero ---------- */}
      <header className="case-hero">
        <div className="case-hero-glow" aria-hidden="true" />
        <div className="mx case-hero-inner">
          <div className="case-hero-head">
            <CaseLogo src={c.logo} name={c.nm} color={c.clr} size={72} />
            <div>
              <h1 className="case-hero-name">
                {c.h1 ?? c.nm}
                <span className="case-hero-flag" aria-hidden="true">
                  {c.ic}
                </span>
              </h1>
              <div className="case-hero-meta mn">
                {c.cl} · {c.co}
                {c.industry ? ` · ${c.industry}` : ""}
              </div>
            </div>
            <span className="case-hero-stat mn">{c.stat}</span>
          </div>

          <p className="case-hero-highlight">{c.highlight}</p>

          <div className="case-hero-metrics">
            {c.results.map((r) => (
              <div key={r.l} className="case-hero-metric">
                <span className="case-hero-metric-v">{r.v}</span>
                <span className="case-hero-metric-l mn">{r.l}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mx case-body">
        {/* ---------- Challenge / Solution summary ---------- */}
        <div className="case-summary">
          <div className="case-summary-col">
            <h2 className="case-kicker mn">The Challenge</h2>
            <p>{c.challenge}</p>
          </div>
          <div className="case-summary-col">
            <h2 className="case-kicker mn">The Solution</h2>
            <p>{c.solution}</p>
          </div>
        </div>

        {/* ---------- Story timeline ---------- */}
        {c.story.length > 0 && (
          <ol className="case-timeline">
            {c.story.map((block, i) => (
              <li key={block.h} className="case-step">
                <span className="case-step-num mn">{String(i + 1).padStart(2, "0")}</span>
                <div className="case-step-content">
                  <h3 className="case-step-h">{block.h}</h3>
                  <p className="case-step-b">
                    <StoryBody block={block} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* ---------- Core features ---------- */}
        {c.features && c.features.length > 0 && (
          <section className="case-block">
            <h2 className="case-kicker mn">Core Features Delivered</h2>
            <ul className="case-features">
              {c.features.map((f) => (
                <li key={f} className="case-feature">
                  <span className="case-feature-dot" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Impact metrics ---------- */}
        {c.metrics && c.metrics.length > 0 && (
          <section className="case-block">
            <h2 className="case-kicker mn">Measured Impact</h2>
            <div className="case-metric-grid">
              {c.metrics.map((m) => (
                <div key={m.l} className="case-metric-cell">
                  <span className="case-metric-cell-v">{m.v}</span>
                  <span className="case-metric-cell-l">{m.l}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Customer feedback ---------- */}
        {c.feedback && c.feedback.length > 0 && (
          <section className="case-block">
            <h2 className="case-kicker mn">Customer Feedback</h2>
            <ul className="case-feedback">
              {c.feedback.map((f) => (
                <li key={f} className="case-feedback-item">
                  <span className="case-feedback-check" aria-hidden="true">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Tech stack ---------- */}
        {c.tech && c.tech.length > 0 && (
          <section className="case-block">
            <h2 className="case-kicker mn">Technology</h2>
            <div className="case-tech">
              {c.tech.map((t) => (
                <span key={t} className="case-tech-chip mn">
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ---------- FAQ ---------- */}
        {c.faqs && c.faqs.length > 0 && (
          <section className="case-block">
            <h2 className="case-kicker mn">Frequently Asked Questions</h2>
            <div className="faq-list">
              {c.faqs.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
