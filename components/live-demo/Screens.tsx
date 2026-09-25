"use client";

import type { ReactNode } from "react";
import {
  FSIM,
  G,
  PRODUCTS,
  REST_MENU,
  RESTS,
  RSIM,
  money,
  type ArtName,
  type ScreenId,
} from "./data";
import { brands, cartTotal, fTotal, isR, M, mySellerItems, pname, restName, sellerName, type Store } from "./state";
import { Art, HeartIcon, LockIcon } from "./icons";

export interface ScreenCtx {
  s: Store;
  act: (a: string, v?: string | number) => void;
  /** Returns " hl" when this element is the current tour step's target. */
  hl: (t: string) => string;
}

/* ---------------------------- small building blocks ---------------------------- */

const H = ({ t, sub }: { t: string; sub: string }) => (
  <>
    <h1>{t}</h1>
    <p className="sub">{sub}</p>
  </>
);

const Thumb = ({ i, art, ratio }: { i: number; art: ArtName; ratio?: string }) => (
  <div className="thumb" style={{ background: G[i % G.length], ...(ratio ? { aspectRatio: ratio } : {}) }} aria-hidden="true">
    <Art name={art} />
  </div>
);

type Tone = "g" | "a" | "r" | "p" | "";
const B = ({ tone = "", children }: { tone?: Tone; children: ReactNode }) => (
  <span className={`b${tone ? " " + tone : ""}`}>{children}</span>
);
const YOU = <B tone="p">Your order</B>;

