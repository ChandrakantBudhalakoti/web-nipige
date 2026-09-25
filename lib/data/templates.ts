import type { Template } from "@/lib/types";

/**
 * Solution definitions. Ported from the prototype's `T` array - `top: 1/0` is
 * normalised to a boolean, and `prices` carries the four-tier monthly pricing
 * used by the pricing-page solution selector.
 */
export const templates: Template[] = [
  {
    id: "restaurant",
    img: "/images/solutions/food/pizza.webp",
    nm: "Restaurant",
    ic: "🍕",
    clr: "#EA580C",
    cx: "High",
    pr: 899,
    prices: [899, 1699, 3299, "5,499+"],
    top: true,
    desc: "White label restaurant app development without code. Launch a multi-restaurant ordering and delivery platform with real-time driver dispatch, GPS tracking, surge pricing, wallet, and loyalty.",
    headline: "Everything to compete with DoorDash",
    apps: [
      { n: "Customer App", c: "#EA580C", d: "iOS + Android + Web ordering" },
      { n: "Restaurant Panel", c: "#D97706", d: "Menu management + order processing" },
      { n: "Driver App", c: "#059669", d: "GPS tracking + dispatch + OTP" },
      { n: "Admin Console", c: "#4F46E5", d: "Master control + analytics" },
    ],
    feats: [
      { i: "📱", n: "Customer Ordering App", d: "Branded iOS & Android app with search, menu browsing, cart, and checkout." },
      { i: "🍽️", n: "Restaurant Panel", d: "Menu management, order processing, availability controls, and analytics." },
      { i: "🚗", n: "Driver App + GPS", d: "Real-time dispatch, route optimization, live tracking, and OTP verification." },
      { i: "📊", n: "Surge Pricing Engine", d: "Dynamic pricing based on demand, time, distance, and zone configuration." },
      { i: "💰", n: "Wallet & Loyalty", d: "In-app wallet, cashback rules, reward points, and referral credits." },
      { i: "🏪", n: "Multi-Vendor Marketplace", d: "50+ restaurants under one consumer app with isolated data." },
      { i: "🎟️", n: "Promotions & Coupons", d: "BOGO, percentage off, free delivery, time-based deals, flash sales." },
      { i: "📈", n: "Admin Console + BI", d: "Sales analytics, order tracking, vendor management, revenue reports." },
    ],
    buyers: "Regional delivery founders, restaurant groups, ghost kitchens, food hall platforms",
    metaTitle: "Restaurant App Development & Builder - 14 Days",
    metaDesc:
      "Nipige is a no-code restaurant app builder for multi-restaurant food delivery. Launch a branded platform with customer, vendor, driver, and admin apps.",
    h1: "Restaurant App Builder",
    intro:
      "Nipige covers restaurant app development end to end, without code - powering a multi-restaurant platform. Ship on-demand restaurant software - ordering, real-time driver dispatch, GPS tracking, surge pricing, wallet and loyalty - from $899/mo, with $0 platform transaction fees, live in 14 days.",
    demoVideoId: "RnDcfv0PVxg",
    faqs: [
      {
        q: "What can you build with Nipige's restaurant app builder?",
        a: "Nipige's restaurant app builder ships a multi-restaurant food delivery marketplace: a customer app for discovery, cart, coupons, card and cash payment, and real-time order tracking; a vendor panel for menu and order management; a driver app; and an admin console for orders, catalog, delivery zones, and refunds. It goes live in about 14 days.",
      },
      {
        q: "How do you launch a restaurant app with Nipige?",
        a: "Configure a ready restaurant template instead of coding. Set up your restaurants and menus, define delivery zones, connect Stripe or PayPal, onboard drivers, and brand the apps. Nipige hosts and supports the platform, so a branded customer, vendor, driver, and admin stack goes live in about 14 days.",
      },
      {
        q: "Which apps come with a Nipige food marketplace?",
        a: "Every Nipige food marketplace ships four connected apps: a customer app to browse and order, a vendor app for restaurants to manage menus and orders, a driver app to accept and complete deliveries, and an admin console for catalog, delivery zones, payouts, and reporting.",
      },
      {
        q: "How much does it cost to build a food delivery app with Nipige?",
        a: "Building a food delivery marketplace from scratch runs into five or six figures. Nipige replaces that with a flat monthly subscription and $0 platform transaction fees, so you keep your margin and pay only your payment processor. Food plans start from $899 a month; see pricing for current plans.",
      },
      {
        q: "Do you charge commission on food orders?",
        a: "No. Nipige charges a flat monthly subscription with $0 platform transaction fees, so it never takes a percentage of your food orders. You keep every order's margin and pay only your payment processor's standard rate, unlike aggregator apps that take a commission on each delivery you fulfil.",
      },
      {
        q: "Do you offer white-label restaurant app development?",
        a: "Yes. Nipige is fully white-label: your brand, logo, and domain run across the customer, vendor, driver, and admin apps, so your customers see your marketplace and never Nipige. You launch a branded restaurant delivery platform in about 14 days on managed hosting, without writing any code.",
      },
    ],
  },
  {
    id: "realestate",
    img: "/images/solutions/realestate-hero.jpg",
    nm: "Real Estate & Property",
    ic: "🏠",
    clr: "#8B5CF6",
    cx: "High",
    pr: 899,
    prices: [899, 1699, 3299, "5,499+"],
    top: true,
    desc: "Build a property management, rental marketplace, or real estate services platform with listings, tenant portals, payments, and CRM.",
    headline: "Property platforms for the $30B US market",
    apps: [
      { n: "Customer/Tenant App", c: "#8B5CF6", d: "Search, apply, pay rent, maintenance" },
      { n: "Agent/Landlord Panel", c: "#A855F7", d: "Listings, leads, tenant management" },
      { n: "Service Provider App", c: "#7C3AED", d: "Maintenance dispatch + scheduling" },
      { n: "Admin Console", c: "#6D28D9", d: "Portfolio management + analytics" },
    ],
    feats: [
      { i: "🏘️", n: "Property Listings", d: "Search with filters: location, price, bedrooms, amenities, photos, virtual tours." },
      { i: "📝", n: "Application & Lease Mgmt", d: "Online applications, document uploads, e-signatures, lease tracking." },
      { i: "💳", n: "Rent Collection", d: "Automated rent collection, late fees, payment history, multi-method payments." },
      { i: "🔧", n: "Maintenance Requests", d: "Tenants submit requests, dispatch to service providers, track resolution." },
      { i: "👥", n: "Tenant Portal & CRM", d: "Tenant profiles, communication history, document storage, self-service portal." },
      { i: "📊", n: "Portfolio Analytics", d: "Occupancy rates, revenue tracking, expense management, financial reports." },
      { i: "🏢", n: "Multi-Property Mgmt", d: "Manage residential, commercial, and mixed portfolios from one dashboard." },
      { i: "🔔", n: "Notifications & Engagement", d: "Push, SMS, email for rent reminders, maintenance updates, community announcements." },
    ],
    buyers: "Property management companies, rental marketplace founders, real estate agencies, PropTech startups, co-living operators",
    metaTitle: "Real Estate App Development Platform - 14 Days",
    metaDesc:
      "Nipige covers real estate app development with property listing software and a rental marketplace builder - tenant portals, payments, CRM, live in 14 days.",
    h1: "Real Estate Marketplace Platform",
    intro:
      "Nipige handles real estate app development without code - property listing software plus a rental marketplace builder that ships listings, tenant portals, payments, and a built-in CRM, from $899/mo, with $0 platform transaction fees - live in 14 days.",
    relatedCaseSlugs: ["calonex"],
    faqs: [
      {
        q: "Does Nipige handle real estate app development, or just listings?",
        a: "Nipige handles full real estate app development, not just listings. You get a branded platform with property listings, tenant applications, rent collection, and maintenance requests, plus an admin console to manage everything. You configure it without code and launch in about 14 days on managed hosting.",
      },
      {
        q: "Is a CRM included?",
        a: "Yes. Nipige includes an admin console to manage owners, tenants, listings, applications, and payments in one place, so you track every contact and transaction without bolting on a separate CRM. You can export your data and connect your own tools as your marketplace grows.",
      },
      {
        q: "What are best practices for multi-tenant data isolation?",
        a: "Each Nipige marketplace runs as its own branded, isolated instance with its own data, users, listings, and payouts. Your tenants and owners stay inside your platform, and Nipige manages the hosting, backups, and security, so you launch and operate without maintaining the infrastructure yourself.",
      },
      {
        q: "What real estate listing software works for a rental marketplace?",
        a: "Nipige is real estate listing software built for rental marketplaces: property listings, search and filters, tenant applications, rent collection, and maintenance requests, with a branded customer app and an admin console. You configure it without code and launch a managed platform in about 14 days.",
      },
    ],
  },
  {
    id: "services",
    img: "/images/solutions/services/painter.webp",
    nm: "Services Marketplace",
    ic: "🛠️",
    clr: "#0891B2",
    cx: "Standard",
    pr: 699,
    prices: [699, 1299, 2499, "4,499+"],
    top: true,
    desc: "Service marketplace and on-demand home services app development without code. Launch a services marketplace connecting customers with providers - booking, dispatch, quotation bidding, and payments.",
    headline: "Build your own TaskRabbit or UrbanClap",
    apps: [
      { n: "Customer App", c: "#0891B2", d: "Search, book, pay for services" },
      { n: "Provider App", c: "#06B6D4", d: "Job management, schedule, earnings" },
      { n: "Admin Console", c: "#0E7490", d: "Marketplace control + analytics" },
    ],
    feats: [
      { i: "🔍", n: "Service Search & Booking", d: "Find and book by category, location, rating, and availability." },
      { i: "👷", n: "Provider Matching", d: "Auto-assign or customer-choice based on skills, ratings, proximity." },
      { i: "📝", n: "Quotation & Bidding", d: "Customers post jobs, providers submit quotes. Best fit wins." },
      { i: "✅", n: "Provider Verification", d: "Background checks, document uploads, certification tracking." },
      { i: "⭐", n: "Reviews & Ratings", d: "Two-way ratings with photo reviews for completed work." },
      { i: "💬", n: "In-App Messaging", d: "Real-time chat between customers and providers." },
      { i: "💰", n: "Secure Payments", d: "Hold-and-release, tips, automated provider payouts." },
      { i: "📊", n: "CRM & Notifications", d: "Customer profiles, booking history, omnichannel engagement." },
    ],
    buyers: "Pet services, home services, beauty, cleaning, tutoring, auto repair founders",
    metaTitle: "Service Marketplace Software - Launch in 14 Days",
    metaDesc:
      "Nipige's service marketplace software covers on-demand home services app development - booking, dispatch, quotation bidding, and payments, without code.",
    h1: "Service Marketplace Software",
    intro:
      "Nipige's service marketplace software covers on-demand home services app development end to end - no code required. Ship booking, dispatch, quotation bidding and payments, from $699/mo, with $0 platform transaction fees - live in 14 days.",
    faqs: [
      {
        q: "What is a service marketplace platform?",
        a: "A service marketplace platform connects customers who need a service with the providers who deliver it, and handles booking, provider onboarding, job dispatch or bidding, and payments in one system. Nipige is a no-code service marketplace builder: configure your categories, zones, and payouts, and launch a branded platform in about 14 days.",
      },
      {
        q: "How do you build a service marketplace without code?",
        a: "With Nipige you configure a ready service-marketplace template instead of writing code. Set your service categories, onboard providers, choose booking or quote-and-bid flows, connect Stripe or PayPal, and define your zones and payout rules. A branded customer app, provider app, and admin console go live in about 14 days.",
      },
      {
        q: "Which apps come with a Nipige service marketplace?",
        a: "Every Nipige service marketplace ships three connected apps: a customer app to browse and book, a provider app to accept and complete jobs, and an admin console to manage categories, providers, payouts, and reporting. They share one system, so a booking flows from customer to provider to payout without manual handoffs.",
      },
      {
        q: "How much does it cost to build a service marketplace?",
        a: "Building a service marketplace from scratch runs into five or six figures with a development team. Nipige replaces that with a flat monthly subscription and $0 platform transaction fees, so you keep your margin and pay only your payment processor. Services plans start from $699 a month; see pricing for current plans.",
      },
    ],
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export const featuredTemplates = templates.filter((t) => t.top);
export const otherTemplates = templates.filter((t) => !t.top);
