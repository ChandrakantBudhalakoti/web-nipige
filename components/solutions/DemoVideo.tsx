"use client";

import { useState } from "react";

/**
 * Click-to-play YouTube facade: shows the thumbnail + a play button and only
 * loads the actual YouTube iframe (and its tracking/JS) after the user clicks,
 * so the page doesn't pay YouTube's load cost until someone wants the video.
 */
export function DemoVideo({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid var(--wb)",
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid var(--wb)",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        background: "#000",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail, not a local/optimizable asset */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }}
        alt={title}
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <span
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#111" style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
