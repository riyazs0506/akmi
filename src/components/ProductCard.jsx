import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import Img from './Img';
import styles from './ProductCard.module.css';

export default function ProductCard({ category, index, to }) {
  return (
    <article className={`zoom-host ${styles.card}`}>
      <Link to={to} className={styles.link} aria-label={`${category.label} — view details`}>
        <div className={`zoom-frame ${styles.media}`}>
          <Img name={category.image} alt={category.alt} sizes="(min-width: 768px) 46vw, 100vw" />
        </div>
        <div className={styles.body}>
          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className={styles.text}>
            <h3 className={styles.title}>{category.label}</h3>
            <p className={styles.summary}>{category.summary}</p>
          </div>
          <span className={styles.arrow} aria-hidden="true">
            <ArrowUpRight size={20} strokeWidth={1.75} />
          </span>
        </div>
      </Link>
    </article>
  );
}
