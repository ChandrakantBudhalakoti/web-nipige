export interface ComparisonRow {
  label: string;
  competitor: string;
  nipige: string;
}

export interface ComparisonDifference {
  title: string;
  body: string;
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface ComparisonMigrationStep {
  label: string;
  body: string;
}

export interface ComparisonPage {
  slug: string;
  competitor: string;
  competitorShort: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Deck line rendered under the H1 in the hero. */
  intro: string;
  paragraphs: string[];
  /** Optional label rendered above the comparison table. */
  tableCaption?: string;
  /** Optional small hedge/disclaimer note rendered between the caption and the table. */
  tableNote?: string;
  rows: ComparisonRow[];
  /** Optional rich CTA block; falls back to the generic "Ready to build with Nipige?" CTA when absent. */
  ctaHeading?: string;
  ctaBody?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  /** Optional "How Nipige and X differ" subsections (bold lead-in + paragraph). */
  differences?: ComparisonDifference[];
  whoShouldChooseCompetitor?: string;
  whoShouldChooseNipige?: string;
  migration?: {
    /** Overrides the default "Switching from X to Nipige: what to plan for" heading. */
    heading?: string;
    intro: string;
    steps: ComparisonMigrationStep[];
    outro?: string;
  };
  faqs?: ComparisonFaq[];
  /** ISO date string for schema `dateModified`; defaults to not being emitted if absent. */
  dateModified?: string;
}

function bullets(items: string[]): string {
  return items.map((i) => `• ${i}`).join("\n");
}

const yes = "✓";

export const comparisons: ComparisonPage[] = [
  {
    slug: "sharetribe-alternatives",
    competitor: "Sharetribe",
    competitorShort: "Sharetribe",
    metaTitle: "Sharetribe Alternative: Compare vs. Nipige in 2026",
    metaDescription:
      "Looking for a Sharetribe alternative? Compare Nipige vs. Sharetribe on pricing, features, launch speed, mobile apps, and support for your marketplace startup.",
    h1: "Sharetribe Alternative: Compare vs. Nipige",
    intro:
      "Looking for a Sharetribe alternative? This comparison helps you evaluate pricing, features, time-to-launch, and scalability — so you can pick the right marketplace builder for your business, Sharetribe or Nipige.",
    paragraphs: [
      "Sharetribe offers two products: Sharetribe Go for no-code launches and Sharetribe Flex for developer-heavy custom builds. Go is fast for simple marketplaces but constrained on customization; Flex is powerful but requires a React development team and a multi-month build.",
      "Nipige is built for founders who want the speed of Sharetribe Go with the flexibility of Flex — without hiring a frontend team. You get vertical-ready templates, native mobile apps, built-in dispatch and payments, and flat pricing with no transaction fees.",
    ],
    rows: [
      { label: "Dedicated marketplace solution", competitor: yes, nipige: yes },
      {
        label: "How to get started",
        competitor: bullets(["Sign up to Sharetribe", "Set up your marketplace", "Buy a custom domain", "Launch your marketplace"]),
        nipige: bullets(["Book a demo or start a trial", "Choose your vertical template", "Configure branding & pricing", "Launch in 4–12 weeks"]),
      },
      { label: "Built-in marketplace features", competitor: yes, nipige: yes },
      { label: "Time to launch", competitor: "1 day (Go) / 3–9 months (Flex)", nipige: "4–12 weeks" },
      {
        label: "Pricing",
        competitor: bullets(["Build plan $39/month", "Live plans start at $99/month", "Flex: custom enterprise pricing"]),
        nipige: bullets(["Starter from $699/month", "Growth / Business tiers", "$0 platform transaction fees"]),
      },
      { label: "Free trial", competitor: "14 days for Build plan", nipige: "Live demo + pilot program" },
      {
        label: "Technical skills needed",
        competitor: "Low to medium (Go) / High (Flex)",
        nipige: "Low to medium — no-code config plus optional code access",
      },
      { label: "Hosting", competitor: yes, nipige: "Fully managed cloud hosting" },
      { label: "Maintenance", competitor: yes, nipige: yes },
      { label: "Performance monitoring", competitor: yes, nipige: yes },
      { label: "Backups", competitor: yes, nipige: yes },
      { label: "Custom development", competitor: "Unlimited on Flex", nipige: "Unlimited via APIs and custom modules" },
      { label: "Main programming language", competitor: "React (Flex frontend)", nipige: "Next.js / React / Node.js" },
      { label: "Supports building a mobile app", competitor: "Add-on or custom build", nipige: yes },
      {
        label: "Support",
        competitor: bullets(["Sharetribe support", "Developer support (Flex)", "Community forum"]),
        nipige: bullets(["Dedicated account manager", "Engineering support", "Implementation guidance"]),
      },
      {
        label: "Key benefits",
        competitor: bullets([
          "Very fast to launch with Go",
          "Easy to use for simple marketplaces",
          "Strong rental marketplace features",
          "Good developer experience on Flex",
        ]),
        nipige: bullets([
          "Vertical templates for 9 industries",
          "Native iOS + Android apps included",
          "$0 platform transaction fees",
          "Built-in dispatch, wallet, and loyalty",
          "Dedicated support for non-technical founders",
        ]),
      },
      {
        label: "Key drawbacks",
        competitor: bullets([
          "Go is limited in customization",
          "Flex requires a React development team",
          "Mobile apps are not native",
          "Can get expensive at scale",
        ]),
        nipige: bullets([
          "Less known brand than Sharetribe",
          "Best fit for vertical marketplaces",
          "Enterprise customizations may need scoping",
        ]),
      },
    ],
    faqs: [
      {
        q: "What is the best alternative to Sharetribe?",
        a: "It depends what you need. If you want vertical-ready templates (restaurant, real estate, services) with native GPS dispatch and mobile apps out of the box, Nipige is a strong alternative. If you specifically need Sharetribe's rental-marketplace maturity or its developer-first Extend plan, Sharetribe itself may still be the better fit. Choosing between platforms like these instead of building custom is itself the build vs buy decision worth working through first.",
      },
      {
        q: "Does Sharetribe charge transaction fees?",
        a: "Sharetribe's plans are subscription-based, but usage past your monthly transaction allowance costs $0.19 or less per initiated transaction, so the real bill scales with volume. Nipige charges $0 platform transaction fees on every tier.",
      },
      {
        q: "How much does Sharetribe cost?",
        a: "Sharetribe's live plans start at $99/month (Lite, billed yearly), then $199/month (Pro) and $299/month (Extend) - the tier that unlocks custom code, full API access, and mobile apps. Checked July 2026; confirm current pricing on Sharetribe's site. Price alone is not the full picture - see how to choose marketplace software for the other factors worth weighing.",
      },
      {
        q: "Is Sharetribe good for on-demand or restaurant marketplaces?",
        a: "Sharetribe has no native GPS dispatch engine or driver apps, so on-demand and delivery marketplaces require significant custom work. Nipige ships a restaurant vertical with native dispatch and driver apps out of the box.",
      },
      {
        q: "Can I migrate from Sharetribe to Nipige?",
        a: "Yes. Export your listings, seller accounts, and order history from Sharetribe and re-create them in your configured Nipige vertical; reconnect Stripe or PayPal, and plan 301 redirects for any indexed URLs to preserve SEO rankings.",
      },
    ],
  },
  {
    slug: "cs-cart-alternatives",
    competitor: "CS-Cart",
    competitorShort: "CS-Cart",
    metaTitle: "Best CS-Cart Multi-Vendor Alternative (2026) | Nipige",
    metaDescription:
      "Compare Nipige vs CS-Cart Multi-Vendor: a managed, all-inclusive CS-Cart alternative with native apps & GPS dispatch, live in 14 days — no self-hosting.",
    h1: "Compare Nipige vs. CS-Cart Multi-Vendor",
    intro: "A managed CS-Cart alternative — no servers, no add-on stacking, live in 14 days.",
    paragraphs: [
      "CS-Cart Multi-Vendor is a mature, self-hosted marketplace platform for teams that want to own and run their own software. You buy a license (annual or one-time lifetime), host it, own the open PHP code, and pay no per-transaction fee. For a retail/catalog multi-vendor store where code ownership matters and you have the technical capacity to maintain it, that's a legitimate, well-reviewed choice.",
      "Most people searching for a CS-Cart alternative, though, are asking a different question: do I want to run a PHP application, or do I want to run a marketplace business? If you'd rather not manage servers, stack paid add-ons, and keep a developer on call (or you're building an on-demand/delivery marketplace CS-Cart isn't designed for), a managed platform fits better. That's where Nipige comes in: a managed, no-code marketplace platform that ships pre-built verticals (with native dispatch and mobile apps) and goes live in ~14 days, with $0 platform fees.",
      "Here's a side-by-side comparison. Every claim traces to a verified source.",
    ],
    tableCaption: "Nipige vs. CS-Cart Multi-Vendor at a glance",
    rows: [
      {
        label: "Dedicated marketplace solution",
        competitor: "Yes — self-hosted multi-vendor marketplace software",
        nipige: "Yes — managed, no-code marketplace platform",
      },
      {
        label: "Best suited for",
        competitor: "Teams that want to own & self-host a retail/catalog multi-vendor store",
        nipige: "Founders & mid-market launching a vertical or on-demand marketplace",
      },
      {
        label: "How to get started",
        competitor: "Buy a license, then install/host it yourself (or via a partner)",
        nipige: "Pick a vertical, configure it, launch — self-serve trial to start",
      },
      {
        label: "Built-in marketplace features",
        competitor: "500+ features; much depth via 2,000+ paid add-ons",
        nipige: "Vertical pre-builts — dispatch, billing, apps, commissions included",
      },
      {
        label: "Time to launch",
        competitor: "\"In days,\" but self-host install/config is longer",
        nipige: "~14 days by configuration",
      },
      {
        label: "Pricing",
        competitor: "Standard $725/yr; Plus $1,449/yr or $3,590 lifetime; Ultimate $3,599/yr — plus hosting + add-ons",
        nipige: "$699–$4,499+/mo, all-inclusive (hosting, apps, support, updates)",
      },
      {
        label: "Platform / transaction fees",
        competitor: "None (you set vendor commissions)",
        nipige: "$0 platform fee (payment-processor fees only)",
      },
      { label: "Free trial", competitor: "14-day demo", nipige: "Self-serve trial on Starter & Growth (no card)" },
      {
        label: "Technical skills needed",
        competitor: "Developer realistically needed (install, config, maintain PHP)",
        nipige: "None — no-code configuration",
      },
      {
        label: "Hosting",
        competitor: "Self-host or partner-managed (Scalesta); extra after 1 free month",
        nipige: "Managed cloud included (99.5–99.9% uptime SLA)",
      },
      { label: "Maintenance / updates / security", competitor: "Your responsibility", nipige: "Handled by Nipige" },
      {
        label: "Custom development",
        competitor: "Full — you own the open PHP code (+ official dev services)",
        nipige: "Configuration; deeper customization on Business+; Enterprise custom",
      },
      {
        label: "Core technology",
        competitor: "PHP / MySQL, open code (self-hosted)",
        nipige: "Managed cloud, no-code config (microservices + APIs under the hood)",
      },
      {
        label: "Mobile apps",
        competitor: "Native iOS/Android on paid tiers (source code included)",
        nipige: "Web + native iOS/Android (Growth tier+)",
      },
      {
        label: "Delivery / GPS dispatch",
        competitor: "Not available",
        nipige: "Native dispatch engine + driver apps",
      },
      {
        label: "Support",
        competitor: "Tiered Customer Care + forum/docs",
        nipige: "Included guided onboarding + support (hours scale by tier)",
      },
      {
        label: "Key benefits",
        competitor: bullets([
          "Own the source code + lifetime license option",
          "Huge add-on/theme ecosystem (2,000+/630+)",
          "Broad marketplace types; native apps with source",
          "Proven scale (ShopClues); strong reviews",
        ]),
        nipige: bullets([
          "Fully managed — zero ops",
          "All-inclusive pricing, $0 platform fees",
          "9 pre-built verticals + native GPS dispatch",
          "Live in ~14 days, no dev team",
        ]),
      },
      {
        label: "Key drawbacks",
        competitor: bullets([
          "You own hosting, updates, security, uptime",
          "Add-ons inflate true cost (renewal fees flagged)",
          "Realistically needs a developer",
          "No native dispatch/driver apps",
        ]),
        nipige: bullets([
          "Configuration of a vertical, not a freeform builder",
          "Higher entry price than a license",
          "No independent reviews yet",
          "Newer, smaller ecosystem",
        ]),
      },
    ],
    ctaHeading: "Start free — see it on your own model",
    ctaBody:
      "Start your free trial of Nipige. Pick your vertical, configure a production-grade marketplace with $0 transaction fees, and see how far you get in a day — no servers to set up, no card required on Starter and Growth.",
    ctaPrimaryLabel: "Start Free Trial",
    ctaPrimaryHref: "/demo",
    ctaSecondaryLabel: "Talk to a marketplace specialist",
    ctaSecondaryHref: "/demo",
    differences: [
      {
        title: "Self-hosted vs managed.",
        body: "Owning the source code also means owning the hosting, servers, security patches, updates and uptime. CS-Cart offers partner-managed hosting (Scalesta) plus one free month, but after that it's your responsibility or an added cost. Nipige is fully managed cloud: hosting, scaling, security and a 99.5–99.9% uptime SLA are in the subscription. If you don't want to run infrastructure, that's the core difference.",
      },
      {
        title: "Total cost of ownership, not the sticker price.",
        body: "CS-Cart's license looks affordable, but the real bill includes hosting and, as reviewers consistently note, paid add-ons with \"expensive renewal costs\" as your needs grow. The 2,000-add-on ecosystem is both a strength and a trap. Nipige's tiers are all-inclusive (apps, dispatch, billing, support and hosting are in the plan), so compare total cost at your expected scale, not the entry license.",
      },
      {
        title: "On-demand, dispatch and verticals.",
        body: "CS-Cart is built around retail catalog commerce and has no native GPS dispatch engine or driver apps, so restaurant delivery, grocery and on-demand services are a poor fit out of the box. Nipige ships a native dispatch engine and driver apps, proven in production (Fast Forge, ~2,000 orders/day, company-reported). CS-Cart does support service and rental marketplace types; the gap is specifically live dispatch/last-mile, not \"CS-Cart can't do services.\" On AI, CS-Cart shipped AI-search/GEO features in v4.20.1 (Feb 2026). Nipige's edge is operational depth (AI-orchestrated dispatch, provider onboarding, recurring billing) for on-demand and service models.",
      },
    ],
    whoShouldChooseCompetitor:
      "CS-Cart is the better choice when you want to own the source code and run it yourself; you prefer a one-time lifetime license over a subscription; you have (or can hire) developers to host, customize and maintain a PHP application; and you're building a retail/catalog multi-vendor store where CS-Cart's maturity, deep add-on ecosystem and strong independent reviews matter most.",
    whoShouldChooseNipige:
      "Consider Nipige when you want a fully managed platform with zero infrastructure to run; you'd rather have apps, dispatch, billing and hosting included than assembled from paid add-ons; you're building a vertical or on-demand marketplace (food, grocery, services, real estate) that needs native dispatch and mobile apps; and you want to be live in ~14 days without a dev team.",
    migration: {
      intro:
        "Moving off a self-hosted marketplace is a real project. Nipige doesn't offer one-click migration, but its tiers include guided onboarding (2 hrs Growth, 5 hrs Business, 10+ hrs Enterprise), and the team can help you scope a migration plan. Key things to map:",
      steps: [
        {
          label: "Product catalog & vendors:",
          body: "export your CS-Cart catalog and vendor accounts and re-import into your configured Nipige vertical.",
        },
        {
          label: "Customer accounts:",
          body: "plan how existing buyer accounts and loyalty balances carry over (password resets are typical on any platform move).",
        },
        { label: "Transaction & order history:", body: "decide what history you migrate vs archive from your old install." },
        {
          label: "Payments:",
          body: "reconnect Stripe/PayPal (or your processor) on Nipige; you keep your $0-platform-fee position.",
        },
        {
          label: "SEO:",
          body: "map old URLs to new ones with 301 redirects and keep your sitemap current. It's standard best practice, so plan it rather than assume it's automatic.",
        },
      ],
      outro: "Because Nipige is managed, the ongoing burden after cut-over (hosting, patching, updates) moves off your plate.",
    },
    faqs: [
      {
        q: "What is the best alternative to CS-Cart?",
        a: "It depends on what you're optimizing for. If you want to stop self-hosting and get a managed, all-inclusive platform with native dispatch and mobile apps, Nipige is a strong alternative. If code ownership and a one-time lifetime license matter most, CS-Cart itself (or another self-hosted option like Yo!Kart) remains the better camp.",
      },
      {
        q: "Does CS-Cart charge transaction fees?",
        a: "No. CS-Cart takes no per-transaction fee; you set your own vendor commissions. But because it's self-hosted, your real costs are the license, hosting, paid add-ons and maintenance. Nipige also charges $0 platform fees and rolls hosting, apps and support into one subscription.",
      },
      {
        q: "How much does CS-Cart cost?",
        a: "Per cs-cart.com/compare (verified 2026-07-09): Standard $725/yr, Plus $1,449/yr (or $3,590 one-time lifetime), Ultimate $3,599/yr, plus a top \"Unlim\" tier, with hosting and many add-ons as additional costs. (Some directories still list older $599/$1,199/$2,999 figures; treat the compare page as current.) Compare total cost of ownership, not just the license.",
      },
      {
        q: "Is CS-Cart self-hosted or cloud?",
        a: "CS-Cart Multi-Vendor is self-hosted/on-premises: you host and maintain it (own server or partner-managed hosting like Scalesta). Nipige is fully managed cloud, with hosting, updates and security included.",
      },
      {
        q: "Is CS-Cart open source?",
        a: "Not in the free/OSI sense. CS-Cart is \"open-code\": you get full access to its PHP source under a commercial license you purchase, so you can read and modify it, but it isn't free open-source software like WooCommerce or Bagisto. Nipige takes the opposite approach: there's no code to own or maintain, just a managed platform you configure.",
      },
      {
        q: "Do I need a developer to run CS-Cart?",
        a: "Realistically, yes. Self-hosting a PHP marketplace means someone handles installation, configuration, add-ons, updates and security. Nipige is designed to be configured without a developer and launched in ~14 days.",
      },
      {
        q: "Can Nipige do restaurant delivery or on-demand, which CS-Cart can't?",
        a: "Yes. Nipige ships a restaurant vertical with native GPS dispatch and driver apps; CS-Cart is retail/catalog-focused with no native dispatch. That's the clearest product-fit difference.",
      },
      {
        q: "Is CS-Cart good for large marketplaces?",
        a: "It can be. CS-Cart has proven large-scale references (e.g., ShopClues) and strong reviews, provided you have the technical capacity to scale and maintain a self-hosted deployment. If you'd rather scale on managed infrastructure without running ops, that favors a managed platform like Nipige.",
      },
    ],
    dateModified: "2026-07-09",
  },
  {
    slug: "mirakl-alternatives",
    competitor: "Mirakl",
    competitorShort: "Mirakl",
    metaTitle: "Mirakl Alternative for Mid-Market (2026) | Nipige",
    metaDescription:
      "Compare Nipige vs Mirakl: a mid-market Mirakl alternative with transparent pricing, $0 GMV take rate, apps & dispatch — self-contained, live in 14 days.",
    h1: "Compare Nipige vs. Mirakl",
    intro: "A mid-market Mirakl alternative — self-contained, transparently priced, $0 take rate on your GMV.",
    paragraphs: [
      "Up front: Mirakl is the category leader in enterprise marketplace software, and Nipige is not trying to replace it for a Fortune 500. If you're a large retailer or distributor with existing GMV, adding thousands of third-party sellers on top of an Adobe or SAP commerce stack, Mirakl is the benchmark and it earns the price.",
      "But most people searching for a Mirakl alternative aren't Macy's. They're mid-market companies and founders who looked at Mirakl and saw a six-figure, quote-based, sales-gated, multi-month implementation that also requires a separate commerce platform underneath, and asked, \"is there a faster, self-contained way to launch a branded marketplace?\" For that buyer, the answer is often yes.",
      "Nipige is a managed, no-code marketplace platform that launches a self-contained branded marketplace in ~14 days: storefront, buyer/seller/admin apps, payments, dispatch and billing in one product, nothing to buy underneath. It has transparent published pricing and $0 take rate on your GMV. Here's the side-by-side.",
    ],
    tableCaption: "Nipige vs. Mirakl at a glance",
    tableNote:
      "Mirakl pricing is quote-based; all $/€ figures below are third-party estimates, not official numbers. Confirm with Mirakl directly.",
    rows: [
      {
        label: "Dedicated marketplace solution",
        competitor: "Yes — enterprise marketplace + dropship platform",
        nipige: "Yes — managed, no-code marketplace platform",
      },
      {
        label: "Best suited for",
        competitor: "Large enterprises adding 3P sellers/dropship at scale",
        nipige: "Mid-market & founders launching a branded marketplace",
      },
      {
        label: "How to get started",
        competitor: "Contact sales (\"Let's Talk\") → scoping → SI project",
        nipige: "Pick a vertical, configure, launch — self-serve trial to start",
      },
      {
        label: "Self-contained?",
        competitor: "No — a marketplace back-end; needs a separate commerce platform",
        nipige: "Yes — storefront, apps, payments, dispatch & billing in one",
      },
      {
        label: "Built-in marketplace features",
        competitor: "Full enterprise suite (marketplace, dropship, Payout, Ads, Connect, Nexus)",
        nipige: "Vertical pre-builts — apps, dispatch, billing, commissions included",
      },
      {
        label: "Time to launch",
        competitor: "Multi-month implementation, usually via an SI",
        nipige: "~14 days by configuration",
      },
      {
        label: "Pricing",
        competitor: "Quote-based — est. ~$90K to €180K–€325K/yr base (third-party estimates)",
        nipige: "$699–$4,499+/mo, published, all-inclusive",
      },
      {
        label: "Take rate on GMV",
        competitor: "~2% of GMV (estimated, on top of subscription)",
        nipige: "$0 platform fee",
      },
      { label: "Free trial", competitor: "None — sales-gated; no sandbox", nipige: "Self-serve trial on Starter & Growth (no card)" },
      {
        label: "Technical skills needed",
        competitor: "Systems-integrator + dev effort (Accenture/Deloitte/Intellias)",
        nipige: "None — no-code configuration",
      },
      { label: "Hosting", competitor: "Multi-cloud, enterprise-managed", nipige: "Managed cloud included (99.5–99.9% SLA)" },
      { label: "Maintenance", competitor: "Enterprise-managed (SI-supported)", nipige: "Handled by Nipige" },
      {
        label: "Mobile apps",
        competitor: "Not documented as native operator/seller apps",
        nipige: "Web + native iOS/Android (Growth+)",
      },
      {
        label: "Delivery / GPS dispatch",
        competitor: "Not a focus (retail/dropship catalog)",
        nipige: "Native dispatch engine + driver apps",
      },
      {
        label: "Seller ecosystem",
        competitor: "100,000+ curated sellers — a genuine advantage",
        nipige: "You bring/onboard your own vendors",
      },
      {
        label: "Support",
        competitor: "Enterprise + SI/partner ecosystem",
        nipige: "Included guided onboarding + support (scales by tier)",
      },
      {
        label: "Enterprise proof",
        competitor: "Forrester Wave Leader; $218M ARR, ~$14.6B GMV (2025), profitable",
        nipige: "Growing (Fast Forge, Calonex, LIRS ~35M invoices/mo)",
      },
      {
        label: "Key benefits",
        competitor: bullets([
          "Category leader (Forrester Wave)",
          "100k+ curated sellers, 600M+ SKUs",
          "Full suite incl. retail media (Mirakl Ads)",
          "Enterprise trust (SOC 1/2, ISO, 99.997% uptime)",
        ]),
        nipige: bullets([
          "Self-contained — no commerce stack underneath",
          "Transparent pricing, $0 GMV take rate",
          "Native apps + GPS dispatch + verticals",
          "Self-serve trial, live in ~14 days",
        ]),
      },
      {
        label: "Key drawbacks",
        competitor: bullets([
          "Six-figure, opaque quote-based cost + GMV take rate",
          "Needs a separate commerce platform",
          "No self-serve trial; multi-month SI project",
          "Built to add sellers to existing GMV, not launch from zero",
        ]),
        nipige: bullets([
          "Not built to match Mirakl at Fortune-500 GMV",
          "You supply your own sellers (no ready ecosystem)",
          "No independent reviews yet",
          "Configuration of a vertical, not a freeform build",
        ]),
      },
    ],
    ctaHeading: "Talk it through on your own model",
    ctaBody:
      "Book a demo of Nipige and we'll configure a production-grade marketplace in your vertical — storefront, apps, dispatch, and $0 take rate on your GMV — and show you a realistic 14-day path to launch.",
    ctaPrimaryLabel: "Book a Demo",
    ctaPrimaryHref: "/demo",
    ctaSecondaryLabel: "Start Free Trial",
    ctaSecondaryHref: "/demo",
    differences: [
      {
        title: "Pricing: quote-based six figures + GMV take rate vs published SaaS + $0 take rate.",
        body: "Mirakl doesn't publish operator-platform pricing; evaluation starts with sales. Third-party estimates vary widely and are not official: from ~$90K/yr average contract (Vendr) up to a €180K–€325K/yr base (competitor analyses), plus an estimated ~2% take rate on your GMV. Nipige publishes its tiers ($699–$4,499+/mo) and takes $0 of your GMV. For a marketplace doing millions in GMV, a ~2% take rate alone can dwarf a flat subscription.",
      },
      {
        title: "Self-contained vs a back-end that needs a commerce stack.",
        body: "Mirakl is a marketplace back-end; it typically runs on top of a separate commerce platform (Adobe, SAP, Salesforce or Shopify), which adds that platform's cost and complexity. Nipige is self-contained: storefront, apps, payments, dispatch and billing in one product, nothing to license underneath.",
      },
      {
        title: "Launching from zero vs adding sellers to existing traffic.",
        body: "Mirakl's model works best when you already have GMV and want to expand assortment, and its 100,000+ curated seller ecosystem is a real advantage there. If you're launching a new branded marketplace from scratch (consumer storefront, mobile apps, and for on-demand, delivery logistics), Nipige is purpose-built for that, with native GPS dispatch and driver apps (Fast Forge, ~2,000 orders/day, company-reported). And Mirakl wins on plenty Nipige can't match: its seller ecosystem, retail-media monetization (Mirakl Ads), analyst leadership, and scale/uptime track record.",
      },
    ],
    whoShouldChooseCompetitor:
      "Choose Mirakl if you're a large enterprise retailer, distributor or manufacturer with existing GMV; you want to add third-party sellers, dropship or retail-media monetization at scale; you already run (or will run) a commerce platform like Adobe or SAP; and you have a six-figure budget and systems-integrator capacity. In that world, Mirakl is the leader.",
    whoShouldChooseNipige:
      "Consider Nipige if you're mid-market or a founder launching a new branded marketplace; you want a self-contained platform rather than a back-end that needs a commerce stack underneath; you want transparent SaaS pricing with $0 take rate on your GMV; and you want to be live in ~14 days with a self-serve start, not a multi-month SI project. The choice comes down to what you're starting with: existing GMV to expand, or a marketplace to launch. Mirakl is built for the former; Nipige for the latter.",
    migration: {
      heading: "Switching from (or scoping past) Mirakl: what to plan for",
      intro:
        "Most people reading this aren't migrating off a live Mirakl deployment; they're deciding before committing to one. Either way, plan for these:",
      steps: [
        {
          label: "No enterprise lock-in period.",
          body: "Nipige is a monthly/annual SaaS subscription, with no multi-year enterprise contract to start.",
        },
        {
          label: "Assortment & sellers.",
          body: "Mirakl's edge is its 100k+ seller network; on Nipige you onboard your own vendors. If curated third-party supply is your core need, weigh that first.",
        },
        {
          label: "Storefront.",
          body: "If you were going to buy a commerce platform to sit under Mirakl, note Nipige's storefront + apps are included, a line item you may not need.",
        },
        {
          label: "Payments & payouts.",
          body: "Reconnect your processor on Nipige; you keep the $0 platform take-rate. Guided onboarding (5 hrs Business, 10+ hrs Enterprise) helps configure payout/commission flows.",
        },
        {
          label: "Data & SEO.",
          body: "Map catalog, seller and order data; 301-redirect any existing storefront URLs to preserve rankings. Nipige doesn't promise automated migration; scope it with the team.",
        },
      ],
    },
    faqs: [
      {
        q: "Is Nipige a good Mirakl alternative?",
        a: "For mid-market companies and founders launching a branded marketplace, yes. Nipige is self-contained, transparently priced, takes $0 of your GMV, and launches in ~14 days. For a large enterprise adding third-party sellers or dropship to an existing high-GMV commerce operation, Mirakl remains the category leader and the better fit.",
      },
      {
        q: "How much does Mirakl cost?",
        a: "Mirakl uses quote-based enterprise pricing and doesn't publish operator-platform figures. Third-party estimates range widely, from around $90K/yr average contract (Vendr) to a €180K–€325K/yr base (competitor analyses), plus an estimated ~2% take rate on GMV. Mirakl also generally requires a separate commerce platform underneath, which adds to total cost. Treat these as directional estimates and confirm with Mirakl. Nipige publishes $699–$4,499+/mo with $0 take rate.",
      },
      {
        q: "Is there a Mirakl alternative for smaller companies?",
        a: "Yes — that's the core of this comparison. Mid-market operators and founders typically want transparent pricing, no GMV take rate, and a fast self-serve launch. Nipige is built for exactly that; other options in the conversation include Sharetribe (SMB) and open-source stacks like Spree, each with different trade-offs.",
      },
      {
        q: "Does Mirakl take a percentage of GMV?",
        a: "By most third-party accounts, yes: Mirakl's model combines a subscription with a GMV-based take rate (estimated ~2%; not official). Nipige charges a flat subscription and takes $0 of your GMV; you pay only your payment processor.",
      },
      {
        q: "Do I need another platform to run Mirakl?",
        a: "Usually, yes. Mirakl is a marketplace operator back-end that runs on top of a separate commerce platform (Adobe, SAP, Salesforce or Shopify). Nipige is self-contained: storefront, apps, payments, dispatch and billing in one product.",
      },
      {
        q: "Is Mirakl an API or a full platform?",
        a: "Mirakl is an API-first marketplace back-end: it connects (via 250M+ API calls/day and official connectors) to a separate storefront/commerce platform that provides the buyer-facing experience. It's not a standalone storefront. Nipige, by contrast, is a full self-contained platform: the storefront, apps and APIs are all part of one product.",
      },
      {
        q: "Can I try Mirakl before buying?",
        a: "No. Mirakl has no self-serve trial or sandbox; evaluation begins with a sales conversation and implementation is typically a multi-month SI project. Nipige offers a self-serve free trial on Starter and Growth.",
      },
      {
        q: "Who are Mirakl's competitors?",
        a: "At the enterprise end: Marketplacer, VTEX, Spryker, commercetools. Positioning as lower-cost or open alternatives: Spree, Virto, Sharetribe, Origami, and (for mid-market self-contained launches) Nipige.",
      },
      {
        q: "Is Nipige enterprise-grade?",
        a: "Nipige runs production marketplaces on infrastructure with proven throughput (the LIRS deployment processes ~35M invoices/mo; Fast Forge runs ~2,000 orders/day, company-reported), with a 99.9% uptime SLA on higher tiers. It's built for mid-market scale: not to replace Mirakl at Fortune-500 GMV, but to launch and grow a branded marketplace without enterprise cost or timeline.",
      },
    ],
    dateModified: "2026-07-11",
  },
  {
    slug: "arcadier-alternatives",
    competitor: "Arcadier",
    competitorShort: "Arcadier",
    metaTitle: "Best Arcadier Alternative (2026) | Nipige",
    metaDescription:
      "Compare Nipige vs Arcadier: an Arcadier alternative that matches $0 platform fees and adds pre-built verticals, GPS dispatch, mobile apps & transparent pricing.",
    h1: "Compare Nipige vs. Arcadier",
    intro:
      "An Arcadier alternative with the same $0 platform fees — plus pre-built verticals, dispatch & transparent pricing.",
    paragraphs: [
      "If you're comparing Arcadier alternatives, you're probably drawn to the same thing Nipige believes in: a marketplace platform that charges $0 platform fees and lets you keep every transaction. Arcadier gets that part right. It's a white-label, API-first, subscription-only marketplace SaaS, founded in Singapore (2013, ex-PayPal leadership) and now owned by Dale Ventures.",
      "The real question is whether Arcadier fits what you're building. For a broad or complex B2B/procurement marketplace with developers on hand, its 150+ APIs and enterprise logos are real strengths. But for founders building vertical, on-demand or mobile-first marketplaces, a horizontal builder leaves a lot to assemble, and it does so behind a pricing page that isn't even published. Nipige matches Arcadier's $0-fee economics and ships pre-built verticals, native GPS dispatch and mobile apps, with transparent pricing and a real self-serve trial. Here's the side-by-side.",
    ],
    tableCaption: "Nipige vs. Arcadier at a glance",
    tableNote:
      "Verified 2026-07-09. Arcadier's own pricing page was returning a 404 at verification, so its figures come from third-party aggregators. Confirm with Arcadier before purchasing.",
    rows: [
      {
        label: "Dedicated marketplace solution",
        competitor: "Yes — white-label, API-first marketplace SaaS",
        nipige: "Yes — managed, no-code marketplace platform",
      },
      {
        label: "Best suited for",
        competitor: "Broad/complex B2B, P2P & procurement marketplaces (developer-heavy)",
        nipige: "Founders & mid-market building vertical/on-demand marketplaces",
      },
      {
        label: "How to get started",
        competitor: "Consultative / sales-led (\"Get in touch\")",
        nipige: "Pick a vertical, configure, launch — self-serve trial to start",
      },
      {
        label: "Built-in marketplace features",
        competitor: "Configurable horizontal primitives; no vertical pre-builts",
        nipige: "9 pre-built verticals — dispatch, billing, apps, commissions included",
      },
      {
        label: "Time to launch",
        competitor: "\"Weeks\" via templates; enterprise builds partner-delivered",
        nipige: "~14 days by configuration",
      },
      {
        label: "Pricing",
        competitor:
          "Basic $60 (500 txns) · Growth $150 (2,500) · Scale $375 (10,000) · Enterprise ~$1,500+ (aggregator-sourced; arcadier.com/pricing 404)",
        nipige: "$699–$4,499+/mo, published, all-inclusive",
      },
      {
        label: "Platform / transaction fees",
        competitor: "$0 platform fee (processor fees only)",
        nipige: "$0 platform fee (processor fees only)",
      },
      {
        label: "Transaction limits",
        competitor: "Capped per month (500 / 2,500 / 10,000 by tier)",
        nipige: "By vendor count, not transactions",
      },
      {
        label: "Pricing transparency",
        competitor: "Pricing page 404 at verification; +$15K–$35K enterprise implementation (est.)",
        nipige: "Published tiers, all-inclusive",
      },
      {
        label: "Free trial",
        competitor: "14-day trial (de-emphasized; sales-led motion)",
        nipige: "Self-serve trial on Starter & Growth (no card)",
      },
      {
        label: "Technical skills needed",
        competitor: "Low for templates; developers for API/custom-JS extensions",
        nipige: "None — no-code configuration",
      },
      {
        label: "Hosting",
        competitor: "Cloud-hosted, managed",
        nipige: "Managed cloud included (99.5–99.9% SLA)",
      },
      {
        label: "API / extensibility",
        competitor: "150+ APIs + custom-JS editor (Scale+) — a genuine strength",
        nipige: "REST APIs; managed, configured platform",
      },
      { label: "Mobile apps", competitor: "Legacy/unclear for 2026", nipige: "Web + native iOS/Android (Growth+)" },
      {
        label: "Delivery / GPS dispatch",
        competitor: "Not available",
        nipige: "Native dispatch engine + driver apps",
      },
      {
        label: "Recurring / subscription billing",
        competitor: "Available as a revenue model; billing depth not verified",
        nipige: "Native (NGB billing engine)",
      },
      {
        label: "Compliance",
        competitor: "PCI-DSS; SOC 2 / ISO 27001 in progress (not certified)",
        nipige: "PCI-compliant; multi-tenant isolation",
      },
      {
        label: "Independent reviews",
        competitor: "Near-zero (Trustpilot ~1; G2/Capterra defunct)",
        nipige: "New platform — none yet",
      },
      {
        label: "Key benefits",
        competitor: bullets([
          "$0 platform fees",
          "Broad types (B2B/B2C/P2P/rental/procurement)",
          "API-first (150+ APIs, custom-JS)",
          "Named enterprise logos",
        ]),
        nipige: bullets([
          "$0 platform fees",
          "9 pre-built verticals + native GPS dispatch",
          "Transparent all-inclusive pricing + self-serve trial",
          "Native apps + recurring billing, live in ~14 days",
        ]),
      },
      {
        label: "Key drawbacks",
        competitor: bullets([
          "Pricing page 404 + hidden implementation cost",
          "No vertical pre-builts; no native dispatch",
          "Sales-led (reportedly enterprise-focused now)",
          "Thin independent footprint (~13 tracked customers)",
        ]),
        nipige: bullets([
          "Configuration of a vertical, not a freeform build",
          "Fewer APIs / less bespoke extensibility than Arcadier",
          "No independent reviews yet",
          "Newer, smaller ecosystem",
        ]),
      },
    ],
    ctaHeading: "Start free — judge it on your own marketplace",
    ctaBody:
      "Start your free trial of Nipige. Pick your vertical, configure a production-grade marketplace with $0 transaction fees, and see how far you get in a day. No card required on Starter and Growth.",
    ctaPrimaryLabel: "Start Free Trial",
    ctaPrimaryHref: "/demo",
    ctaSecondaryLabel: "Talk to a marketplace specialist",
    ctaSecondaryHref: "/demo",
    differences: [
      {
        title: "Vertical platform vs horizontal builder.",
        body: "Arcadier gives you flexible, configurable marketplace primitives, but no deep vertical pre-builts. Build restaurant delivery, home services or grocery and you assemble the vertical workflows yourself (or with developers/partners). Nipige ships 9 pre-built verticals with the hard parts — bookings, provider onboarding, dispatch, recurring billing — already built.",
      },
      {
        title: "Native dispatch.",
        body: "For on-demand marketplaces this is decisive: Arcadier has no native GPS dispatch engine or driver apps. Nipige's dispatch engine and driver apps are native and proven in production (Fast Forge, ~2,000 orders/day, company-reported).",
      },
      {
        title: "Pricing transparency and structure.",
        body: "Arcadier's tiers cap transactions per month, its own pricing page returned a 404 at verification (re-confirmed 2026-07-09), and enterprise implementation is a separate ~$15K–$35K year-one cost (per one aggregator). Arcadier has also reportedly moved upmarket toward enterprise-only (its SMB \"Express\" plan discontinued), and its independent footprint is thin. Nipige publishes its tiers openly, caps by vendor count, and includes a self-serve trial. Arcadier's API-first extensibility (150+ APIs + custom-JS) and named enterprise logos are real strengths for developer-heavy or complex-B2B builds. Its SOC 2 / ISO 27001 are in progress (not yet certified), so confirm directly if you need that certification.",
      },
    ],
    whoShouldChooseCompetitor:
      "Choose Arcadier if you're building a broad or complex B2B, P2P or procurement marketplace; you want API-first extensibility to embed into an existing enterprise stack and have developers to do it; you value named enterprise references; and you're comfortable with a consultative, sales-led buying process.",
    whoShouldChooseNipige:
      "Consider Nipige if you're building a vertical marketplace (especially food, delivery, grocery, services, real estate); you need native GPS dispatch, driver apps, mobile apps or recurring billing without assembling them; you want transparent, all-inclusive pricing and a real self-serve trial; and you want to be live in ~14 days by configuring rather than building. Both platforms are $0-fee. What differs is how much comes pre-built and how much you want to build or integrate yourself.",
    migration: {
      intro:
        "If you're on Arcadier (or evaluating it) and leaning to Nipige, plan for a straightforward but real migration. Nipige doesn't offer one-click import, but guided onboarding is included (2 hrs Growth, 5 hrs Business):",
      steps: [
        {
          label: "Catalog & vendors:",
          body: "export listings and seller accounts from Arcadier and re-create them in your configured Nipige vertical.",
        },
        {
          label: "Customers & history:",
          body: "decide what buyer accounts and order history to migrate vs archive.",
        },
        {
          label: "Payments:",
          body: "reconnect Stripe/PayPal; both platforms are $0-fee, so your economics don't change.",
        },
        {
          label: "Any custom API/JS work:",
          body: "Arcadier's custom-JS/API extensions won't port; map that logic to Nipige's configuration + APIs (a good demo agenda item).",
        },
        {
          label: "SEO:",
          body: "301-redirect old URLs to new ones and refresh your sitemap to preserve rankings.",
        },
      ],
    },
    faqs: [
      {
        q: "Is Nipige a good Arcadier alternative?",
        a: "For vertical and on-demand marketplaces, yes. Nipige matches Arcadier's $0 platform-fee model and adds pre-built verticals, native GPS dispatch, driver apps, native mobile apps and transparent all-inclusive pricing. For a broad, API-first B2B or procurement build with in-house developers, Arcadier remains a credible choice.",
      },
      {
        q: "Does Arcadier charge transaction or commission fees?",
        a: "No. Arcadier is subscription-only and takes $0 of your GMV, the same as Nipige. You still pay your payment processor (Stripe/PayPal) their standard rate. Note that Arcadier's plans cap the number of transactions per month by tier.",
      },
      {
        q: "How much does Arcadier cost?",
        a: "Third-party aggregators list Basic $60/mo (500 txns), Growth $150/mo (2,500), Scale $375/mo (10,000), and a custom Enterprise tier (~$1,500+/mo), with enterprise implementation quoted separately at an estimated $15,000–$35,000 in year one. Arcadier's own pricing page returned a 404 at verification (2026-07-09), so confirm current figures with their team. Nipige publishes its tiers openly.",
      },
      {
        q: "What is Arcadier used for?",
        a: "Arcadier is used to build white-label, multi-vendor marketplaces — B2B, B2C, P2P, service/booking, rental and procurement — often embedded into an enterprise stack via its 150+ APIs. It's a horizontal builder rather than a vertical-specific platform.",
      },
      {
        q: "Is Arcadier good for a vertical marketplace (like restaurant delivery)?",
        a: "Arcadier can support many marketplace types, but it has no native GPS dispatch or driver apps and no deep vertical pre-builts, so on-demand/delivery models require significant assembly. For those, Nipige's pre-built verticals and native dispatch are a closer fit out of the box.",
      },
      {
        q: "Is there a self-serve alternative to Arcadier?",
        a: "Yes. Arcadier's current motion is consultative/sales-led (and reportedly enterprise-focused). Nipige offers a self-serve free trial on Starter and Growth, so you can build before you talk to sales.",
      },
      {
        q: "How long does it take to launch on Nipige vs. Arcadier?",
        a: "Nipige targets a live, production marketplace in ~14 days via configuration. Arcadier positions template launches in \"weeks,\" with enterprise builds delivered by implementation partners over a longer timeline.",
      },
      {
        q: "Is Arcadier better for enterprise or B2B marketplaces?",
        a: "Arcadier leans enterprise/B2B and API-first, with named enterprise logos and broad marketplace-type coverage (including procurement). For very large, deeply custom B2B integrations, evaluate both, and consider the enterprise end of the market too. Nipige competes strongly in the mid-market and for vertical/on-demand builds.",
      },
    ],
    dateModified: "2026-07-09",
  },
  {
    slug: "bubble-alternatives",
    competitor: "Bubble",
    competitorShort: "Bubble",
    metaTitle: "Best Bubble Alternative for Marketplaces | Nipige",
    metaDescription:
      "Compare Nipige vs Bubble for a marketplace: a turnkey Bubble alternative — no Workload-Unit pricing, $0 platform fees, native dispatch, live in 14 days.",
    h1: "Compare Nipige vs. Bubble",
    intro:
      "A Bubble alternative for marketplaces: turnkey verticals, flat pricing, no Workload-Unit metering.",
    paragraphs: [
      "Bubble is one of the most capable no-code tools ever built. It's a general-purpose, full-stack visual builder (UI, database, workflows, auth, APIs) used to build SaaS, internal tools, directories and marketplaces. If you can imagine an app, you can probably build it on Bubble.",
      "So why look for a Bubble alternative for your marketplace? Because \"you can build anything\" and \"you have a production marketplace next week\" are two different promises. On Bubble, you assemble the marketplace (listings, vendor onboarding, Stripe Connect payouts, commissions, reviews, dispatch) from horizontal building blocks. Bubble now markets a marketplace-builder template, but it's still build-it-yourself. On Nipige, the marketplace is already built: you configure your vertical and launch in ~14 days, with native dispatch and mobile apps, flat all-inclusive pricing and $0 platform fees. This comparison is specifically about the marketplace use case.",
    ],
    tableCaption: "Nipige vs. Bubble at a glance",
    tableNote:
      "Verified 2026-07-09. Bubble pricing splits by platform (web-only / mobile-only / web+mobile) and is cheaper annually; figures below are monthly. Confirm current pricing on each vendor's site.",
    rows: [
      {
        label: "Dedicated marketplace solution",
        competitor: "No — general-purpose no-code app builder (marketplace via templates)",
        nipige: "Yes — turnkey, managed marketplace platform",
      },
      {
        label: "Best suited for",
        competitor: "Bespoke/custom apps of any kind; teams that want total control",
        nipige: "Founders & mid-market building a recognizable vertical marketplace",
      },
      {
        label: "How to get started",
        competitor: "Build it yourself in the visual editor (+ AI app generator)",
        nipige: "Pick a vertical, configure, launch — self-serve trial to start",
      },
      {
        label: "Built-in marketplace features",
        competitor: "None turnkey — assemble via plugins/tutorials (Stripe Connect etc.)",
        nipige: "Vertical pre-builts — dispatch, billing, commissions, apps included",
      },
      { label: "Time to launch", competitor: "However long it takes you to build it", nipige: "~14 days by configuration" },
      {
        label: "Pricing",
        competitor: "Starter $32/mo (web) · $69 web+mobile; Growth $134–$249; Team $399–$649",
        nipige: "$699–$4,499+/mo, all-inclusive",
      },
      {
        label: "Cost model",
        competitor: "Subscription + Workload-Unit usage (overages apply)",
        nipige: "Flat, all-inclusive — no usage metering",
      },
      {
        label: "Platform / transaction fees",
        competitor: "$0 platform fee (but usage = WU consumption)",
        nipige: "$0 platform fee (processor fees only)",
      },
      {
        label: "Free trial",
        competitor: "14-day free trial of Starter (new apps)",
        nipige: "Self-serve trial on Starter & Growth (no card)",
      },
      {
        label: "Technical skills needed",
        competitor: "Real learning curve (\"not intuitive for beginners\")",
        nipige: "None — no-code configuration",
      },
      { label: "Hosting", competitor: "Managed (AWS)", nipige: "Managed cloud included (99.5–99.9% SLA)" },
      {
        label: "Custom development",
        competitor: "Very high — full control of UI, data, logic; 8,000+ plugins",
        nipige: "Configuration; customization on Business+; Enterprise custom",
      },
      {
        label: "Vertical pre-builts",
        competitor: "None — fully horizontal",
        nipige: "3 verticals (food, real estate, services)",
      },
      {
        label: "Mobile apps",
        competitor: "Native mobile GA (still maturing); web apps don't auto-port",
        nipige: "Web + native iOS/Android (Growth+), one platform",
      },
      {
        label: "Delivery / GPS dispatch",
        competitor: "Build it yourself",
        nipige: "Native dispatch engine + driver apps",
      },
      {
        label: "AI",
        competitor: "AI app generator + in-editor AI Agent (now GA)",
        nipige: "AI-orchestrated dispatch + operational automation",
      },
      {
        label: "Support",
        competitor: "Forum-first (support a common complaint)",
        nipige: "Included guided onboarding + support (scales by tier)",
      },
      {
        label: "Independent reviews",
        competitor: "Capterra 4.6/~330, G2 4.4/~166 — mature (Trustpilot mixed)",
        nipige: "New platform — none yet",
      },
      {
        label: "Key benefits",
        competitor: bullets([
          "Unmatched horizontal flexibility (build anything)",
          "8,000+ plugins + huge community",
          "AI app generator + AI Agent (GA)",
          "$100M Series A, SOC 2, strong reviews",
        ]),
        nipige: bullets([
          "Turnkey vertical marketplace — configure, don't construct",
          "Flat pricing, $0 platform fees, no WU metering",
          "Native GPS dispatch + driver apps + verticals",
          "Live in ~14 days, low learning curve",
        ]),
      },
      {
        label: "Key drawbacks",
        competitor: bullets([
          "Not turnkey — you build/maintain marketplace logic",
          "Workload-Unit pricing hard to predict (\"overage anxiety\")",
          "Steep learning curve; forum-first support",
          "No native dispatch/verticals; vendor lock-in",
        ]),
        nipige: bullets([
          "Configuration of a vertical, not a blank canvas",
          "Less flexible for non-marketplace / novel apps",
          "Higher entry price than Bubble",
          "No independent reviews yet",
        ]),
      },
    ],
    ctaHeading: "See how fast turnkey really is",
    ctaBody:
      "Start your free trial of Nipige. Pick a vertical, configure a production-grade marketplace with $0 transaction fees and no usage metering, and see how far you get in a day. No card required on Starter and Growth.",
    ctaPrimaryLabel: "Start Free Trial",
    ctaPrimaryHref: "/demo",
    ctaSecondaryLabel: "Talk to a marketplace specialist",
    ctaSecondaryHref: "/demo",
    differences: [
      {
        title: "Turnkey vs assemble-it-yourself.",
        body: "Bubble gives you primitives and tutorials to build marketplace features yourself. Multi-vendor logic, payouts via Stripe Connect, commissions, reviews, dispatch: you build and maintain each one. Nipige ships 9 pre-built verticals with all of that already done, so you configure instead of construct.",
      },
      {
        title: "Workload-Unit pricing vs flat pricing.",
        body: "This is the most-cited Bubble complaint, so it's worth explaining plainly. Bubble adds Workload Units (WU) on top of your plan: every database query, workflow run and API call consumes WUs, and exceeding your allotment triggers overage charges. The official per-1,000-WU rate is undisclosed; third parties commonly cite around $0.30 per 1,000 WUs. The model is flexible, but founders report \"overage anxiety\" and bills that are hard to forecast as usage grows. Nipige charges a flat, all-inclusive subscription: no usage metering, no WU math, and $0 platform transaction fees.",
      },
      {
        title: "Native dispatch, verticals and mobile.",
        body: "Because Bubble is horizontal, it has no GPS dispatch engine, driver apps or vertical pre-builts; you'd build each one. Nipige's dispatch engine and driver apps are native and production-proven (Fast Forge, ~2,000 orders/day, company-reported). On mobile, Bubble's native builder is now generally available (a step up from its earlier beta) but still maturing, and web apps don't auto-convert, so you rebuild them in the mobile builder. Nipige includes web + native iOS/Android apps from one platform. For anything that isn't a standard marketplace (a novel product, an internal tool, a SaaS app), Bubble's horizontal flexibility, 8,000+ plugins and AI builder are advantages a vertical platform doesn't have.",
      },
    ],
    whoShouldChooseCompetitor:
      "Choose Bubble if your marketplace is unusual or highly custom; you want total control over UI and logic; you have time and skills (or budget for an agency) to build it; and you want a giant plugin/AI ecosystem to draw on. If you're building something broader than a marketplace, Bubble's flexibility is exactly the point.",
    whoShouldChooseNipige:
      "Consider Nipige if you're building a recognizable vertical marketplace and want it live in ~14 days; you'd rather configure a finished product than assemble one; you want predictable, flat pricing with $0 platform fees instead of Workload-Unit metering; and you need native dispatch, driver apps or mobile apps out of the box. The decision question: are you building a marketplace, or building an app that happens to be a marketplace? For the former, turnkey beats a blank canvas.",
    migration: {
      intro:
        "Moving a marketplace off Bubble is a rebuild on a finished platform, not a data-only migration, so plan accordingly. Nipige doesn't offer automated import, but guided onboarding is included (2 hrs Growth, 5 hrs Business):",
      steps: [
        {
          label: "Data model & listings:",
          body: "export your Bubble database (CSV/API) and map it into your configured Nipige vertical's structure.",
        },
        {
          label: "User accounts:",
          body: "migrate buyer/seller accounts; expect password resets (standard on any platform move).",
        },
        {
          label: "Payments:",
          body: "you likely built payouts on Stripe Connect in Bubble; reconnect your processor on Nipige, where payouts/commissions are built in.",
        },
        {
          label: "Custom logic & plugins:",
          body: "Bubble workflows and plugin-based features won't port; identify which are covered natively by your Nipige vertical vs which need configuration (a good demo agenda).",
        },
        {
          label: "What you stop maintaining:",
          body: "after cut-over, the marketplace logic, dispatch, apps and hosting are maintained by the platform, not by you.",
        },
        {
          label: "SEO:",
          body: "301-redirect old URLs and refresh your sitemap to preserve rankings.",
        },
      ],
    },
    faqs: [
      {
        q: "Is Nipige a good Bubble alternative for a marketplace?",
        a: "For building a marketplace specifically, yes. Nipige is a turnkey vertical marketplace platform, so you skip the assembly Bubble requires, and you get flat pricing with $0 platform fees. For a fully custom, non-marketplace app, Bubble's horizontal flexibility is the better fit.",
      },
      {
        q: "Can Bubble build a multi-vendor marketplace?",
        a: "Yes. Bubble supports multi-vendor marketplaces via templates, plugins (Stripe Connect) and tutorials, and now markets a marketplace-builder page. The catch is that you assemble and maintain that logic yourself. Nipige ships it pre-built.",
      },
      {
        q: "Is Bubble scalable for marketplaces?",
        a: "Bubble runs on AWS and powers millions of apps, so it can scale. But cost scales with Workload-Unit consumption, and complex marketplace logic you build yourself must be engineered to scale. Nipige runs marketplaces on managed cloud with the operational engine (dispatch, billing) built and maintained for you.",
      },
      {
        q: "What are Workload Units and why do people dislike them?",
        a: "Workload Units are Bubble's usage metric: database queries, workflows and API calls all consume WUs, and exceeding your plan triggers overage charges (the official per-unit rate is undisclosed; ~$0.30 per 1,000 WU is widely cited). Many founders find the model hard to predict, which creates \"overage anxiety.\" Nipige uses flat, all-inclusive pricing with no usage metering.",
      },
      {
        q: "Is Bubble cheaper than Nipige?",
        a: "Bubble's entry price is lower ($32/mo web Starter vs $699/mo), but Bubble's real cost depends on Workload-Unit consumption, paid plugins, storage and editor seats, which scale with usage, and you invest heavily in building the marketplace. Nipige's flat plan includes hosting, support, native apps and dispatch with $0 platform fees. Compare total cost and build effort at your expected scale.",
      },
      {
        q: "Does Nipige have native mobile apps like Bubble?",
        a: "Nipige includes web + native iOS/Android apps from the Growth tier, built from one platform. Bubble's native mobile is now generally available too, but it's still maturing and web apps must be rebuilt for mobile (they don't auto-port).",
      },
      {
        q: "Which is better for restaurant delivery or on-demand?",
        a: "Nipige, in most cases. Its restaurant vertical ships native GPS dispatch and driver apps, which you'd build from scratch on Bubble. If you need heavy custom logic beyond standard delivery, Bubble's flexibility may still appeal.",
      },
      {
        q: "Is my Bubble app locked into Bubble?",
        a: "Apps built on Bubble run on Bubble's proprietary stack, so portability is limited, a normal trade-off for deeply-integrated no-code platforms. It's worth weighing before you invest months of build time on any single platform.",
      },
    ],
    dateModified: "2026-07-09",
  },
];

export function getComparison(slug: string): ComparisonPage | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
