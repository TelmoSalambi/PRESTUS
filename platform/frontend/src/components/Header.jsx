import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { lockScroll, unlockScroll } from '../utils/scrollLock.js';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

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
      }
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
          <nav className="nav-desktop" aria-label={t('header.navDesktop', 'Main navigation')}>
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
            <div className="lang-selector">
              <button
                type="button"
                className={`lang-btn ${i18n.language.startsWith('pt') ? 'active' : ''}`}
                onClick={() => changeLang('pt')}
                aria-label={t('header.switchToPt', 'Switch to Portuguese')}
              >
                PT
              </button>
              <span className="lang-divider">|</span>
              <button
                type="button"
                className={`lang-btn ${i18n.language.startsWith('en') ? 'active' : ''}`}
                onClick={() => changeLang('en')}
                aria-label={t('header.switchToEn', 'Switch to English')}
              >
                EN
              </button>
            </div>
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
        aria-hidden={!isMobileOpen}
        onClick={(e) => {
          if (e.target.id === 'mobile-nav') setIsMobileOpen(false);
        }}
      >
        <nav className="nav-mobile" aria-label={t('header.navMobile', 'Mobile navigation')}>
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
            <div className="mobile-lang-selector">
              <button
                type="button"
                className={`lang-btn ${i18n.language.startsWith('pt') ? 'active' : ''}`}
                onClick={() => {
                  changeLang('pt');
                  setIsMobileOpen(false);
                }}
              >
                {t('header.langPt', 'Português')}
              </button>
              <button
                type="button"
                className={`lang-btn ${i18n.language.startsWith('en') ? 'active' : ''}`}
                onClick={() => {
                  changeLang('en');
                  setIsMobileOpen(false);
                }}
              >
{t('header.langEn', 'English')}
              </button>
            </div>
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
