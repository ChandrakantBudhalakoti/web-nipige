const PROPERTIES = [
  {
    img: "/images/solutions/realestate-hero.jpg",
    name: "Maple Street Home",
    meta: "$489,000 · 3 bed",
    grad: "#7C3AED",
  },
  {
    img: "/images/solutions/realestate/living-room.webp",
    name: "Downtown Loft",
    meta: "$2,150/mo · 1 bed",
    grad: "#0EA5E9",
  },
  {
    img: "/images/solutions/realestate/apartment.webp",
    name: "Skyline Residences",
    meta: "$685,000 · 2 bed",
    grad: "#6366F1",
  },
];

/** Illustrated property-listing app UI - stands in for a product screenshot without needing a real photo. */
export function RealEstateAppMockup() {
  return (
    <div className="app-mock">
      <div className="app-mock-bar">
        <span className="app-mock-dot" style={{ background: "#EF4444" }} />
        <span className="app-mock-dot" style={{ background: "#F59E0B" }} />
        <span className="app-mock-dot" style={{ background: "#22C55E" }} />
        <span className="app-mock-favicon app-mock-favicon--home" aria-hidden="true" />
        <span className="app-mock-url">/real-estate</span>
      </div>
      <div className="app-mock-body">
        <div className="app-mock-header">
          <span className="app-mock-logo">🏠 Nipige Homes</span>
          <span className="app-mock-search">🔍 Search properties…</span>
        </div>
        <div className="app-mock-restaurants">
          {PROPERTIES.map((p) => (
            <div key={p.name} className="app-mock-card">
              <div className="app-mock-card-img" style={{ background: p.grad }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} loading="lazy" width={200} height={200} />
              </div>
              <div className="app-mock-card-name">{p.name}</div>
              <div className="app-mock-card-meta">{p.meta}</div>
            </div>
          ))}
        </div>
        <div className="app-mock-cart">
          <span className="app-mock-cart-items">❤ 12 saved homes</span>
          <span className="app-mock-cart-btn">Schedule a tour →</span>
        </div>
      </div>
    </div>
  );
}
