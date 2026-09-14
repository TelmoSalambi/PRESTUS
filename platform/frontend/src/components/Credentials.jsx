import { useTranslation } from 'react-i18next';

export default function Credentials() {
  const { t } = useTranslation();
  const items = t('credentials.items', { returnObjects: true }) || [];
  const download = t('credentials.download', { returnObjects: true }) || {};

  return (
    <section id="credenciais" className="credentials-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{t('credentials.label')}</span>
          <h2>
            {t('credentials.titleA')}
            <em>{t('credentials.titleEm')}</em>
          </h2>
          <p>{t('credentials.subtitle')}</p>
        </div>

        <div className="credentials-grid">
          {items.map((item, idx) => (
            <div className="credential-card reveal" key={idx}>
              <h3>{item.title}</h3>
              <p className="credential-meta mono">{item.meta}</p>
              <p>{item.text}</p>
            </div>
          ))}

          <div className="credential-card reveal download-portfolio-card">
            <h3>{download.title}</h3>
            <p>{download.text}</p>
            <a
              href="/PRESTUS_Portfolio_2026.pdf"
              className="btn btn-primary"
              download="PRESTUS_Portfolio_2026.pdf"
              aria-label={download.button}
            >
              {download.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
