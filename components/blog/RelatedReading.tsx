import Link from "next/link";
import type { RelatedCard, RelatedCardKind } from "@/lib/relatedCard";

const KIND_LABEL: Record<RelatedCardKind, string> = {
  blog: "Guide",
  compare: "Compare",
  solution: "Solution",
};

const KIND_ICON: Record<RelatedCardKind, string> = {
  blog: "📖",
  compare: "⚖️",
  solution: "🚀",
};

export function RelatedReading({ items }: { items: RelatedCard[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="related-reading" aria-label="Related reading">
      <div className="sl">{"// or keep reading"}</div>
      <div className="related-grid">
        {items.map((item) => (
          <article key={item.href}>
            <Link href={item.href} className="related-card">
              <div className="related-card-image">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- thumbnails mix .webp and .svg sources; next/image rejects SVG without extra config
                  <img src={item.image} alt={item.imageAlt ?? item.title} loading="lazy" decoding="async" width={800} height={450} />
                ) : (
                  <div className="related-card-placeholder" aria-hidden="true">
                    {KIND_ICON[item.kind]}
                  </div>
                )}
                <span className="related-card-kind">{KIND_LABEL[item.kind]}</span>
              </div>
              <div className="related-card-body">
                <div className="related-card-title">{item.title}</div>
                <p className="related-card-desc">{item.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </aside>
  );
}
