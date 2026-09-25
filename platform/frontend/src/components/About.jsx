import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const features = t('about.features', { returnObjects: true }) || [];
  const values = t('about.values', { returnObjects: true }) || [];

  return (
    <section id="sobre" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content reveal">
            <div className="section-header">
              <span className="section-label">{t('about.label')}</span>
              <h2>
                {t('about.titleA')}
                <br />
                {t('about.titleB')}
                <em>{t('about.titleC')}</em>
              </h2>
              <p>{t('about.company')}</p>
            </div>
            <p className="about-text">{t('about.text')}</p>
            <div className="about-features">
              {features.map((feature, idx) => (
                <div className="about-feature" key={idx}>
                  <span className="about-feature-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual reveal">
            <div className="about-image-frame">
              <div className="about-image-wrapper">
                <img
                  src="/IMG/Quem somos.webp"
                  alt={t('about.imgAlt')}
                  width="1024"
                  height="767"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-floating-card">
                <div className="about-floating-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="about-floating-content">
                  <span className="about-floating-title">{t('about.badgeTitle')}</span>
                  <span className="about-floating-sub">{t('about.badgeSubtitle')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corporate Values Grid */}
          <div className="values-grid">
            {values.map((val) => (
              <div className="value-card reveal" key={val.number}>
                <span className="value-number">{val.number}</span>
                <h3>{val.title}</h3>
                <p>{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
