/* =====================================================================
   Live demo config + demo data. Ported from docs/try v2.html.
   Fill in the CONFIG block when the backend is ready.
   ===================================================================== */

export const VIDEOS: Record<PlayerKey, string> = {
  overview: "https://d3etdz0uek6d8j.cloudfront.net/mp4/Nipige-Overview-30s.mp4", // 30-sec platform overview. Hero, before a market is chosen.
  restaurant: "https://d3etdz0uek6d8j.cloudfront.net/mp4/Nipige-Restaurant-Marketplace-Trailer.mp4", // Restaurant teaser.
  fashion: "https://d3etdz0uek6d8j.cloudfront.net/mp4/Nipige-Fashion-Marketplace_RLD-Video.mp4", // Fashion teaser.
};
/** Shown on each video's poster. Update alongside VIDEOS if a file changes. */
export const VIDEO_LENGTH: Record<PlayerKey, string> = { overview: "0:30", restaurant: "0:56", fashion: "1:17" };
/** POST URL for leads ("email me this demo", "notify me"). Empty = log to console. */
export const CRM_ENDPOINT = "";
/** POST {market, role, visitorId} -> {loginUrl}. The server hands out a short-lived token for a
 *  pooled demo persona. Never put a shared demo password in the browser. */
export const DEMO_SESSION_ENDPOINT = "";
export const RESET_NOTE = "Demo data resets every hour.";

/** Demo keys: one sign-in per app; every key in a market shares that market's password. Each key opens the real demo site in a new tab.
 *  TODO: confirm the vendor panel URL with the demo environment before launch. */
export const DEMO_PASSWORD: Record<MarketId, string> = {
  restaurant: "DemoKitchen!2026",
  fashion: "DemoFashion!2026",
};
const ADMIN_PORTAL = "https://admin.demo.nipige.com";
export const DEMO_KEYS: Record<MarketId, Record<Role, { email: string; url: string; open: string }>> = {
  restaurant: {
    customer: { email: "customer@demo-kitchen.nipige.test", url: "https://demo-kitchen.demo.nipige.com", open: "Open the storefront" },
    vendor: { email: "restaurant@demo-kitchen.nipige.test", url: ADMIN_PORTAL, open: "Open the restaurant panel" },
    admin: { email: "owner@demo-kitchen.nipige.test", url: ADMIN_PORTAL, open: "Open the admin portal" },
  },
  fashion: {
    customer: { email: "customer@demo-fashion.nipige.test", url: "https://demo-fashion.demo.nipige.com", open: "Open the storefront" },
    vendor: { email: "seller@demo-fashion.nipige.test", url: ADMIN_PORTAL, open: "Open the seller panel" },
    admin: { email: "owner@demo-fashion.nipige.test", url: ADMIN_PORTAL, open: "Open the admin portal" },
  },
};

/** Never reachable in the public demo. Hiding a menu item is not enough: block these on the server for demo sessions too. */
export const BLOCKED_IN_DEMO = [
  "Change or reset the password of any shared persona",
  "Delete a shared persona or request account deletion / data download",
  "Revoke other visitors’ sessions",
  "Create tenants",
  "Anything under /platform/*",
  "Register custom domains",
  "Upload files",
  "Manage webhooks",
  "Manage partner / API credentials",
  "Change currency (Tenant settings)",
  "Business / legal verification",
  "Create real platform support tickets",
  "Unsubscribe from a market",
  "Kitchen: pause new orders or busy mode",
];

export const BLOCK_MSG = "Turned off in the shared demo, so every visitor gets the same store.";

export type MarketId = "restaurant" | "fashion";
export type Role = "customer" | "vendor" | "admin";
export type PlayerKey = "overview" | MarketId;
export type IconName = "cust" | "vend" | "admin" | "car" | "kds";
export type ArtName = "food" | "shirt" | "basket" | "device";

