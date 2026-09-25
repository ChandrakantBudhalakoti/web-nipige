"use client";

import { useState } from "react";
import { pricingFaqs } from "@/lib/data/pricing";

/** Expand/collapse FAQ list - ported from the prototype's inline FAQ markup. */
export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {pricingFaqs.map((f, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={f.q}
            className={`fq${isOpen ? " open" : ""}`}
            onClick={() => setOpenIndex(isOpen ? null : idx)}
          >
            <div className="fq-q">
              {f.q}
              <span className="fq-arr">+</span>
            </div>
            <div className="fq-a">{f.a}</div>
          </div>
        );
      })}
    </>
  );
}
