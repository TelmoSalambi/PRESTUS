import { useTranslation } from 'react-i18next';

export default function Topbar() {
  const { t } = useTranslation();

  return (
    <div className="topbar">
      <div className="container topbar-container">
        <div className="topbar-group">
          <a href="tel:+244923677253" className="topbar-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="mono">{t('topbar.phone')}</span>
          </a>
          <a href="mailto:prestuslda1@gmail.com" className="topbar-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {t('topbar.email')}
          </a>
          <span className="topbar-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('topbar.location')}
          </span>
        </div>
        <div className="topbar-group topbar-group-right">
          <span className="topbar-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 11l2 2 4-4" />
            </svg>
            {t('topbar.badge')}
          </span>
          <span className="topbar-item">{t('topbar.nif')}</span>
        </div>
      </div>
    </div>
  );
}
