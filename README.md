# Nipige Website

Marketing site for Nipige, refactored from a single-file HTML prototype into a
production-ready **Next.js (App Router) + TypeScript + Tailwind** project.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (strict)
- **Tailwind CSS** - design tokens mirror the original `:root` custom properties
- **react-markdown + gray-matter** for the MDX blog

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # eslint
npm run typecheck            # tsc --noEmit
```

## Project structure

```
app/                     # routes (App Router)
  page.tsx               # landing page
  templates/[slug]/      # dynamic template detail (generateStaticParams)
  case-studies/[slug]/   # dynamic case-study detail
  blogs/[slug]/           # dynamic blog post (reads content/blog/*.mdx)
  sitemap.ts, robots.ts  # generated SEO routes
components/              # layout, ui, and per-surface components
lib/
  data/                  # templates, cases, testimonials, pricing
  types.ts               # domain types
  blog.ts                # MDX loader
  seo.ts                 # site config + metadata helpers
content/blog/            # MDX posts
app/globals.css          # design tokens + ported component styles
tailwind.config.ts       # token theme mapping
```

## Design fidelity

The original prototype's stylesheet is ported into `app/globals.css` using the
same class names and CSS custom properties, so the dark theme, cyan accent,
gradients, and animations render identically. Tailwind is configured with the
same tokens (`bg`, `cy`, `wm`, …) for new/layout work.

## Content

All marketing copy lives in `lib/data/*` and `content/blog/*`. To add a
template, case study, or post, edit the corresponding data file or drop a new
`.mdx` file in `content/blog/` - routes and the sitemap update automatically.

## Notes

- The demo form (`/demo`) validates client-side and includes a honeypot but has
  no backend wired - connect it to an API route or CRM in `DemoForm.tsx`.
- Testimonials are flagged as placeholders in `lib/data/testimonials.ts`.
- Replace `public/og.png` with a real 1200×630 OpenGraph image.