export type ScreenId =
  | "r_home" | "r_menu" | "r_checkout" | "r_track" | "r_table" | "c_account"
  | "r_orders" | "r_kds" | "r_floor" | "r_resv" | "r_menuadm"
  | "f_search" | "f_product" | "f_cart" | "f_track" | "f_returns"
  | "s_ful" | "s_sales" | "s_products"
  | "o_today" | "o_sellers" | "o_marketing" | "o_inbound" | "o_deliveries" | "o_returns";

/** [tip text, role, screen, highlight target, optional app label] */
export type TourStep = [string, Role, ScreenId, string, string?];

export interface RoleInfo {
  label: string;
  app: string;
  icon: IconName;
  sees: string;
  can: string[];
  cta: string;
  screens: ScreenId[];
  locked: string[];
}

export interface Market {
  name: string;
  noun: string;
  price: string;
  badge: [string, string];
  brand: string;
  art: ArtName;
  desc: string;
  apps: string[];
  inside: [IconName, string, string][];
  roles: Record<Role, RoleInfo>;
  tour: TourStep[];
  bonus: Record<string, { title: string; desc: string; steps: TourStep[] }>;
  open: string;
  drv: string;
  locked: string;
  /** Native apps per persona (shown as phones; the delivery agent one is previewed in the tour). */
  mobile: [IconName, string, string][];
}

const OWNER_LOCKED = [
  "Payment gateway",
  "Tax rules and reports",
  "Staff and roles",
  "Storefront branding",
  "Integrations",
  "AI assistant",
  "Subscription",
];

