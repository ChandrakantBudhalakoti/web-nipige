"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BLOCK_MSG,
  COMPLETE,
  CRM_ENDPOINT,
  D,
  DEMO_SESSION_ENDPOINT,
  DEMO_KEYS,
  DEMO_PASSWORD,
  FAQS,
  FSIM,
  MARKET_IDS,
  PRODUCTS,
  RESET_NOTE,
  REST_MENU,
  ROLE_ORDER,
  RSIM,
  SOON,
  TITLES,
  type MarketId,
  type Role,
} from "./data";
import {
  applyStep,
  fresh,
  initialStore,
  isR,
  M,
  normalize,
  prep,
  restName,
  sellerName,
  steps,
  tipCtx,
  addMine,
  fixSeed,
  type Store,
  type View,
} from "./state";
import {
  Art,
  ArrowIcon,
  CheckIcon,
  Icon,
  LockIcon,
  MarketIcon,
  Svg,
} from "./icons";
import { Player } from "./Player";
import { SCREENS, Table, type ScreenCtx } from "./Screens";

type ModalState =
  | { kind: "notify"; id: string }
  | { kind: "end"; main: boolean; tourKey: string }
  | { kind: "more" }
  | { kind: "lock"; name: string }
  | { kind: "driver" }
  | { kind: "size" };

