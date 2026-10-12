import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import styles from './Button.module.css';

/**
 * variant: primary | secondary | light | text
 * Renders a router Link for internal paths, <a> for external/hash, <button> otherwise.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className = '',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className={styles.icon} size={18} strokeWidth={2} aria-hidden="true" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
