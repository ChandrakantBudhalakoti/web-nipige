import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { organizationJsonLd, siteConfig } from "@/lib/seo";

const GA_MEASUREMENT_ID = "G-923YSZLKWK";
const GA_MEASUREMENT_ID_2 = "G-NSTVH2HEJE";

// Self-hosted (not next/font/google): Google's CDN was intermittently 404ing on
// JetBrains Mono's bundled file hash, which made next/font silently fall back to
// Arial for all three fonts sitewide. These are the same variable fonts, saved
// locally, so the build no longer depends on a live fetch to Google Fonts.
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

const jakarta = localFont({
  src: "./fonts/BricolageGrotesque-Variable.woff2",
  weight: "400 800",
  variable: "--font-jakarta",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "400 500",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nipigehq",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${siteConfig.name} Blog` }] },
  },
  verification: {
    google: "qbWFhgbh0h790yRmGl8Kzatj16r6qcqbI1P2oXEOzwo",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('nipige-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GA_MEASUREMENT_ID_2}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
