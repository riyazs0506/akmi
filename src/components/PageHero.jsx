import Img from './Img';
import styles from './PageHero.module.css';

/** Interior page header: title block + optional editorial image. */
export default function PageHero({ eyebrow, title, children, image, imageAlt, imagePosition }) {
  return (
    <section className={`${styles.hero} ${image ? styles.withImage : ''}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {children && <div className={`lead ${styles.lead}`}>{children}</div>}
        </div>
        {image && (
          <div className={styles.media}>
            <Img
              name={image}
              alt={imageAlt}
              priority
              sizes="(min-width: 960px) 46vw, 100vw"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          </div>
        )}
      </div>
    </section>
  );
}
