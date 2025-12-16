import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nipige - SaaS Platform for Digital Commerce & E-enablement",
  description: "Transform your business with Nipige's configurable digital commerce platform. Build, manage, and scale your online business across multiple industries.",
  keywords: "SaaS, digital commerce, e-commerce platform, farm-to-home, multi-channel integration, business automation",
  authors: [{ name: "Nipige" }],
  creator: "Nipige",
  publisher: "Nipige",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nipige.com",
    title: "Nipige - SaaS Platform for Digital Commerce & E-enablement",
    description: "Transform your business with Nipige's configurable digital commerce platform.",
    images: [
      {
        url: "https://nipige.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nipige - Digital Commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nipige - SaaS Platform for Digital Commerce & E-enablement",
    description: "Transform your business with Nipige's configurable digital commerce platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
