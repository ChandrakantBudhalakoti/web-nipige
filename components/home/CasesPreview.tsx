"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CaseLogo } from "@/components/cases/CaseLogo";
import { CtaLink } from "@/components/ui/CtaLink";
import { cases } from "@/lib/data/cases";

const AUTO_ADVANCE_MS = 5500;

/** "#RRGGBB" -> "r, g, b", so CSS can build rgba(var(--acc-rgb), alpha). */
function hexToRgbTriplet(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * Interactive "spotlight" showcase for production deployments - a client rail
 * on the left drives a large detail panel on the right, auto-advancing on a
 * timer (paused on hover/focus) instead of a flat grid of identical cards.
 */
export function CasesPreview() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || paused) return;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const id = setInterval(() => {
      if (!visible) return;
      setActive((i) => (i + 1) % cases.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [paused]);

  const c = cases[active];

  return (
    <section className="sec" style={{ background: "var(--bg2)" }}>
      <div className="mx">
        <div className="ct">
          <div className="sl">{"// production_deployments"}</div>
          <h2 className="st">Running in production. Real scale.</h2>
        </div>

        <div
          className="cs-spot"
          ref={sectionRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="cs-spot-rail">
            {cases.map((item, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={item.slug}
                  type="button"
                  className={`cs-spot-item${isActive ? " active" : ""}`}
                  onClick={() => setActive(idx)}
                  style={
                    {
                      "--acc": item.clr,
                      "--acc-rgb": hexToRgbTriplet(item.clr),
                    } as CSSProperties
                  }
                  aria-pressed={isActive}
                >
                  <CaseLogo src={item.logo} name={item.nm} color={item.clr} size={34} />
                  <span className="cs-spot-item-text">
                    <span className="cs-spot-item-name">{item.nm}</span>
                    <span className="cs-spot-item-country">{item.co}</span>
                  </span>
                  {isActive && !paused ? (
                    <span key={`${item.slug}-${active}`} className="cs-spot-progress" aria-hidden="true">
                      <span
                        className="cs-spot-progress-fill"
                        style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            key={c.slug}
            className="cs-spot-panel"
            style={
              {
                "--acc": c.clr,
                "--acc-rgb": hexToRgbTriplet(c.clr),
              } as CSSProperties
            }
          >
            <div className="cs-spot-panel-head">
              <CaseLogo src={c.logo} name={c.nm} color={c.clr} size={60} />
              <div className="cs-spot-panel-title">
                <div className="cs-spot-panel-name">
                  {c.nm}
                  <span aria-hidden="true">{c.ic}</span>
                </div>
                <div className="mn cs-spot-panel-meta">
                  {c.cl} · {c.co}
                </div>
              </div>
              <span className="cs-spot-panel-stat">{c.stat}</span>
            </div>

            <p className="cs-spot-panel-desc">{c.highlight}</p>

            <div className="cs-spot-panel-metrics">
              {c.results.slice(0, 3).map((r) => (
                <div key={r.l} className="cs-spot-metric">
                  <span className="cs-spot-metric-v">{r.v}</span>
                  <span className="cs-spot-metric-l">{r.l}</span>
                </div>
              ))}
            </div>

            <Link href={`/case-studies/${c.slug}`} className="cs-spot-link">
              Read full case study <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <CtaLink href="/case-studies" variant="premium">
            View detailed case studies
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
