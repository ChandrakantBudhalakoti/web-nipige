"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

/** Sticky sidebar TOC that highlights the heading currently being read as the page scrolls. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(items[0]?.slug ?? null);

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (headingEls.length === 0) return;

    const OFFSET = 120; // px from viewport top, clears the fixed navbar

    function updateActive() {
      let current = headingEls[0].id;
      for (const el of headingEls) {
        if (el.getBoundingClientRect().top - OFFSET <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveSlug(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [items]);

  return (
    <nav className="toc-box" aria-label="Table of contents">
      <div className="sl">{"// on this page"}</div>
      <ol className="toc-list">
        {items.map((item) => (
          <li key={item.slug}>
            <a
              className={`toc-link${item.slug === activeSlug ? " toc-link-active" : ""}`}
              href={`#${item.slug}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
