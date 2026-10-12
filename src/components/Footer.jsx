import { Link } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { navigation, footerDescription, contactDetails, socialLinks } from '../content/site';
import { productCategories } from '../content/products';
import styles from './Footer.module.css';

const SOCIAL_LABELS = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
  youtube: 'YouTube',
};

function ContactRow({ icon: Icon, label, value, href }) {
  return (
    <li className={styles.contactRow}>
      <Icon size={18} strokeWidth={1.75} aria-hidden="true" className={styles.contactIcon} />
      <span>
        <span className={styles.contactLabel}>{label}</span>
        {value ? (
          href ? (
            <a href={href} className={styles.link}>
              {value}
            </a>
          ) : (
            <span>{value}</span>
          )
        ) : (
          <span className={styles.pending}>To be published</span>
        )}
      </span>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(socialLinks).filter(([, url]) => url);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo variant="reversed" className={styles.logo} />
          <p className={styles.about}>{footerDescription}</p>
          {socials.length > 0 && (
            <ul className={styles.socials}>
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {SOCIAL_LABELS[key]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className={styles.col} aria-labelledby="footer-company">
          <h2 id="footer-company" className={styles.heading}>
            Company
          </h2>
          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-labelledby="footer-products">
          <h2 id="footer-products" className={styles.heading}>
            Products
          </h2>
          <ul className={styles.links}>
            {productCategories.map((c) => (
              <li key={c.id}>
                <Link to={`/products#${c.id}`} className={styles.link}>
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact?interest=other" className={styles.link}>
                Other Enquiries
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.contact}>
            <ContactRow
              icon={Mail}
              label="Email"
              value={contactDetails.email}
              href={contactDetails.email && `mailto:${contactDetails.email}`}
            />
            <ContactRow
              icon={Phone}
              label="Phone"
              value={contactDetails.phone}
              href={contactDetails.phone && `tel:${contactDetails.phone.replace(/\s+/g, '')}`}
            />
            <ContactRow icon={MapPin} label="Office" value={contactDetails.address} />
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} AKMI International. All rights reserved.</p>
        <ul className={styles.legal}>
          <li>
            <Link to="/privacy-policy" className={styles.link}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className={styles.link}>
              Terms of Use
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