const VIEWS: View[] = ["welcome", "app"];
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const RM = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion:reduce)").matches;
const isMarket = (m: string | null | undefined): m is MarketId => !!m && m in D;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function LiveDemo() {
  const [s, setS] = useState<Store>(initialStore);
  const sRef = useRef(s);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [toastState, setToastState] = useState<{
    text: string;
    lock: boolean;
    on: boolean;
  }>({ text: "", lock: false, on: false });
  const [tipKey, setTipKey] = useState(0);
  const scrollReq = useRef<{ top: boolean; hl: boolean }>({
    top: false,
    hl: false,
  });
  const simT = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visitorId = useRef("v" + Math.floor(1e6 + Math.random() * 8e6));
  const screenRef = useRef<HTMLElement>(null);

  /** Apply a change to a copy of the store and re-render. Runs `fn` synchronously, exactly once. */
  const commit = useCallback((fn: (d: Store) => void) => {
    const d = structuredClone(sRef.current);
    fn(d);
    normalize(d);
    sRef.current = d;
    setS(d);
    return d;
  }, []);

  /* ------------------------------ helpers ------------------------------ */

  const logEvent = (name: string, data: Record<string, unknown> = {}) => {
    // Replace with your analytics (GA4, Segment, HubSpot) call.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "demo_" + name,
        market: sRef.current.market,
        visitorId: visitorId.current,
        ...data,
      });
    } catch {
      // analytics unavailable
    }
  };

  const toast = (text: string, lock = false) => {
    setToastState({ text, lock, on: true });
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(
      () => setToastState((t) => ({ ...t, on: false })),
      2200,
    );
  };

  const copy = async (text: string, what: string) => {
    logEvent("copy_key", { what });
    try {
      await navigator.clipboard.writeText(text);
      toast(`${what} copied`);
      return;
    } catch {
      // Clipboard API unavailable or blocked (e.g. unfocused document): fall back to a hidden textarea.
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    toast(ok ? `${what} copied` : "Couldn’t copy. Select the text instead.");
  };

  const stopSims = () => {
    if (simT.current) clearInterval(simT.current);
    simT.current = null;
  };

  /** Lead payload for the CRM: contact details plus everything they did in the demo. */
  const sendLead = (contact: Record<string, unknown>) => {
    const cur = sRef.current;
    const t = cur.track;
    const payload = {
      ...contact,
      visitorId: visitorId.current,
      source: t.source,
      campaign: t.campaign,
      market: cur.market ? M(cur).name : null,
      viewsOpened: Array.from(t.roles),
      tourProgress: cur.market ? `${t.maxStep}/${M(cur).tour.length}` : "0",
      extraTours: Array.from(t.bonus),
      lockedClicked: Array.from(t.locked),
      videosWatched: Array.from(t.videos),
      minutesInDemo: Math.round((Date.now() - t.started) / 60000),
      at: new Date().toISOString(),
    };
    logEvent("lead", { type: contact.type });
    if (CRM_ENDPOINT) {
      fetch(CRM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } else console.log("Lead for CRM:", payload);
  };

  const openSession = async (role: Role) => {
    // Production: ask the server for a short-lived token for a pooled demo persona, then load the real app with it.
    if (!DEMO_SESSION_ENDPOINT) return null;
    try {
      const r = await fetch(DEMO_SESSION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          market: sRef.current.market,
          role,
          visitorId: visitorId.current,
        }),
      });
      return await r.json();
    } catch {
      return null;
    }
  };

  /** Ask for a scroll after the next render: to the top, and/or to the highlighted tour target. */
  const renderApp = (scrollTop?: boolean, pop?: boolean) => {
    const touring = sRef.current.touring;
    if (touring && scrollTop !== false) scrollReq.current.hl = true;
    if (scrollTop && !touring) scrollReq.current.top = true;
    if (pop) setTipKey((k) => k + 1);
  };

  const go = (target: View, push = true) => {
    const d = commit((d) => {
      d.view = target === "app" && !d.signed ? "welcome" : target;
    });
    if (push)
      history.pushState(
        { v: d.view },
        "",
        "#/" + d.view + (d.market ? "?" + d.market : ""),
      );
    scrollReq.current.top = true;
    if (d.view === "app") renderApp(true);
  };

  const setMarket = (d: Store, m: MarketId) => {
    if (m === d.market) return;
    stopSims();
    Object.assign(d, { market: m }, fresh());
    d.role = "customer";
    d.touring = false;
    d.track.markets.add(D[m].name);
  };

  /* ------------------------------ tour ------------------------------ */

  const enter = (role: Role, tourKey: string | null) => {
    commit((d) => {
      if (!d.market) d.market = "restaurant";
      d.signed = true;
      d.role = role;
      d.track.roles.add(M(d).roles[role].app);
      if (tourKey) {
        d.tourKey = tourKey;
        d.touring = true;
        d.step = 0;
        if (applyStep(d)) stopSims();
      } else {
        d.touring = false;
        d.screen = M(d).roles[role].screens[0];
      }
    });
    openSession(role);
    logEvent("enter", { role, tour: tourKey });
    if (tourKey) logEvent("tour_start", { tour: tourKey });
    go("app");
  };

  const endTour = () => {
    const cur = sRef.current;
    const main = cur.tourKey === "main";
    commit((d) => {
      if (main) d.track.maxStep = M(d).tour.length;
      else d.track.bonus.add(M(d).bonus[d.tourKey].title);
      d.touring = false;
    });
    renderApp();
    logEvent("tour_complete", { tour: cur.tourKey });
    openModal({ kind: "end", main, tourKey: cur.tourKey });
  };

  const nextStep = () => {
    const cur = sRef.current;
    if (!cur.touring) return;
    const n = steps(cur).length;
    logEvent("tour_step", { tour: cur.tourKey, step: cur.step + 1 });
    if (cur.step < n - 1) {
      commit((d) => {
        d.step++;
        if (applyStep(d)) stopSims();
      });
      renderApp(true, true);
    } else endTour();
  };

  const prevStep = () => {
    if (sRef.current.step <= 0) return;
    commit((d) => {
      d.step--;
      if (applyStep(d)) stopSims();
    });
    renderApp(true, true);
  };

  const skipTour = () => {
    const cur = sRef.current;
    commit((d) => {
      d.touring = false;
    });
    logEvent("tour_skip", { tour: cur.tourKey, step: cur.step + 1 });
    renderApp();
  };

  const restartTour = () => {
    stopSims();
    commit((d) => {
      Object.assign(d, fresh());
      d.tourKey = "main";
      d.touring = true;
      d.step = 0;
      applyStep(d);
    });
    logEvent("tour_start", { tour: "main" });
    renderApp(true, true);
  };

  const startBonus = (k: string) => {
    closeModal();
    enter(M(sRef.current).bonus[k].steps[0][1], k);
  };

  const switchMarket = (m: MarketId) => {
    closeModal();
    commit((d) => {
      setMarket(d, m);
      d.signed = false;
    });
    go("welcome");
    setTimeout(() => document.getElementById("keys")?.scrollIntoView(), 60);
  };

  /* ------------------------------ delivery agent preview ------------------------------ */

  const playSim = (kind: "r" | "f") => {
    if (simT.current) return;
    const key = kind === "f" ? "fsim" : "sim";
    const list = kind === "f" ? FSIM : RSIM;
    commit((d) => {
      d[key] = 0;
    });
    logEvent("driver_preview", { market: sRef.current.market });
    simT.current = setInterval(
      () => {
        let finished = false;
        commit((d) => {
          d[key]++;
          if (d[key] >= list.length - 1) {
            d[key] = list.length - 1;
            finished = true;
          }
        });
        if (!finished) return;
        stopSims();
        toast(
          kind === "f"
            ? "Delivered. One parcel, two brands."
            : "Delivered. The code matched.",
        );
        const cur = sRef.current;
        const t = cur.touring && steps(cur)[cur.step];
        if (t && (t[3] === "drive" || t[3] === "fdrive"))
          setTimeout(nextStep, 1200);
      },
      RM() ? 500 : 1300,
    );
  };

  /* ------------------------------ modals ------------------------------ */

  const lastFocus = useRef<HTMLElement | null>(null);
  const openModal = (m: ModalState) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setModal(m);
  };
  const closeModal = () => {
    setModal(null);
    lastFocus.current?.focus?.();
  };
  const lockModal = (name: string) => {
    commit((d) => {
      d.track.locked.add(name);
    });
    logEvent("locked_click", { feature: name });
    openModal({ kind: "lock", name });
  };
  const driverModal = () => {
    commit((d) => {
      d.track.locked.add("Mobile apps");
    });
    logEvent("locked_click", { feature: "Mobile apps" });
    openModal({ kind: "driver" });
  };
  const watchDriver = () => {
    closeModal();
    commit((d) => {
      d.touring = false;
      const k = d.tourKey;
      d.tourKey = "main";
      if (prep(d, 5)) stopSims();
      d.tourKey = k;
      if (isR(d)) {
        d.role = "customer";
        d.screen = "r_track";
      } else {
        d.dispatched = true;
        d.role = "admin";
        d.screen = "o_deliveries";
      }
    });
    renderApp(true);
  };

  /* ------------------------------ actions inside screens ------------------------------ */

  const act = (a: string, v?: string | number) => {
    const cur = sRef.current;
    const tgt = cur.touring ? steps(cur)[cur.step][3] : null;
    let advance = !!tgt && COMPLETE[tgt] === a;
    switch (a) {
      case "sim":
        playSim(v as "r" | "f");
        return;
      case "replay":
        stopSims();
        commit((d) => {
          if (v === "f") d.fsim = -1;
          else d.sim = -1;
        });
        playSim(v as "r" | "f");
        return;
      case "guide":
        openModal({ kind: "size" });
        return;
      case "lock":
        lockModal(String(v));
        return;
      case "blocked":
        toast(BLOCK_MSG, true);
        logEvent("blocked_click", { feature: v });
        return;
      case "view":
        toast("View only in the shared demo", true);
        return;
    }
    commit((d) => {
      switch (a) {
        case "cuisine":
          d.cuisine = String(v);
          break;
        case "rest":
          d.rest = Number(v);
          d.screen = "r_menu";
          break;
        case "add": {
          const it = REST_MENU[Number(v)];
          if (it[4]) {
            toast(`${it[0]} is sold out`);
            advance = false;
            break;
          }
          d.cart.push(Number(v));
          toast(`${it[0]} added to your cart`);
          break;
        }
        case "fulfil":
          d.fulfil = String(v);
          break;
        case "tip":
          d.tip = Number(v);
          break;
        case "coupon":
          d.coupon = !d.coupon;
          toast(d.coupon ? "DEMO10 applied: 10% off" : "Coupon removed");
          advance = false;
          break;
        case "place":
          if (!d.cart.length) d.cart = [0];
          d.placed = true;
          toast(`Order ${d.orderNo} placed. Test payment approved.`);
          if (!d.touring) d.screen = "r_track";
          break;
        case "accept":
          d.accepted = true;
          toast("Accepted. Sent to the Kitchen Display.");
          break;
        case "plate": {
          const i = Number(v);
          d.plated = d.plated.includes(i)
            ? d.plated.filter((x) => x !== i)
            : [...d.plated, i];
          break;
        }
        case "ready":
          d.ready = true;
          d.plated = d.cart.map((_, j) => j);
          toast("Ready for pickup. Nearby delivery agents are notified.");
          break;
        case "seat":
          d.seated = true;
          d.table = Number(v);
          toast(`Table ${v} seated. Check opened.`);
          break;
        case "chk":
          d.check.push(Number(v));
          d.sent = false;
          break;
        case "send":
          if (!d.check.length) {
            toast("Add a dish to the check first");
            advance = false;
            break;
          }
          d.sent = true;
          toast("Sent to the kitchen");
          break;
        case "guests":
          d.guests = Number(v);
          break;
        case "rday":
          d.rday = String(v);
          break;
        case "rtime":
          d.rtime = String(v);
          break;
        case "resv":
          d.resvBooked = true;
          toast(`Table for ${d.guests} booked: ${d.rday} at ${d.rtime}`);
          break;
        case "seatr":
          d.resvSeated = true;
          toast("Guests seated");
          break;
        case "mkt":
          d.mkt = !d.mkt;
          toast(d.mkt ? "Coupon is live on your storefront" : "Coupon paused");
          if (!d.mkt) advance = false;
          break;
        case "fit":
          d.fit = String(v);
          break;
        case "size":
          d.size = d.size === Number(v) ? null : Number(v);
          break;
        case "fopen": {
          d.prod = Number(v);
          // Start on a size this product actually has (prefer the size filter).
          const z = PRODUCTS[d.prod][5];
          if (!z.includes(d.fsize)) d.fsize = d.size && z.includes(d.size) ? d.size : (z[0] as number);
          d.screen = "f_product";
          break;
        }
        case "color":
          d.color = String(v);
          break;
        case "fsize":
          d.fsize = Number(v);
          break;
        case "wish":
          d.wish = !d.wish;
          toast(
            d.wish ? "Saved to your wishlist" : "Removed from your wishlist",
          );
          break;
        case "fadd": {
          const p = PRODUCTS[d.prod];
          if (!p[5].includes(d.fsize)) {
            toast(`Size ${d.fsize} is out of stock. Pick another.`);
            advance = false;
            break;
          }
          d.fcart.push({ p: d.prod, size: d.fsize, color: d.color });
          fixSeed(d);
          toast(`${p[0]} added to your cart`);
          if (!d.touring) d.screen = "f_cart";
          break;
        }
        case "fdel":
          d.fdel = String(v);
          break;
        case "fcoupon":
          d.fcoupon = !d.fcoupon;
          toast(d.fcoupon ? "FALL15 applied: 15% off" : "Coupon removed");
          break;
        case "fplace":
          addMine(d);
          d.fplaced = true;
          toast(`Order ${d.fOrderNo} placed. Test payment approved.`);
          if (!d.touring) d.screen = "f_track";
          break;
        case "saccept":
          d.sAccepted = true;
          toast("Accepted. Pack it and ship it to the hub.");
          break;
        case "ship":
          d.sAccepted = true;
          d.sShipped = true;
          toast(`Shipped to the ${M(d).brand} hub`);
          break;
        case "receive":
          d.received = true;
          toast("All parcels received at the hub");
          break;
        case "dispatch":
          d.dispatched = true;
          toast("One delivery created. Delivery agents are notified.");
          break;
        case "ret":
          d.retReq = true;
          toast("Return requested. Refund on approval.");
          break;
        case "retok":
          d.retOk = true;
          toast("Return approved. Refund queued.");
          break;
        case "goto":
          d.screen = v as Store["screen"];
          break;
      }
    });
    if (advance && sRef.current.touring) setTimeout(nextStep, 500);
    else renderApp(false);
  };

  /* ------------------------------ effects ------------------------------ */

  // Boot: read ?market= / #/view?market, UTM params, visitor id; wire the back button.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("nipige-demo-vid");
      if (saved) visitorId.current = saved;
      else sessionStorage.setItem("nipige-demo-vid", visitorId.current);
    } catch {
      // sessionStorage unavailable
    }
    const qs = new URLSearchParams(location.search);
    const h = location.hash.replace("#/", "").split("?");
    const market = isMarket(h[1])
      ? h[1]
      : isMarket(qs.get("market"))
        ? (qs.get("market") as MarketId)
        : null;
    commit((d) => {
      d.track.source = qs.get("utm_source") || "direct";
      d.track.campaign = qs.get("utm_campaign") || "";
      if (market) {
        d.market = market;
        d.track.markets.add(D[market].name);
      }
    });
    history.replaceState({ ...history.state, v: "welcome" }, "");

    const onPop = (e: PopStateEvent) => {
      const v = e.state?.v as View | undefined;
      if (v && VIEWS.includes(v)) go(v, false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      stopSims();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll requests queued by go()/renderApp()
  useEffect(() => {
    const req = scrollReq.current;
    scrollReq.current = { top: false, hl: false };
    if (req.top) window.scrollTo(0, 0);
    if (req.hl) {
      const id = setTimeout(
        () =>
          document
            .querySelector(".ld .hl")
            ?.scrollIntoView({
              block: "center",
              behavior: RM() ? "auto" : "smooth",
            }),
        80,
      );
      return () => clearTimeout(id);
    }
  }, [s, tipKey]);

  // Modal: focus the first control, close on Escape, keep Tab inside.
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!modal) return;
    const md = modalRef.current;
    const t = setTimeout(() => {
      const f =
        md?.querySelector<HTMLElement>(".ld-btn,input,.poster") ||
        md?.querySelector<HTMLElement>("button");
      f?.focus();
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab" && md) {
        const f = Array.from(
          md.querySelectorAll<HTMLElement>("button,a,input,select"),
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  useEffect(
    () => () => {
      if (toastT.current) clearTimeout(toastT.current);
    },
    [],
  );

  /* ------------------------------ render ------------------------------ */

  const onVideoPlay = useCallback(
    (title: string) => {
      commit((d) => {
        d.track.videos.add(title);
      });
    },
    [commit],
  );
  const onVideoDone = useCallback(() => {}, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: RM() ? "auto" : "smooth" });
  };

  const m = M(s);
  const touringApp = s.view === "app" && s.touring;

  return (
    <div className={`ld${touringApp ? " touring" : ""}`}>
      {s.view === "welcome" && (
        <Welcome
          s={s}
          scrollTo={scrollTo}
          onTour={() => enter("customer", "main")}
          onCopy={copy}
          onBonus={startBonus}
          onNotify={(id) => openModal({ kind: "notify", id })}
          onPickMarket={(id) => {
            const first = !sRef.current.market;
            commit((d) => setMarket(d, id));
            logEvent("market_select", { market: id });
            history.replaceState(
              { ...history.state, v: "welcome" },
              "",
              "#/welcome?" + id,
            );
            setTimeout(
              () =>
                document
                  .getElementById("watch")
                  ?.scrollIntoView({ behavior: RM() ? "auto" : "smooth" }),
              first ? 80 : 0,
            );
          }}
          onVideoPlay={onVideoPlay}
          onVideoDone={onVideoDone}
        />
      )}

      {s.view === "app" && (
        <section aria-label="Demo app">
          <div className="banner">
            <div className="in">
              <div className="lft">
                <span className="demo-pill">DEMO</span>
                <div className="rolebar" role="group" aria-label="Switch view">
                  {ROLE_ORDER.map((r) => (
                    <button
                      key={r}
                      aria-pressed={r === s.role}
                      onClick={() => {
                        if (r === sRef.current.role) return;
                        const wasTouring = sRef.current.touring;
                        commit((d) => {
                          d.role = r;
                          d.screen = null;
                          d.track.roles.add(M(d).roles[r].app);
                          d.touring = false;
                        });
                        if (wasTouring)
                          toast("Tour paused. Restart it any time.");
                        renderApp(true);
                      }}
                    >
                      <span className="lg">{m.roles[r].label}</span>
                      <span className="sm">
                        {r === "admin" ? "Owner" : m.roles[r].label}
                      </span>
                    </button>
                  ))}
                  <button className="drv-b" onClick={driverModal}>
                    <Icon name="car" size={15} />
                    <span className="lg">Mobile apps</span>
                    <span className="sm">Apps</span>
                  </button>
                </div>
              </div>
              <div className="acts">
                <button onClick={restartTour}>Restart tour</button>
                <button onClick={() => openModal({ kind: "more" })}>
                  More tours
                </button>
                <button onClick={() => go("welcome")}>
                  Change marketplace
                </button>
              </div>
            </div>
          </div>
          <AppShell
            s={s}
            screenRef={screenRef}
            ctx={{
              s,
              act,
              hl: (t) => (s.touring && steps(s)[s.step][3] === t ? " hl" : ""),
            }}
            onScreen={(id) => {
              commit((d) => {
                d.screen = id;
              });
              renderApp(!sRef.current.touring);
              screenRef.current?.focus({ preventScroll: true });
            }}
            onLock={lockModal}
            onMobile={driverModal}
          />
          {s.touring && (
            <TourTip
              key={tipKey}
              s={s}
              onNext={nextStep}
              onBack={prevStep}
              onSkip={skipTour}
            />
          )}
          <Link
            className="ld-btn ld-btn-primary talk"
            aria-label="Talk to our team"
            href="/contact"
          >
            <Svg size={18}>
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
            </Svg>
            <span>Talk to our team</span>
          </Link>
        </section>
      )}

      <div
        className={`scrim${modal ? " on" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {modal && (
          <div
            className={`modal`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mTitle"
            ref={modalRef}
          >
            <button className="x" aria-label="Close" onClick={closeModal}>
              ✕
            </button>
            <ModalBody
              modal={modal}
              s={s}
              onClose={closeModal}
              onBonus={startBonus}
              onSwitch={switchMarket}
              onMainTour={() => {
                closeModal();
                enter("customer", "main");
              }}
              onWatchDriver={watchDriver}
              onNotify={(name, email) => {
                sendLead({ type: "notify_market", market: name, email });
                closeModal();
                toast(`We’ll email you when ${name} is live`);
              }}
            />
          </div>
        )}
      </div>

      <div className={`toast${toastState.on ? " on" : ""}`} role="status">
        {toastState.lock ? <LockIcon /> : <CheckIcon />}
        {toastState.text}
      </div>
    </div>
  );
}

/* ================================ WELCOME ================================ */

function Welcome({
  s,
  scrollTo,
  onTour,
  onCopy,
  onBonus,
  onNotify,
  onPickMarket,
  onVideoPlay,
  onVideoDone,
}: {
  s: Store;
  scrollTo: (id: string) => (e: React.MouseEvent) => void;
  onTour: () => void;
  onCopy: (text: string, what: string) => void;
  onBonus: (k: string) => void;
  onNotify: (id: string) => void;
  onPickMarket: (id: MarketId) => void;
  onVideoPlay: (title: string) => void;
  onVideoDone: () => void;
}) {
  const has = !!s.market;
  const m = M(s);
  const r = isR(s);
  const check = <CheckIcon size={16} sw={2.5} />;
  return (
    <>
      <div className="wrap">
        <div className="ld-hero">
          <div>
            <span className="label">{"// live_demo · no sign-up"}</span>
            <h1>
              Run a marketplace. <span className="grad-text">Right now.</span>
            </h1>
            <p className="lede">
              Pick a restaurant or fashion marketplace and step in as the
              customer, the seller and the owner. One click, no password. Real
              Nipige screens with demo data.
            </p>
            <div className="ctas">
              <a
                className="ld-btn ld-btn-primary"
                href="#pick"
                onClick={scrollTo("pick")}
              >
                Start the demo
                <ArrowIcon />
              </a>
            </div>
            <div className="assure">
              <span>{check}No credit card</span>
              <span>{check}No sign-up form</span>
              <span>{check}About 5 minutes</span>
            </div>
          </div>
          {/* VIDEO SLOT 1: platform overview, shown before any market is picked */}
          <Player
            videoKey="overview"
            onPlay={onVideoPlay}
            onComplete={onVideoDone}
          />
        </div>
      </div>

      <div className="band statband">
        <div className="wrap">
          <div className="stats" aria-label="Nipige in numbers">
            {[
              ["2", "Marketplaces to try"],
              ["45+", "Microservices"],
              ["1,700+", "APIs"],
              ["35M", "Invoices a month"],
              ["14 days", "To go live"],
            ].map(([b, l]) => (
              <div key={l}>
                <b>{b}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="ld-sec" id="pick">
        <div className="wrap">
          <SecHead
            n="01"
            code="choose_marketplace"
            title="Which marketplace do you want to run?"
          >
            Each demo comes with a customer storefront, a seller panel and an
            owner console, loaded with US demo data.
          </SecHead>
          <div className="markets">
            {MARKET_IDS.map((id) => {
              const x = D[id];
              const on = id === s.market;
              return (
                <button
                  key={id}
                  className="mk"
                  aria-pressed={on}
                  onClick={() => onPickMarket(id)}
                >
                  <span className={`badge-top ${x.badge[1]}`}>
                    {x.badge[0]}
                  </span>
                  <span className="tick">
                    <CheckIcon />
                  </span>
                  <span className="ic">
                    <MarketIcon id={id} />
                  </span>
                  <b>{x.name}</b>
                  <p>{x.desc}</p>
                  <span className="apps">
                    {x.apps.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </span>
                  <span className="foot">
                    <span>
                      {x.price ? (
                        <>
                          from <strong>{x.price}</strong>/mo
                        </>
                      ) : (
                        "Pricing on request"
                      )}
                    </span>
                    <span
                      style={{
                        color: "var(--primary-soft-fg)",
                        fontWeight: 600,
                      }}
                    >
                      {on ? "Selected" : "Try this demo"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="soon">
            {SOON.map((x) => (
              <article key={x.id}>
                <span className="ic" style={{ background: "var(--subtle)" }}>
                  <Art name={x.art} size={20} />
                </span>
                <span>
                  <b>{x.name}</b>Demo coming soon. {x.desc}
                </span>
                <button
                  className="ld-btn ld-btn-line ld-btn-sm"
                  // onClick={() => onNotify(x.id)}
                >
                  Coming soon
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {has && (
        <>
          <section className="ld-sec" id="watch" style={{ paddingTop: 8 }}>
            <div className="wrap">
              <SecHead
                n="02"
                code="watch_first"
                title={`See the ${m.name.toLowerCase()} marketplace in action`}
                aside={
                  <a
                    className="ld-btn ld-btn-line"
                    href="#keys"
                    onClick={scrollTo("keys")}
                  >
                    Skip to demo keys
                  </a>
                }
              >
                A quick look at what you’re about to run. Skip it if you’d
                rather jump straight in.
              </SecHead>
              <div className="teaser">
                {/* VIDEO SLOT 2: market teaser, changes with the chosen market */}
                <Player
                  key={s.market}
                  videoKey={s.market!}
                  onPlay={onVideoPlay}
                  onComplete={onVideoDone}
                />
                <div className="inside">
                  <span className="label">{"// whats_inside"}</span>
                  <h3>Three web apps, plus mobile apps</h3>
                  <ul>
                    {m.inside.map((x) => (
                      <li key={x[1]}>
                        <i>
                          <Icon name={x[0]} />
                        </i>
                        <div>
                          <b>{x[1]}</b>
                          <span>{x[2]}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="ld-sec" id="keys" style={{ paddingTop: 8 }}>
            <div className="wrap">
              <SecHead
                n="03"
                code="demo_keys"
                title={`Grab a key for ${m.noun}`}
                aside={
                  <div className="pw">
                    Password for every key <code>{DEMO_PASSWORD[s.market!]}</code>
                    <button
                      className="ld-btn ld-btn-dark ld-btn-sm"
                      onClick={() => onCopy(DEMO_PASSWORD[s.market!], "Password")}
                    >
                      Copy
                    </button>
                  </div>
                }
              >
                One key per app. They all share one password, so you can switch
                roles in seconds.
              </SecHead>
              <div className="startrow">
                <div>
                  <b>
                    Not sure where to start? Take the {m.tour.length}-step tour.
                  </b>
                  <p>
                    {r
                      ? "Order as a customer, cook it in the kitchen, watch the delivery agent take it, then see it as the owner."
                      : "Shop two brands at once, ship to your hub, send one delivery, then see what the seller earns."}
                  </p>
                </div>
                <button className="ld-btn ld-btn-primary" onClick={onTour}>
                  Start the guided tour
                </button>
              </div>
              <div className="rail">
                <div className="kgrid">
                  {ROLE_ORDER.map((role, i) => {
                    const k = m.roles[role];
                    const key = DEMO_KEYS[s.market!][role];
                    return (
                      <article
                        key={role}
                        className={`key ${["k-c", "k-v", "k-a"][i]}`}
                      >
                        <i className="hole" aria-hidden="true" />
                        <div>
                          <span className="kl">{`// key_0${i + 1} · ${k.app.toLowerCase()}`}</span>
                          <h3>{k.label}</h3>
                        </div>
                        <p>{k.sees}</p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                          }}
                        >
                          <div className="fld">
                            <div>
                              <em>Email</em>
                              <code>{key.email}</code>
                            </div>
                            <button
                              aria-label={`Copy email for ${k.label}`}
                              onClick={() => onCopy(key.email, "Email")}
                            >
                              Copy
                            </button>
                          </div>
                          <div className="fld">
                            <div>
                              <em>Password</em>
                              <code>{DEMO_PASSWORD[s.market!]}</code>
                            </div>
                            <button
                              aria-label="Copy password"
                              onClick={() => onCopy(DEMO_PASSWORD[s.market!], "Password")}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <a
                          className="go"
                          href={key.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {key.open}
                          <ArrowIcon sw={2.4} />
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
              <div className="safe">
                <div>
                  <Svg size={20}>
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </Svg>
                  Payments run in test mode. No card is charged.
                </div>
                <div>
                  <Svg size={20}>
                    <path d="M4 6h16v12H4z" />
                    <path d="M4 6l8 7 8-7" />
                  </Svg>
                  Emails and texts are switched off.
                </div>
                <div>
                  <Svg size={20}>
                    <circle cx="9" cy="8" r="3.5" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M2.5 20c.8-3.4 3.4-5.2 6.5-5.2s5.7 1.8 6.5 5.2M15.5 14.6c2.6.1 4.6 1.8 5.2 4.4" />
                  </Svg>
                  Shared demo store. You may see other visitors’ test orders.
                </div>
                <div>
                  <Svg size={20}>
                    <path d="M3 12a9 9 0 1 0 3-6.7" />
                    <path d="M3 4v5h5" />
                  </Svg>
                  <span>{RESET_NOTE}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="ld-sec" id="mobileSec" style={{ paddingTop: 8 }}>
            <div className="wrap">
              <div className="mobapps">
                <div>
                  <span className="label">{"// mobile_apps"}</span>
                  <h2>Mobile apps for every persona</h2>
                  <p>
                    Customers, sellers and delivery agents each get a native iOS and Android app. Apps have to be installed on a phone, so this
                    self-demo runs the web apps.
                  </p>
                </div>
                <div className="mphones">
                  {m.mobile.map((x, i) => (
                    <div key={x[1]} className="mph">
                      <div className="nb" />
                      <i>
                        <Icon name={x[0]} />
                      </i>
                      <b>{x[1]}</b>
                      <span>{x[2]}</span>
                      <small className={i === 2 ? "pv" : ""}>{i === 2 ? "Preview in the tour" : "iOS · Android"}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="ld-sec" id="tourSec" style={{ paddingTop: 8 }}>
            <div className="wrap">
              <div className="tourg">
                <div>
                  <SecHead
                    n="04"
                    code="guided_tour"
                    title={`Follow the ${m.tour.length}-step tour`}
                    style={{ marginBottom: 22 }}
                  >
                    {r
                      ? "Tips pop up inside the apps and walk you through one order, from the customer to the kitchen to you."
                      : "Tips pop up inside the apps and walk you through one order, from the customer to two brands, your hub and back."}
                  </SecHead>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div className="box">
                      <h3>Open to explore</h3>
                      <p>{m.open}</p>
                    </div>
                    <div className="box">
                      <h3>
                        <Svg size={16}>
                          <rect x="7" y="2" width="10" height="20" rx="2.5" />
                          <path d="M11 18h2" />
                        </Svg>
                        Delivery agent app (mobile)
                      </h3>
                      <p>{m.drv}</p>
                    </div>
                    <div className="box dash">
                      <h3>
                        <LockIcon size={16} />
                        Unlocked in your own marketplace
                      </h3>
                      <p>{m.locked}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <ol className="tl">
                    {m.tour.map((t, i) => (
                      <li key={i}>
                        <b>0{i + 1}</b>
                        <div>
                          {t[0]
                            .replace("Your order {order}", "The order")
                            .replace("order {order}", "the order")}
                          <br />
                          <small>{t[4] || m.roles[t[1]].app}</small>
                        </div>
                      </li>
                    ))}
                    <li>
                      <b style={{ borderStyle: "dashed" }}>+</b>
                      <div>
                        Try the extra tours, or try{" "}
                        {r ? "Fashion" : "Restaurant"}.
                      </div>
                    </li>
                  </ol>
                  <div style={{ marginTop: 22 }}>
                    <h3 style={{ fontSize: 20, marginBottom: 12 }}>
                      Short extra tours
                    </h3>
                    <BonusList s={s} onBonus={onBonus} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="ld-sec band">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="label">{"// faq"}</span>
              <h2>Questions about the demo</h2>
            </div>
          </div>
          <div className="faq">
            {FAQS.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SecHead({
  n,
  code,
  title,
  children,
  aside,
  style,
}: {
  n: string;
  code: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="sec-h" style={style}>
      <div>
        <span className="label stepnum">
          <i>{n}</i>
          {"// " + code}
        </span>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      {aside}
    </div>
  );
}

function BonusList({
  s,
  onBonus,
  label,
}: {
  s: Store;
  onBonus: (k: string) => void;
  label?: string;
}) {
  return (
    <div className="bonus">
      {Object.entries(M(s).bonus).map(([k, b]) => (
        <button key={k} onClick={() => onBonus(k)}>
          <span>
            <b>{b.title}</b>
            <small>{b.desc}</small>
          </span>
          <em>
            {label || `${b.steps.length} step${b.steps.length > 1 ? "s" : ""}`}
          </em>
        </button>
      ))}
    </div>
  );
}

/* ================================ APP ================================ */

function AppShell({
  s,
  ctx,
  screenRef,
  onScreen,
  onLock,
  onMobile,
}: {
  s: Store;
  ctx: ScreenCtx;
  screenRef: React.RefObject<HTMLElement | null>;
  onScreen: (id: NonNullable<Store["screen"]>) => void;
  onLock: (name: string) => void;
  onMobile: () => void;
}) {
  const m = M(s);
  const k = m.roles[s.role];
  const screen =
    s.screen && k.screens.includes(s.screen) ? s.screen : k.screens[0];
  const vendorName = isR(s) ? restName(s) : sellerName(s);
  const initials = (x: string) =>
    x
      .split(" ")
      .filter((w) => /^[A-Z]/.test(w))
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
  const ini = initials(s.role === "vendor" ? vendorName : m.brand);
  const title = s.role === "admin" ? `${m.brand} owner` : s.role === "vendor" ? vendorName : m.brand;
  return (
    <div className="app">
      <nav className="side" aria-label="Screens">
        <div className="brand">
          <span className="bl">{ini}</span>
          <span className="bt">
            <b>{title}</b>
            <span>{k.app} · demo</span>
          </span>
        </div>
        <div className="grp">{"// " + k.label.toLowerCase()}</div>
        {k.screens.map((id) => (
          <button
            key={id}
            className="ld-nv"
            aria-current={id === screen ? "page" : undefined}
            onClick={() => onScreen(id)}
          >
            {TITLES[id]}
          </button>
        ))}
        <div className="grp">{"// mobile_apps"}</div>
        <button className="ld-nv" onClick={onMobile}>
          Mobile apps
          <span className="b" style={{ fontSize: 11 }}>
            iOS · Android
          </span>
        </button>
        <div className="grp">{"// in_your_own_marketplace"}</div>
        {k.locked.map((l) => (
          <button key={l} className="ld-nv lk" onClick={() => onLock(l)}>
            {l}
            <LockIcon />
          </button>
        ))}
      </nav>
      <main
        className="main"
        tabIndex={-1}
        ref={screenRef as React.RefObject<HTMLElement>}
      >
        {SCREENS[screen](ctx)}
      </main>
    </div>
  );
}

function TourTip({
  s,
  onNext,
  onBack,
  onSkip,
}: {
  s: Store;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}) {
  const m = M(s);
  const st = steps(s);
  const t = st[s.step];
  const n = st.length;
  const ctxLine = tipCtx(s);
  const icon =
    t[4] && /Delivery agent/.test(t[4])
      ? "car"
      : t[4]
        ? "kds"
        : m.roles[t[1]].icon;
  return (
    <div
      className="tip tip-pop"
      role="dialog"
      aria-live="polite"
      aria-label="Tour tip"
    >
      <div className="spread">
        <span className="who">
          <Icon name={icon} size={14} /> {t[4] || m.roles[t[1]].app}
          {s.tourKey !== "main" ? ` · ${m.bonus[s.tourKey].title}` : ""}
        </span>
        <span className="who" style={{ color: "var(--ink-muted)" }}>
          {s.step + 1} / {n}
        </span>
      </div>
      <p>{t[0].replace("{order}", isR(s) ? s.orderNo : s.fOrderNo)}</p>
      {ctxLine && <p className="ctx">{ctxLine}</p>}
      <div className="bars">
        {st.map((_, i) => (
          <i key={i} className={i <= s.step ? "on" : ""} />
        ))}
      </div>
      <div className="spread">
        <button className="skip" onClick={onSkip}>
          Skip tour
        </button>
        <div className="row" style={{ gap: 6 }}>
          <button
            className="bk"
            onClick={onBack}
            disabled={s.step === 0}
            style={{ visibility: s.step === 0 ? "hidden" : "visible" }}
          >
            Back
          </button>
          <button className="next" onClick={onNext}>
            {s.step === n - 1 ? "Finish tour" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================ MODALS ================================ */

function ModalBody({
  modal,
  s,
  onClose,
  onBonus,
  onSwitch,
  onMainTour,
  onWatchDriver,
  onNotify,
}: {
  modal: ModalState;
  s: Store;
  onClose: () => void;
  onBonus: (k: string) => void;
  onSwitch: (m: MarketId) => void;
  onMainTour: () => void;
  onWatchDriver: () => void;
  onNotify: (name: string, email: string) => void;
}) {
  const m = M(s);
  const r = isR(s);
  const talk = (
    <Link className="ld-btn ld-btn-primary" style={{ flex: 1 }} href="/contact">
      Talk to our team
    </Link>
  );

  if (modal.kind === "notify")
    return (
      <NotifyForm
        name={SOON.find((x) => x.id === modal.id)!.name}
        onNotify={onNotify}
      />
    );

  if (modal.kind === "lock")
    return (
      <>
        <div className="lockic">
          <LockIcon size={26} />
        </div>
        <h2 id="mTitle">{modal.name}</h2>
        <p>This unlocks once we set up your own marketplace. Talk to our team.</p>
        <div className="row">
          {talk}
          <button
            className="ld-btn ld-btn-line"
            style={{ flex: 1 }}
            onClick={onClose}
          >
            Keep exploring
          </button>
        </div>
      </>
    );

  if (modal.kind === "driver")
    return (
      <>
        <h2 id="mTitle">Mobile apps for every persona</h2>
        <p>
          Each persona gets a native iOS and Android app. Apps have to be installed on a phone, so this self-demo runs the web apps instead.
        </p>
        <div className="applist">
          {m.mobile.map((x) => (
            <div key={x[1]}>
              <i>
                <Icon name={x[0]} />
              </i>
              <span>
                <b>{x[1]}</b>
                {x[2]}
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 15 }}>
          You can still see the delivery step: after {r ? "the kitchen marks an order ready" : "you dispatch from your hub"}, a preview shows a
          delivery agent taking the job and delivering it.
        </p>
        <div className="row">
          <button className="ld-btn ld-btn-primary" style={{ flex: 1 }} onClick={onWatchDriver}>
            Watch the delivery preview
          </button>
        </div>
      </>
    );

  if (modal.kind === "more")
    return (
      <>
        <h2 id="mTitle">More {m.name.toLowerCase()} tours</h2>
        <p>Short tours for the parts of Nipige the main tour skips.</p>
        <div className="bonus">
          <button onClick={onMainTour}>
            <span>
              <b>Main tour</b>
              <small>One full order, start to finish.</small>
            </span>
            <em>{m.tour.length} steps</em>
          </button>
          {Object.entries(m.bonus).map(([k, b]) => (
            <button key={k} onClick={() => onBonus(k)}>
              <span>
                <b>{b.title}</b>
                <small>{b.desc}</small>
              </span>
              <em>
                {b.steps.length} step{b.steps.length > 1 ? "s" : ""}
              </em>
            </button>
          ))}
        </div>
      </>
    );

  if (modal.kind === "size")
    return (
      <>
        <h2 id="mTitle">Size guide: jeans</h2>
        <p>
          Measure your waist at the narrowest point. Between sizes? Go up for
          Slim fit.
        </p>
        <Table
          head={["Size", "Waist (in)", "Hip (in)", "Inseam (in)"]}
          rows={[
            [28, "28–29", "35", "30"],
            [30, "30–31", "37", "30"],
            [32, "32–33", "39", "32"],
            [34, "34–35", "41", "32"],
            [36, "36–37", "43", "32"],
          ]}
        />
        <button className="ld-btn ld-btn-line" onClick={onClose}>
          Close
        </button>
      </>
    );

  // tour complete
  const other: MarketId = r ? "fashion" : "restaurant";
  return (
    <>
      <span className="label">{"// tour_complete"}</span>
      <h2 id="mTitle">
        {modal.main
          ? `You’ve just run ${m.noun}.`
          : `Done: ${m.bonus[modal.tourKey].title}.`}
      </h2>
      <p>
        {modal.main
          ? r
            ? "Customer, restaurant, kitchen, delivery agent and owner, all in a few minutes."
            : "Customer, two brands, your hub, the delivery agent and the owner, all in a few minutes."
          : "Try another short tour, or switch marketplace."}
      </p>
      <div className="row">
        <button
          className="ld-btn ld-btn-primary"
          style={{ flex: 1 }}
          onClick={() => onSwitch(other)}
        >
          Try {D[other].name}
        </button>
      </div>
      <div className="bonus">
        {Object.entries(m.bonus)
          .filter(([k]) => k !== modal.tourKey)
          .map(([k, b]) => (
            <button key={k} onClick={() => onBonus(k)}>
              <span>
                <b>{b.title}</b>
                <small>{b.desc}</small>
              </span>
              <em>Start</em>
            </button>
          ))}
      </div>
      <button className="ld-btn ld-btn-ghost" onClick={onClose}>
        Keep exploring on my own
      </button>
    </>
  );
}

function NotifyForm({
  name,
  onNotify,
}: {
  name: string;
  onNotify: (name: string, email: string) => void;
}) {
  const [v, setV] = useState("");
  const [err, setErr] = useState("");
  return (
    <>
      <h2 id="mTitle">{name} demo</h2>
      <p>
          . Leave your email and we’ll send the link
        the day it’s live.
      </p>
      <form
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
        onSubmit={(e) => {
          e.preventDefault();
          const email = v.trim();
          if (!EMAIL_RE.test(email)) {
            setErr("Enter an email address like you@company.com.");
            return;
          }
          onNotify(name, email);
        }}
      >
        <div className="f">
          <label htmlFor="ne">Email</label>
          <input
            id="ne"
            type="email"
            autoComplete="email"
            value={v}
            onChange={(e) => setV(e.target.value)}
          />
        </div>
        <p className="err" role="alert">
          {err}
        </p>
        <button className="ld-btn ld-btn-primary" type="submit">
          Notify me
        </button>
      </form>
    </>
  );
}
