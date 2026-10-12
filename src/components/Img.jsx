import manifest from '../content/image-manifest.json';

/**
 * Responsive image from /public/images, generated as WebP at several widths.
 * Width/height come from the manifest so the browser reserves space (no layout shift).
 */
export default function Img({ name, alt, sizes = '100vw', priority = false, className, style }) {
  const meta = manifest[name];
  if (!meta) return null;
  const srcSet = meta.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = meta.widths[Math.min(1, meta.widths.length - 1)];
  return (
    <img
      src={`/images/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={style}
    />
  );
}
