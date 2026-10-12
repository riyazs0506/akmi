import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import MobileNavigation from './MobileNavigation';
import { navigation } from '../content/site';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Logo className={styles.logo} />

          <nav className={styles.nav} aria-label="Main">
            <ul className={styles.list}>
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button to="/contact" size="sm" className={styles.cta}>
              Enquire Now
            </Button>
            <button
              type="button"
              className={styles.menuBtn}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
              <span className="visually-hidden">Open menu</span>
            </button>
          </div>
        </div>
      </header>
      {/* Rendered outside <header>: its backdrop-filter would otherwise contain the fixed overlay. */}
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
