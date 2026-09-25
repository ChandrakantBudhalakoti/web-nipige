import Link from "next/link";

const TAGS = ["🐕 Walking", "🛁 Grooming", "🏠 Boarding"];

/** Illustrated services-marketplace app UI - stands in for a product screenshot without needing a real photo. */
export function ServicesAppMockup() {
  return (
    <div className="app-mock">
      <div className="app-mock-bar">
        <span className="app-mock-dot" style={{ background: "#EF4444" }} />
        <span className="app-mock-dot" style={{ background: "#F59E0B" }} />
        <span className="app-mock-dot" style={{ background: "#22C55E" }} />
        <span className="app-mock-favicon app-mock-favicon--wrench" aria-hidden="true" />
        <span className="app-mock-url">/services</span>
      </div>
      <div className="app-mock-body">
        <div className="app-mock-header">
          <span className="app-mock-logo">🔧 Nipige Services</span>
          <span className="app-mock-search">🔍 Search groomers, walkers…</span>
        </div>

        <Link href="/solutions/services/pet-service" className="app-mock-feature">
          <span className="app-mock-feature-deco" aria-hidden="true">
            🐾
          </span>
          <span className="app-mock-feature-badge" aria-hidden="true">
            <span className="app-mock-feature-badge-dot" />
            Explore
          </span>
          <div className="app-mock-feature-icon" aria-hidden="true">
            🐾
          </div>
          <div className="app-mock-feature-name">Pet Service</div>
          <div className="app-mock-feature-tagline">Pet Services Marketplace</div>
          <div className="app-mock-feature-tags">
            {TAGS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <span className="app-mock-feature-cta">
            Explore Pet Service <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