export const D: Record<MarketId, Market> = {
  restaurant: {
    name: "Restaurant",
    noun: "a restaurant marketplace",
    price: "$899",
    badge: ["Top US demand", ""],
    brand: "Lone Star Eats",
    art: "food",
    desc: "Online ordering, delivery, dine-in and a kitchen display for many restaurants under your own brand.",
    apps: ["Customer storefront", "Restaurant panel", "Owner console", "Mobile apps"],
    inside: [
      ["cust", "Customer storefront", "Browse restaurants, order delivery, pickup or curbside, tip and track."],
      ["vend", "Restaurant panel", "Accept orders, run the kitchen display, seat tables, take reservations."],
      ["admin", "Owner console", "See every order from every channel, manage restaurants, run promotions."],
      ["car", "Mobile apps for every persona", "Customer, restaurant and delivery agent apps for iOS and Android. Ask our team to see them."],
    ],
    roles: {
      customer: {
        label: "Customer",
        app: "Customer storefront",
        icon: "cust",
        sees: "Order from any restaurant and follow it to your door.",
        can: ["Browse restaurants and menus", "Check out with a test card and a tip", "Track the delivery and book a table"],
        cta: "Enter as customer",
        screens: ["r_home", "r_menu", "r_checkout", "r_track", "r_table", "c_account"],
        locked: ["Create an account", "Sell on this store"],
      },
      vendor: {
        label: "Restaurant",
        app: "Restaurant panel",
        icon: "vend",
        sees: "Run a restaurant on your marketplace: orders, kitchen, floor and bookings.",
        can: ["Accept new orders", "Run the Kitchen Display", "Seat dine-in tables and guests"],
        cta: "Enter as the restaurant",
        screens: ["r_orders", "r_kds", "r_floor", "r_resv", "r_menuadm"],
        locked: ["Payouts", "Store staff", "Business documents", "AI assistant"],
      },
      admin: {
        label: "Marketplace owner",
        app: "Owner console",
        icon: "admin",
        sees: "This is you. See every order and restaurant on your marketplace.",
        can: ["See sales from every channel", "Review your restaurants", "Run coupons and win back carts"],
        cta: "Enter as the owner",
        screens: ["o_today", "o_sellers", "o_marketing"],
        locked: OWNER_LOCKED,
      },
    },
    tour: [
      ["This is your food marketplace. Pick any restaurant to see its menu.", "customer", "r_home", "pick"],
      ["Add any dish to your cart. You can check ingredients and reviews first.", "customer", "r_menu", "add"],
      ["Choose delivery, pickup or curbside, add a tip, apply a coupon if you like, and place the order. Payment is in test mode.", "customer", "r_checkout", "place"],
      ["You’re the restaurant now. Your order just came in. Accept it.", "vendor", "r_orders", "accept"],
      ["Now you’re the kitchen. Mark each item plated, then tap Ready for pickup.", "vendor", "r_kds", "ready", "Kitchen Display"],
      [
        "The order is ready. From here, a delivery agent takes the job in the Nipige Delivery app on their phone, picks it up and delivers it. Play the preview to see how.",
        "customer",
        "r_track",
        "drive",
        "Delivery agent app · preview",
      ],
      ["You’re the owner. See today’s sales from online, counter and dine-in in one place.", "admin", "o_today", "kpis"],
    ],
    bonus: {
      dinein: {
        title: "Run dine-in",
        desc: "Seat a table and send the order to the kitchen.",
        steps: [
          ["You run the floor now. Seat guests at any free table.", "vendor", "r_floor", "seat"],
          ["Add any dish to the check and send it to the kitchen.", "vendor", "r_floor", "send"],
        ],
      },
      reserve: {
        title: "Take a reservation",
        desc: "Book a table as a guest, then seat them.",
        steps: [
          ["As a guest, pick the party size, day and time, then book a table.", "customer", "r_table", "resv"],
          ["You’re the restaurant. Your booking is on the list. Seat the guests.", "vendor", "r_resv", "seatr"],
        ],
      },
      grow: {
        title: "Grow sales",
        desc: "Turn on a coupon and see carts you can win back.",
        steps: [["You’re the owner. Turn on a coupon.", "admin", "o_marketing", "mkt"]],
      },
    },
    open: "Storefront, restaurant list, menus, cart, checkout, order tracking and table booking. Restaurant orders, Kitchen Display, floor plan and reservations. Owner orders today, restaurants and promotions.",
    drv: "The delivery agent app runs on the agent’s phone, so it isn’t in this web demo. In the tour, once the kitchen marks the order ready, you watch what happens next: a delivery agent accepts the job, picks it up and delivers it with the customer’s 6-digit code.",
    mobile: [
      ["cust", "Customer app", "Order, track the delivery live, reorder and leave reviews."],
      ["vend", "Restaurant app", "Accept orders and manage the menu from a phone."],
      ["car", "Delivery agent app", "Take jobs, navigate, confirm with a 6-digit code, see earnings."],
    ],
    locked: "Real payments, creating accounts, payment gateway, sales tax rules and reports, payouts, staff and roles, storefront branding, integrations, the AI assistant and your subscription.",
  },
  fashion: {
    name: "Fashion",
    noun: "a multi-brand fashion store",
    price: "",
    badge: ["New", "new"],
    brand: "Threadline",
    art: "shirt",
    desc: "A multi-brand fashion store. Many brands sell, you ship their items to the customer as one delivery.",
    apps: ["Customer storefront", "Seller panel", "Owner console", "Mobile apps"],
    inside: [
      ["cust", "Customer storefront", "Filter by size and fit, check the size guide, buy from many brands at once."],
      ["vend", "Seller panel", "Brands accept orders, ship to your hub and see their earnings."],
      ["admin", "Owner console", "Receive parcels at your hub, send one delivery, manage returns."],
      ["car", "Mobile apps for every persona", "Customer, seller and delivery agent apps for iOS and Android. Ask our team to see them."],
    ],
    roles: {
      customer: {
        label: "Customer",
        app: "Customer storefront",
        icon: "cust",
        sees: "Shop from several brands in one order.",
        can: ["Filter by size, fit and brand", "Check the size guide", "Choose one combined delivery"],
        cta: "Enter as customer",
        screens: ["f_search", "f_product", "f_cart", "f_track", "f_returns", "c_account"],
        locked: ["Create an account", "Apply as a seller"],
      },
      vendor: {
        label: "Seller",
        app: "Seller panel",
        icon: "vend",
        sees: "Run one of the brands selling on your store.",
        can: ["Accept and ship orders to the hub", "See sales and commission", "Browse your products"],
        cta: "Enter as a seller",
        screens: ["s_ful", "s_sales", "s_products"],
        locked: ["Payouts", "Store staff", "Business documents", "AI assistant"],
      },
      admin: {
        label: "Marketplace owner",
        app: "Owner console",
        icon: "admin",
        sees: "This is you. Run the hub, deliveries, returns and every brand.",
        can: ["Receive parcels at your hub", "Send one combined delivery", "Approve returns and run promotions"],
        cta: "Enter as the owner",
        screens: ["o_today", "o_inbound", "o_deliveries", "o_returns", "o_sellers", "o_marketing"],
        locked: OWNER_LOCKED,
      },
    },
    tour: [
      ["This is your multi-brand fashion store. Use the size and fit filters, then open any product.", "customer", "f_search", "filter"],
      ["Pick a colour and size, check the size guide, then add it to your cart.", "customer", "f_product", "fadd"],
      ["Your cart now has items from two brands: yours, plus one saved earlier. Choose Combined delivery and place the order.", "customer", "f_cart", "fplace"],
      ["You’re now the seller of the item you picked. Accept your part of the order and ship it to the hub.", "vendor", "s_ful", "ship"],
      ["You’re the owner. Parcels from both brands reached your hub. Mark them received.", "admin", "o_inbound", "receive"],
      [
        "Send both items as one delivery. From here, a delivery agent picks it up at your hub in the Nipige Delivery app and delivers it. Play the preview to see how.",
        "admin",
        "o_deliveries",
        "fdrive",
        "Delivery agent app · preview",
      ],
      ["Back as the seller. See your sale and the commission you pay the marketplace.", "vendor", "s_sales", "ssales"],
    ],
    bonus: {
      returns: {
        title: "Handle a return",
        desc: "Return an item in a few taps, then approve it.",
        steps: [
          ["As the customer, request a return on an item from a delivered order.", "customer", "f_returns", "ret"],
          ["You’re the owner. Approve the return. The refund is queued.", "admin", "o_returns", "retok"],
        ],
      },
      grow: {
        title: "Grow sales",
        desc: "Turn on a coupon and see carts you can win back.",
        steps: [["You’re the owner. Turn on a coupon.", "admin", "o_marketing", "mkt"]],
      },
    },
    open: "Search, filters, product pages, size guide, wishlist, multi-brand cart, combined delivery, tracking and returns. Seller fulfilment, sales and products. Owner hub, deliveries, returns, sellers and promotions.",
    drv: "The delivery agent app runs on the agent’s phone, so it isn’t in this web demo. In the tour, once you dispatch from your hub, you watch what happens next: a delivery agent picks up the parcel and delivers it with the customer’s 6-digit code.",
    mobile: [
      ["cust", "Customer app", "Shop, track the delivery live and request returns."],
      ["vend", "Seller app", "Accept orders, ship to the hub and check sales from a phone."],
      ["car", "Delivery agent app", "Take jobs, navigate, confirm with a 6-digit code, see earnings."],
    ],
    locked: "Real payments, creating accounts, applying as a seller, payment and tax setup, accounting export, seller payouts, staff and roles, storefront branding, integrations and the AI assistant.",
  },
};

