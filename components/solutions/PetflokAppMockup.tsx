const PROVIDERS = [
  { icon: "🛁", name: "Pawsome Grooming Co.", meta: "⭐ 4.8 · from $45", grad: "#F59E0B" },
  { icon: "🐕", name: "Happy Trails Dog Walking", meta: "⭐ 4.9 · from $22", grad: "#059669" },
  { icon: "🏠", name: "Comfy Paws Pet Boarding", meta: "⭐ 4.7 · from $60/night", grad: "#D97706" },
];

/** Illustrated pet-services marketplace app UI - stands in for a product screenshot without needing a real photo. */
export function PetflokAppMockup() {
  return (
    <div className="app-mock">
      <div className="app-mock-bar">
        <span className="app-mock-dot" style={{ background: "#EF4444" }} />
        <span className="app-mock-dot" style={{ background: "#F59E0B" }} />
        <span className="app-mock-dot" style={{ background: "#22C55E" }} />
        <span className="app-mock-favicon app-mock-favicon--paw" aria-hidden="true" />
        <span className="app-mock-url">/pet-service</span>
      </div>
      <div className="app-mock-body">
        <div className="app-mock-header">
          <span className="app-mock-logo">🐾 Pet Service</span>
          <span className="app-mock-search">🔍 Search groomers, walkers…</span>
        </div>
        <div className="app-mock-restaurants">
          {PROVIDERS.map((p) => (
            <div key={p.name} className="app-mock-card">
              <div
                className="app-mock-card-img"
                style={{ background: p.grad }}
                aria-hidden="true"
              >
                <span className="app-mock-card-img-deco">{p.icon}</span>
                <span className="app-mock-card-icon-badge">
                  <span className="app-mock-card-icon">{p.icon}</span>
                </span>
              </div>
              <div className="app-mock-card-name">{p.name}</div>
              <div className="app-mock-card-meta">{p.meta}</div>
            </div>
          ))}
        </div>
        <div className="app-mock-cart">
          <span className="app-mock-cart-items">📅 128 bookings this week</span>
          <span className="app-mock-cart-btn">Book now →</span>
        </div>
      </div>
    </div>
  );
}
