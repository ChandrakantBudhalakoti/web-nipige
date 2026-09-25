import { CtaLink } from "@/components/ui/CtaLink";

export function FoundingOffer() {
  return (
    <section className="sec" style={{ background: "var(--bg2)" }}>
      <div className="mx">
        <div className="fo">
          <div className="fo-bd">First 20 customers · USA & Canada</div>
          <h2 className="st" style={{ marginBottom: 10 }}>
            20% off for 12 months.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#404040",
              maxWidth: 480,
              margin: "0 auto 24px",
              lineHeight: 1.7,
            }}
          >
            Lock in a founding rate. Share a case study and feedback in return. Limited spots.
          </p>
          <CtaLink href="/demo" variant="primary">
            Start Free Trial →
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
