/**
 * src/App.jsx
 * Root component. Owns global UI state:
 *  - activeService: which service modal is open (null = closed)
 *  - preselectedService: service key forwarded to the contact form
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
import ServiceModal from './components/ServiceModal.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

const HEADER_OFFSET_DEFAULT = 72;

export default function App() {
  const { i18n, t } = useTranslation();
  const [activeService, setActiveService] = useState(null);
  const [preselectedService, setPreselectedService] = useState('');

  // Keep <html lang> and the document title in sync with the active language
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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

  /** Select a service in the contact form and scroll to it (used by cards & modal CTA) */
  const requestService = useCallback(
    (serviceKey) => {
      setPreselectedService(serviceKey);
      setActiveService(null);
      scrollToSection('contacto');
    },
    [scrollToSection],
  );

  // Global smooth-scroll for in-page anchor links (footer, hero, CTA buttons...)
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [scrollToSection]);

  // Keyboard focus-visible handling (mirrors the original main.js behaviour)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    };
    const onMouseDown = () => document.body.classList.remove('keyboard-nav');
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('skipLink', 'Saltar para o conteúdo principal')}
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
        <Contact preselectedService={preselectedService} />
      </main>

      <Footer />
      <WhatsAppButton />

      <ServiceModal
        serviceKey={activeService}
        onClose={() => setActiveService(null)}
        onRequestService={requestService}
      />
    </>
  );
}
