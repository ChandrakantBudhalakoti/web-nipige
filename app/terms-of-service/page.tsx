import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/seo";

const title = "Terms of Service | Nipige Marketplace Platform";
const description =
  "Nipige's terms of service: the rules and conditions that govern your use of our website, marketplace platform, and software solutions for founders and agencies.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/terms-of-service",
});

const termsOfServiceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/terms-of-service#webpage`,
      url: `${siteConfig.url}/terms-of-service`,
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
          name: "Terms of Service",
          item: `${siteConfig.url}/terms-of-service`,
        },
      ],
    },
  ],
};

export default function TermsOfServicePage() {
  return (
    <section className="sec" style={{ paddingTop: 104 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsOfServiceJsonLd) }} />
      <div className="mx" style={{ maxWidth: 760 }}>
        <div className="sl">{"// legal"}</div>
        <h1 className="st">Terms &amp; Conditions</h1>
        <div className="mn" style={{ fontSize: 12, color: "var(--wm)", marginBottom: 24 }}>
          Version 1.0 | Effective 7 July 2026
        </div>
        <article className="prose-nipige">
          <p>
            This document governs your access to and use of the NIPIGE website and associated services.
          </p>

          <h2>1. Introduction and Acceptance</h2>
          <p>
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website located at
            www.nipige.com and any related subdomains, pages, or associated services (collectively, the
            &quot;Website&quot; or &quot;Service&quot;), which is owned and operated by NIPIGE (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;, or &quot;NIPIGE&quot;).
          </p>
          <p>
            By accessing or using the Website in any way — including browsing, submitting an enquiry,
            registering for an account, or engaging with any content — you agree to be bound by these Terms.
            If you do not agree to these Terms, please do not use the Website.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use the Website (&quot;you&quot;
            or &quot;User&quot;). They do not govern your use of the NIPIGE platform software or services, which
            is addressed separately in your Platform Service Agreement with NIPIGE.
          </p>

          <h2>2. Nature of the Website and Service</h2>
          <h3>2.1 Website Purpose</h3>
          <p>
            The Website is a marketing, informational, and SaaS platform. It provides information about
            NIPIGE&apos;s digital business solutions, case studies, knowledge resources, API documentation,
            and contact facilities. Nothing on the Website constitutes an offer to contract, a binding
            commercial proposal, or a representation as to the specific features, pricing, or availability of
            any NIPIGE product or service unless explicitly stated.
          </p>
          <h3>2.2 Service Scope</h3>
          <p>
            Any commercial engagement with NIPIGE — including the licensing of the NIPIGE platform,
            professional services, API access, or support — will be subject to a separate Platform Service
            Agreement executed between you and NIPIGE.
          </p>
          <h3>2.3 Information Accuracy</h3>
          <p>
            Information on the Website is provided for general guidance only and may change without notice. We
            make reasonable efforts to keep content accurate and current but give no warranties in that
            regard.
          </p>

          <h2>3. Intellectual Property</h2>
          <h3>3.1 NIPIGE&apos;s Intellectual Property</h3>
          <p>
            All content on the Website — including but not limited to text, graphics, logos, icons, images,
            audio clips, digital downloads, data compilations, case studies, articles, software, code
            samples, API documentation, and the overall design and layout — is the property of NIPIGE or its
            content suppliers and is protected by applicable intellectual property laws, including copyright
            law internationally.
          </p>
          <p>
            The NIPIGE name, logo, and all related product names, marks, and taglines are the property of
            NIPIGE. You may not use the NIPIGE name or logo without our prior written consent. You must not
            purchase search engine or pay-per-click keywords, or register domain names, that use the NIPIGE
            name or logo or create confusingly similar variations thereof.
          </p>
          <h3>3.2 Permitted Use</h3>
          <p>
            Subject to these Terms, NIPIGE grants you a limited, non-exclusive, non-transferable, revocable
            licence to access and use the Website for your own personal or internal business evaluation
            purposes. This licence does not include the right to:
          </p>
          <ul>
            <li>reproduce, duplicate, copy, sell, resell or exploit any portion of the Website or Website Content for any commercial purpose without our express written consent;</li>
            <li>modify, translate or create derivative works based on the Website Content;</li>
            <li>remove or alter any copyright, trademark or other proprietary notices;</li>
            <li>use the Website Content in any manner that may infringe the intellectual property rights of NIPIGE or any third party;</li>
            <li>scrape, data-mine, or systematically extract data from the Website by automated means;</li>
            <li>use the Website to build a competing product or service, or to benchmark or compare the Website for competitive intelligence purposes without our consent.</li>
          </ul>
          <h3>3.3 Your Submissions and Content</h3>
          <p>
            Any content you submit to us through the Website — including enquiry form submissions, demo
            requests, feedback, or user-generated content — is governed by Section 7 of these Terms. You
            retain ownership of content you submit, but grant NIPIGE a licence to use it as set out in Section 7.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>
            You agree to use the Website and Service only for lawful purposes and in a manner that does not
            infringe the rights of others or restrict or inhibit their use and enjoyment of the Website.
            Without limiting the foregoing, you must not:
          </p>
          <ul>
            <li>use the Website in any way that violates any applicable local, national, or international law or regulation;</li>
            <li>transmit any unsolicited or unauthorised advertising or promotional material;</li>
            <li>knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code;</li>
            <li>attempt to gain unauthorised access to any part of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website;</li>
            <li>attack the Website via a denial-of-service attack or a distributed denial-of-service attack;</li>
            <li>use the Website to build a competing product or service, or to benchmark or compare the Website for competitive intelligence purposes without our consent;</li>
            <li>impersonate NIPIGE, a NIPIGE employee, or any other person;</li>
            <li>engage in conduct that is harmful, offensive, threatening, abusive, defamatory, obscene, or otherwise objectionable;</li>
            <li>conduct unauthorised load testing, security testing, or any other use that causes an unreasonable load on our resources.</li>
          </ul>
          <p>
            A breach of this Section may constitute a criminal offence under applicable legislation. NIPIGE
            will report any such breach to the relevant law enforcement authorities and will cooperate fully
            with those authorities by disclosing your identity. In the event of such a breach, your right to
            use the Website will cease immediately.
          </p>

          <h2>5. Enquiry Forms, Contact Submissions, and Demo Requests</h2>
          <p>
            The Website includes contact forms, enquiry forms, and demo request forms through which you may
            submit your name, email address, company details, phone number, and a description of your
            requirements (&quot;Enquiry Data&quot;) to NIPIGE.
          </p>
          <p>By submitting an enquiry, you:</p>
          <ul>
            <li>confirm that all information you provide is accurate, complete, and not misleading;</li>
            <li>consent to NIPIGE using your Enquiry Data to respond to your enquiry and, where you have indicated consent, to send you marketing communications about NIPIGE&apos;s services;</li>
            <li>acknowledge that submission of an enquiry does not create any contractual relationship between you and NIPIGE, and does not constitute an offer or acceptance of any commercial terms;</li>
            <li>acknowledge that NIPIGE is not obligated to respond to any enquiry.</li>
          </ul>
          <p>
            NIPIGE will handle your Enquiry Data in accordance with its Privacy Policy. Please review the
            Privacy Policy before submitting any personal information.
          </p>

          <h2>6. Knowledge Hub, Blog, and Social Media</h2>
          <h3>6.1 Knowledge Hub and Blog Content</h3>
          <p>
            The Knowledge Hub, Blog, and Resource Center (including articles, guides, whitepapers, and
            resources published on the Website) are provided for general informational purposes only. The
            content does not constitute legal, financial, technical, or commercial advice. NIPIGE makes
            reasonable efforts to keep this content accurate and current but gives no warranties in that
            regard. All content is subject to the intellectual property protections set out in Section 3.
          </p>
          <p>
            The Website may permit public comment submissions on Blog articles. If you submit comments, they
            are governed by Section 7 of these Terms.
          </p>
          <h3>6.2 Social Media Channels</h3>
          <p>
            NIPIGE maintains official branded pages on social media platforms (collectively, &quot;Social
            Media Channels&quot;). These Terms apply to your conduct in connection with NIPIGE&apos;s Social
            Media Channels to the extent that NIPIGE has control over them. However, your use of those
            platforms is also governed by the terms of service of the relevant platform operator, over which
            NIPIGE has no control and for which NIPIGE accepts no responsibility.
          </p>
          <h3>6.3 Conduct on NIPIGE&apos;s Social Media Channels</h3>
          <p>When you post, comment, reply, tag, or otherwise interact with NIPIGE&apos;s Social Media Channels, you agree that your content:</p>
          <ul>
            <li>complies with the relevant platform&apos;s community guidelines and terms of service;</li>
            <li>is not defamatory, offensive, threatening, abusive, misleading, or otherwise harmful;</li>
            <li>does not infringe the intellectual property rights of any third party;</li>
            <li>does not contain unsolicited commercial messages, spam, or promotional material;</li>
            <li>does not include personal data of third parties without their consent.</li>
          </ul>
          <h3>6.4 Moderation</h3>
          <p>
            NIPIGE does not actively monitor or moderate comments, replies, or other user-generated content
            posted on its Social Media Channels in real time. NIPIGE reserves the right — but does not
            assume any obligation — to review, remove, or report content that comes to its attention and that
            it determines, in its sole discretion, to be unlawful, harmful, infringing, or in violation of
            the relevant platform&apos;s guidelines or these Terms.
          </p>
          <p>
            The presence of any third-party comment or content on NIPIGE&apos;s Social Media Channels does not
            constitute endorsement, verification, or approval of that content by NIPIGE. NIPIGE is not
            responsible or liable for any content posted by third parties.
          </p>
          <h3>6.5 No Affiliation with Platform Operators</h3>
          <p>
            NIPIGE&apos;s Social Media Channels are operated independently by NIPIGE and are not sponsored by,
            affiliated with, or endorsed by any social media platform operator. Any dispute arising from your
            use of those platforms must be directed to the relevant platform operator.
          </p>
          <h3>6.6 Third-Party Directory and Review Listings</h3>
          <p>
            NIPIGE may be listed on third-party software directory and review platforms (e.g., G2, Capterra,
            Clutch, GetApp) (collectively, &quot;Directory Platforms&quot;). These listings are provided for
            informational purposes and to assist prospective customers in evaluating NIPIGE&apos;s platform.
          </p>
          <p>
            NIPIGE does not own, operate, or control the Directory Platforms and is not responsible for the
            accuracy, completeness, or fairness of any content published on them, including user reviews and
            ratings. Any reference to NIPIGE on a Directory Platform does not imply endorsement, sponsorship,
            or affiliation.
          </p>
          <h3>6.7 Third-Party Reviews and Ratings</h3>
          <p>
            Reviews, ratings, and opinions published by third parties on Directory Platforms or any other
            external platform are the views of the individual reviewers and do not represent the views or
            positions of NIPIGE. NIPIGE does not verify, endorse, or accept responsibility for any
            third-party review content.
          </p>
          <p>
            Where NIPIGE chooses to respond to reviews, such responses are made at NIPIGE&apos;s sole
            discretion and do not create any obligation to respond to any particular review, nor do they
            constitute an admission of any fact or liability.
          </p>

          <h2>7. Ideas, Feedback, and Suggestions</h2>
          <p>
            If you submit ideas, suggestions, or feedback about NIPIGE&apos;s products or services
            (&quot;Feedback&quot;) through the Website, by email, or any other channel, you agree that:
          </p>
          <ul>
            <li>your disclosure is voluntary, gratuitous, and unsolicited;</li>
            <li>NIPIGE is under no obligation of confidentiality with respect to such Feedback;</li>
            <li>NIPIGE may use, share, and commercialise your Feedback without restriction and without compensation to you;</li>
            <li>NIPIGE does not waive any rights to similar ideas it may have independently developed or be developing.</li>
          </ul>

          <h2>8. Cookies, Analytics, and Marketing Technologies</h2>
          <h3>8.1 What We Use</h3>
          <p>
            The Website uses cookies and similar tracking technologies, including analytics tools and
            marketing pixels (collectively, &quot;Tracking Technologies&quot;), to operate and improve the
            Website and to understand how users interact with it. These may include, without limitation:
          </p>
          <ul>
            <li>analytics tools such as Google Analytics, Mixpanel, or similar;</li>
            <li>marketing and retargeting pixels (such as LinkedIn Insight Tag, Google Ads conversion tracking, Meta Pixel, or similar);</li>
            <li>functional cookies necessary for the Website to operate correctly;</li>
            <li>session cookies for authentication and security purposes.</li>
          </ul>
          <h3>8.2 Your Choices</h3>
          <p>
            You can control the use of cookies through your browser settings and, where available, through
            NIPIGE&apos;s cookie consent tool on the Website. Please note that disabling certain cookies may
            affect the functionality of the Website. For full details of the cookies we use and how to manage
            them, please refer to our Privacy Policy and Cookie Policy.
          </p>
          <h3>8.3 Do Not Track</h3>
          <p>
            The Website does not currently respond to Do Not Track (DNT) signals from browsers. We will
            update this position if a uniform standard for DNT compliance is established.
          </p>

          <h2>9. Third-Party Links and Content</h2>
          <p>
            The Website may contain links to third-party websites, resources, and services that are not owned
            or controlled by NIPIGE. These links are provided for your convenience only. NIPIGE has no
            control over, and assumes no responsibility for, the content, privacy policies, or practices of
            any third-party websites. NIPIGE does not endorse any third-party website or the products or
            services offered by them. You access third-party websites entirely at your own risk, and we
            recommend you review the terms and privacy policies of any third-party site you visit.
          </p>
          <p>
            The inclusion of any link on the Website does not imply endorsement, sponsorship, or affiliation
            by NIPIGE with the linked site, its owner, or its content.
          </p>

          <h2>10. Disclaimers and No Warranties</h2>
          <p>
            THE WEBSITE AND SERVICE ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS,
            WITHOUT ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING —
            WITHOUT LIMITATION — WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            NON-INFRINGEMENT, OR THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR
            OTHER HARMFUL COMPONENTS.
          </p>
          <p>
            NIPIGE does not warrant that:
          </p>
          <ul>
            <li>the Website will meet your requirements;</li>
            <li>access to the Website will be uninterrupted, timely, secure, or error-free;</li>
            <li>any information obtained from the Website will be accurate, complete, or reliable;</li>
            <li>defects in the Website will be corrected.</li>
          </ul>
          <p>
            Nothing in these Terms excludes or limits any warranty or right you may have under applicable
            mandatory consumer protection or other legislation that cannot be excluded by agreement.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, NIPIGE and its affiliates, subsidiaries,
            directors, officers, employees, agents, and licensors (collectively, the &quot;NIPIGE Parties&quot;)
            shall not be liable for any indirect, incidental, special, consequential, or punitive damages;
            loss of profits, revenue, data, goodwill, or business opportunity; loss arising from your
            inability to access or use the Website; or loss arising from any content or information obtained
            through the Website, whether based on warranty, contract, tort (including negligence), statute,
            or any other legal theory, and whether or not the NIPIGE Parties have been advised of the
            possibility of such damages.
          </p>
          <p>
            To the extent that NIPIGE&apos;s liability cannot be fully excluded under applicable law, the total
            aggregate liability of the NIPIGE Parties to you for any and all claims arising from or in
            connection with your use of the Website shall not exceed the greater of (a) SGD 500 or (b) the
            amount paid by you to NIPIGE in the three (3) months preceding the claim.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless the NIPIGE Parties from and against any claims,
            liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
            legal fees) arising out of or relating to your violation of these Terms, your use of the Website
            in a manner not permitted by these Terms, any content you submit through the Website (including
            enquiry forms and comments), your infringement of any intellectual property or other right of any
            person or entity, or your violation of any applicable law or regulation.
          </p>

          <h2>13. Force Majeure</h2>
          <p>
            NIPIGE shall not be liable for any failure or delay in making the Website available to the extent
            that such failure or delay is caused by circumstances beyond NIPIGE&apos;s reasonable control,
            including but not limited to acts of God, flood, drought, earthquake, or other natural disaster;
            pandemic or epidemic; terrorist attack, civil war, civil commotion, riot, or war; nuclear,
            chemical, or biological contamination; collapse of buildings, fire, explosion or accident; any
            law or action taken by a government or public authority; failure of the public telecommunications
            network or internet infrastructure; strikes or other labor conditions; or outages of power,
            network, or network connections.
          </p>

          <h2>14. Governing Law and Dispute Resolution</h2>
          <h3>14.1 Governing Law</h3>
          <p>
            These Terms and any dispute or claim arising out of or in connection with them (including
            non-contractual disputes or claims) shall be governed by and construed in accordance with the laws
            of the Republic of Singapore, without regard to its conflict of law principles.
          </p>
          <h3>14.2 Dispute Resolution</h3>
          <p>
            The parties irrevocably agree to submit to the exclusive jurisdiction of the courts of the
            Republic of Singapore to settle any dispute or claim arising out of or in connection with these
            Terms. The United Nations Convention on Contracts for the International Sale of Goods shall not
            apply to and is expressly excluded from these Terms.
          </p>

          <h2>15. Amendments to These Terms</h2>
          <p>
            NIPIGE reserves the right to amend these Terms at any time. We will provide notice of material
            changes by posting the updated Terms on the Website with a revised effective date. For significant
            changes, we will use reasonable efforts to provide at least 30 days&apos; notice via a notice on the
            Website and/or email to registered users.
          </p>
          <p>
            Your continued use of the Website after any change to these Terms constitutes your acceptance of
            the new Terms. If you do not agree to the modified Terms, you should discontinue use of the
            Website.
          </p>
          <p>
            We recommend you review these Terms periodically. The current version will always be available at
            www.nipige.com/terms.
          </p>

          <h2>16. Suspension and Termination of Access</h2>
          <h3>16.1 By NIPIGE</h3>
          <p>
            NIPIGE reserves the right, in its sole discretion and without notice or liability, to suspend or
            terminate your access to all or any part of the Website at any time and for any reason, including
            if we believe you have violated these Terms.
          </p>
          <h3>16.2 By You</h3>
          <p>
            You may discontinue use of the Website at any time. If you have a registered account, you may
            request account deletion by contacting us at contactus@nipige.com.
          </p>
          <h3>16.3 Effect of Termination</h3>
          <p>Upon termination:</p>
          <ul>
            <li>your right to use the Website shall cease immediately;</li>
            <li>NIPIGE may remove any content you have submitted;</li>
            <li>provisions that by their nature should survive termination shall survive.</li>
          </ul>
          <p>
            NIPIGE also reserves the right to modify, suspend, or discontinue the Website (or any part or
            content thereof) at any time with or without notice. NIPIGE shall not be liable to you or any
            third party for any modification, suspension, or discontinuation.
          </p>

          <h2>17. Data Protection and Privacy</h2>
          <p>
            NIPIGE&apos;s collection and use of personal information in connection with the Website is governed
            by its Privacy Policy and Data Processing Agreement (where applicable), which are incorporated
            into these Terms by reference. By using the Website, you also agree to the Privacy Policy.
          </p>
          <p>
            Where NIPIGE processes personal data on your behalf as a data processor, such processing shall be
            subject to a separate Data Processing Agreement between you and NIPIGE.
          </p>

          <h2>18. General Provisions</h2>
          <h3>18.1 Entire Agreement</h3>
          <p>
            These Terms, together with the Privacy Policy and any Platform Service Agreement, constitute the
            entire agreement between you and NIPIGE with respect to your use of the Website and supersede all
            prior agreements, representations, and understandings relating to such use.
          </p>
          <h3>18.2 Severability</h3>
          <p>
            If any provision of these Terms is found by a court of competent jurisdiction to be invalid,
            illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to
            make it enforceable, and the remaining provisions shall continue in full force and effect.
          </p>
          <h3>18.3 No Waiver</h3>
          <p>
            NIPIGE&apos;s failure to exercise or enforce any right or provision of these Terms shall not
            constitute a waiver of that right or provision. Any waiver must be in writing and signed by an
            authorised representative of NIPIGE.
          </p>
          <h3>18.4 Relationship of the Parties</h3>
          <p>
            Nothing in these Terms shall be construed as creating a partnership, agency, joint venture,
            employment relationship, or franchise between you and NIPIGE. You and NIPIGE are independent
            parties.
          </p>
          <h3>18.5 Assignment</h3>
          <p>
            You may not assign or transfer any rights or obligations under these Terms without NIPIGE&apos;s
            prior written consent. NIPIGE may assign its rights and obligations under these Terms at any time
            without notice, including in connection with a merger, acquisition, or sale of substantially all
            of its assets.
          </p>
          <h3>18.6 Contact</h3>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            NIPIGE<br />
            Email: <a href="mailto:contactus@nipige.com">contactus@nipige.com</a><br />
            Website: <a href="https://www.nipige.com">www.nipige.com</a>
          </p>
          <p>You may also use our General Inquiry form on the Website.</p>
        </article>
      </div>
    </section>
  );
}
