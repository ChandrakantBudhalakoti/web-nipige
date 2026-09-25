"use client";

import { useEffect, useRef, useState } from "react";

const PROTOTYPE = [
  "Demo in 2 hours",
  "Single-feature app",
  "Breaks under real usage",
  "No payment compliance",
  "No data isolation",
  "No delivery dispatch",
  "You maintain everything",
];

const NIPIGE = [
  "Live in 14 days",
  "45+ integrated microservices",
  "Handles 35M transactions/month",
  "PCI-compliant payments",
  "Multi-tenant data isolation",
  "Real-time GPS dispatch",
  "Maintained, patched, supported",
];

export function AiVsProduction() {
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
    <section className="sec" style={{ background: "var(--bg)", borderTop: "1px solid var(--wb)" }}>
      <div className="mx ct">
        <div className="sl">{"// honest_truth"}</div>
        <h2 className="st">
          AI builds demos. <span className="grad-accent">Nipige builds businesses.</span>
        </h2>
        <p className="sd" style={{ marginBottom: 36 }}>
          AI tools prototype fast. But when real money flows and real users need uptime - you need
          production infrastructure.
        </p>
        <div className={`aig${inView ? " aig-in" : ""}`} ref={ref}>
          <div className="aic ai-b">
            <h3 className="ai-h ai-h-bad">Vibe-coded prototype</h3>
            {PROTOTYPE.map((f, idx) => (
              <div key={f} className="air" style={{ transitionDelay: `${idx * 55}ms` }}>
                <span className="air-mark air-mark-bad" aria-hidden="true">
                  ✗
                </span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="ai-vs" aria-hidden="true">
            VS
          </div>

          <div className="aic ai-g">
            <span className="ai-win" aria-hidden="true">
              ★ Production-ready
            </span>
            <h3 className="ai-h ai-h-good">Nipige production platform</h3>
            {NIPIGE.map((f, idx) => (
              <div key={f} className="air" style={{ transitionDelay: `${idx * 55 + 60}ms` }}>
                <span className="air-mark air-mark-good" aria-hidden="true">
                  ✓
                </span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
