import Button from '../components/Button';
import TileMotif from '../components/TileMotif';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="nf-title">
      <div className={`container ${styles.inner}`}>
        <TileMotif className={styles.motif} />
        <p className="eyebrow">Error 404</p>
        <h1 id="nf-title" className={styles.title}>
          This page could not be found.
        </h1>
        <p className="lead">The link may be out of date, or the page may have moved.</p>
        <div className={styles.actions}>
          <Button to="/" arrow>
            Back to home
          </Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
