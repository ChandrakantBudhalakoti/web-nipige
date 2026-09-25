"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, SVGProps } from "react";
import { hexToRgbTriplet } from "@/lib/color";

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

/** Simple stroke-based icons keyed by the emoji callers already pass - reliable
 * across every OS/browser, unlike emoji glyphs which render inconsistently. */
const EMOJI_ICONS: Record<string, () => ReactElement> = {
  "📋": () => (
    <svg {...ICON_PROPS} aria-hidden="true">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="3" rx="1" fill="currentColor" stroke="none" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  ),
  "⚙️": () => (
    <svg {...ICON_PROPS} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="7.5" />
      {GEAR_ANGLES.map((deg) => (
        <line key={deg} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${deg} 12 12)`} />
      ))}
    </svg>
  ),
  "🚀": () => (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M12 2c2.5 2 4 5.5 4 9 0 2-.8 3.8-1.7 5l-.8 4-1.5-2-1.5 2-.8-4C8.8 14.8 8 13 8 11c0-3.5 1.5-7 4-9z" />
      <circle cx="12" cy="10" r="1.4" fill="currentColor" stroke="none" />
      <path d="M8.5 14.5c-1.8.3-2.8 2-2.8 4 1.8 0 3.3-1 3.6-2.8" />
      <path d="M15.5 14.5c1.8.3 2.8 2 2.8 4-1.8 0-3.3-1-3.6-2.8" />
    </svg>
  ),
  "🎯": () => (
    <svg {...ICON_PROPS} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  "🎨": () => (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M12 3C6.5 3 2 6.8 2 11.5c0 3 2.2 5 5 5h1c.8 0 1.5.6 1.5 1.4 0 .5-.2.9-.5 1.3-.3.4-.5.8-.5 1.3 0 1.4 1.3 2.5 3 2.5 5.5 0 10-4.3 10-9.5C22 6.8 17.5 3 12 3z" />
      <circle cx="7.5" cy="10" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
};

function StepIcon({ emoji }: { emoji: string }) {
  const Icon = EMOJI_ICONS[emoji];
  return Icon ? <Icon /> : <span aria-hidden="true">{emoji}</span>;
}

export interface HowItWorksStep {
  /** Emoji icon */
  i: string;
  /** Step name */
  n: string;
  /** Step description */
  d: string;
  /** Accent colour (hex) */
  clr: string;
}

interface HowItWorksProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  steps?: HowItWorksStep[];
}

const DEFAULT_ACCENTS = ["#06B6D4", "#8B5CF6", "#F59E0B"];

const DEFAULT_STEPS: HowItWorksStep[] = [
  {
    i: "📋",
    n: "Pick a solution",
    d: "Choose one of 3 verticals — restaurant, real estate, or services — each with customer, provider, and admin apps ready.",
    clr: DEFAULT_ACCENTS[0],
  },
  {
    i: "⚙️",
    n: "Configure it",
    d: "Set branding, pricing rules, service zones, and Stripe or PayPal. No code and no custom frontend team required.",
    clr: DEFAULT_ACCENTS[1],
  },
  {
    i: "🚀",
    n: "Launch",
    d: "Go live with web and native apps, payments, and dispatch on managed hosting — typically in about 14 days.",
    clr: DEFAULT_ACCENTS[2],
  },
];

/** Animated, numbered step cards - scroll-reveals once into view. Shared across the home and solutions pages. */
export function HowItWorks({
  eyebrow = "// how_it_works",
  heading = "How to launch a marketplace in three steps",
  description = "Follow this path to ship a production no-code marketplace without writing application code.",
  steps = DEFAULT_STEPS,
}: HowItWorksProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="mx">
        <div className="ct" style={{ maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
          <div className="sl">{eyebrow}</div>
          <h2 className="st">{heading}</h2>
          <p className="sd" style={{ marginBottom: 28 }}>
            {description}
          </p>
        </div>
        <ol
          className={`hiw-grid${inView ? " hiw-grid-in" : ""}`}
          style={{ listStyle: "none", padding: 0, margin: 0 }}
          ref={ref}
        >
          {steps.map((s, idx) => (
            <li
              key={s.n}
              className="hiw-card"
              style={
                {
                  transitionDelay: `${idx * 110}ms`,
                  "--acc": s.clr,
                  "--acc-rgb": hexToRgbTriplet(s.clr),
                } as CSSProperties
              }
            >
              <span className="hiw-step">0{idx + 1}</span>
              <div className="hiw-icon-wrap">
                <div className="hiw-icon">
                  <StepIcon emoji={s.i} />
                </div>
              </div>
              <div className="hiw-title">{s.n}</div>
              <div className="hiw-desc">{s.d}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
