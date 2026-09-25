import { CtaLink } from "@/components/ui/CtaLink";

export default function NotFound() {
  return (
    <section className="sec" style={{ paddingTop: 128 }}>
      <div className="mx ct" style={{ maxWidth: 560 }}>
        <div className="sl">{"// 404"}</div>
        <h1 className="st">Page not found.</h1>
        <p className="sd">
          That page doesn&apos;t exist or may have moved. Try the homepage, or browse our
          solutions.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <CtaLink href="/" variant="primary">
            Back to home →
          </CtaLink>
          <CtaLink href="/solutions" variant="ghost">
            View solutions
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
