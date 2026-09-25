import type { ReactNode } from "react";
import type { ArtName, IconName, MarketId } from "./data";

export function Svg({ size, sw = 2, children }: { size: number; sw?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const LockIcon = ({ size = 15 }: { size?: number }) => (
  <Svg size={size}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
);

export const CheckIcon = ({ size = 15, sw = 3 }: { size?: number; sw?: number }) => (
  <Svg size={size} sw={sw}>
    <path d="M5 12l5 5 9-10" />
  </Svg>
);

export const HeartIcon = ({ size = 20 }: { size?: number }) => (
  <Svg size={size}>
    <path d="M12 20s-7-4.4-9-8.6C1.6 8.3 3.6 5 6.8 5c2 0 3.4 1.1 4.2 2.4C11.8 6.1 13.2 5 15.2 5c3.2 0 5.2 3.3 3.8 6.4C19 15.6 12 20 12 20z" />
  </Svg>
);

export const ArrowIcon = ({ sw = 2.2 }: { sw?: number }) => (
  <Svg size={16} sw={sw}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const PlayIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M8 5l12 7-12 7z" />
  </svg>
);

const ICON_PATHS: Record<IconName, ReactNode> = {
  cust: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </>
  ),
  vend: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v11h16V9" />
      <path d="M3 9h18" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  admin: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  car: (
    <>
      <path d="M5 17h14l-1.5-6h-11z" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
    </>
  ),
  kds: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

export const Icon = ({ name, size = 20 }: { name: IconName; size?: number }) => <Svg size={size}>{ICON_PATHS[name]}</Svg>;

const MARKET_PATHS: Record<MarketId, ReactNode> = {
  restaurant: (
    <>
      <path d="M7 2v20" />
      <path d="M4 2v6a3 3 0 0 0 6 0V2" />
      <path d="M17 2c-2 2-3 4.5-3 8h3v12" />
    </>
  ),
  fashion: (
    <>
      <path d="M12 6a2 2 0 1 1 2-2" />
      <path d="M12 6v1.5L3 14a1.5 1.5 0 0 0 1 2.7h16a1.5 1.5 0 0 0 1-2.7l-9-6.5" />
    </>
  ),
};

export const MarketIcon = ({ id, size = 26 }: { id: MarketId; size?: number }) => (
  <Svg size={size} sw={1.8}>
    {MARKET_PATHS[id]}
  </Svg>
);

/** White line art shown on the coloured product/restaurant thumbnails. */
export function Art({ name, size }: { name: ArtName; size?: number }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: 1.5, width: size, height: size };
  if (name === "food")
    return (
      <svg {...common} strokeLinecap="round">
        <path d="M3 12h18a9 9 0 0 1-18 0z" />
        <path d="M8 8c0-2 2-2 2-4M12 8c0-2 2-2 2-4M16 8c0-2 2-2 2-4" />
      </svg>
    );
  if (name === "shirt")
    return (
      <svg {...common} strokeLinejoin="round">
        <path d="M8 3L3 6l2 4 2-1v12h10V9l2 1 2-4-5-3a4 4 0 0 1-8 0z" />
      </svg>
    );
  if (name === "basket")
    return (
      <svg {...common} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9h18l-2 11H5z" />
        <path d="M8 9l3-5M16 9l-3-5M9 13v4M15 13v4" />
      </svg>
    );
  return (
    <svg {...common} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="11" rx="1.5" />
      <path d="M2 19h20M10 15l-1 4M14 15l1 4" />
    </svg>
  );
}
