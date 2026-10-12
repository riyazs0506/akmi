// Renders every route to static HTML after the client + SSR builds, so each page
// ships with its own <title>, meta description and full content for search engines.
// Also writes robots.txt and (when VITE_SITE_URL is set) sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

Object.assign(process.env, loadEnv('production', root, 'VITE_'), {});

const { pages, notFoundPage, headTags, siteUrl } = await import(
  pathToFileURL(path.join(root, 'src/seo/routes.js')).href
);
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const headRe = /<!--head-->[\s\S]*?<!--\/head-->/;
if (!headRe.test(template) || !template.includes('<!--app-->')) {
  throw new Error('index.html is missing the <!--head--> or <!--app--> markers');
}

function write(meta, url, outFile) {
  const html = template.replace(headRe, headTags(meta)).replace('<!--app-->', render(url));
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log(`  prerendered ${url.padEnd(18)} → ${path.relative(root, outFile)}`);
}

for (const page of pages) {
  const out = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path, 'index.html');
  write(page, page.path, out);
}
write(notFoundPage, '/404', path.join(dist, '404.html'));

const base = siteUrl();
const robots = ['User-agent: *', 'Allow: /'];
if (base) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => p.sitemap !== false)
    .map(
      (p) =>
        `  <url>\n    <loc>${base}${p.path === '/' ? '/' : p.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join('\n');
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  robots.push('', `Sitemap: ${base}/sitemap.xml`);
  console.log('  wrote sitemap.xml');
} else {
  console.warn('  ! VITE_SITE_URL not set — skipped sitemap.xml and canonical URLs (see README).');
}
fs.writeFileSync(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');
console.log('  wrote robots.txt');

fs.rmSync(ssrDir, { recursive: true, force: true });
