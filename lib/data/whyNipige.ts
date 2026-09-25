/** Hub data for /why-nipige — Nipige vs major alternatives. */

export interface WhyRow {
  label: string;
  nipige: string;
  sharetribe: string;
  csCart: string;
  mirakl: string;
  bubble: string;
}

export const whyNipigeRows: WhyRow[] = [
  {
    label: "Best fit",
    nipige: "Vertical marketplaces & on-demand (food, services, real estate)",
    sharetribe: "Simple rental / peer marketplaces, or developer-led builds on the Extend plan",
    csCart: "Self-hosted retail multi-vendor catalogs",
    mirakl: "Enterprise retailer / brand marketplace programs",
    bubble: "Custom web apps when UX is fully bespoke",
  },
  {
    label: "Time to launch",
    nipige: "~14 days typical",
    sharetribe: "Hours–days (templated plans) / months (developer-led on Extend)",
    csCart: "Weeks–months (host + configure)",
    mirakl: "Months (enterprise sales + impl)",
    bubble: "Weeks–months depending on scope",
  },
  {
    label: "Native mobile apps",
    nipige: "iOS + Android included (Growth+)",
    sharetribe: "Add-on / custom",
    csCart: "Add-ons / custom",
    mirakl: "Partner / custom",
    bubble: "Web-first; native needs wrappers",
  },
  {
    label: "GPS / driver dispatch",
    nipige: "Built-in for food & on-demand",
    sharetribe: "Custom build",
    csCart: "Not native for live dispatch",
    mirakl: "Not a dispatch product",
    bubble: "Custom plugins / APIs",
  },
  {
    label: "Platform transaction fees",
    nipige: "$0 (processor fees only)",
    sharetribe: "Subscription; check plan extras",
    csCart: "License; no take-rate by default",
    mirakl: "Enterprise commercial model",
    bubble: "Subscription; your payment stack",
  },
  {
    label: "Hosting & ops",
    nipige: "Fully managed",
    sharetribe: "Managed (Sharetribe hosting)",
    csCart: "Self-host / your ops",
    mirakl: "SaaS enterprise",
    bubble: "Bubble hosting",
  },
  {
    label: "Where they shine",
    nipige: "Vertical depth + flat fees + apps",
    sharetribe: "Fast simple launches; developer-led flexibility on Extend",
    csCart: "Code ownership for retail MV",
    mirakl: "Large retailer ecosystem deals",
    bubble: "Pixel-perfect custom product UX",
  },
  {
    label: "Trade-offs",
    nipige: "Newer brand; deepest on vertical templates",
    sharetribe: "Templated-plan limits; developer-led plan needs React talent",
    csCart: "You run servers & upgrades",
    mirakl: "Price & cycle for mid-market",
    bubble: "You assemble marketplace ops yourself",
  },
];

export const whyNipigeFaqs = [
  {
    q: "What is the best Nipige vs alternatives summary?",
    a: "Choose Nipige when you need vertical-ready apps, dispatch, and $0 platform fees without a custom engineering team. Choose Sharetribe for ultra-simple launches, CS-Cart when you want to self-host retail code, Mirakl for enterprise retailer programs, and Bubble when the product UI itself is the differentiator.",
  },
  {
    q: "Is Nipige a Sharetribe alternative?",
    a: "Yes. Both let you launch a marketplace, but Sharetribe is developer-extensible software you build on, while Nipige is a managed, white-label, turnkey platform that ships vertical-ready apps and hosting so you launch in about 14 days. Compare launch speed, management, and fees on the comparison page.",
  },
  {
    q: "Is Nipige a CS-Cart alternative?",
    a: "Yes if you prefer managed hosting and on-demand/dispatch verticals over self-hosted PHP retail multi-vendor. CS-Cart remains strong when code ownership and catalog retail are the priority.",
  },
  {
    q: "Is Nipige a Mirakl alternative?",
    a: "For mid-market and startup multi-vendor launches, Nipige is often a faster, lower-overhead path. Mirakl remains the reference for large enterprise retailer marketplace programs.",
  },
  {
    q: "Is Nipige a Bubble alternative for marketplaces?",
    a: "Bubble wins for fully custom web UX. Nipige wins when marketplace ops — multi-vendor apps, payments, dispatch — should ship packaged rather than assembled plugin-by-plugin.",
  },
  {
    q: "Will a no-code marketplace handle early traffic and scaling?",
    a: "Nipige runs on managed production infrastructure used by live platforms (e.g. Fast Forge order volume, company-reported). Early and growth traffic are in scope; extreme custom scale can still move to a hybrid or custom path later.",
  },
  {
    q: "How do I switch to Nipige from Sharetribe, CS-Cart, or Bubble?",
    a: "You rebuild on a Nipige vertical template rather than migrate code. Configure your vendors, catalog, payments, and branding, import your data, and point your domain. Because the apps are prebuilt, a branded replacement can go live in about 14 days. See the switch steps for each platform.",
  },
  {
    q: "Where is the proof?",
    a: "See /case-studies for production platforms and /pricing for transparent TCO. Claims about volume cite company-reported customer metrics.",
  },
  {
    q: "How does a no-code marketplace platform scale multi-vendor infrastructure?",
    a: "By isolating vendors, tenants, and data per portfolio while sharing managed hosting underneath, so onboarding vendor #200 doesn't mean re-architecting. Nipige runs this pattern in production today (e.g. Fast Forge's reported order volume) rather than as a roadmap promise.",
  },
];

export const whyNipigeProof = [
  {
    claim: "14-day launch path",
    evidence: "Vertical templates + managed hosting — configure branding, zones, and payments without a custom frontend team.",
  },
  {
    claim: "$0 platform fees",
    evidence: "Flat monthly plans; card processing stays with Stripe/PayPal — no Nipige take-rate on GMV.",
  },
  {
    claim: "Production volume",
    evidence: "Fast Forge and other case studies run live workloads on Nipige infrastructure (company-reported).",
  },
];
