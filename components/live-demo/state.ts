import { D, FSIM, PRODUCTS, REST_MENU, RESTS, RSIM, type MarketId, type Role, type ScreenId, type TourStep } from "./data";

export type View = "welcome" | "app";

export interface FCartItem {
  p: number;
  size: number | string;
  color: string;
  /** The item "saved earlier" from a second brand, so every fashion order spans two brands. */
  seed?: boolean;
}

export interface Track {
  source: string;
  campaign: string;
  videos: Set<string>;
  roles: Set<string>;
  maxStep: number;
  locked: Set<string>;
  markets: Set<string>;
  bonus: Set<string>;
  started: number;
}

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a));

/** Per-market session state; reset whenever the visitor switches market or restarts the tour. */
export const fresh = () => ({
  screen: null as ScreenId | null,
  cart: [] as number[],
  fulfil: "Delivery",
  tip: 18,
  coupon: false,
  placed: false,
  accepted: false,
  plated: [] as number[],
  ready: false,
  sim: -1,
  rest: 0,
  cuisine: "All",
  seated: false,
  table: null as number | null,
  check: [] as number[],
  sent: false,
  resvBooked: false,
  resvSeated: false,
  guests: 4,
  rday: "Fri",
  rtime: "7:00 PM",
  mkt: false,
  fit: "Any",
  size: null as number | null,
  prod: 0,
  color: "Indigo",
  fsize: 32,
  wish: false,
  fcart: [{ p: 5, size: "M", color: "White", seed: true }] as FCartItem[],
  fdel: "Combined",
  fcoupon: false,
  fplaced: false,
  sAccepted: false,
  sShipped: false,
  received: false,
  dispatched: false,
  fsim: -1,
  retReq: false,
  retOk: false,
  orderNo: "#" + rnd(4820, 4990),
  fOrderNo: "#TL-" + rnd(5200, 5990),
  code: String(rnd(100000, 999999)),
});

export type Store = ReturnType<typeof fresh> & {
  view: View;
  market: MarketId | null;
  role: Role;
  signed: boolean;
  touring: boolean;
  tourKey: string;
  step: number;
  track: Track;
};

export const initialStore = (): Store => ({
  view: "welcome",
  market: null,
  role: "customer",
  signed: false,
  touring: false,
  tourKey: "main",
  step: 0,
  ...fresh(),
  track: {
    source: "direct",
    campaign: "",
    videos: new Set(),
    roles: new Set(),
    maxStep: 0,
    locked: new Set(),
    markets: new Set(),
    bonus: new Set(),
    started: Date.now(),
  },
});

export const M = (s: Store) => D[s.market || "restaurant"];
export const isR = (s: Store) => (s.market || "restaurant") === "restaurant";
export const steps = (s: Store): TourStep[] =>
  s.tourKey === "main" ? M(s).tour : M(s).bonus[s.tourKey].steps;
export const cartTotal = (s: Store) => s.cart.reduce((a, i) => a + REST_MENU[i][1], 0);
export const fTotal = (s: Store) => s.fcart.reduce((a, c) => a + PRODUCTS[c.p][2], 0);

/* The tour never names a product. Screens follow whatever the visitor actually picked. */
export const restName = (s: Store) => RESTS[s.rest][0];
export const pname = (c: FCartItem) => PRODUCTS[c.p][0];
/** Items the visitor added themselves (not the seeded "saved earlier" one). */
export const myF = (s: Store) => s.fcart.filter((c) => !c.seed);
const seedItem = (s: Store) => s.fcart.find((c) => c.seed);
/** The seller the visitor plays: the brand of the first item they added (or of the product they're looking at). */
export const sellerName = (s: Store) => PRODUCTS[(myF(s)[0] || { p: s.prod }).p][1];
/** Brands in the cart, with the visitor's seller last. */
export const brands = (s: Store) => {
  const b = Array.from(new Set(s.fcart.map((c) => PRODUCTS[c.p][1])));
  const me = sellerName(s);
  return [...b.filter((x) => x !== me), ...b.filter((x) => x === me)];
};
export const mySellerItems = (s: Store) => myF(s).filter((c) => PRODUCTS[c.p][1] === sellerName(s));

