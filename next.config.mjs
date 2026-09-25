// Temporary build-time diagnostic: confirms whether RECAPTCHA_SECRET_KEY is
// visible to the build container at all (separate question from whether it
// reaches the deployed SSR runtime - check /api/diag-env for that). Look for
// this line in the Amplify build log. Remove once the env var issue is resolved.
console.log(
  "[build-diag] RECAPTCHA_SECRET_KEY visible at build time:",
  Boolean(process.env.RECAPTCHA_SECRET_KEY),
  "| NEXT_PUBLIC_RECAPTCHA_SITE_KEY visible at build time:",
  Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Conservative: no includeSubDomains/preload, so this can't affect the
          // separate CloudFront-hosted subdomains (admin, automation, etc).
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Canonicalize non-www → www (www.nipige.com is the canonical domain)
      {
        source: "/:path*",
        has: [{ type: "host", value: "nipige.com" }],
        destination: "https://www.nipige.com/:path*",
        permanent: true,
      },
      // Legacy solution URLs → current solution URLs
      { source: "/solutions/etransactions", destination: "/solutions", permanent: true },
      { source: "/solutions/food-delivery", destination: "/solutions/restaurant", permanent: true },
      { source: "/solutions/food", destination: "/solutions/restaurant", permanent: true },
      { source: "/solutions/real-estate", destination: "/solutions/realestate", permanent: true },
      { source: "/solutions/services-marketplace", destination: "/solutions/services", permanent: true },
      { source: "/solutions/super-app", destination: "/solutions", permanent: true },
      { source: "/solutions/home-service-platform", destination: "/solutions/services", permanent: true },
      { source: "/solutions/restaurant-aggregator-platform", destination: "/solutions/restaurant", permanent: true },
      { source: "/solutions/services/petflok", destination: "/solutions/services/pet-service", permanent: true },
      // Not currently sold verticals — retired per the 2026-07-20 index audit
      { source: "/solutions/grocery", destination: "/solutions", permanent: true },
      { source: "/solutions/travel", destination: "/solutions", permanent: true },
      { source: "/solutions/entertainment", destination: "/solutions", permanent: true },
      { source: "/solutions/sports", destination: "/solutions", permanent: true },
      { source: "/solutions/superapp", destination: "/solutions", permanent: true },
      { source: "/solutions/fitness", destination: "/solutions", permanent: true },
      // Legacy /templates/* URLs → /solutions/*
      { source: "/templates", destination: "/solutions", permanent: true },
      { source: "/templates/:slug*", destination: "/solutions/:slug*", permanent: true },
      // Broken links (July 8-10) → closest existing post
      { source: "/blog/how-to-scale-a-marketplace-business", destination: "/blogs/build-marketplace-like-airbnb", permanent: true },
      { source: "/blogs/how-to-scale-a-marketplace-business", destination: "/blogs/build-marketplace-like-airbnb", permanent: true },
      { source: "/blog/launch-platform-in-14-days", destination: "/blogs/build-marketplace-like-airbnb", permanent: true },
      { source: "/blogs/launch-platform-in-14-days", destination: "/blogs/build-marketplace-like-airbnb", permanent: true },
      { source: "/blog/marketplace-business-model", destination: "/blogs/doordash-business-model", permanent: true },
      { source: "/blogs/marketplace-business-model", destination: "/blogs/doordash-business-model", permanent: true },
      { source: "/blog/on-demand-delivery-platforms", destination: "/blogs/doordash-business-model", permanent: true },
      { source: "/blogs/on-demand-delivery-platforms", destination: "/blogs/doordash-business-model", permanent: true },
      { source: "/clone/airbnb", destination: "/blogs/build-marketplace-like-airbnb", permanent: true },
      { source: "/how-to-build/how-does-doordash-make-money", destination: "/blogs/doordash-business-model", permanent: true },
      // Legacy /blog/* URLs → /blogs/*
      { source: "/blog/:slug*", destination: "/blogs/:slug*", permanent: true },
      // Legacy case-study URLs
      { source: "/case-studies/lirs", destination: "/case-studies/lirs-tax-system", permanent: true },
      { source: "/case-studies/the-lions-app", destination: "/case-studies/lions-cricket", permanent: true },
      { source: "/case-studies/heartland-flood", destination: "/case-studies/heartland-workforce", permanent: true },
      // Retired blog post — folded into the dedicated comparison page
      { source: "/blogs/sharetribe-alternatives", destination: "/compare/sharetribe-alternatives", permanent: true },
    ];
  },
};

export default nextConfig;
