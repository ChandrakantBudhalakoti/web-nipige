import { CtaLink } from "@/components/ui/CtaLink";
import { TemplatePicker } from "@/components/home/TemplatePicker";
import { HeroParticles } from "@/components/home/HeroParticles";

const HERO_BULLETS = [
  "$0 marketplace platform fees",
  "Software + hosting + support included",
];

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <HeroParticles />
      <div className="mx">
        <div className="hero-copy">
          <div className="hpill">
            <div className="hdot" />
            <span>production-proven · 4 countries</span>
          </div>
          <h1>
            Your marketplace idea.
            <br />
            <em>Live in 14 days.</em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--wm)",
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 520,
            }}
          >
            Pick a solution, configure it without code, and go live in 14 days. Payments, mobile
            apps, and delivery are built in. $0 platform fees, forever.
          </p>
          <div className="hero-btns">
            <CtaLink href="/solutions" variant="primary">
              Explore Solutions →
            </CtaLink>
            <CtaLink href="/pricing" variant="ghost">
              View Pricing
            </CtaLink>
          </div>

          <div className="hero-trust">
            {HERO_BULLETS.map((s) => (
              <span key={s} className="hero-trust-item">
                <span className="hero-trust-dot" />
                {s}
              </span>
            ))}
          </div>

          <div className="hero-badge">
            <span className="hero-badge-icon" aria-hidden="true">
              ⚡
            </span>
            First 20 US/CA customers — 20% off
          </div>
        </div>

        <TemplatePicker />
      </div>
    </section>
  );
}
