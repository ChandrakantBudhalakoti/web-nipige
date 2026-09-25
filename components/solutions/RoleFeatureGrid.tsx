"use client";

import { useState } from "react";

type Feature = string;

interface RoleCard {
  icon: string;
  title: string;
  subtitle: string;
  features: Feature[];
  visibleCount: number;
}

const ROLE_CARDS: RoleCard[] = [
  {
    icon: "🛠️",
    title: "Platform admin",
    subtitle: "You, the marketplace owner",
    visibleCount: 6,
    features: [
      "Orders dashboard with BI & analytics",
      "Full order management + service tickets",
      "Customer 360 with data ownership",
      "Catalog: categories, attributes, layouts",
      "Coupons, bulk promotions & wallet rewards",
      "Delivery zones & per-distance pricing",
      "Notifications (SMS, email, in-app) with approval & templates",
      "Item-level tax codes",
      "Cancellation & refund policy rules",
      "Subscription plans to bill your vendors",
      "Partner, user & KYC management",
      "Payments config, login security, device binding",
      "Webhooks & integrations, extended attributes, FAQ builder",
    ],
  },
  {
    icon: "🍽️",
    title: "Restaurant / vendor",
    subtitle: "Your partner restaurants",
    visibleCount: 6,
    features: [
      "**AI menu creation** + manual menu builder",
      "Sales dashboard + item analytics",
      "Order management + service tickets",
      "Bundles, combos & build-your-own",
      "Coupons & bulk promotions (owner-approved)",
      "Delivery setup & fulfilment preference",
      "Staff / user management",
      "Reviews with foul-language moderation",
      "Profile, subscription & payment settings",
      "Data isolated per vendor",
    ],
  },
  {
    icon: "📱",
    title: "Customer app",
    subtitle: "Your diners, iOS & Android",
    visibleCount: 6,
    features: [
      "Restaurant discovery & search",
      "Menu browsing, ratings & reviews",
      "Cart with coupons + full price breakdown",
      "Real-time order tracking",
      "Card & cash payment",
      "Delivery instructions & notes",
      "Cancel order, raise & track tickets",
      "Favorites & wishlist",
      "Multi-language & dietary preferences",
      "Profile management",
    ],
  },
  {
    icon: "🛵",
    title: "Driver app",
    subtitle: "Your delivery team",
    visibleCount: 6,
    features: [
      "Online / offline availability",
      "Accept or reject new orders",
      "Pickup at restaurant flow",
      "Deliver to customer flow",
      "Secure delivery verification code",
      "Recent deliveries list",
    ],
  },
];

function FeatureText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ fontWeight: 700 }}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

function RoleCardItem({ card }: { card: RoleCard }) {
  const [expanded, setExpanded] = useState(false);
  const visible = card.features.slice(0, card.visibleCount);
  const hidden = card.features.slice(card.visibleCount);

  return (
    <div className="rfg-card">
      <div className="rfg-head">
        <span className="rfg-icon" aria-hidden="true">
          {card.icon}
        </span>
        <div>
          <div className="rfg-title">{card.title}</div>
          <div className="rfg-sub">{card.subtitle}</div>
        </div>
      </div>

      <ul className="rfg-list">
        {visible.map((f) => (
          <li key={f} className="rfg-item">
            <span className="rfg-check" aria-hidden="true">
              ✓
            </span>
            <span>
              <FeatureText text={f} />
            </span>
          </li>
        ))}
      </ul>

      {hidden.length > 0 ? (
        <>
          {expanded ? (
            <ul className="rfg-list rfg-hidden-list">
              {hidden.map((f) => (
                <li key={f} className="rfg-item">
                  <span className="rfg-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <FeatureText text={f} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            className="rfg-toggle"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : `Show all ${card.features.length} features`}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </>
      ) : null}
    </div>
  );
}

export function RoleFeatureGrid() {
  return (
    <div className="rfg-grid">
      {ROLE_CARDS.map((card) => (
        <RoleCardItem key={card.title} card={card} />
      ))}
    </div>
  );
}
