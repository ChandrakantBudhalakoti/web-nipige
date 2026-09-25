import type { Config } from "tailwindcss";

/**
 * Design tokens mirror the original `:root` custom properties from the
 * single-file prototype so utilities and the ported globals.css stay in sync.
 */
const config: Config = {
  // The site's theme toggle sets `data-theme="dark"|"light"` on <html> (see
  // ThemeToggle.tsx / layout.tsx), not a "dark" class — so `dark:` utilities
  // must key off that attribute instead of Tailwind's default media-query strategy.
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080E1A",
        bg2: "#0C1628",
        bg3: "#111D33",
        cd: "#131E30",
        cy: "#06B6D4",
        cyb: "#22D3EE",
        w: "#F1F5F9",
        wm: "#94A3B8",
        wd: "#4B5B73",
        am: "#F59E0B",
        // alpha tokens
        cyg: "rgba(6, 182, 212, .05)",
        cyr: "rgba(6, 182, 212, .1)",
        wb: "rgba(255, 255, 255, .06)",
        ag: "rgba(245, 158, 11, .05)",
        ar: "rgba(245, 158, 11, .12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        hero: ["clamp(34px, 4.2vw, 52px)", { lineHeight: "1.06" }],
        "section-title": ["clamp(24px, 3vw, 38px)", { lineHeight: "1.1" }],
      },
      maxWidth: {
        container: "1120px",
      },
      keyframes: {
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".4" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
