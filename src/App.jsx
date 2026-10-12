import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Seo from './seo/Seo';
import useScrollToHash from './hooks/useScrollToHash';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Process from './pages/Process';
import GlobalTrade from './pages/GlobalTrade';
import Contact from './pages/Contact';
import { PrivacyPolicy, Terms } from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);
  useScrollToHash();

  // Move focus to the main region after client-side navigation (screen reader friendly).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Seo />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} style={{ outline: 'none' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/process" element={<Process />} />
          <Route path="/global-trade" element={<GlobalTrade />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
