# AKMI International — Corporate Website

Corporate website for AKMI International, an Indian international trade company that starts with sourcing and exporting fresh fruits and vegetables.

Built with React 19, Vite, React Router, CSS Modules and Lucide icons. At build time every page is prerendered to static HTML, so each route ships with its own title, meta description and full content for search engines. The pages then hydrate into a React app.

## Getting started

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # client build + SSR build + prerender → dist/
npm run preview   # serve dist/ at http://localhost:4173 (behaves like a static host)
```

### Cloudflare (Workers static assets)

`wrangler.jsonc` is committed, so Cloudflare's Git integration can use build command `npm run build` and deploy command `npx wrangler deploy`. It serves `dist/` as static assets with clean URLs and a real 404 page. Without this file, `wrangler deploy` auto-configures the project, adds `@cloudflare/vite-plugin`, and that breaks the prerender step.

### Other hosts

`dist/` is a fully static site. Deploy it to any static host (Netlify, Vercel, Cloudflare Pages, S3/CloudFront, nginx). Configure the host so that:

- `/about` serves `/about/index.html` (clean URLs; this is the default on most hosts)
- unknown paths serve `/404.html` with status 404

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us: vision, mission, intent, three-stage path |
| `/products` | Product categories and an interest picker that pre-fills the contact form |
| `/process` | Five-stage export workflow and quality approach |
| `/global-trade` | Global trade ambition, buyer and sourcing partnerships |
| `/contact` | Enquiry form. `?interest=fruits\|vegetables\|other` pre-selects Product Interest |
| `/privacy-policy`, `/terms` | Clearly marked placeholders, pending approval |

## Project structure

```
public/
  akmi-logo.svg, akmi-logo-reversed.svg   official logo, extracted as vectors from the brand book
  images/                                 responsive WebP images (480–1600px)
  og-image.jpg, favicon.svg
scripts/prerender.mjs                     static HTML per route, robots.txt, sitemap.xml
src/
  content/        site.js (nav, contact details, socials), products.js, process.js
  components/     Header, MobileNavigation, Footer, Button, SectionHeading, ProductCard,
                  ProcessTimeline, EnquiryForm, CTASection, ScrollReveal, PageHero,
                  GlobeGraphic, TileMotif, Img, Logo
  pages/          one component + CSS module per page
  seo/            routes.js (titles and descriptions for every page), Seo.jsx
  styles/global.css   design tokens: colours, type scale, spacing, motion
```

### Adding a product category

Add an object to `productCategories` in `src/content/products.js`. The Products page, home preview, footer links and the enquiry form's Product Interest options all read from this array. Images go in `public/images/` as `<name>-<width>.webp`, with a matching entry in `src/content/image-manifest.json`.

## Brand implementation

- **Colours:** Transit Blue `#006BB1`, Cargo Black `#231F20` and white, with a warm-white and light-grey neutral used sparingly (`src/styles/global.css`).
- **Type:** Sora for headings and Manrope for body text, loaded from Google Fonts.
- **Logo:** the official mark, taken from the brand book's vector paths. The original proportions and clear space are kept. The reversed version (white wordmark, blue bar) is used on the dark footer.
- **Motif:** the brand book's stepped rounded-tile pattern is redrawn as SVG (`TileMotif`) and used sparingly as an accent.

## Still needed from AKMI International

These placeholders are deliberate. Nothing has been invented.

1. **Contact details:** set `email`, `phone` and `address` in `src/content/site.js`. Until then the footer and Contact page show "To be published" or "Official details to be published".
2. **Social profiles:** add official URLs to `socialLinks` in `src/content/site.js`. Empty entries are not shown.
3. **Production domain:** copy `.env.example` to `.env` and set `VITE_SITE_URL=https://your-domain`. This turns on canonical URLs, `og:url` and `og:image`, and `sitemap.xml` (with a `Sitemap:` line in `robots.txt`). Without it, sitemap generation is skipped and a warning is printed.
4. **Enquiry form backend:** set `VITE_ENQUIRY_ENDPOINT` to an endpoint that accepts a JSON `POST` with `fullName, email, company, country, interest, message`. That could be a serverless function, Formspree-style service or CRM webhook. Until it is set, the form runs in **demo mode**: it is labelled as such, it validates input, and it tells the user plainly that nothing was sent or stored.
   - The endpoint must validate every field on the server again, apply rate limiting or spam protection (the form only has a basic honeypot field, `website`, which is never sent), and keep any API keys server-side. Never put secrets in `VITE_*` variables, because they are bundled into the public JavaScript.
5. **Privacy Policy and Terms of Use:** replace the draft outlines in `src/pages/Legal.jsx` with approved legal text.
6. **Business facts:** certifications, facilities, export destinations, volumes, clients and testimonials are intentionally absent. Add them only once they are verified.

## Image credits

Produce, farm and logistics photography is from [Unsplash](https://unsplash.com) and used under the Unsplash License. The stacked-containers and branded-container images come from the AKMI International Brand Book. Replace them with the company's own photography whenever it is available.

## Accessibility and performance notes

- Semantic landmarks, a skip link, one `h1` per page, visible focus styles, labelled form fields with inline errors that do not rely on colour alone, and focus moved to the first invalid field.
- The mobile menu is a modal dialog with a focus trap. It closes with Escape, locks scrolling, returns focus to the menu button and makes the closed panel `inert`.
- `prefers-reduced-motion` turns off reveal animations and smooth scrolling. Content stays fully visible without JavaScript.
- Images are responsive WebP with explicit width and height (no layout shift). Images below the fold load lazily, and the hero images get a high fetch priority.
