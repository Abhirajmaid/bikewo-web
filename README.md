# BikeWo — bikewo.in

Cinematic marketing site for **BikeWo Green Tech Limited**, built to the
Website Requirement Specification (WRS) v3.0 and the BikeWo Brand
Guidelines v1.0.

```
bikewo-web/
├── client/     Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP · Framer Motion · R3F
└── server/     Strapi 5 (TypeScript) on local SQLite — scaffolded, no content types yet
```

## Running it

```bash
cd client && npm run dev
```

```bash
cd server && npm run develop
```

The client runs on `http://localhost:3000`, Strapi on `http://localhost:1337`.
They are not wired together yet — the homepage reads from
`client/src/lib/content.ts`, which is the seam the CMS will replace.

## What is built

**The homepage is complete** and implements WRS §5 in order:

| §    | Section                   | Component                       |
| ---- | ------------------------- | ------------------------------- |
| 5.1  | Hero experience           | `home/Hero.tsx`                 |
| 5.2  | BikeWo at a glance        | `home/Glance.tsx`               |
| 5.3  | Interactive EMI ecosystem | `home/Ecosystem.tsx`            |
| 5.4  | Business divisions        | `home/Divisions.tsx`            |
| 5.5  | Subsidiaries              | `home/Subsidiaries.tsx`         |
| 5.6  | Shram Sainik              | `home/ShramSainik.tsx`          |
| 5.7  | Sustainability & ESG      | `home/Sustainability.tsx`       |
| 5.8  | Customer success          | `home/Stories.tsx`              |
| 5.9  | Investors                 | `home/Investors.tsx`            |
| 5.10 | News & insights           | `home/News.tsx`                 |
| 5.11 | Careers                   | `home/Careers.tsx`              |
| 5.12 | Contact CTA               | `home/ContactCTA.tsx`           |
| 5.13 | Premium footer            | `layout/Footer.tsx` (global)    |

**Every other route in the WRS sitemap exists but is intentionally blank.**
All 38 of them render `components/page/PlaceholderPage.tsx`, which carries the
real route, breadcrumb, metadata and sibling navigation so the information
architecture can be reviewed end to end today. They are `noindex` until filled.

`src/lib/site.ts` is the single source of truth for the sitemap — it drives the
header mega-menu, the footer and every placeholder page. Adding a node there
does **not** create the page file; add the matching `src/app/**/page.tsx` too.

## Brand rules encoded in the system

These are the ones that break most often, so they are enforced in code rather
than left to review:

- **Green text on light surfaces is `green-700` (#17754F), never `green-500`.**
  BikeWo Green on white is 2.57:1 and fails WCAG AA.
- **Green buttons carry an Indigo label**, never white (`ui/Button.tsx`).
- Tailwind's stock `indigo` and `green` palettes are **reset and replaced** with
  the BikeWo ramps in `globals.css`, so a stray `text-indigo-500` cannot put an
  off-brand colour on the page.
- `cyan-700` and `amber-700` exist because the base signal colours fail AA as
  text on white (2.91:1 and 1.77:1). Use the base tones for bars and fills only.
- Body copy is never set in Poppins. Headings use `--font-display`, everything
  else uses `--font-sans`.
- Icons are 24×24, 2px stroke, round caps, no fills (`brand/Icons.tsx`).
- Never pure black — the darkest neutral is `ink` #14122B.

## Accessibility

WCAG 2.2 AA is a build requirement (WRS §16), not a review step.

- Contrast was audited in-browser against composited backgrounds. The only
  remaining sub-4.5:1 text is white type over photography, which sits on a
  Midnight scrim per Brand Guidelines 05.2.
- Focus is a 2px green outline at 2px offset. Note that Tailwind's
  `transition-colors` includes `outline-color` and will pin the ring to
  `currentColor` — `Button` uses an explicit transition list to avoid this.
- `prefers-reduced-motion` disables Lenis smooth scrolling, the GSAP hero
  timeline, counters, marquee and all entrance animations.
- Primary controls are ≥44px; secondary links ≥24px.

> **Careful with `useInView` / `viewport` margins.** A bare percentage like
> `"-15%"` insets the observer box horizontally as well as vertically, and
> narrow elements in the first grid column then never animate in. Always use
> the four-value form: `"0px 0px -15% 0px"`.

## Imagery

All plates in `client/public/assets/` are **AI-generated with Higgsfield
(Nano Banana 2)** and graded to Brand Guidelines 05.2 — cool white balance,
shadows lifted toward Indigo, no HDR, no lens flare, no third-party logos.

Two things must happen before launch:

1. **The people are not real.** `story-1/2/3.png` and `shram-sainik.png` depict
   AI-generated individuals. Brand policy forbids presenting them as real
   people. Replace with consenting subjects and signed model releases. The
   testimonial attributions in `lib/content.ts` are labelled `Placeholder —`
   for exactly this reason.
2. **Composite the real logo artwork** over any plate that needs a mark rather
   than relying on a generated one.

## Figures

Every number on the page is currently carried over from the brand book and is
surfaced with a qualifying footnote (`STATS_FOOTNOTE` in `lib/content.ts`,
rendered in the footer). Per Brand Guidelines 01.4, no performance figure ships
without its test conditions — replace the placeholder footnote with the real
qualification before launch.

## Not done yet

- Strapi content types, and wiring the homepage to the CMS.
- The 38 inner pages.
- Analytics (GA4, Clarity), CRM integration, sitemap.xml/robots.txt.
- Real copy review and legal sign-off on all claims.
