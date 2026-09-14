import { useTranslation } from 'react-i18next';

export default function CtaBand() {
  const { t } = useTranslation();

  return (
    <section className="cta-section" aria-label={t('cta.label')}>
      <div className="container cta-inner reveal">
        <div>
          <span className="section-label section-label-light">
            {t('cta.label')}
          </span>
          <h2>
            {t('cta.titleA')}
            <em>{t('cta.titleEm')}</em>
            {t('cta.titleB')}
          </h2>
          <p>{t('cta.text')}</p>
        </div>
        <div className="cta-actions">
          <a href="#contacto" className="btn btn-gold btn-lg">
            {t('cta.primary')}
          </a>
          <a
            href="/PRESTUS_Portfolio_2026.pdf"
            className="btn btn-ghost btn-lg"
            download="PRESTUS_Portfolio_2026.pdf"
          >
            {t('cta.secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
