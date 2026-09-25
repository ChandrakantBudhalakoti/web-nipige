"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, SVGProps } from "react";

const STATS = [
  { id: "invoices", v: "35M", l: "Invoices / month", clr: "#06B6D4" },
  { id: "years", v: "13+", l: "Years of R&D", clr: "#F59E0B" },
  { id: "microservices", v: "45+", l: "Microservices", clr: "#8B5CF6" },
  { id: "countries", v: "4", l: "Countries", clr: "#10B981" },
] as const;

const DURATION = 1500;

/** "#RRGGBB" -> "r, g, b", so CSS can build rgba(var(--acc-rgb), alpha) per card. */
function hexToRgbTriplet(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

const ICON_PROPS: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  width: 26,
  height: 26,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const GEAR_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/** Simple stroke-based icons - reliable across every OS/browser, unlike emoji glyphs. */
function StatIcon({ id }: { id: (typeof STATS)[number]["id"] }) {
  switch (id) {
    case "invoices":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <line x1="5" y1="19" x2="5" y2="12" />
          <line x1="12" y1="19" x2="12" y2="5" />
          <line x1="19" y1="19" x2="19" y2="14" />
        </svg>
      );
    case "years":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <line x1="6" y1="3" x2="18" y2="3" />
          <line x1="6" y1="21" x2="18" y2="21" />
          <path d="M8 3c0 6 4 6 4 9s-4 3-4 9" />
          <path d="M16 3c0 6-4 6-4 9s4 3 4 9" />
        </svg>
      );
    case "microservices":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" />
          <circle cx="12" cy="12" r="7.5" />
          {GEAR_ANGLES.map((deg) => (
            <line key={deg} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </svg>
      );
    case "countries":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
        </svg>
      );
    default:
      return null;
  }
}

/** Animated count-up stat value, ported from the prototype's `animateStats()`. */
function StatValue({ value }: { value: string }) {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const [display, setDisplay] = useState(Number.isNaN(num) ? value : `0${suffix}`);

  useEffect(() => {
    if (Number.isNaN(num)) return;
    let raf = 0;
    let start: number | null = null;

    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / DURATION, 1);
      setDisplay(`${Math.floor(p * num)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [num, suffix, value]);

  return <div className="pvi-v">{display}</div>;
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pvn">
      <div className="mx">
        <div className={`pvg${active ? " pvg-in" : ""}`} ref={ref}>
          {STATS.map((s, idx) => (
            <div
              key={s.l}
              className="pvi-card"
              style={
                {
                  "--acc": s.clr,
                  "--acc-rgb": hexToRgbTriplet(s.clr),
                  transitionDelay: `${idx * 80}ms`,
                } as CSSProperties
              }
            >
              <div className="pvi-icon">
                <StatIcon id={s.id} />
              </div>
              {active ? <StatValue value={s.v} /> : <div className="pvi-v">{s.v}</div>}
              <div className="pvi-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
