import { Link } from 'react-router';
import styles from './Logo.module.css';

// Official AKMI International logo (vector, extracted from the brand book).
// Aspect ratio 367.5 : 116.2 is preserved via width/height attributes.
export default function Logo({ variant = 'default', className = '', linked = true, height = 40 }) {
  const src = variant === 'reversed' ? '/akmi-logo-reversed.svg' : '/akmi-logo.svg';
  const img = (
    <img
      src={src}
      alt="AKMI International"
      width={Math.round((height * 367.51) / 116.22)}
      height={height}
      className={styles.img}
    />
  );
  if (!linked) return <span className={`${styles.logo} ${className}`}>{img}</span>;
  return (
    <Link to="/" className={`${styles.logo} ${className}`} aria-label="AKMI International — home">
      {img}
    </Link>
  );
}
