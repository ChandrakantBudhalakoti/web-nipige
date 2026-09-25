"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/ui/Logo";
import { templates } from "@/lib/data/templates";

export function Footer() {
  const pathname = usePathname();
  const footerTemplates = templates.slice(0, 3);
  const isDemoPage = pathname.startsWith("/demo");

  return (
    <footer>
      <div className="mx">
        <div className="fg">
          <div>
            <div className="logo" style={{ marginBottom: 12, cursor: "default" }}>
              <LogoMark size={29} />
              <span style={{ fontSize: 16 }} className="logo-text">
                nipige
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.7, maxWidth: 240 }}>
              Production-grade platform engine. 13+ years. 4 countries. 0% platform fees.
            </p>
            <a
              href="mailto:contactus@nipige.com"
              className="footer-contact"
              style={{ fontSize: 13, display: "inline-block", marginTop: 14 }}
            >
              contactus@nipige.com
            </a>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <a
                href="https://www.linkedin.com/company/nipige/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nipige on LinkedIn"
                className="footer-social"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
              <a
                href="https://x.com/nipigehq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nipige on X (Twitter)"
                className="footer-social"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.41l-5.8-7.59-6.64 7.59H.46l8.6-9.83L0 2.25h7.6l5.24 6.93 6.06-6.93zm-1.29 17.25h2.04L6.5 4.36H4.31L17.61 19.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="footer-col-heading">Solutions</p>
            {footerTemplates.map((t) => (
              <Link key={t.id} href={`/solutions/${t.id}`}>
                {t.nm}
              </Link>
            ))}
            {/* <Link href="/solutions">All Solutions →</Link> */}
          </div>

          <div>
            <p className="footer-col-heading">Compare</p>
            <Link href="/compare">All Comparisons</Link>
            <Link href="/why-nipige">Why Nipige</Link>
            <Link href="/compare/sharetribe-alternatives">Sharetribe Alternatives</Link>
            <Link href="/compare/cs-cart-alternatives">CS-Cart Alternatives</Link>
            <Link href="/compare/mirakl-alternatives">Mirakl Alternatives</Link>
            <Link href="/compare/arcadier-alternatives">Arcadier Alternatives</Link>
            <Link href="/compare/bubble-alternatives">Bubble Alternatives</Link>
          </div>

          <div>
            <p className="footer-col-heading">Company</p>
            <Link href="/about">About us</Link>
            <Link href="/case-studies">Case Studies</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/agency">Agency</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <p className="footer-col-heading">Get Started</p>
            <p style={{ fontSize: 13, color: "var(--wm)", marginBottom: 12 }}>Launch in 14 days.</p>
            {isDemoPage ? (
              <a href="/demo" className="btn bp bs">
                Start Free Trial →
              </a>
            ) : (
              <Link href="/demo" className="btn bp bs">
                Start Free Trial →
              </Link>
            )}
          </div>
        </div>

        <div className="fb">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span>© 2026 Trigital Technologies Pvt Ltd</span>
            <span>Hyderabad · Austin, TX</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/privacy-policy" style={{ marginBottom: 0 }}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" style={{ marginBottom: 0 }}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
