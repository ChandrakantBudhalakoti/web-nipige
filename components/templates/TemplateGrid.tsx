"use client";

import { useEffect, useRef, useState } from "react";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { featuredTemplates } from "@/lib/data/templates";
// import { otherTemplates } from "@/lib/data/templates";

/**
 * Featured + "more verticals" split grid, shared by Home and the Templates page.
 * Only the first 3 verticals are shown for now - the "MORE VERTICALS" block below
 * is commented out on purpose (not deleted) so it can be restored on request.
 */
export function TemplateGrid() {
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
    <div className="template-grid-wrapper">
      <div className="template-section-label">
        <span className="template-section-line" />
        <span className="mn template-section-text">FEATURED — HIGHEST US/CANADA DEMAND</span>
        <span className="template-section-line" />
      </div>
      <div className={`tg tg-featured${inView ? " tg-in" : ""}`} ref={ref}>
        {featuredTemplates.map((t, idx) => (
          <TemplateCard key={t.id} t={t} featured style={{ transitionDelay: `${idx * 100}ms` }} />
        ))}
      </div>

      {/*
      <div className="template-section-label">
        <span className="template-section-line" />
        <span className="mn template-section-text template-section-text--dim">MORE VERTICALS</span>
        <span className="template-section-line" />
      </div>
      <div className="tg">
        {otherTemplates.map((t) => (
          <TemplateCard key={t.id} t={t} />
        ))}
      </div>
      */}
    </div>
  );
}