export function Table({ head, rows, className = "" }: { head: string[]; rows: ReactNode[][]; className?: string }) {
  return (
    <div className={`tblw${className}`}>
      <table className="tbl">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Kpis({ items, className = "" }: { items: [string, string, string?][]; className?: string }) {
  return (
    <div className={`kg${className}`}>
      {items.map((x) => (
        <div key={x[0]} className="ld-st">
          <span>{x[0]}</span>
          <b>{x[1]}</b>
          <small>{x[2] || ""}</small>
        </div>
      ))}
    </div>
  );
}

function Seg<T extends string | number>({
  ctx,
  act,
  opts,
  cur,
  label,
}: {
  ctx: ScreenCtx;
  act: string;
  opts: T[];
  cur: T;
  label?: (o: T) => string;
}) {
  return (
    <div className="seg">
      {opts.map((o) => (
        <button key={String(o)} aria-pressed={String(cur) === String(o)} onClick={() => ctx.act(act, o)}>
          {label ? label(o) : o}
        </button>
      ))}
    </div>
  );
}

function Timeline({ steps, done }: { steps: string[]; done: number }) {
  return (
    <ol className="timeline">
      {steps.map((s, i) => (
        <li key={s} className={i < done ? "d" : ""}>
          <i />
          {s}
        </li>
      ))}
    </ol>
  );
}

const Hr = () => <hr style={{ border: 0, borderTop: "1px solid var(--border)", width: "100%" }} />;
const Row2 = ({ l, r, meta }: { l: ReactNode; r: ReactNode; meta?: boolean }) => (
  <div className={`spread${meta ? " meta" : ""}`}>
    <span>{l}</span>
    <span>{r}</span>
  </div>
);

/* ---------------------------- delivery agent preview ---------------------------- */

function DriverPhone({
  list,
  idx,
  code,
  job,
}: {
  list: string[];
  idx: number;
  code: string;
  job: { app: string; title: string; from: string; to: string; payLabel: string; pay: string };
}) {
  const codeAt = list.indexOf("Delivery code checked");
  const filled = idx >= codeAt ? 6 : idx === codeAt - 1 ? 3 : 0;
  return (
    <div className="dphone" aria-label="Delivery agent app preview">
      <div className="nb" />
      <div className="hd">
        <b>Nipige {job.app}</b>
        <span className="pill">{idx < 0 ? "Online" : idx >= list.length - 1 ? "Job done" : "On a job"}</span>
      </div>
      <div className="job">
        <b>{job.title}</b>
        <span>{job.from}</span>
        <span>To {job.to}</span>
        <div className="earn">
          <span>{job.payLabel}</span>
          <span>{job.pay}</span>
        </div>
      </div>
      <ol className="dsteps">
        {list.map((s, i) => (
          <li key={s} className={i < idx ? "d" : i === idx ? "now" : ""}>
            <i />
            {s}
          </li>
        ))}
      </ol>
      <div>
        <span style={{ fontSize: 11.5, color: "var(--ink-muted)" }}>Customer’s delivery code</span>
        <div className="dcode">
          {code.split("").map((d, i) => (
            <span key={i} className={i < filled ? "f" : ""}>
              {i < filled ? d : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimPanel({ ctx, kind, t, readyOK, waitMsg }: { ctx: ScreenCtx; kind: "r" | "f"; t: string; readyOK: boolean; waitMsg: string }) {
  const { s } = ctx;
  const r = kind === "r";
  const idx = r ? s.sim : s.fsim;
  const list = r ? RSIM : FSIM;
  const done = idx >= list.length - 1;
  const job = r
    ? {
        app: "Delivery",
        title: `${s.orderNo} · ${restName(s)}`,
        from: `Pick up: ${restName(s)}`,
        to: "1100 S Congress Ave",
        payLabel: "Pay + tip",
        pay: money(6.5 + (cartTotal(s) * s.tip) / 100),
      }
    : {
        app: "Delivery",
        title: `${s.fOrderNo} · 1 parcel, ${brands(s).length} brands`,
        from: `Pick up: ${M(s).brand} hub`,
        to: "1100 S Congress Ave",
        payLabel: "Guaranteed pay",
        pay: "$7.50",
      };
  return (
    <div className={`panel${ctx.hl(t)}`}>
      <div className="drv">
        <DriverPhone list={list} idx={idx} code={s.code} job={job} />
        <div>
          <B tone="p">Delivery agent app · mobile preview</B>
          <h3>What happens next: the delivery</h3>
          <div className="row" style={{ margin: "6px 0 14px" }}>
            {!readyOK ? (
              <>
                <button className="ld-btn ld-btn-line" disabled>
                  Play the delivery
                </button>
                <span className="meta">{waitMsg}</span>
              </>
            ) : done ? (
              <>
                <B tone="g">Delivered</B>
                <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => ctx.act("replay", kind)}>
                  Replay
                </button>
              </>
            ) : idx >= 0 ? (
              <button className="ld-btn ld-btn-line" disabled>
                Delivering…
              </button>
            ) : (
              <button className="ld-btn ld-btn-primary" onClick={() => ctx.act("sim", kind)}>
                Play the delivery
              </button>
            )}
          </div>
          <p className="meta">
            This part runs on the Nipige Delivery app on the agent’s phone, so it isn’t in the web demo. In your live business,{" "}
            {r
              ? "nearby delivery agents get the job as a push notification the moment the kitchen marks it ready"
              : "nearby delivery agents get the job the moment you dispatch it from your hub"}
            . They see what they’ll earn, accept it, pick it up and deliver it. The job only closes when the customer’s 6-digit code matches.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- screens ---------------------------- */

function RHome(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const list = RESTS.map((r, i) => [r, i] as const).filter(([r]) => s.cuisine === "All" || r[1] === s.cuisine);
  return (
    <>
      <H t="Restaurants near you" sub="Delivering to 1100 S Congress Ave, Austin, TX" />
      <div className="chips">
        {["All", "BBQ", "Tex-Mex", "Vietnamese", "Pizza", "Vegan"].map((c) => (
          <button key={c} className="chip" aria-pressed={s.cuisine === c} onClick={() => act("cuisine", c)}>
            {c}
          </button>
        ))}
      </div>
      <div className={`pgrid${hl("pick")}`}>
        {list.map(([r, i]) => (
          <div key={r[0]} className="card">
            <button className="card-open" onClick={() => act("rest", i)}>
              <Thumb i={i} art="food" />
              <b>{r[0]}</b>
              <span className="meta">
                {r[1]} · {r[2]}
              </span>
            </button>
            <div className="spread">
              <B>★ {r[3]}</B>
              {i === 0 && <B tone="p">Free delivery</B>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RMenu(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const r = RESTS[s.rest] || RESTS[0];
  return (
    <>
      <div className="panel" style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ width: 110 }}>
          <Thumb i={s.rest} art="food" ratio="1/1" />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0 }}>{r[0]}</h1>
          <p className="sub" style={{ margin: "4px 0 0" }}>
            {r[1]} · {r[2]} · ★ {r[3]}
          </p>
        </div>
        <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("goto", "r_checkout")}>
          Cart ({s.cart.length})
        </button>
      </div>
      <div className={hl("add").trim()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {REST_MENU.map((x, i) => (
          <div key={x[0]} className="panel spread">
            <div className="row">
              <div style={{ width: 72 }}>
                <Thumb i={i + 2} art="food" ratio="1/1" />
              </div>
              <div>
                <b>{x[0]}</b>
                <br />
                <span className="meta">{x[2]}</span>
                <br />
                <span className="meta">{x[3]}</span>
              </div>
            </div>
            <div className="row">
              <b>{money(x[1])}</b>
              {x[4] ? (
                <B tone="r">Sold out</B>
              ) : (
                <button className="ld-btn ld-btn-primary ld-btn-sm" onClick={() => act("add", i)}>
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RCheckout(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const sub = cartTotal(s);
  const disc = s.coupon ? sub * 0.1 : 0;
  const tip = ((sub - disc) * s.tip) / 100;
  const fee = s.fulfil === "Delivery" ? 1.99 : 0;
  const tax = (sub - disc) * 0.0825;
  const tot = sub - disc + tip + fee + tax;
  return (
    <>
      <H t="Checkout" sub="Test payment in the demo. No card is charged." />
      <div className={`two${hl("place")}`}>
        <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <fieldset>
            <legend>How do you want it?</legend>
            <Seg ctx={ctx} act="fulfil" opts={["Delivery", "Pickup", "Curbside"]} cur={s.fulfil} />
          </fieldset>
          {s.fulfil === "Delivery" && <p className="meta">Leave it at my door · 1100 S Congress Ave, Austin, TX 78704</p>}
          <fieldset>
            <legend>When?</legend>
            <div className="seg">
              <button aria-pressed="true">As soon as possible</button>
              <button onClick={() => act("view")}>Schedule for later</button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Tip {s.fulfil === "Delivery" ? "your delivery agent" : "the team"}</legend>
            <Seg ctx={ctx} act="tip" opts={[15, 18, 20, 25]} cur={s.tip} label={(t) => `${t}%`} />
          </fieldset>
          <div className="spread">
            <span>
              <b>Coupon</b>
              <br />
              <span className="meta">Try DEMO10 for 10% off</span>
            </span>
            <button className={`ld-btn ${s.coupon ? "ld-btn-dark" : "ld-btn-line"} ld-btn-sm`} onClick={() => act("coupon")}>
              {s.coupon ? "DEMO10 applied" : "Apply DEMO10"}
            </button>
          </div>
          <div className="f">
            <label htmlFor="pay">Payment</label>
            <select id="pay">
              <option>Test card ending 4242</option>
            </select>
          </div>
        </div>
        <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {s.cart.map((i, j) => (
            <Row2 key={j} l={REST_MENU[i][0]} r={money(REST_MENU[i][1])} />
          ))}
          <Hr />
          {s.coupon && <Row2 meta l="DEMO10" r={`−${money(disc)}`} />}
          <Row2 meta l="Delivery fee" r={money(fee)} />
          <Row2 meta l={`Tip (${s.tip}%)`} r={money(tip)} />
          <Row2 meta l="Texas sales tax" r={money(tax)} />
          <div className="spread">
            <b>Total</b>
            <b style={{ fontSize: 20 }}>{money(tot)}</b>
          </div>
          <button className="ld-btn ld-btn-primary" onClick={() => act("place")}>
            {s.placed ? "Order placed" : "Place order"}
          </button>
          <span className="meta">Free cancellation until the restaurant starts cooking.</span>
        </div>
      </div>
    </>
  );
}

function RTrack(ctx: ScreenCtx) {
  const { s, act } = ctx;
  if (!s.placed)
    return (
      <>
        <H t="Track your order" sub="Place an order to track it here." />
        <button className="ld-btn ld-btn-primary" onClick={() => act("goto", "r_home")}>
          Browse restaurants
        </button>
      </>
    );
  const st = ["Order placed", "Restaurant accepted", "Ready for pickup", "Delivery agent picked it up", "Delivered"];
  const d = s.sim >= 6 ? 5 : s.sim >= 3 ? 4 : s.ready ? 3 : s.accepted ? 2 : 1;
  const status =
    s.sim >= 6 ? "Delivered" : s.sim >= 3 ? "Arriving in 6 min" : s.sim >= 1 ? "Delivery agent heading to the restaurant" : s.ready ? "Waiting for a delivery agent" : "Being prepared";
  return (
    <>
      <H t="Track your order" sub={`Order ${s.orderNo} from ${restName(s)} · ${s.fulfil}`} />
      <div className="two" style={{ marginBottom: 20 }}>
        <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Timeline steps={st} done={d} />
          <div className="codebox">
            <span>
              <b>Your delivery code</b>
              <br />
              <span className="meta">Give it to the delivery agent at the door.</span>
            </span>
            <code>{s.code}</code>
          </div>
        </div>
        <div className="map" role="img" aria-label="Map of your order" style={{ height: "auto", minHeight: 220 }}>
          <span className="pin" style={{ left: "22%", top: "62%" }} />
          <span className="pin alt" style={{ left: "70%", top: "28%" }} />
          <span className="b p" style={{ position: "absolute", left: 12, top: 12 }}>
            {status}
          </span>
        </div>
      </div>
      <SimPanel ctx={ctx} kind="r" t="drive" readyOK={s.ready} waitMsg="The kitchen marks it Ready first. Then a delivery agent takes it." />
    </>
  );
}

function RTable(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  return (
    <>
      <H t="Book a table" sub={restName(s)} />
      <div className={`panel${hl("resv")}`} style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 18 }}>
        <fieldset>
          <legend>Guests</legend>
          <Seg ctx={ctx} act="guests" opts={[2, 4, 6]} cur={s.guests} />
        </fieldset>
        <fieldset>
          <legend>Day</legend>
          <Seg ctx={ctx} act="rday" opts={["Fri", "Sat", "Sun"]} cur={s.rday} />
        </fieldset>
        <fieldset>
          <legend>Time</legend>
          <Seg ctx={ctx} act="rtime" opts={["6:30 PM", "7:00 PM", "7:30 PM"]} cur={s.rtime} />
        </fieldset>
        <div className="f">
          <label htmlFor="area">Seating area</label>
          <select id="area">
            <option>No preference</option>
            <option>Patio</option>
            <option>Main room</option>
          </select>
        </div>
        <button className="ld-btn ld-btn-primary" onClick={() => act("resv")}>
          {s.resvBooked ? `Booked: ${s.guests} guests, ${s.rday} at ${s.rtime}` : "Book table"}
        </button>
      </div>
    </>
  );
}

function CAccount(ctx: ScreenCtx) {
  const { s, act } = ctx;
  const rows: [string, string, string, string][] = [
    ["Saved addresses", "Home · 1100 S Congress Ave, Austin, TX", "view", "View"],
    ["Change password", "Shared demo account", "blocked", "Change"],
    ["Download my data", "Copy of your account data", "blocked", "Download"],
    ["Delete my account", "Permanently delete this account", "blocked", "Delete"],
    [isR(s) ? "Sell on this store" : "Apply as a seller", "Open your own store on this marketplace", "lock", "Apply"],
  ];
  return (
    <>
      <H t="My account" sub="Demo Customer · customer@demo" />
      <p className="note-inline">This account is shared by every demo visitor, so password and account changes are turned off.</p>
      <div className="panel" style={{ maxWidth: 720, padding: "6px 20px" }}>
        {rows.map((r) => (
          <div key={r[0]} className="acct">
            <span>
              <b>{r[0]}</b>
              <span className="meta">{r[1]}</span>
            </span>
            <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act(r[2], r[0])}>
              {r[2] === "lock" && <LockIcon />} {r[3]}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function ROrders(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const mine = s.placed;
  return (
    <>
      <H t="Orders" sub={`${restName(s)} · Open until 10 PM`} />
      <p className="note-inline">Other demo visitors’ test orders show up here too. Yours is marked.</p>
      <Kpis
        items={[
          ["Orders today", String(38 + (mine ? 1 : 0))],
          ["Sales today", "$" + (1642 + (mine ? Math.round(cartTotal(s)) : 0)).toLocaleString()],
          ["Avg prep time", "14 min"],
          ["Rating", "4.8 ★"],
        ]}
      />
      <div className="tickets" style={{ marginTop: 20 }}>
        {mine ? (
          <div className={`ticket${s.accepted ? "" : " new"}${hl("accept")}`}>
            <div className="spread">
              <b>
                {s.orderNo} · {s.fulfil}
              </b>
              {YOU}
            </div>
            <ul>
              {s.cart.map((i, j) => (
                <li key={j}>{REST_MENU[i][0]}</li>
              ))}
            </ul>
            <span className="meta">
              Tip {s.tip}% · {s.accepted ? (s.ready ? "Ready for pickup" : "In the kitchen") : "Waiting for you"}
            </span>
            {s.accepted ? (
              <button className="ld-btn ld-btn-line" onClick={() => act("goto", "r_kds")}>
                Open Kitchen Display
              </button>
            ) : (
              <div className="row">
                <button className="ld-btn ld-btn-primary" style={{ flex: 1 }} onClick={() => act("accept")}>
                  Accept
                </button>
                <button className="ld-btn ld-btn-line" onClick={() => act("view")}>
                  Decline
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`ticket${hl("accept")}`}>
            <b>No order from you yet</b>
            <span className="meta">Place one as the customer and it lands here.</span>
            <button className="ld-btn ld-btn-line" onClick={() => act("goto", "r_orders")}>
              Refresh
            </button>
          </div>
        )}
        <div className="ticket">
          <div className="spread">
            <b>#4811 · Pickup</b>
            <B tone="a">Ready</B>
          </div>
          <ul>
            <li>Burnt Ends</li>
            <li>Mac and Cheese x2</li>
          </ul>
          <span className="meta">Another visitor</span>
        </div>
        <div className="ticket">
          <div className="spread">
            <b>#4810 · Delivery</b>
            <B>Out for delivery</B>
          </div>
          <ul>
            <li>Pulled Pork Sandwich</li>
          </ul>
          <span className="meta">Delivery agent: Dana K.</span>
        </div>
      </div>
    </>
  );
}

function RKds(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const mine = s.placed && s.accepted;
  const all = s.cart.length > 0 && s.cart.every((_, j) => s.plated.includes(j));
  return (
    <>
      <H t="Kitchen Display" sub="Live tickets · Promised prep time 15 min" />
      <div className="tickets">
        {mine ? (
          <div className={`ticket ${s.ready ? "done" : "new"}${hl("ready")}`}>
            <div className="spread">
              <b>{s.orderNo}</b>
              {YOU}
            </div>
            <span className="meta">{s.ready ? "Ready for pickup" : "Preparing · 3 min · due in 12 min"}</span>
            <div>
              {s.cart.map((i, j) => (
                <div key={j} className="plate">
                  <span>{REST_MENU[i][0]}</span>
                  <button aria-pressed={s.plated.includes(j)} disabled={s.ready} onClick={() => act("plate", j)}>
                    {s.plated.includes(j) ? "Plated" : "Mark plated"}
                  </button>
                </div>
              ))}
            </div>
            {s.ready ? (
              <>
                <B tone="g">Ready for pickup</B>
                <span className="meta">Next: a delivery agent takes this job in the Nipige Delivery app (mobile) and delivers it.</span>
              </>
            ) : (
              <button className="ld-btn ld-btn-primary" disabled={!all} onClick={() => act("ready")}>
                {all ? "Ready for pickup" : "Plate every item first"}
              </button>
            )}
            <button className="ld-btn ld-btn-ghost ld-btn-sm" onClick={() => act("view")}>
              +5 min
            </button>
          </div>
        ) : (
          <div className={`ticket${hl("ready")}`}>
            <b>Your order isn’t in the kitchen yet</b>
            <span className="meta">Accept it in Orders first.</span>
            <button className="ld-btn ld-btn-line" onClick={() => act("goto", "r_orders")}>
              Go to Orders
            </button>
          </div>
        )}
        <div className="ticket">
          <div className="spread">
            <b>#4809 · Dine-in T3</b>
            <B tone="a">Overdue 2 min</B>
          </div>
          <ul>
            <li>Brisket Plate x2</li>
            <li>Peach Cobbler</li>
          </ul>
          <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("view")}>
            Acknowledge
          </button>
        </div>
        <div className="ticket">
          <div className="spread">
            <b>#4808 · Counter</b>
            <B>Ordered</B>
          </div>
          <ul>
            <li>Burnt Ends</li>
          </ul>
          <span className="meta">Callout: Sam</span>
        </div>
      </div>
      <p className="note-inline" style={{ marginTop: 18 }}>
        Pause new orders and busy mode are turned off in the shared demo so one visitor can’t stop orders for everyone.
      </p>
    </>
  );
}

function RFloor(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const base: Record<number, string> = { 2: "occ", 3: "occ", 6: "bill" };
  const tabs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => [n, s.table === n ? "occ" : base[n] || ""] as const);
  return (
    <>
      <H t="Floor" sub="Main room · Plan view" />
      <Kpis
        items={[
          ["Free tables", String(tabs.filter((t) => !t[1]).length)],
          ["Covers now", String(9 + (s.seated ? 4 : 0))],
          ["Open checks", String(3 + (s.seated ? 1 : 0))],
          ["Bill requested", "1"],
        ]}
      />
      <div className="two" style={{ marginTop: 20 }}>
        <div className={`floor${hl("seat")}`}>
          {tabs.map(([n, st]) => (
            <button key={n} className={`tt ${st}`} onClick={() => act(!st && !s.seated ? "seat" : "view", n)}>
              <b>T{n}</b>
              <span>{s.table === n ? "4 covers · you" : st === "occ" ? "Occupied" : st === "bill" ? "Bill requested" : "Free · 4 seats"}</span>
            </button>
          ))}
        </div>
        <div className={`panel${hl("send")}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {s.seated ? (
            <>
              <div className="spread">
                <b>Table {s.table} check</b>
                <B tone="p">4 covers</B>
              </div>
              <div className="chips" style={{ margin: 0 }}>
                {REST_MENU.map((x, i) =>
                  x[4] ? null : (
                    <button key={x[0]} className="chip" onClick={() => act("chk", i)}>
                      + {x[0]}
                    </button>
                  )
                )}
              </div>
              {s.check.length ? (
                s.check.map((i, j) => <Row2 key={j} l={REST_MENU[i][0]} r={money(REST_MENU[i][1])} />)
              ) : (
                <span className="meta">Tap a dish to add it to the check.</span>
              )}
              <button className="ld-btn ld-btn-primary" disabled={!s.check.length || s.sent} onClick={() => act("send")}>
                {s.sent ? "Sent to the kitchen" : "Send to kitchen"}
              </button>
              <button className="ld-btn ld-btn-line" onClick={() => act("view")}>
                Move or merge table
              </button>
            </>
          ) : (
            <>
              <b>Pick a free table</b>
              <span className="meta">Tap any free table to seat guests and open a check.</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function RResv(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const rows: ReactNode[][] = [
    ["6:30 PM", "Priya N.", "2", "RSV-2231", <B key="s" tone="g">Seated</B>, ""],
    [
      s.rtime,
      <span key="g">Demo Guest {YOU}</span>,
      String(s.guests),
      "RSV-2240",
      s.resvBooked ? (
        s.resvSeated ? (
          <B key="s" tone="g">Seated</B>
        ) : (
          <B key="s" tone="a">Upcoming</B>
        )
      ) : (
        <B key="s">Not booked yet</B>
      ),
      s.resvBooked && !s.resvSeated ? (
        <button key="b" className="ld-btn ld-btn-primary ld-btn-sm" onClick={() => act("seatr")}>
          Seat guests
        </button>
      ) : (
        ""
      ),
    ],
    ["8:15 PM", "Jordan P.", "6", "RSV-2244", <B key="s" tone="a">Upcoming</B>, ""],
  ];
  return (
    <>
      <H t="Reservations" sub={`${s.rday} · ${restName(s)}`} />
      <Table head={["Time", "Guest", "Covers", "Reference", "Status", ""]} rows={rows} className={hl("seatr")} />
    </>
  );
}

function RMenuAdm(ctx: ScreenCtx) {
  const { s, act } = ctx;
  return (
    <>
      <H t="Menu items" sub={restName(s)} />
      <p className="note-inline">Editing the menu is view only in the shared demo. In your own marketplace you edit it freely.</p>
      <Table
        head={["Item", "Price", "Prep time", "Available", ""]}
        rows={REST_MENU.map((x, i) => [
          x[0],
          money(x[1]),
          `${8 + i * 2} min`,
          x[4] ? <B tone="r">Sold out</B> : <B tone="g">On</B>,
          <button key="e" className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("view")}>
            Edit
          </button>,
        ])}
      />
    </>
  );
}

function FSearch(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const list = PRODUCTS.map((p, i) => [p, i] as const).filter(
    ([p]) => p[3] === "Jeans" && (s.fit === "Any" || p[4] === s.fit) && (!s.size || p[5].includes(s.size))
  );
  return (
    <>
      <H t="Search" sub="Threadline · Delivering to Austin, TX" />
      <div className={hl("filter").trim()}>
        <div className="srch">
          <input value="jeans" aria-label="Search" readOnly />
          <select aria-label="Sort" className="ld-btn ld-btn-line ld-btn-sm" style={{ minHeight: 48 }}>
            <option>Sort: Relevance</option>
            <option>Price low to high</option>
            <option>Rating</option>
          </select>
        </div>
        <div className="fl">
          <span>Size</span>
          {[28, 30, 32, 34, 36].map((z) => (
            <button key={z} className="chip" aria-pressed={s.size === z} onClick={() => act("size", z)}>
              {z}
            </button>
          ))}
        </div>
        <div className="fl">
          <span>Fit</span>
          {["Any", "Slim", "Straight", "Relaxed", "Skinny"].map((f) => (
            <button key={f} className="chip" aria-pressed={s.fit === f} onClick={() => act("fit", f)}>
              {f}
            </button>
          ))}
        </div>
        <p className="meta" style={{ margin: "4px 0 14px" }}>
          {list.length} results{s.size ? ` in size ${s.size}` : ""}
          {s.fit !== "Any" ? ` · ${s.fit} fit` : ""}
        </p>
        <div className="pgrid">
          {list.length ? (
            list.map(([p, i]) => (
              <div key={p[0]} className="card">
                <button className="card-open" onClick={() => act("fopen", i)}>
                  <Thumb i={i + 1} art="shirt" />
                  <b>{p[0]}</b>
                  <span className="meta">
                    {p[1]} · {p[4]} fit
                  </span>
                </button>
                <div className="spread">
                  <b>{money(p[2])}</b>
                  {i === 0 && <B tone="p">Best seller</B>}
                </div>
              </div>
            ))
          ) : (
            <p className="meta">No jeans match. Clear a filter.</p>
          )}
        </div>
      </div>
    </>
  );
}

function FProduct(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const p = PRODUCTS[s.prod];
  const sizes = p[3] === "Jeans" ? [28, 30, 32, 34, 36] : [];
  return (
    <div className="two">
      <div style={{ display: "grid", gap: 10 }}>
        <Thumb i={s.prod + 1} art="shirt" ratio="4/3" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[2, 3, 4].map((i) => (
            <Thumb key={i} i={s.prod + i} art="shirt" ratio="1/1" />
          ))}
        </div>
      </div>
      <div className={`panel${hl("fadd")}`} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="spread">
          <span className="meta">
            Sold by <b>{p[1]}</b>
          </span>
          <B>★ 4.7 · 186 reviews</B>
        </div>
        <h1 style={{ margin: 0 }}>{p[0]}</h1>
        <b style={{ fontSize: 22 }}>{money(p[2])}</b>
        <fieldset>
          <legend>Colour: {s.color}</legend>
          <Seg ctx={ctx} act="color" opts={["Indigo", "Black", "Stone"]} cur={s.color} />
        </fieldset>
        {sizes.length > 0 && (
          <>
            <fieldset>
              <legend className="spread" style={{ width: "100%" }}>
                <span>Waist size</span>
              </legend>
              <div className="seg">
                {sizes.map((z) => (
                  <button
                    key={z}
                    aria-pressed={s.fsize === z}
                    onClick={() => act("fsize", z)}
                    style={p[5].includes(z) ? undefined : { textDecoration: "line-through", opacity: 0.5 }}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </fieldset>
            <button
              className="ld-btn ld-btn-ghost ld-btn-sm"
              onClick={() => act("guide")}
              style={{ alignSelf: "flex-start", color: "var(--primary)", padding: 0 }}
            >
              Open the size guide
            </button>
          </>
        )}
        <div className="row">
          <button className="ld-btn ld-btn-primary" style={{ flex: 1 }} onClick={() => act("fadd")}>
            Add to cart
          </button>
          <button className="heart" aria-pressed={s.wish} aria-label="Save to wishlist" onClick={() => act("wish")}>
            <HeartIcon />
          </button>
        </div>
        <p className="meta">{p[4]} fit · 98% cotton, 2% elastane · Free returns within 30 days</p>
      </div>
    </div>
  );
}

function FCart(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const by: Record<string, typeof s.fcart> = {};
  s.fcart.forEach((c) => {
    const brand = PRODUCTS[c.p][1];
    (by[brand] = by[brand] || []).push(c);
  });
  const brands = Object.keys(by).length;
  const sub = fTotal(s);
  const disc = s.fcoupon ? sub * 0.15 : 0;
  const ship = s.fdel === "Combined" ? 5.99 : 9.98;
  const tax = (sub - disc) * 0.0825;
  const tot = sub - disc + ship + tax;
  return (
    <>
      <H t="Cart and checkout" sub={`${s.fcart.length} items from ${brands} brand${brands > 1 ? "s" : ""} · Test payment`} />
      <div className={`two${hl("fplace")}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {Object.entries(by).map(([brand, items]) => (
            <div key={brand} className="panel">
              <div className="spread" style={{ marginBottom: 10 }}>
                <b>{brand}</b>
                <span className="meta">{s.fdel === "Combined" ? "Ships to the hub" : "Ships to you"}</span>
              </div>
              {items.map((c, j) => (
                <div key={j} className="spread" style={{ padding: "6px 0" }}>
                  <span>
                    {PRODUCTS[c.p][0]}
                    {c.seed && (
                      <>
                        {" "}
                        <B>Saved earlier</B>
                      </>
                    )}
                    <br />
                    <span className="meta">
                      {c.color} · Size {c.size}
                    </span>
                  </span>
                  <b>{money(PRODUCTS[c.p][2])}</b>
                </div>
              ))}
            </div>
          ))}
          <div className="panel">
            <fieldset>
              <legend>How should it arrive?</legend>
              <Seg
                ctx={ctx}
                act="fdel"
                opts={["Combined", "Separate"]}
                cur={s.fdel}
                label={(o) => (o === "Combined" ? "Combined delivery" : "Separate deliveries")}
              />
            </fieldset>
            <p className="meta" style={{ marginTop: 10 }}>
              {s.fdel === "Combined"
                ? "Both brands send their items to our hub. You get one parcel, one delivery."
                : "Each brand ships as soon as its items are ready. You get two parcels."}
            </p>
          </div>
        </div>
        <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="spread">
            <span>
              <b>Coupon</b>
              <br />
              <span className="meta">FALL15 · 15% off orders over $100</span>
            </span>
            <button className={`ld-btn ${s.fcoupon ? "ld-btn-dark" : "ld-btn-line"} ld-btn-sm`} onClick={() => act("fcoupon")}>
              {s.fcoupon ? "Applied" : "Apply"}
            </button>
          </div>
          <Hr />
          <Row2 meta l="Items" r={money(sub)} />
          {s.fcoupon && <Row2 meta l="FALL15" r={`−${money(disc)}`} />}
          <Row2 meta l={`Delivery (${s.fdel.toLowerCase()})`} r={money(ship)} />
          <Row2 meta l="Sales tax" r={money(tax)} />
          <div className="spread">
            <b>Total</b>
            <b style={{ fontSize: 20 }}>{money(tot)}</b>
          </div>
          <div className="f">
            <label htmlFor="fpay">Payment</label>
            <select id="fpay">
              <option>Test card ending 4242</option>
            </select>
          </div>
          <button className="ld-btn ld-btn-primary" onClick={() => act("fplace")}>
            {s.fplaced ? "Order placed" : "Place order"}
          </button>
        </div>
      </div>
    </>
  );
}

function FTrack(ctx: ScreenCtx) {
  const { s, act } = ctx;
  if (!s.fplaced)
    return (
      <>
        <H t="Track your order" sub="Place an order to track it here." />
        <button className="ld-btn ld-btn-primary" onClick={() => act("goto", "f_search")}>
          Start shopping
        </button>
      </>
    );
  const b = brands(s);
  const n = b.length;
  const st = [
    "Order placed",
    ...b.map((x) => `${x} shipped to the hub`),
    "All items received at the hub",
    "Out for delivery as one parcel",
    "Delivered",
  ];
  const d = s.fsim >= 5 ? n + 4 : s.fsim >= 2 ? n + 3 : s.received ? n + 2 : s.sShipped ? n + 1 : n;
  return (
    <>
      <H t="Track your order" sub={`Order ${s.fOrderNo} · Combined delivery`} />
      <div className="two">
        <div className="panel">
          <Timeline steps={st} done={d} />
        </div>
        <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="codebox">
            <span>
              <b>Your delivery code</b>
              <br />
              <span className="meta">Give it to the delivery agent at the door.</span>
            </span>
            <code>{s.code}</code>
          </div>
          <p className="meta">If one brand is late, we tell you here and send that item in a later delivery.</p>
          <button className="ld-btn ld-btn-line" onClick={() => act("view")}>
            Report a problem
          </button>
        </div>
      </div>
    </>
  );
}

function FReturns(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  return (
    <>
      <H t="Returns" sub="Delivered orders you can return" />
      <div className={`panel${hl("ret")}`} style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="spread">
          <b>Order #TL-4931 · Delivered last Tuesday</b>
          <B tone="g">Delivered</B>
        </div>
        <div className="spread">
          <span>
            Quilted Field Jacket
            <br />
            <span className="meta">Harbor & Pine · Olive · M</span>
          </span>
          <b>{money(120)}</b>
        </div>
        {s.retReq ? (
          <B tone={s.retOk ? "g" : "a"}>
            {s.retOk ? "Return approved. Refund of $120.00 queued." : "Return requested. Waiting for approval."}
          </B>
        ) : (
          <>
            <div className="f">
              <label htmlFor="rr">Why are you returning it?</label>
              <select id="rr">
                <option>Too big</option>
                <option>Too small</option>
                <option>Not as described</option>
              </select>
            </div>
            <p className="meta">Free return shipping. Refund to your card after approval.</p>
            <button className="ld-btn ld-btn-primary" onClick={() => act("ret")}>
              Request return
            </button>
          </>
        )}
      </div>
    </>
  );
}

function SFul(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const mine = s.fplaced;
  const items = mySellerItems(s);
  return (
    <>
      <H t="Fulfillment" sub={sellerName(s)} />
      <Kpis
        items={[
          ["Pending", String(mine && !s.sShipped ? 4 : 3)],
          ["Ready", "2"],
          ["In transit", String(mine && s.sShipped ? 7 : 6)],
          ["Completed", "128"],
        ]}
      />
      <div className="tickets" style={{ marginTop: 20 }}>
        {mine ? (
          <div className={`ticket${s.sShipped ? "" : " new"}${hl("ship")}`}>
            <div className="spread">
              <b>{s.fOrderNo}</b>
              {YOU}
            </div>
            <ul>
              {items.map((c, j) => (
                <li key={j}>
                  {pname(c)} · {c.color} · {c.size}
                </li>
              ))}
            </ul>
            <span className="meta">Combined delivery · Ship to: {M(s).brand} hub, Austin</span>
            {s.sShipped ? (
              <B tone="g">Shipped to hub</B>
            ) : s.sAccepted ? (
              <button className="ld-btn ld-btn-primary" onClick={() => act("ship")}>
                Pack and ship to hub
              </button>
            ) : (
              <div className="row">
                <button className="ld-btn ld-btn-primary" style={{ flex: 1 }} onClick={() => act("saccept")}>
                  Accept
                </button>
                <button className="ld-btn ld-btn-line" onClick={() => act("view")}>
                  Decline
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`ticket${hl("ship")}`}>
            <b>No order from you yet</b>
            <span className="meta">Place one as the customer and your part lands here.</span>
          </div>
        )}
        <div className="ticket">
          <div className="spread">
            <b>#TL-5188</b>
            <B>In transit</B>
          </div>
          <ul>
            <li>2 items</li>
          </ul>
          <span className="meta">Separate delivery</span>
        </div>
      </div>
      <p className="note-inline" style={{ marginTop: 18 }}>
        You only see your own items in each order. Other brands in the same order stay private.
      </p>
    </>
  );
}

function SSales(ctx: ScreenCtx) {
  const { s, hl } = ctx;
  const items = s.fplaced ? mySellerItems(s) : [];
  const mine = items.reduce((a, c) => a + PRODUCTS[c.p][2], 0);
  const gross = 4820 + mine;
  const comm = gross * 0.15;
  const rows: ReactNode[][] = [
    ...items.map((c, j): ReactNode[] => {
      const pr = PRODUCTS[c.p][2];
      return [
        <span key={j}>
          {s.fOrderNo} {YOU}
        </span>,
        pname(c),
        money(pr),
        "−" + money(pr * 0.15),
        money(pr * 0.85),
      ];
    }),
    ["#TL-5188", "2 items", money(128), "−" + money(19.2), money(108.8)],
    ["#TL-5102", "1 item", money(64), "−" + money(9.6), money(54.4)],
  ];
  return (
    <>
      <H t="Sales & revenue" sub={`${sellerName(s)} · Last 30 days`} />
      <Kpis
        className={hl("ssales")}
        items={[
          ["Gross sales", money(gross)],
          ["Marketplace commission (15%)", "−" + money(comm)],
          ["Refunds", "−$118.00"],
          ["Net earnings", money(gross - comm - 118), "Paid out every Friday"],
        ]}
      />
      <div style={{ marginTop: 20 }}>
        <Table head={["Order", "Item", "Sale", "Commission", "You earn"]} rows={rows} />
      </div>
    </>
  );
}

function SProducts(ctx: ScreenCtx) {
  const { s, act } = ctx;
  const seller = sellerName(s);
  const rows: ReactNode[][] = PRODUCTS.filter((p) => p[1] === seller)
    .map((p): ReactNode[] => [p[0], money(p[2]), p[5].join(", "), "46", <B key="s" tone="g">Live</B>])
    .concat([["Classic Denim Jacket", money(98), "S–XL", "12", <B key="s" tone="a">Low stock</B>]]);
  return (
    <>
      <H t="Products" sub={`${seller} · 12 products`} />
      <div className="spread" style={{ marginBottom: 14 }}>
        <p className="meta">Adding products needs image uploads, which are off in the shared demo.</p>
        <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("lock", "Add products with images")}>
          <LockIcon /> Add product
        </button>
      </div>
      <Table head={["Product", "Price", "Sizes", "Stock", "Status"]} rows={rows} />
    </>
  );
}

function OToday(ctx: ScreenCtx) {
  const { s, hl } = ctx;
  if (isR(s)) {
    const mine = s.placed ? cartTotal(s) : 0;
    const del = s.fulfil === "Delivery";
    return (
      <>
        <H t="Orders today" sub="Lone Star Eats · All restaurants · Demo data" />
        <Kpis
          className={hl("kpis")}
          items={[
            ["Gross sales", money(9860 + mine), "+12% vs last Friday"],
            ["Orders", String(412 + (s.placed ? 1 : 0)), "+38 in the last hour"],
            ["Your commission", money((9860 + mine) * 0.12), "12% per order"],
            ["Voids and comps", "$84.00", "2 items"],
          ]}
        />
        <div style={{ marginTop: 20 }}>
          <Table
            head={["Channel", "Orders", "Sales", "Share"]}
            rows={[
              ["Online delivery", String(221 + (s.placed && del ? 1 : 0)), money(5412 + (del ? mine : 0)), "55%"],
              ["Pickup and curbside", "84", money(1690 + (!del ? mine : 0)), "17%"],
              ["Counter", "61", money(1204), "12%"],
              ["Dine-in", "46", money(1554), "16%"],
            ]}
          />
        </div>
        <p className="note-inline" style={{ marginTop: 16 }}>
          Reconciliation check: every channel adds up to gross sales. ✓
        </p>
      </>
    );
  }
  const mine = s.fplaced ? fTotal(s) : 0;
  const comb = s.fdel === "Combined";
  return (
    <>
      <H t="Orders today" sub="Threadline · All brands · Demo data" />
      <Kpis
        className={hl("kpis")}
        items={[
          ["Gross sales", money(14230 + mine), "+9% vs last Friday"],
          ["Orders", String(186 + (s.fplaced ? 1 : 0)), "Across 24 brands"],
          ["Your commission", money((14230 + mine) * 0.15), "15% per sale"],
          ["Returns", "6", "$410.00 refunded"],
        ]}
      />
      <div style={{ marginTop: 20 }}>
        <Table
          head={["Delivery type", "Orders", "Sales"]}
          rows={[
            ["Combined delivery", String(118 + (s.fplaced && comb ? 1 : 0)), money(9670 + (comb ? mine : 0))],
            ["Separate deliveries", "68", money(4560 + (!comb ? mine : 0))],
          ]}
        />
      </div>
    </>
  );
}

function OSellers(ctx: ScreenCtx) {
  const { s, act } = ctx;
  const r = isR(s);
  const review = (
    <button key="r" className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("lock", "Seller verification")}>
      <LockIcon /> Review documents
    </button>
  );
  const live = <B tone="g">Live</B>;
  const pending = <B tone="a">Documents pending</B>;
  const rows: ReactNode[][] = r
    ? [
        ["Lone Star Smokehouse", "BBQ", "★ 4.8", live, ""],
        ["Casa Verde Taqueria", "Tex-Mex", "★ 4.7", live, ""],
        ["Pho Real", "Vietnamese", "★ 4.6", live, ""],
        ["Sunset Ramen Bar", "Japanese", "New", pending, review],
      ]
    : [
        ["Denim District", "Denim", "12 products", live, ""],
        ["Harbor & Pine", "Menswear", "34 products", live, ""],
        ["Urban Loom", "Streetwear", "27 products", live, ""],
        ["Coastline Knits", "Knitwear", "New", pending, review],
      ];
  return (
    <>
      <H t={r ? "Restaurants" : "Sellers"} sub={r ? "Every restaurant selling on your marketplace" : "Every brand selling on your store"} />
      <Table head={["Name", "Type", "Rating / size", "Status", ""]} rows={rows} />
    </>
  );
}

function OMarketing(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const r = isR(s);
  const code = r ? "DEMO10" : "FALL15";
  const carts: [string, string, string][] = [
    ["Jordan P.", r ? "$42.50" : "$148.00", "2 h ago"],
    ["Guest shopper", r ? "$18.50" : "$59.00", "5 h ago"],
    ["Priya N.", r ? "$61.00" : "$212.00", "Yesterday"],
  ];
  return (
    <>
      <H t="Coupons and carts" sub="Promotions for your whole marketplace" />
      <div className="two">
        <div className={`panel${hl("mkt")}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <b>Coupons</b>
          <div className="spread">
            <span>
              <b>{code}</b>
              <br />
              <span className="meta">{r ? "10% off any order" : "15% off orders over $100"} · Ends Sunday</span>
            </span>
            <button className="switch" role="switch" aria-checked={s.mkt} aria-label={`Turn ${code} on or off`} onClick={() => act("mkt")} />
          </div>
          <div className="spread">
            <span>
              <b>FREESHIP</b>
              <br />
              <span className="meta">Free delivery over $35 · Scheduled</span>
            </span>
            <B>Scheduled</B>
          </div>
        </div>
        <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <b>Abandoned carts</b>
          {carts.map((c) => (
            <div key={c[0]} className="spread">
              <span>
                {c[0]}
                <br />
                <span className="meta">
                  {c[1]} · {c[2]}
                </span>
              </span>
              <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("blocked", "Send cart reminder")}>
                Send reminder
              </button>
            </div>
          ))}
          <span className="meta">Messages are switched off in the demo.</span>
        </div>
      </div>
    </>
  );
}

function OInbound(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  const hub = `${M(s).brand} hub · Austin`;
  if (!s.fplaced)
    return (
      <>
        <H t="Inbound queue" sub={hub} />
        <div className={`panel${hl("receive")}`}>
          <b>No combined order from you yet</b>
          <p className="meta">Place one as the customer and the parcels show up here.</p>
        </div>
      </>
    );
  const b = brands(s);
  const me = sellerName(s);
  return (
    <>
      <H t="Inbound queue" sub={hub} />
      <Table
        head={["Order", "Seller parcel", "Items", "Status"]}
        rows={[
          ...b.map((x): ReactNode[] => [
            s.fOrderNo,
            x,
            s.fcart
              .filter((c) => PRODUCTS[c.p][1] === x)
              .map(pname)
              .join(", "),
            s.received ? (
              <B tone="g">Received</B>
            ) : x !== me || s.sShipped ? (
              <B tone="a">Arrived</B>
            ) : (
              <B>Waiting for seller</B>
            ),
          ]),
          ["#TL-5170", "Another seller", "1 item", <B key="s">In transit</B>],
        ]}
      />
      <div className={`panel spread${hl("receive")}`} style={{ marginTop: 16 }}>
        <span>
          <b>
            {s.fOrderNo}: {b.length} parcels from {b.length} brands
          </b>
          <br />
          <span className="meta">
            {s.received ? "Ready to send as one delivery." : s.sShipped ? "All parcels are at the hub." : `${me} hasn’t shipped yet.`}
          </span>
        </span>
        {s.received ? (
          <button className="ld-btn ld-btn-line ld-btn-sm" onClick={() => act("goto", "o_deliveries")}>
            Go to Deliveries
          </button>
        ) : (
          <button className="ld-btn ld-btn-primary" disabled={!s.sShipped} onClick={() => act("receive")}>
            Mark all received
          </button>
        )}
      </div>
    </>
  );
}

function ODeliveries(ctx: ScreenCtx) {
  const { s, act } = ctx;
  const ok = s.fplaced && s.received;
  return (
    <>
      <H t="Deliveries" sub={`Combined deliveries from the ${M(s).brand} hub`} />
      <div className="panel spread" style={{ marginBottom: 20 }}>
        <span>
          <b>{s.fOrderNo} · Demo Customer</b>
          <br />
          <span className="meta">{s.fcart.map((c) => `${pname(c)} (${PRODUCTS[c.p][1]})`).join(" + ")} · 1 parcel</span>
        </span>
        {s.dispatched ? (
          <B tone="g">Dispatched. A delivery agent takes it from here.</B>
        ) : (
          <button className="ld-btn ld-btn-primary" disabled={!ok} onClick={() => act("dispatch")}>
            Dispatch as one delivery
          </button>
        )}
      </div>
      <SimPanel
        ctx={ctx}
        kind="f"
        t="fdrive"
        readyOK={s.dispatched}
        waitMsg={ok ? "Dispatch the delivery first." : "Receive the parcels in the Inbound queue first."}
      />
    </>
  );
}

function OReturns(ctx: ScreenCtx) {
  const { s, act, hl } = ctx;
  return (
    <>
      <H t="Returns" sub="Requests from your customers" />
      <Table
        className={hl("retok")}
        head={["Return", "Order", "Item", "Reason", "Refund", "Status", ""]}
        rows={[
          [
            "RMA-812",
            "#TL-4931",
            "Quilted Field Jacket",
            "Too big",
            "$120.00",
            s.retReq ? s.retOk ? <B tone="g">Approved</B> : <B tone="a">Requested</B> : <B>Not requested yet</B>,
            s.retReq && !s.retOk ? (
              <button className="ld-btn ld-btn-primary ld-btn-sm" onClick={() => act("retok")}>
                Approve
              </button>
            ) : (
              ""
            ),
          ],
          ["RMA-809", "#TL-4870", "Linen Camp Shirt", "Not as described", "$48.00", <B key="s" tone="g">Refunded</B>, ""],
        ]}
      />
    </>
  );
}

export const SCREENS: Record<ScreenId, (ctx: ScreenCtx) => ReactNode> = {
  r_home: RHome,
  r_menu: RMenu,
  r_checkout: RCheckout,
  r_track: RTrack,
  r_table: RTable,
  c_account: CAccount,
  r_orders: ROrders,
  r_kds: RKds,
  r_floor: RFloor,
  r_resv: RResv,
  r_menuadm: RMenuAdm,
  f_search: FSearch,
  f_product: FProduct,
  f_cart: FCart,
  f_track: FTrack,
  f_returns: FReturns,
  s_ful: SFul,
  s_sales: SSales,
  s_products: SProducts,
  o_today: OToday,
  o_sellers: OSellers,
  o_marketing: OMarketing,
  o_inbound: OInbound,
  o_deliveries: ODeliveries,
  o_returns: OReturns,
};
