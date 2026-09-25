import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/seo";

const title = "Privacy Policy: How Nipige Protects Your Data";
const description =
  "Nipige's privacy policy: how we collect, use, store, and protect your personal data when you use our website, platform, and marketplace services.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/privacy-policy",
});

const privacyPolicyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/privacy-policy#webpage`,
      url: `${siteConfig.url}/privacy-policy`,
      name: title,
      description,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteConfig.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: `${siteConfig.url}/privacy-policy`,
        },
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <section className="sec" style={{ paddingTop: 104 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicyJsonLd) }} />
      <div className="mx" style={{ maxWidth: 760 }}>
        <div className="sl">{"// legal"}</div>
        <h1 className="st">Privacy Policy</h1>
        <div className="mn" style={{ fontSize: 12, color: "var(--wm)", marginBottom: 24 }}>
          Version 1.0 | Effective 7 July 2026
        </div>
        <article className="prose-nipige">
          <p>
            This document explains how NIPIGE collects, uses, and protects your personal information.
          </p>

          <h2>1. About This Privacy Policy</h2>
          <p>
            NIPIGE (&quot;NIPIGE&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting
            the privacy of personal information we collect through the NIPIGE website at www.nipige.com and
            any related subdomains (collectively, the &quot;Website&quot;). This Privacy Policy explains what
            personal information we collect, why we collect it, how we use and protect it, and what rights you
            have.
          </p>
          <p>
            This Policy applies to Website visitors, prospective clients, and registered users. It does not
            govern the processing of personal data that NIPIGE carries out on behalf of its platform clients —
            those obligations are addressed in each client&apos;s Data Processing Addendum (DPA). If you are an
            existing NIPIGE client, please refer to your DPA or contact your account representative.
          </p>
          <p>
            By using the Website, you acknowledge that you have read and understood this Policy. NIPIGE&apos;s
            data protection obligations are primarily governed by the Personal Data Protection Act 2012 (PDPA)
            of Singapore and, where applicable, the General Data Protection Regulation (GDPR) of the
            European Union.
          </p>

          <h2>2. Data Controller</h2>
          <p>
            The data controller for personal information collected through the Website is:
          </p>
          <p>
            NIPIGE<br />
            Email: <a href="mailto:contactus@nipige.com">contactus@nipige.com</a><br />
            Website: <a href="https://www.nipige.com">www.nipige.com</a>
          </p>
          <p>
            For privacy-related inquiries, please contact our designated privacy officer at
            contactus@nipige.com.
          </p>

          <h2>3. What Personal Information We Collect</h2>
          <h3>3.1 Information You Provide Directly</h3>
          <p>
            When you submit an enquiry form, request a demo, register for an account, or contact us through
            the Website, we may collect:
          </p>
          <ul>
            <li>Your name and business email address</li>
            <li>Company name and job title</li>
            <li>Telephone number (if provided)</li>
            <li>The content of your message or enquiry</li>
            <li>Billing information (if purchasing services)</li>
          </ul>
          <h3>3.2 Information Collected Automatically</h3>
          <p>
            When you visit the Website, we and our third-party technology providers automatically collect
            technical and usage information, including:
          </p>
          <ul>
            <li>Your IP address</li>
            <li>Device and browser type</li>
            <li>Pages visited and time on page</li>
            <li>Geographical location (based on IP address)</li>
            <li>How you navigated to the Website</li>
            <li>Service access times and page view statistics</li>
          </ul>
          <p>
            This information is collected through cookies and tracking technologies described in Section 6.
          </p>
          <h3>3.3 Testimonials</h3>
          <p>
            Where you provide a testimonial and consent to its publication, we may display your name, job
            title, company, and testimonial content on the Website. You may request removal at any time by
            contacting us at contactus@nipige.com.
          </p>

          <h2>4. Legal Basis and Purpose of Processing</h2>
          <p>
            We process personal information for the following purposes and legal bases:
          </p>
          <div className="privacy-table-wrapper">
            <table className="privacy-table">
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Legal Basis</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>(1) Service Provision</td>
                  <td>Contractual necessity</td>
                  <td>Account creation, service delivery, billing, customer support</td>
                </tr>
                <tr>
                  <td>(2) Marketing &amp; Communications</td>
                  <td>Consent / Legitimate interest</td>
                  <td>Product updates, newsletters, promotional emails (with opt-out)</td>
                </tr>
                <tr>
                  <td>(3) Website Operation</td>
                  <td>Legitimate interest</td>
                  <td>Analytics, performance monitoring, bug fixing</td>
                </tr>
                <tr>
                  <td>(4) Legal Compliance</td>
                  <td>Legal obligation</td>
                  <td>Regulatory reporting, fraud prevention</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We do not sell, rent, or share your personal information with third parties for those third
            parties to market their own products or services to you.
          </p>

          <h2>5. Who We Share Personal Information With</h2>
          <p>
            We share personal information only with trusted service providers who assist us in operating the
            Website and our business. These currently include:
          </p>
          <div className="privacy-table-wrapper">
            <table className="privacy-table privacy-providers-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HubSpot, Inc.</td>
                  <td>CRM and marketing automation</td>
                  <td>United States</td>
                </tr>
                <tr>
                  <td>Google LLC</td>
                  <td>Website analytics and marketing</td>
                  <td>United States</td>
                </tr>
                <tr>
                  <td>LinkedIn Ireland</td>
                  <td>Marketing analytics and retargeting</td>
                  <td>United States / EU</td>
                </tr>
                <tr>
                  <td>Stripe, Inc.</td>
                  <td>Payment processing</td>
                  <td>United States</td>
                </tr>
                <tr>
                  <td>Microsoft Corp.</td>
                  <td>Corporate services and cloud</td>
                  <td>Various</td>
                </tr>
                <tr>
                  <td>Meta Platforms, Inc.</td>
                  <td>Marketing and retargeting</td>
                  <td>United States</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Where personal information is shared with providers outside Singapore or the EU/EEA, we require
            those providers to protect it to a standard consistent with the PDPA and GDPR through Standard
            Contractual Clauses (SCCs), Privacy Shield certification, and Data Processing Agreements (DPAs).
          </p>
          <p>
            All service providers are prohibited from using your information for any purpose beyond what is
            necessary to deliver their services to us.
          </p>
          <p>
            We may also disclose personal information to our professional advisers (lawyers, accountants,
            auditors) where required for legal or governance purposes; when required by law such as to comply
            with requests by competent authorities; and in connection with a merger, acquisition, or sale of
            substantially all of our assets.
          </p>

          <h2>6. Cookies and Tracking Technologies</h2>
          <h3>6.1 What We Use</h3>
          <p>
            The Website uses cookies and similar tracking technologies to operate correctly, understand how
            visitors use the Website, and deliver relevant marketing. The technologies currently active on the
            Website are:
          </p>
          <div className="privacy-table-wrapper">
            <table className="privacy-table privacy-cookies-table">
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Purpose</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Analytics</td>
                  <td>Tracks Website traffic and visitor behaviour</td>
                  <td>To help us improve the Website</td>
                </tr>
                <tr>
                  <td>LinkedIn Insight Tag</td>
                  <td>Marketing analytics, conversion tracking</td>
                  <td>Retargeting through LinkedIn</td>
                </tr>
                <tr>
                  <td>Google Ads</td>
                  <td>Measures Website interactions</td>
                  <td>Leading to enquiries and conversions</td>
                </tr>
                <tr>
                  <td>Meta Pixel</td>
                  <td>Marketing analytics and retargeting</td>
                  <td>Through Facebook and Instagram</td>
                </tr>
                <tr>
                  <td>Functional Cookies</td>
                  <td>Strictly necessary for Website operation</td>
                  <td>Session management and authentication</td>
                </tr>
                <tr>
                  <td>Session Cookies</td>
                  <td>Maintain login state and security</td>
                  <td>During your visit to the Website</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>6.2 Your Choices</h3>
          <p>
            A cookie consent tool is available on the Website. When you first visit, you may accept all
            cookies, decline non-essential cookies (analytics and marketing), or update your preferences at
            any time through the cookie settings link.
          </p>
          <p>
            You may also manage cookies through your browser settings, though disabling certain cookies may
            affect Website functionality.
          </p>
          <h3>6.3 Do Not Track</h3>
          <p>
            The Website does not currently respond to Do Not Track (DNT) signals from browsers. We will
            update this position if a uniform standard for DNT compliance is established.
          </p>

          <h2>7. Security</h2>
          <p>
            NIPIGE implements appropriate technical and organisational measures to protect personal
            information against unauthorised access, disclosure, alteration, or loss, including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS/SSL)</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security assessments and monitoring</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            No method of transmission over the internet is completely secure. If you believe your
            information has been compromised, please contact us immediately at contactus@nipige.com.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary for the purposes defined in this Policy:
          </p>
          <div className="privacy-table-wrapper">
            <table className="privacy-table privacy-retention-table">
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Retention Period</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Enquiry and contact form data</td>
                  <td>3 years from last interaction</td>
                  <td>Business relationship management</td>
                </tr>
                <tr>
                  <td>Account and billing data</td>
                  <td>Duration of agreement + 7 years</td>
                  <td>Legal obligation for financial records</td>
                </tr>
                <tr>
                  <td>Analytics data</td>
                  <td>14 months</td>
                  <td>Google Analytics default setting</td>
                </tr>
                <tr>
                  <td>Testimonials</td>
                  <td>Until you withdraw consent</td>
                  <td>Consent-based processing</td>
                </tr>
                <tr>
                  <td>Marketing consent records</td>
                  <td>As long as subscribed + 2 years</td>
                  <td>Compliance and audit purposes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When personal information is no longer needed, we securely delete or de-identify it.
          </p>

          <h2>9. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <div className="privacy-table-wrapper">
            <table className="privacy-table privacy-rights-table">
              <thead>
                <tr>
                  <th>Right</th>
                  <th>Description</th>
                  <th>How to Exercise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Access</td>
                  <td>Request a copy of personal information we hold about you</td>
                  <td>Email contactus@nipige.com</td>
                </tr>
                <tr>
                  <td>Correction</td>
                  <td>Request correction of inaccurate or incomplete data</td>
                  <td>Email contactus@nipige.com</td>
                </tr>
                <tr>
                  <td>Deletion</td>
                  <td>Request deletion of your personal information</td>
                  <td>Email contactus@nipige.com</td>
                </tr>
                <tr>
                  <td>Restriction</td>
                  <td>Request restriction of processing in certain circumstances</td>
                  <td>Email contactus@nipige.com</td>
                </tr>
                <tr>
                  <td>Data Portability</td>
                  <td>Receive your data in a structured, machine-readable format</td>
                  <td>Email contactus@nipige.com</td>
                </tr>
                <tr>
                  <td>Objection</td>
                  <td>Object to processing based on legitimate interest</td>
                  <td>Email contactus@nipige.com</td>
                </tr>
                <tr>
                  <td>Opt-out of Marketing</td>
                  <td>Unsubscribe from marketing communications at any time</td>
                  <td>Click unsubscribe in any email or contact contactus@nipige.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We will respond to all requests within 30 days. If you are not satisfied with how we handle your
            request, you may contact:
          </p>
          <ul>
            <li>Personal Data Protection Commission of Singapore (pdpc.gov.sg)</li>
            <li>Your local data protection authority (if in the EU)</li>
          </ul>

          <h2>10. Cross-Border Data Transfers</h2>
          <p>
            Personal information may be transferred to and processed in countries outside of Singapore or the
            EU/EEA. When we do so, we ensure appropriate safeguards are in place, such as:
          </p>
          <ul>
            <li>Standard Contractual Clauses (SCCs) approved by the EU Commission</li>
            <li>Adequacy decisions where applicable</li>
            <li>Binding Corporate Rules (where established)</li>
          </ul>

          <h2>11. Third-Party Links</h2>
          <p>
            The Website may contain links to third-party websites, resources, and services that are not owned
            or controlled by NIPIGE. These links are provided for your convenience only. NIPIGE has no
            control over, and assumes no responsibility for, the content, privacy policies, or practices of
            any third-party websites. We encourage you to review the privacy policies of any third-party
            site you visit before submitting personal information.
          </p>

          <h2>12. Children&apos;s Privacy</h2>
          <p>
            The Website is not intended for children under the age of 16. We do not knowingly collect personal
            information from children under 16. If you believe we have inadvertently collected such
            information, please contact us at contactus@nipige.com and we will promptly delete it.
          </p>

          <h2>13. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. For material changes, we will:
          </p>
          <ul>
            <li>Post a notice on the Website with at least 30 days&apos; advance notice</li>
            <li>Send email notification to registered users (where applicable)</li>
            <li>Update the effective date at the top of this Policy</li>
          </ul>
          <p>
            The current version will always be available at www.nipige.com/privacy. Continued use of the
            Website after any update constitutes acceptance of the revised Policy.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            For any questions, concerns, or requests relating to this Privacy Policy or the handling of your
            personal information, please contact us:
          </p>
          <p>
            NIPIGE<br />
            Email: <a href="mailto:contactus@nipige.com">contactus@nipige.com</a><br />
            Website: <a href="https://www.nipige.com">www.nipige.com</a>
          </p>
          <p>
            You may also use our General Inquiry form on the Website, which is logged and monitored regularly.
          </p>
        </article>
      </div>
    </section>
  );
}
