"use client";

import { useState } from "react";

interface CaseLogoProps {
  /** Remote logo URL; if absent or it fails to load, a monogram is shown. */
  src?: string;
  /** Client name - drives the monogram initials and alt text. */
  name: string;
  /** Accent colour (hex) for the monogram tile. */
  color: string;
  /** Square size in px. */
  size?: number;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .filter((ch) => ch && /[A-Za-z0-9]/.test(ch))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Brand mark for a case study. Tries the remote logo first and gracefully
 * falls back to a coloured monogram tile so a broken URL never shows.
 */
export function CaseLogo({ src, name, color, size = 56 }: CaseLogoProps) {
  const [failed, setFailed] = useState(false);
  const showMonogram = !src || failed;

  if (showMonogram) {
    return (
      <span
        className="case-logo case-logo--mono"
        style={{
          width: size,
          height: size,
          fontSize: Math.round(size * 0.36),
          background: color,
        }}
        aria-label={`${name} logo`}
        role="img"
      >
        {initialsOf(name)}
      </span>
    );
  }

  return (
    <span className="case-logo" style={{ width: size, height: size }}>
      {/* Plain img (not next/image) keeps remote hosts config-free. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
