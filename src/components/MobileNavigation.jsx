import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { navigation } from '../content/site';
import styles from './MobileNavigation.module.css';

export default function MobileNavigation({ open, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-navigation"
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className={styles.backdrop} onClick={onClose} />
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.top}>
          <Logo className={styles.logo} />
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className={styles.list}>
            {navigation.map((item, i) => (
              <li key={item.to} style={{ '--i': i }}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.footer}>
          <Button to="/contact" onClick={onClose} className={styles.cta}>
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
