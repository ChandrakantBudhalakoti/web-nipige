import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/CtaLink";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Login - Access Your Nipige Dashboard",
    description: "Log in to your Nipige platform dashboard.",
    path: "/login",
  }),
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="sec" style={{ paddingTop: 120 }}>
      <div className="mx ct" style={{ maxWidth: 480 }}>
        <div className="sl">{"// login"}</div>
        <h1 className="st">Welcome back.</h1>
        <p className="sd" style={{ maxWidth: 400 }}>
          Access your Nipige platform dashboard.
        </p>

        <LoginForm />

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--wb)",
          }}
        >
          <p style={{ fontSize: 14, color: "var(--wm)", marginBottom: 8 }}>
            Don&apos;t have an account?
          </p>
          <CtaLink href="/demo" variant="primary" small>
            Start Free Trial →
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
