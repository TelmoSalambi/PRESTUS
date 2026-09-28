/**
 * src/App.jsx
 * Root component. Owns global UI state:
 *  - activeService: which service modal is open (null = closed)
 * Also wires scroll-reveal animations and smooth anchor scrolling.
 */
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Topbar from './components/Topbar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Credentials from './components/Credentials.jsx';
import Faq from './components/Faq.jsx';
import CtaBand from './components/CtaBand.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import BackToTop from './components/BackToTop.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import ServiceModal from './components/ServiceModal.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

const HEADER_OFFSET_DEFAULT = 80;

export default function App() {
  const { i18n, t } = useTranslation();
  const [activeService, setActiveService] = useState(null);

  // Keep <html lang>, document title and meta description in sync with the active language
  useEffect(() => {
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t('meta.description'));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t('meta.title'));
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', t('meta.description'));
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'pt' ? 'pt_AO' : 'en_US');
  }, [i18n.language, t]);

  // Scroll-reveal + staggered grid delays (re-run when language changes re-renders content)
  useScrollReveal([i18n.language]);

  /** Smooth-scroll to an element id, accounting for the sticky header height */
  const scrollToSection = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const rawHeight = getComputedStyle(document.documentElement)
      .getPropertyValue('--header-height')
      .trim();
    const parsed = Number.parseInt(rawHeight, 10);
    const headerHeight = Number.isNaN(parsed) ? HEADER_OFFSET_DEFAULT : parsed;
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }, []);

  // Global smooth-scroll for in-page anchor links (footer, hero, CTA buttons...)
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
      // Move keyboard focus to the target (skip-link and normal anchors alike)
      const target = document.getElementById(id);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [scrollToSection]);

  return (
    <>
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        {t('skipLink')}
      </a>

      <Topbar />
      <Header />

      <main id="main-content">
        <Hero />
        <TrustBar />
        <Marquee />
        <About />
        <Services onOpenService={setActiveService} />
        <Credentials />
        <Faq />
        <CtaBand />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />

      <ServiceModal serviceKey={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
