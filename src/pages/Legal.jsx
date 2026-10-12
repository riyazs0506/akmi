import { Link } from 'react-router';
import { TriangleAlert } from 'lucide-react';
import styles from './Legal.module.css';

function LegalPage({ title, children }) {
  return (
    <section className={styles.page} aria-labelledby="legal-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Legal</p>
        <h1 id="legal-title" className={styles.title}>
          {title}
        </h1>
        <div className={styles.notice} role="note">
          <TriangleAlert size={20} strokeWidth={1.75} aria-hidden="true" />
          <p>
            <strong>Placeholder — pending approval.</strong> This page is a draft outline and has not yet been
            reviewed or approved by AKMI International. The final text will be published here once approved.
          </p>
        </div>
        <div className={styles.prose}>{children}</div>
      </div>
    </section>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>Information this website collects</h2>
      <p>
        The enquiry form asks for your name, business email, company name, country, product interest and message so
        that an enquiry can be understood and answered. While the form is in demo mode, submitted details are
        checked in your browser only and are not sent or stored.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This website does not currently set analytics or advertising cookies. Web fonts are loaded from Google
        Fonts.
      </p>
      <h2>To be completed</h2>
      <p>
        Sections covering the legal entity, purposes and lawful basis for processing, retention, your rights and
        how to contact AKMI International about privacy will be added once approved.
      </p>
      <p>
        Questions in the meantime can be sent through the <Link to="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <h2>About this website</h2>
      <p>
        This website provides general information about AKMI International and its intended business activities.
        Content describing products, processes and markets is informational and does not constitute an offer of
        supply. Product availability and specifications are discussed and agreed through individual enquiries.
      </p>
      <h2>To be completed</h2>
      <p>
        Full terms covering use of the website, intellectual property, limitation of liability and governing law
        will be published here once approved.
      </p>
    </LegalPage>
  );
}
