import Button from './Button';
import TileMotif from './TileMotif';
import ScrollReveal from './ScrollReveal';
import styles from './CTASection.module.css';

export default function CTASection({
  title = "Let's build a reliable trade relationship.",
  text = 'Share your product requirements or sourcing interests, and we will use your enquiry to understand your needs and discuss potential opportunities.',
  buttonLabel = 'Start a Conversation',
  to = '/contact',
  secondary,
}) {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className="container">
        <ScrollReveal className={styles.panel}>
          <TileMotif className={styles.motif} color="#ffffff" />
          <div className={styles.content}>
            <h2 id="cta-heading" className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>
            <div className={styles.actions}>
              <Button to={to} variant="light" arrow>
                {buttonLabel}
              </Button>
              {secondary && (
                <Button to={secondary.to} variant="text" className={styles.secondary}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
