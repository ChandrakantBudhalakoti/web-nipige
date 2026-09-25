"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { testimonials } from "@/lib/data/testimonials";

const PALETTE = ["#06B6D4", "#8B5CF6", "#F59E0B"];

/** "#RRGGBB" -> "r, g, b", so CSS can build rgba(var(--acc-rgb), alpha) per card. */
function hexToRgbTriplet(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Testimonials grid - shared by Home and the Case Studies page. */
export function Testimonials({
  label = "// what_customers_say",
  title = "From our customers",
  background = "var(--bg)",
}: {
  label?: string;
  title?: string;
  background?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec" style={{ background }}>
      <div className="mx">
        <div className="ct">
          <div className="sl">{label}</div>
          <h2 className="st">{title}</h2>
        </div>
        <div className={`tst-grid${inView ? " tst-grid-in" : ""}`} ref={ref}>
          {testimonials.map((t, idx) => {
            const clr = PALETTE[idx % PALETTE.length];
            return (
              <article
                key={t.name}
                className="tst"
                style={
                  {
                    transitionDelay: `${idx * 90}ms`,
                    "--acc": clr,
                    "--acc-rgb": hexToRgbTriplet(clr),
                  } as CSSProperties
                }
              >
                <span className="tst-quote-mark" aria-hidden="true">
                  “
                </span>
                <q>{t.q}</q>
                <span className="tst-accent" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