export const MARKET_IDS = Object.keys(D) as MarketId[];

export const SOON: { id: string; name: string; desc: string; art: ArtName }[] = [
  { id: "grocery", name: "Grocery Delivery", desc: "Delivery slots, substitutions and multi-store baskets.", art: "basket" },
  { id: "electronics", name: "Electronics Marketplace", desc: "Many brands, spec comparison, warranties and financing.", art: "device" },
];

export const ROLE_ORDER: Role[] = ["customer", "vendor", "admin"];

export const TITLES: Record<ScreenId, string> = {
  r_home: "Restaurants",
  r_menu: "Menu",
  r_checkout: "Checkout",
  r_track: "Track order",
  r_table: "Book a table",
  c_account: "My account",
  r_orders: "Orders",
  r_kds: "Kitchen Display",
  r_floor: "Floor",
  r_resv: "Reservations",
  r_menuadm: "Menu items",
  f_search: "Search",
  f_product: "Product",
  f_cart: "Cart and checkout",
  f_track: "Track order",
  f_returns: "Returns",
  s_ful: "Fulfillment",
  s_sales: "Sales & revenue",
  s_products: "Products",
  o_today: "Orders today",
  o_sellers: "Sellers",
  o_marketing: "Coupons and carts",
  o_inbound: "Inbound queue",
  o_deliveries: "Deliveries",
  o_returns: "Returns",
};

