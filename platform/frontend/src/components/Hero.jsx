import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg-image">
        <img src="/IMG/Banner 01.webp" alt={t('hero.imgAlt')} loading="eager" decoding="async" />
      </div>
      <div className="container">
        <div className="hero-content reveal">
          <span className="hero-kicker">{t('hero.kicker')}</span>
          <h1 className="hero-title hero-title-animated">
            <span className="title-line-1">{t('hero.titleLine1')}</span>
            <br />
            <span className="title-line-2">
              <em>{t('hero.titleLine2a')}</em>
              {t('hero.titleLine2b')}
            </span>
          </h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <div className="hero-actions">
            <a href="#contacto" className="btn btn-accent btn-lg">
              {t('hero.ctaPrimary')}
            </a>
            <a href="#servicos" className="btn btn-secondary btn-lg">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </div>

      <a href="#sobre" className="hero-scroll-indicator" aria-label={t('hero.scrollDown')}>
        <span className="scroll-mouse"></span>
        <span className="scroll-text">{t('hero.explore')}</span>
      </a>
    </section>
  );
}
