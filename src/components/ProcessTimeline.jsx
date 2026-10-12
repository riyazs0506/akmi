import ScrollReveal from './ScrollReveal';
import styles from './ProcessTimeline.module.css';

/** Numbered process: vertical on mobile, horizontal on desktop. */
export default function ProcessTimeline({ steps, compact = false }) {
  return (
    <ol className={`${styles.timeline} ${compact ? styles.compact : ''}`}>
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <ScrollReveal as="li" key={step.title} className={styles.step} delay={i * 70}>
            <div className={styles.marker}>
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.content}>
              {Icon && <Icon className={styles.icon} size={22} strokeWidth={1.6} aria-hidden="true" />}
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </div>
          </ScrollReveal>
        );
      })}
    </ol>
  );
}