/** Which action completes each tour target. Steps with no entry advance with Next. */
export const COMPLETE: Record<string, string> = {
  pick: "rest",
  add: "add",
  place: "place",
  accept: "accept",
  ready: "ready",
  seat: "seat",
  send: "send",
  resv: "resv",
  seatr: "seatr",
  mkt: "mkt",
  filter: "fopen",
  fadd: "fadd",
  fplace: "fplace",
  ship: "ship",
  receive: "receive",
  ret: "ret",
  retok: "retok",
};

export const RSIM = [
  "New job sent to nearby delivery agents",
  "Luis M. accepted the job",
  "Luis is at the restaurant",
  "Order picked up",
  "On the way to the customer",
  "Delivery code checked",
  "Delivered",
];
export const FSIM = [
  "Job sent to nearby delivery agents",
  "Maya R. accepted the job",
  "Picked up at your hub",
  "On the way to the customer",
  "Delivery code checked",
  "Delivered",
];

export const G = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#f59e0b,#fb923c)",
  "linear-gradient(135deg,#10b981,#34d399)",
  "linear-gradient(135deg,#3b82f6,#06b6d4)",
  "linear-gradient(135deg,#8b5cf6,#d946ef)",
  "linear-gradient(135deg,#f43f5e,#fb923c)",
];

/** [name, cuisine, delivery, rating] */
export const RESTS: [string, string, string, string][] = [
  ["Lone Star Smokehouse", "BBQ", "25–35 min · Free delivery", "4.8"],
  ["Casa Verde Taqueria", "Tex-Mex", "20–30 min", "4.7"],
  ["Pho Real", "Vietnamese", "30–40 min", "4.6"],
  ["Sunrise Bagel Co.", "Breakfast", "15–25 min", "4.9"],
  ["Green Fork Kitchen", "Vegan", "20–30 min", "4.5"],
  ["Slice of Austin", "Pizza", "25–35 min", "4.6"],
];

/** [name, price, description, reviews, soldOut] */
export const REST_MENU: [string, number, string, string, boolean?][] = [
  ["Brisket Plate", 18.5, "Brisket, two sides, pickles, onion", "★ 4.9 · 212 reviews"],
  ["Burnt Ends", 16, "Half pound, house sauce", "★ 4.8 · 140 reviews"],
  ["Pulled Pork Sandwich", 12, "Slaw on a brioche bun", "★ 4.7 · 98 reviews"],
  ["Mac and Cheese", 6, "Three-cheese, baked", "★ 4.8 · 77 reviews"],
  ["Peach Cobbler", 7, "With vanilla ice cream", "★ 4.9 · 64 reviews", true],
];

