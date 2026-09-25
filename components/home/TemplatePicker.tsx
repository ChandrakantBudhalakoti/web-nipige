import Link from "next/link";
import type { CSSProperties } from "react";
import { featuredTemplates } from "@/lib/data/templates";
// import { otherTemplates } from "@/lib/data/templates";

const PICKER_STATS = [
  { v: "45+", l: "Microservices" },
  { v: "1,700+", l: "APIs" },
  { v: "14", l: "Days" },
];

/** "#RRGGBB" -> "r, g, b", so CSS can build rgba(var(--acc-rgb), alpha) per card. */
function hexToRgbTriplet(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

const ICON_ALTS: Record<string, string> = {
  food: "no-code restaurant marketplace builder icon",
  realestate: "no-code real estate marketplace platform icon",
  services: "no-code services marketplace software icon",
  fitness: "no-code fitness and wellness marketplace icon",
  grocery: "no-code grocery and retail marketplace platform icon",
  travel: "no-code travel and tourism marketplace builder icon",
  entertainment: "no-code entertainment and events marketplace icon",
  sports: "no-code sports and fan marketplace platform icon",
  superapp: "no-code super app marketplace builder icon",
};

/** Hero-side "choose_solution" picker - top 3 verticals as big cards, the rest as a compact link. */
export function TemplatePicker() {
  return (
    <div className="pkr">
      <div className="pkr-l">{"// choose_solution"}</div>
      <div className="pkg">
        {featuredTemplates.map((t, idx) => (
          <Link
            key={t.id}
            href={`/solutions/${t.id}`}
            className="pk"
            aria-label={ICON_ALTS[t.id]}
            style={
              {
                animationDelay: `${300 + idx * 60}ms`,
                "--acc": t.clr,
                "--acc-rgb": hexToRgbTriplet(t.clr),
              } as CSSProperties
            }
          >
            <span className="pk-arrow" aria-hidden="true">
              ↗
            </span>
            <span className="i" role="img" aria-label={ICON_ALTS[t.id]}>
              {t.ic}
            </span>
            <span className="n">{t.nm}</span>
            <span className="tag">{t.headline}</span>
            <span className="p">
              <span className="pk-price-v">${t.pr.toLocaleString()}</span>
              <span className="pk-price-u">/mo</span>
            </span>
          </Link>
        ))}
      </div>

      {/*
      <Link href="/solutions" className="pk-more" aria-label="View all Nipige marketplace solutions">
        <span className="pk-more-icons" aria-hidden="true">
          {otherTemplates.slice(0, 5).map((t) => (
            <span
              key={t.id}
              className="pk-more-icon"
              style={{ "--acc": t.clr, "--acc-rgb": hexToRgbTriplet(t.clr) } as CSSProperties}
            >
              {t.ic}
            </span>
          ))}
        </span>
        <span className="pk-more-text">+{otherTemplates.length} more solutions</span>
        <span className="pk-more-arrow" aria-hidden="true">
          →
        </span>
      </Link>
      */}

      <div className="pkb">
        {PICKER_STATS.map((s) => (
          <div key={s.l}>
            <div className="pkb-v">{s.v}</div>
            <div className="pkb-l">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
