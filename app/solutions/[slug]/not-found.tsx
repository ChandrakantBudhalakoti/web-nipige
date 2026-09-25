import { CtaLink } from "@/components/ui/CtaLink";

export default function TemplateNotFound() {
  return (
    <section className="sec" style={{ paddingTop: 128 }}>
      <div className="mx ct" style={{ maxWidth: 560 }}>
        <div className="sl">{"// 404"}</div>
        <h1 className="st">Solution not found.</h1>
        <p className="sd">
          That vertical doesn&apos;t exist (yet). Browse the 3 production-ready solutions instead.
        </p>
        <CtaLink href="/solutions" variant="primary">
          View all solutions →
        </CtaLink>
      </div>
    </section>
  );
}
