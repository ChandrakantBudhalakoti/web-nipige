"use client";

import { useEffect, useRef, useState } from "react";
import { D, G, MARKET_IDS, SCRIPTS, VIDEO_LENGTH, VIDEOS, type PlayerKey, type SceneKind } from "./data";
import { MarketIcon, PlayIcon } from "./icons";

const DUR = 30000;

const PauseGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);
const PlayGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M8 5l12 7-12 7z" />
  </svg>
);

const Lines = ({ n }: { n: number }) => (
  <div className="sb">
    {Array.from({ length: n }, (_, i) => (
      <div key={i} className={`ln${i === 0 ? " p" : ""}`} />
    ))}
  </div>
);

/** Animated stand-in shown until a real video URL is configured in VIDEOS. */
function Scene({ kind, videoKey }: { kind: SceneKind; videoKey: PlayerKey }) {
  if (kind === "pick")
    return (
      <div className="trio">
        {MARKET_IDS.map((id, i) => (
          <div key={id} className={`vcard mock${i === 0 ? " on" : ""}`}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,.18)", display: "grid", placeItems: "center" }}>
              <MarketIcon id={id} size={16} />
            </span>
            <b>{D[id].name}</b>
            <em>{D[id].price ? `from ${D[id].price}/mo` : "New"}</em>
          </div>
        ))}
      </div>
    );
  if (kind === "phone")
    return (
      <div style={{ display: "flex", gap: "5%", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <div className="mock phone">
          <div className="nb" />
          <div className="ln s" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="tile">
              <i style={{ background: G[i] }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="ln" />
                <div className="ln s" />
              </div>
            </div>
          ))}
          <div className="ln p" style={{ height: 16, marginTop: "auto" }} />
        </div>
        <div className="mock phone" style={{ transform: "translateY(14px)" }}>
          <div className="nb" />
          <div style={{ aspectRatio: "4/3", borderRadius: 9, background: G[1] }} />
          <div className="ln" />
          <div className="ln s" />
          <div className="ln p" style={{ height: 16, marginTop: "auto" }} />
        </div>
      </div>
    );
  if (kind === "panel")
    return (
      <div className="mock desk">
        <Lines n={5} />
        <div className="desk-mn">
          <div className="ln s" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="tile" style={{ justifyContent: "space-between" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="ln" />
                <div className="ln s" />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: i === 0 ? "#818CF8" : "rgba(255,255,255,.1)",
                }}
              >
                {i === 0 ? "Accept" : videoKey === "fashion" ? "Shipped" : "Ready"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  if (kind === "admin")
    return (
      <div className="mock desk">
        <Lines n={5} />
        <div className="desk-mn">
          <div className="kpis">
            {["$48.2K", "1,284", "$5.8K"].map((v) => (
              <div key={v} className="kpi">
                <span className="ln s" />
                <b>{v}</b>
              </div>
            ))}
          </div>
          <div className="chart">
            {[40, 62, 48, 75, 58, 88, 70, 96].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  if (kind === "map")
    return (
      <div
        className="mock"
        style={{
          width: "min(70%,420px)",
          aspectRatio: "16/10",
          position: "relative",
          overflow: "hidden",
          background:
            "repeating-linear-gradient(0deg,transparent 0 30px,rgba(255,255,255,.05) 30px 31px),repeating-linear-gradient(90deg,transparent 0 44px,rgba(255,255,255,.05) 44px 45px),#151827",
        }}
      >
        <svg viewBox="0 0 100 60" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M12 48 C 30 40, 40 20, 60 24 S 82 14, 88 12" fill="none" stroke="#818CF8" strokeWidth="1.6" strokeDasharray="3 2" />
        </svg>
        <span className="pin2" style={{ left: "10%", top: "74%" }} />
        <span className="pin2" style={{ left: "86%", top: "14%", background: "#F59E0B" }} />
        <span style={{ position: "absolute", left: "8%", top: "8%", fontSize: 11, background: "rgba(0,0,0,.5)", padding: "4px 8px", borderRadius: 6 }}>
          Arriving in 6 min
        </span>
      </div>
    );
  return (
    <div className="endc">
      <span className="ld-logo">nipige</span>
      <span>{videoKey === "overview" ? "Now try it yourself. No sign-up." : "Pick a view below and try it."}</span>
    </div>
  );
}

function embedSrc(src: string) {
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&cc_load_policy=1`;
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
}

export function Player({
  videoKey,
  onPlay,
  onComplete,
}: {
  videoKey: PlayerKey;
  onPlay: (title: string) => void;
  onComplete: () => void;
}) {
  const sc = SCRIPTS[videoKey];
  const src = VIDEOS[videoKey];
  const [started, setStarted] = useState(false);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Animation loop
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      tRef.current += now - last;
      last = now;
      if (tRef.current >= DUR) {
        tRef.current = DUR;
        setT(DUR);
        setPlaying(false);
        onComplete();
        return;
      }
      setT(tRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, onComplete]);

  // Pause when scrolled out of view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || src) return;
    const io = new IntersectionObserver((es) => es.forEach((en) => !en.isIntersecting && setPlaying(false)));
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const seek = (ms: number) => {
    tRef.current = ms;
    setT(ms);
  };
  const play = () => {
    if (tRef.current >= DUR) seek(0);
    setPlaying(true);
  };

  const idx = Math.min(sc.scenes.length - 1, Math.floor(t / (DUR / sc.scenes.length)));
  const sec = Math.floor(t / 1000);
  const embed = src ? embedSrc(src) : null;

  return (
    <div className="player" ref={rootRef}>
      <div className="frame">
        {started && src ? (
          embed ? (
            <iframe src={embed} title={sc.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          ) : (
            <video src={src} controls autoPlay playsInline />
          )
        ) : null}
        {!src && (
          <>
            <div className="stage" />
            {started && (
              <div key={idx} className="scene in" aria-hidden="true">
                <Scene kind={sc.scenes[idx][1]} videoKey={videoKey} />
              </div>
            )}
            <div className="cap" aria-live="polite">
              {started ? sc.scenes[idx][0] : ""}
            </div>
            <div className="ctrl">
              <button className="pp" aria-label={playing ? "Pause" : "Play"} onClick={() => (playing ? setPlaying(false) : play())}>
                {playing ? <PauseGlyph /> : <PlayGlyph />}
              </button>
              <div
                className="bar"
                role="progressbar"
                aria-label="Video progress"
                aria-valuemin={0}
                aria-valuemax={30}
                aria-valuenow={sec}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  seek(Math.max(0, Math.min(DUR - 1, ((e.clientX - r.left) / r.width) * DUR)));
                  setPlaying(true);
                }}
              >
                <i style={{ width: `${(t / DUR) * 100}%` }} />
              </div>
              <time>{`0:${String(sec).padStart(2, "0")} / 0:30`}</time>
              <button
                className="rs"
                aria-label="Replay"
                onClick={() => {
                  seek(0);
                  setPlaying(true);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              </button>
            </div>
          </>
        )}
        {!started && (
          <button
            className="poster"
            aria-label={`Play ${sc.title}`}
            onClick={() => {
              setStarted(true);
              onPlay(sc.title);
              if (!src) play();
            }}
          >
            <span className="play">
              <PlayIcon />
            </span>
            <b>{sc.title}</b>
            <small>
              {sc.sub} · {src ? VIDEO_LENGTH[videoKey] : "0:30"}
            </small>
          </button>
        )}
      </div>
      <div className="vmeta">
        <span>
          <b>{sc.title}</b> · {src ? VIDEO_LENGTH[videoKey] : "captions on"}
        </span>
        <span>{videoKey === "overview" ? "Not sure which to pick? Start here." : "Then grab a demo key below"}</span>
      </div>
    </div>
  );
}
