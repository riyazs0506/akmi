import styles from './SectionHeading.module.css';

export default function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = 'h2',
  align = 'left',
  id,
  className = '',
}) {
  return (
    <div className={`${styles.heading} ${styles[align]} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {children && <div className={`lead ${styles.body}`}>{children}</div>}
    </div>
  );
}
