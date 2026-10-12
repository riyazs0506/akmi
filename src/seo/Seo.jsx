import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageMeta, siteUrl, SITE_NAME } from './routes';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Keeps <title>, description, canonical and Open Graph tags in sync on client navigation. */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    const base = siteUrl();
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:type', 'website');
    const robots = document.head.querySelector('meta[name="robots"]');
    if (meta.noindex) setMeta('name', 'robots', 'noindex');
    else robots?.remove();
    if (base) {
      const url = base + (meta.path === '/' ? '/' : meta.path);
      setLink('canonical', meta.noindex ? null : url);
      setMeta('property', 'og:url', url);
    }
  }, [pathname]);

  return null;
}
