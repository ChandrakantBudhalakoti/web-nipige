import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/lib/types";
import { CaseLogo } from "@/components/cases/CaseLogo";

/** Clickable case-study card for the listing grid - logo, highlight, key metrics. */
export function CaseCard({ c, style }: { c: CaseStudy; style?: CSSProperties }) {
  return (
    <article>
      <Link
        href={`/case-studies/${c.slug}`}
        className="case-card"
        style={{ ...style, ["--case-clr" as string]: c.clr }}
      >
        <div className="case-card-top">
          <CaseLogo src={c.logo} name={c.nm} color={c.clr} size={52} />
          <span className="case-card-stat mn">{c.stat}</span>
        </div>

        <div className="case-card-body">
          <div className="case-card-name">
            {c.nm}
            <span className="case-card-country mn" aria-label={`Country: ${c.co}`}>
              <span aria-hidden="true">{c.ic}</span> {c.co}
            </span>
          </div>
          <div className="case-card-meta mn">{c.cl}</div>
          <p className="case-card-highlight">{c.highlight}</p>
        </div>

        <div className="case-card-foot">
          <div className="case-card-metrics">
            {c.results.slice(0, 3).map((r) => (
              <div key={r.l} className="case-card-metric">
                <span className="case-card-metric-v">{r.v}</span>
                <span className="case-card-metric-l mn">{r.l}</span>
              </div>
            ))}
          </div>
          <span className="case-card-link mn">
            Read case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