/** [name, brand, price, category, fit, sizes in stock] */
export const PRODUCTS: [string, string, number, string, string, (number | string)[]][] = [
  ["Slim Stretch Jeans", "Denim District", 59, "Jeans", "Slim", [28, 30, 32, 34, 36]],
  ["Relaxed Carpenter Jeans", "Denim District", 64, "Jeans", "Relaxed", [30, 32, 34, 36]],
  ["Straight Selvedge Jeans", "Harbor & Pine", 89, "Jeans", "Straight", [30, 32, 34]],
  ["Skinny Black Jeans", "Urban Loom", 49, "Jeans", "Skinny", [28, 30, 34]],
  ["Slim Taper Jeans", "Urban Loom", 54, "Jeans", "Slim", [30, 34, 36]],
  ["Linen Camp Shirt", "Harbor & Pine", 48, "Shirts", "Regular", ["S", "M", "L"]],
  ["Heavyweight Pocket Tee", "Urban Loom", 32, "Shirts", "Regular", ["S", "M", "L"]],
];

export const SCRIPTS: Record<PlayerKey, { title: string; sub: string; scenes: [string, SceneKind][] }> = {
  overview: {
    title: "Nipige in 30 seconds",
    sub: "Platform overview",
    scenes: [
      ["Pick a marketplace: restaurant or fashion.", "pick"],
      ["Your customers order from a storefront with your brand.", "phone"],
      ["Restaurants and brands run orders from their own panel.", "panel"],
      ["You run the whole marketplace from one owner console.", "admin"],
      ["Live in 14 days. $0 platform fees, forever.", "end"],
    ],
  },
  restaurant: {
    title: "Restaurant marketplace in 1 minute",
    sub: "Customer, restaurant, kitchen, delivery, owner",
    scenes: [
      ["A customer in Austin orders dinner from your storefront.", "phone"],
      ["The restaurant accepts it. The kitchen display lights up.", "panel"],
      ["A delivery agent picks it up. The customer tracks it live.", "map"],
      ["You see every order from online, counter and dine-in.", "admin"],
      ["Your restaurant marketplace, live in 14 days.", "end"],
    ],
  },
  fashion: {
    title: "Fashion marketplace walkthrough",
    sub: "Customer, seller, hub, delivery, owner",
    scenes: [
      ["A shopper filters jeans by size and fit.", "phone"],
      ["Two brands ship their items to your hub.", "panel"],
      ["One combined delivery reaches the customer.", "map"],
      ["You see every sale and the commission you earn.", "admin"],
      ["Your multi-brand fashion store, live in 14 days.", "end"],
    ],
  },
};
export type SceneKind = "pick" | "phone" | "panel" | "admin" | "map" | "end";


export const FAQS: [string, string][] = [
  ["Do I need to sign up?", "No. The demo keys sign you straight in. You only fill a form if you want a call."],
  ["Can I break something?", "No. Payments run in test mode, messages are off, and settings like passwords, domains, currency and integrations are turned off. Demo data resets regularly."],
  ["Will other visitors see what I do?", "They might. Everyone shares one demo store, so the kitchen display and order lists can show other visitors’ test orders. Your own order is always marked “Your order”."],
  ["Why can’t I try the delivery agent app?", "It’s a mobile app that has to be installed on a phone, so it isn’t part of this web demo. In the tour, once the order is ready, you watch what happens next: a delivery agent accepts the job, picks it up and delivers it with the customer’s 6-digit code."],
  ["Is this the real product?", "Yes. These are the same storefront, seller panel and owner console your marketplace launches with, loaded with demo data."],
  ["Why are some features locked?", "Payments, payouts, taxes, integrations and account setup need your details, so they unlock once we set up your own marketplace."],
  ["Can I try the mobile apps?", "Not in the self-demo, because apps have to be installed on a phone. Every persona has a native iOS and Android app: customer, restaurant or seller, and delivery agent. Ask our team to see them live. They come with Growth plans and above."],
];

export const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