/** Keep the seeded item on a different brand from the visitor's pick, so the order always spans two brands. */
export function fixSeed(d: Store) {
  const b = sellerName(d);
  const sd = seedItem(d);
  if (sd && PRODUCTS[sd.p][1] === b) sd.p = PRODUCTS.findIndex((x) => x[3] === "Shirts" && x[1] !== b);
}
/** Make sure the visitor has an item of their own in the cart (used when a tour step is skipped). */
export function addMine(d: Store) {
  if (!myF(d).length) {
    const z = PRODUCTS[d.prod][5];
    d.fcart.push({ p: d.prod, size: z.includes(d.fsize) ? d.fsize : z[0], color: d.color });
  }
  fixSeed(d);
}

/** Context line under a tour tip: what the visitor has picked so far. */
export function tipCtx(s: Store) {
  if (s.tourKey !== "main") return "";
  if (isR(s)) {
    const d = s.cart.map((i) => REST_MENU[i][0]).join(", ");
    if (s.placed) return `Your order ${s.orderNo}: ${d} from ${restName(s)}`;
    if (s.cart.length) return `In your cart: ${d} from ${restName(s)}`;
    return s.step >= 1 ? `Ordering from ${restName(s)}` : "";
  }
  const my = myF(s)
    .map((c) => `${pname(c)} (${PRODUCTS[c.p][1]})`)
    .join(", ");
  const sd = seedItem(s);
  const sdt = sd ? ` + ${pname(sd)} (${PRODUCTS[sd.p][1]})` : "";
  if (s.fplaced) return `Your order ${s.fOrderNo}: ${my}${sdt}`;
  if (my) return `In your cart: ${my}${sdt}`;
  return s.step >= 1 ? `Looking at: ${PRODUCTS[s.prod][0]} (${PRODUCTS[s.prod][1]})` : "";
}

/** When someone presses Next without doing a step, fill in what that step would have done so later screens make sense.
 *  Returns true when a running delivery simulation has to be stopped. */
export function prep(d: Store, i: number): boolean {
  let stop = false;
  if (d.tourKey === "main") {
    if (isR(d)) {
      if (i >= 2 && !d.cart.length) d.cart = [0];
      if (i >= 3) d.placed = true;
      if (i >= 4) d.accepted = true;
      if (i >= 5) {
        d.plated = d.cart.map((_, j) => j);
        d.ready = true;
      }
      if (i >= 6 && d.sim < RSIM.length - 1) {
        stop = true;
        d.sim = RSIM.length - 1;
      }
    } else {
      if (i >= 2) addMine(d);
      if (i >= 3) d.fplaced = true;
      if (i >= 4) {
        d.sAccepted = true;
        d.sShipped = true;
      }
      if (i >= 5) d.received = true;
      if (i >= 6) {
        d.dispatched = true;
        if (d.fsim < FSIM.length - 1) {
          stop = true;
          d.fsim = FSIM.length - 1;
        }
      }
    }
  } else if (d.tourKey === "reserve" && i >= 1) d.resvBooked = true;
  else if (d.tourKey === "dinein" && i >= 1 && !d.seated) {
    d.seated = true;
    d.table = 1;
  }
  else if (d.tourKey === "returns" && i >= 1) d.retReq = true;
  return stop;
}

/** Point the store at the current tour step: role, screen, and the state that step expects. */
export function applyStep(d: Store): boolean {
  const t = steps(d)[d.step];
  const stop = prep(d, d.step);
  d.role = t[1];
  d.screen = t[2];
  d.track.roles.add(M(d).roles[t[1]].app);
  if (d.tourKey === "main") d.track.maxStep = Math.max(d.track.maxStep, d.step + 1);
  return stop;
}

/** Keep the current screen valid for the current role (the prototype did this on every render). */
export function normalize(d: Store) {
  const k = M(d).roles[d.role];
  if (!d.screen || !k.screens.includes(d.screen)) d.screen = k.screens[0];
  if (d.view === "app" && d.screen === "r_checkout" && !d.cart.length) d.cart = [0];
}
