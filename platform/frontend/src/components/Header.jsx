import { useState, useEffect, useRef, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { lockScroll, unlockScroll } from '../utils/scrollLock.js';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Shared PT/EN language switcher — renders compact (PT|EN) or full-name variants. */
function LangSwitcher({ i18n, t, variant, onChange }) {
  const langs =
    variant === 'full'
      ? [
          { code: 'pt', label: t('header.langPt') },
          { code: 'en', label: t('header.langEn') },
        ]
      : [
          { code: 'pt', label: 'PT', aria: t('header.switchToPt') },
          { code: 'en', label: 'EN', aria: t('header.switchToEn') },
        ];

  return (
    <div className={variant === 'full' ? 'mobile-lang-selector' : 'lang-selector'}>
      {langs.map((lang, idx) => (
        <Fragment key={lang.code}>
          {variant !== 'full' && idx > 0 && <span className="lang-divider">|</span>}
          <button
            type="button"
            className={`lang-btn ${i18n.language.startsWith(lang.code) ? 'active' : ''}`}
            aria-label={lang.aria}
            onClick={() => onChange(lang.code)}
          >
            {lang.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const menuRef = useRef(null);
  const previousMenuFocusRef = useRef(null);

  // Sticky header on scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open (ref-counted)
  useEffect(() => {
    if (isMobileOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [isMobileOpen]);

  // ESC key to close mobile menu
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen]);

  // Focus management: focus first link on open, restore trigger on close
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    previousMenuFocusRef.current = document.activeElement;
    const firstFocusable = menuRef.current?.querySelector(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();
    return () => {
      const prev = previousMenuFocusRef.current;
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [isMobileOpen]);

  // Tab focus trap while the drawer is open
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusables = menuRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!menuRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen]);

  // Active nav link on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    { href: '#inicio', label: t('nav.home'), id: 'inicio' },
    { href: '#sobre', label: t('nav.about'), id: 'sobre' },
    { href: '#servicos', label: t('nav.services'), id: 'servicos' },
    { href: '#credenciais', label: t('nav.credentials'), id: 'credenciais' },
    { href: '#faq', label: t('nav.faq'), id: 'faq' },
    { href: '#noticias', label: t('nav.news'), id: 'noticias' },
    { href: '#contacto', label: t('nav.contact'), id: 'contacto' },
  ];

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#inicio" className="logo-link" aria-label={t('header.logoAlt')}>
            <img src="/Logo.png" alt="PRESTUS Logo" className="header-logo" />
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" aria-label={t('header.navDesktop')}>
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Utility Actions (Language & CTA) */}
          <div className="header-utilities">
            <LangSwitcher i18n={i18n} t={t} variant="compact" onChange={changeLang} />
            <a href="#contacto" className="btn btn-accent btn-header">
              {t('header.cta')}
            </a>

            {/* Mobile Menu Trigger */}
            <button
              className={`menu-toggle ${isMobileOpen ? 'open' : ''}`}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              aria-label={t('header.openMenu')}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-menu-overlay ${isMobileOpen ? 'open' : ''}`}
        id="mobile-nav"
        ref={menuRef}
        aria-hidden={!isMobileOpen}
        onClick={(e) => {
          if (e.target.id === 'mobile-nav') setIsMobileOpen(false);
        }}
      >
        <nav className="nav-mobile" aria-label={t('header.navMobile')}>
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={`mob-${link.id}`}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <LangSwitcher
              i18n={i18n}
              t={t}
              variant="full"
              onChange={(code) => {
                changeLang(code);
                setIsMobileOpen(false);
              }}
            />
            <a
              href="#contacto"
              className="btn btn-accent mobile-cta-btn"
              onClick={() => setIsMobileOpen(false)}
            >
              {t('header.cta')}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
