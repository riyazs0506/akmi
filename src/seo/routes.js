// Single source of truth for page metadata. Used by the client <Seo> component
// and by scripts/prerender.mjs to write static HTML, sitemap.xml and robots.txt.

export const SITE_NAME = 'AKMI International';

export const pages = [
  {
    path: '/',
    title: 'AKMI International | Indian Fresh Produce for International Markets',
    description:
      'AKMI International connects quality Indian fresh fruits and vegetables with international markets through dependable sourcing and export practices.',
  },
  {
    path: '/about',
    title: 'About Us | AKMI International',
    description:
      'Learn about AKMI International: our vision, mission and intent to build a globally connected enterprise from India, beginning with fresh produce.',
  },
  {
    path: '/products',
    title: 'Fresh Fruits & Vegetables from India | AKMI International',
    description:
      'Explore the initial AKMI International portfolio of Indian fresh fruits and fresh vegetables for international buyers. Enquire about availability and specifications.',
  },
  {
    path: '/process',
    title: 'Our Process & Quality Approach | AKMI International',
    description:
      'How AKMI International approaches fresh-produce export: sourcing, quality checks, packing preparation, documentation and shipment coordination.',
  },
  {
    path: '/global-trade',
    title: 'Global Trade & Markets | AKMI International',
    description:
      'AKMI International aims to connect Indian fresh-produce sourcing with international demand through clear communication and dependable trade partnerships.',
  },
  {
    path: '/contact',
    title: 'Contact & Enquiries | AKMI International',
    description:
      'Start a conversation with AKMI International about Indian fresh fruits, fresh vegetables, sourcing interests or partnership opportunities.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | AKMI International',
    description: 'Privacy Policy for the AKMI International website.',
    sitemap: false,
  },
  {
    path: '/terms',
    title: 'Terms of Use | AKMI International',
    description: 'Terms of use for the AKMI International website.',
    sitemap: false,
  },
];

export const notFoundPage = {
  path: '/404',
  title: 'Page Not Found | AKMI International',
  description: 'The page you are looking for could not be found.',
  noindex: true,
};

export function getPageMeta(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return pages.find((p) => p.path === clean) ?? notFoundPage;
}

export function siteUrl() {
  const raw =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
    (typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL) ||
    '';
  return raw.replace(/\/+$/, '');
}

// Builds the <head> tags for a page as an HTML string (used at prerender time).
export function headTags(meta) {
  const base = siteUrl();
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />');
  if (base) {
    const url = base + (meta.path === '/' ? '/' : meta.path);
    if (!meta.noindex) tags.push(`<link rel="canonical" href="${url}" />`);
    tags.push(`<meta property="og:url" content="${url}" />`);
    tags.push(`<meta property="og:image" content="${base}/og-image.jpg" />`);
  }
  return tags.join('\n    ');
}
