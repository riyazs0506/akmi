import { useSearchParams } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';
import TileMotif from '../components/TileMotif';
import { contactDetails } from '../content/site';
import styles from './Contact.module.css';

const details = [
  { key: 'email', icon: Mail, label: 'Email', href: (v) => `mailto:${v}` },
  { key: 'phone', icon: Phone, label: 'Phone', href: (v) => `tel:${v.replace(/\s+/g, '')}` },
  { key: 'address', icon: MapPin, label: 'Office' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const interest = params.get('interest') || '';

  return (
    <section className={styles.page} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title" className={styles.title}>
            Start a conversation with AKMI International.
          </h1>
          <p className="lead">
            Tell us about your business, product requirements, or sourcing interests. Our team can use your enquiry
            to understand your needs and discuss potential opportunities.
          </p>

          <div className={styles.topics}>
            <h2 className={styles.subhead}>You can ask us about</h2>
            <ul>
              <li>Fresh fruits and fresh vegetables from India</li>
              <li>Product availability and specifications</li>
              <li>Sourcing and partnership opportunities</li>
            </ul>
          </div>

          <div className={styles.details}>
            <h2 className={styles.subhead}>Company details</h2>
            <ul>
              {details.map(({ key, icon: Icon, label, href }) => {
                const value = contactDetails[key];
                return (
                  <li key={key}>
                    <span className={styles.detailIcon}>
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span>
                      <span className={styles.detailLabel}>{label}</span>
                      {value ? (
                        href ? (
                          <a href={href(value)}>{value}</a>
                        ) : (
                          <span>{value}</span>
                        )
                      ) : (
                        <span className={styles.pending}>Official details to be published</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <TileMotif className={styles.motif} />
        </div>

        <div className={styles.formCard}>
          <EnquiryForm initialInterest={interest} />
        </div>
      </div>
    </section>
  );
}
