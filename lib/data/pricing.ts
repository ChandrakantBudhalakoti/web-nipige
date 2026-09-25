import type { PricingTier } from "@/lib/types";

/** Pricing tiers. Prices match the updated solution-pricing model. */
export const tiers: PricingTier[] = [
  {
    n: "Starter",
    p: 699,
    a: "$7,130/yr",
    d: "Launch your MVP",
    f: [
      "1 solution (any vertical)",
      "Web app (responsive)",
      "Shared cloud hosting",
      "Up to 50 vendors",
      "Self-serve setup ($0)",
      "Email support (48hr)",
      "99.5% uptime SLA",
      "$0 transaction fees",
    ],
    no: ["Native mobile apps", "Dedicated hosting"],
    ct: "Start Free Trial",
    bg: "transparent",
  },
  {
    n: "Growth",
    p: 1299,
    a: "$13,250/yr",
    d: "Scale your platform",
    pop: 1,
    f: [
      "1 solution + customization",
      "Web + iOS + Android apps",
      "Dedicated cloud",
      "Up to 200 vendors",
      "Email support (24hr)",
      "99.5% uptime SLA",
      "$0 transaction fees",
      "Wallet & loyalty",
      "2 hrs onboarding",
    ],
    no: ["Dedicated account mgr"],
    ct: "Start Free Trial",
    bg: "#06B6D4",
  },
  {
    n: "Business",
    p: 2499,
    a: "$25,490/yr",
    d: "Enterprise features, mid-market price",
    f: [
      "Full customization",
      "All apps + admin suite",
      "Dedicated cloud + domain",
      "Unlimited vendors",
      "Priority support (8hr)",
      "99.9% uptime SLA",
      "$0 transaction fees",
      "Account manager",
      "5 hrs onboarding",
      "API access",
      "Multi-location",
      "White-label",
    ],
    no: [],
    ct: "Book a Demo",
    bg: "transparent",
  },
  {
    n: "Enterprise",
    p: "Custom",
    a: "Starting $4,499/mo",
    d: "Super App & complex deployments",
    f: [
      "Multi-solution / Super App",
      "Full platform",
      "Dedicated or on-premise",
      "Unlimited everything",
      "Support (4hr) + SLA credits",
      "99.9% uptime + credits",
      "$0 transaction fees",
      "Quarterly reviews",
      "10+ hrs onboarding",
      "Custom integrations",
      "Source code escrow",
      "White-label everything",
    ],
    no: [],
    ct: "Talk to Founders",
    bg: "transparent",
  },
];

/** Tier display names, in column order. */
export const tierNames = ["Starter", "Growth", "Business", "Enterprise"] as const;

/**
 * Plan-limits comparison matrix. Each row is
 * [feature, Starter, Growth, Business, Enterprise]. Ported from the prototype's
 * `LIMITS` array.
 */
export const planLimits: [string, string, string, string, string][] = [
  ["Vendors", "50", "200", "Unlimited", "Unlimited"],
  ["End Users", "5,000", "25,000", "Unlimited", "Unlimited"],
  ["Orders/mo", "2,000", "15,000", "Unlimited", "Unlimited"],
  ["Apps", "Web only", "Web+iOS+Android", "All+Admin Suite", "Full platform"],
  ["Hosting", "Shared", "Dedicated", "Dedicated+domain", "On-premise"],
  ["Storage", "10 GB", "50 GB", "200 GB", "Custom"],
  ["Admin Users", "2", "5", "15", "Unlimited"],
  ["Support", "Email 48hr", "Email 24hr", "Priority 8hr+Slack", "4hr+SLA"],
  ["Uptime", "99.5%", "99.5%", "99.9%", "99.9%+credits"],
  ["Txn Fees", "$0", "$0", "$0", "$0"],
  ["Onboarding", "Self-serve", "2 hrs", "5 hrs", "10+ hrs"],
  ["Wallet", "-", "✓", "✓", "✓"],
  ["API", "-", "-", "Full REST", "API+webhooks"],
  ["White-Label", "-", "-", "Available", "Full"],
];

/** Pricing-page FAQ. */
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "What's included?",
    a: "Full software license, cloud hosting, updates, security patches, bug fixes, and support. No per-seat or per-user fees.",
  },
  {
    q: "Can't I build this with AI?",
    a: "AI builds demos. Nipige builds businesses. Multi-tenant isolation, PCI payments, delivery dispatch, and 99.9% uptime require 45+ battle-tested microservices. Our LIRS system handles 35M invoices/month.",
  },
  {
    q: "What if I outgrow my tier?",
    a: "Upgrade seamlessly - same platform, same data, more capacity. No migration, no downtime.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. 25% wholesale, white-label at Business tier, volume discounts at 5+ and 10+ instances. See our Agency page.",
  },
  {
    q: "What if I cancel?",
    a: "Your data is yours. Full export. 90-day hold. No lock-in.",
  },
];
