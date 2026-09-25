import Link from "next/link";
import type { CSSProperties } from "react";
import type { Template } from "@/lib/types";

const statusColor: Record<string, string> = {
  High: "#EF4444",
  Moderate: "#F59E0B",
  Standard: "#22C55E",
};

/** "#RRGGBB" -> "r, g, b", so CSS can build rgba(var(--acc-rgb), alpha). */
function hexToRgbTriplet(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Template summary card - modern, professional solution card. */
export function TemplateCard({
  t,
  featured = false,
  style,
}: {
  t: Template;
  featured?: boolean;
  style?: CSSProperties;
}) {
  const badgeClr = statusColor[t.cx] || t.clr;
  return (
    <article>
      <Link
        href={`/solutions/${t.id}`}
        className={`tc${featured ? " feat" : ""}`}
        style={
          {
            ...style,
            "--acc": t.clr,
            "--acc-rgb": hexToRgbTriplet(t.clr),
          } as CSSProperties
        }
      >
        {t.img ? (
          <div className="tc-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.img} alt={`${t.nm} platform preview`} loading="lazy" width={400} height={150} />
            {featured ? <div className="tc-ft-tag tc-ft-tag--photo">★ TOP MARKET</div> : null}
          </div>
        ) : featured ? (
          <div className="tc-ft-tag">★ TOP MARKET</div>
        ) : null}

        <div className="tc-head">
          <span className="tc-icon">{t.ic}</span>
          <div className="tc-title-wrap">
            <div className="tc-name">{t.nm}</div>
            <span
              className="tc-badge"
              style={{
                background: `${badgeClr}26`,
                color: badgeClr,
              }}
            >
              {t.cx}
            </span>
          </div>
        </div>

        <p className="tc-desc">{t.desc}</p>

        <div className="tc-apps">
          {t.apps.map((a) => (
            <span key={a.n} className="tc-app">
              {a.n}
            </span>
          ))}
        </div>

        <div className="tc-foot">
          <div className="tc-price">
            from <b>${t.pr.toLocaleString()}</b>/mo
          </div>
          <span className="tc-cta">
            Details <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
