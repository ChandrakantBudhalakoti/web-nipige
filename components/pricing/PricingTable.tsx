"use client";

import Link from "next/link";
import { useState } from "react";
import { tiers } from "@/lib/data/pricing";
import { templates } from "@/lib/data/templates";

type Billing = "mo" | "yr";

const ANNUAL_FACTOR = 0.85; // 15% off

interface PriceView {
  main: string;
  /** "/mo" suffix shown only for numeric prices. */
  suffix: string;
  sub: string;
  save: string | null;
}

/** Resolve the display price for a tier, given the selected solution and billing. */
function priceView(index: number, raw: number | string, billing: Billing, fallbackSub: string): PriceView {
  if (typeof raw === "number") {
    const monthly = billing === "yr" ? Math.round(raw * ANNUAL_FACTOR) : raw;
    const annualTotal = Math.round(raw * 12 * ANNUAL_FACTOR);
    return {
      main: `$${monthly.toLocaleString()}`,
      suffix: "/mo",
      sub: `$${annualTotal.toLocaleString()}/yr`,
      save: billing === "yr" ? `save $${Math.round(raw * 12 * (1 - ANNUAL_FACTOR)).toLocaleString()}` : null,
    };
  }
  if (raw === "Custom") {
    return { main: "Custom", suffix: "", sub: fallbackSub, save: null };
  }
  // "from" string, e.g. "5,499+"
  return { main: `$${raw}`, suffix: "", sub: "Custom pricing", save: null };
}

/** Pricing grid with a solution selector and monthly/annual toggle. */
export function PricingTable() {
  const [billing, setBilling] = useState<Billing>("mo");
  const [solutionId, setSolutionId] = useState("");

  const selected = solutionId ? templates.find((t) => t.id === solutionId) : null;

  const toggleStyle = (active: boolean) => ({
    background: active ? "var(--cy)" : "transparent",
    color: active ? "var(--bg)" : "var(--wm)",
  });

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <label
          className="mn"
          htmlFor="solution-select"
          style={{ fontSize: 10, color: "var(--wd)", letterSpacing: "1px" }}
        >
          SELECT YOUR SOLUTION
        </label>
      </div>
      <select
        id="solution-select"
        className="tsel"
        value={solutionId}
        onChange={(e) => setSolutionId(e.target.value)}
      >
        <option value="">All solutions (from lowest price)</option>
        {templates
          .filter((t) => t.id === "restaurant" || t.id === "realestate" || t.id === "services")
          .map((t) => (
            <option key={t.id} value={t.id}>
              {t.ic} {t.nm}
            </option>
          ))}
      </select>

      <div>
        <div
          style={{
            display: "inline-flex",
            border: "1px solid var(--wb)",
            borderRadius: 8,
            padding: 3,
            marginBottom: 28,
          }}
        >
          <button className="btn bs" onClick={() => setBilling("mo")} style={toggleStyle(billing === "mo")}>
            Monthly
          </button>
          <button className="btn bs" onClick={() => setBilling("yr")} style={toggleStyle(billing === "yr")}>
            Annual <span style={{ color: "var(--cy)", fontSize: 11, marginLeft: 4 }}>-15%</span>
          </button>
        </div>
      </div>

      <div className="prg">
        {tiers.map((t, i) => {
          const raw = selected ? selected.prices[i] : t.p;
          // Super App has no Starter/Growth tier.
          if (raw == null) return null;
          const view = priceView(i, raw, billing, t.a);

          return (
            <div key={t.n} className={`prc${t.pop ? " pop" : ""}`}>
              {t.pop ? <div className="pop-bd">Most Popular</div> : null}
              <div
                className="mn"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--wd)",
                  marginBottom: 4,
                }}
              >
                {t.n}
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                {view.main}
                <span style={{ fontSize: 13, color: "var(--wd)" }}>{view.suffix}</span>
              </div>
              <div className="mn" style={{ fontSize: 11, color: "var(--wd)", margin: "4px 0 10px" }}>
                {view.sub}
                {view.save ? (
                  <span style={{ color: "var(--cy)", marginLeft: 4 }}>{view.save}</span>
                ) : null}
              </div>
              <div style={{ fontSize: 13, color: "var(--wm)", marginBottom: 14 }}>{t.d}</div>
              <Link
                href="/demo"
                style={{
                  display: "block",
                  width: "100%",
                  padding: 12,
                  textAlign: "center",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: t.pop ? "var(--bg)" : "var(--w)",
                  border: t.pop ? "none" : "1px solid var(--wb)",
                  cursor: "pointer",
                  marginBottom: 14,
                  background: t.pop ? "var(--cy)" : t.bg,
                }}
              >
                {t.ct}
              </Link>
              {t.f.map((f) => (
                <div
                  key={f}
                  style={{
                    fontSize: 11,
                    padding: "5px 0",
                    borderBottom: "1px solid rgba(255,255,255,.03)",
                    display: "flex",
                    alignItems: "start",
                    gap: 5,
                    color: "var(--wm)",
                  }}
                >
                  <span style={{ marginTop: 2, fontSize: 9, color: "var(--cy)" }}>✓</span>
                  {f}
                </div>
              ))}
              {t.no.map((f) => (
                <div
                  key={f}
                  style={{
                    fontSize: 11,
                    padding: "5px 0",
                    borderBottom: "1px solid rgba(255,255,255,.03)",
                    display: "flex",
                    alignItems: "start",
                    gap: 5,
                    color: "var(--wd)",
                    opacity: 0.35,
                  }}
                >
                  <span style={{ marginTop: 2, fontSize: 9 }}>✗</span>
                  {f}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
