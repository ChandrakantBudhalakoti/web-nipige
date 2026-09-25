import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata, siteConfig } from "@/lib/seo";

const title = "Contact Nipige: Talk to Our Marketplace Team";
const description =
  "Get in touch with the Nipige team about building your marketplace, choosing a plan or booking a demo. We usually reply within one business day - say hello.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/contact",
});

const CONTACT_FAQS = [
  {
    q: "How quickly does Nipige respond to contact form submissions?",
    a: "We usually reply within one business day. For a faster, more structured conversation about your marketplace, book a demo instead of the contact form.",
  },
  {
    q: "What's the difference between the contact form and booking a demo?",
    a: "The contact form is for general questions - pricing, partnerships, support, press. Booking a demo gets you a guided walkthrough of the platform configured for your specific vertical.",
  },
  {
    q: "Can I get product support through this page?",
    a: "Yes. Existing customers can reach the team here or email contactus@nipige.com directly; plan-specific support hours are listed on the pricing page.",
  },
  {
    q: "Does Nipige offer sales calls before I commit to a plan?",
    a: "Yes - use this form or /demo to book a no-pressure walkthrough. Starter and Growth also offer a self-serve free trial if you'd rather explore on your own first.",
  },
];

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/contact/#webpage`,
      url: `${siteConfig.url}/contact/`,
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
          name: "Contact",
          item: `${siteConfig.url}/contact/`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: CONTACT_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <section className="sec" style={{ paddingTop: 104 }}>
        <div className="mx ct">
          <div className="sl">{"// contact"}</div>
          <h1 className="st">Contact the Nipige Team</h1>
          <p className="sd">
            Get in touch about building your marketplace, choosing a plan or booking a demo. We usually
            reply within one business day.
          </p>
          <p className="sd" style={{ maxWidth: 560 }}>
            Use this form for general questions — pricing, partnerships, press, or existing-customer
            support. If you&apos;d rather see the platform live first, book a{" "}
            <a href="/demo" style={{ color: "var(--cy)" }}>
              guided demo
            </a>{" "}
            configured for your vertical, or email us directly at contactus@nipige.com.
          </p>
          <ContactForm />

          <section aria-labelledby="contact-why-heading" style={{ marginTop: 56, textAlign: "left" }}>
            <h2
              id="contact-why-heading"
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                marginBottom: 16,
                fontFamily: "var(--font-jakarta)",
                textAlign: "center",
              }}
            >
              Why founders reach out to Nipige
            </h2>
            <p className="sd">
              We&apos;re always ready to help with questions about building or running your marketplace on
              Nipige. Our team is here to make your experience — from your first demo through running live
              orders — smooth and successful, whatever stage you&apos;re at.
            </p>
            <p className="sd">
              Maybe you&apos;re evaluating Nipige and want to know how a specific vertical — restaurant, real
              estate, or services — fits your business. Or you&apos;re already a customer with a question
              about your plan, a configuration setting, or a platform feature. We&apos;re equipped to give
              clear answers and practical next steps for both, and everything in between.
            </p>
            <p className="sd">
              Talking directly with our team means advice tailored to your actual setup — your vertical,
              your plan, and where you are in launching. We understand the details of running a marketplace
              on Nipige and are committed to helping you resolve issues quickly, so you can focus on growing
              your platform rather than troubleshooting it.
            </p>
            <p className="sd" style={{ marginBottom: 0 }}>
              Your questions and feedback genuinely shape how we improve Nipige for every founder building
              on it. We look forward to hearing from you.
            </p>
          </section>

          <section aria-label="Frequently asked questions" className="faq-list" style={{ marginTop: 32, textAlign: "left" }}>
            {CONTACT_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}
