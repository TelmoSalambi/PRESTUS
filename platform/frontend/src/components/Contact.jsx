import { useTranslation } from 'react-i18next';
import { OFFICE_COORDINATES, WHATSAPP_NUMBER } from '../config.js';

/**
 * Contact section — information panel only.
 * Communication happens exclusively via WhatsApp (no form).
 */
export default function Contact() {
  const { t } = useTranslation();
  const waMessage = encodeURIComponent(t('whatsapp.message'));

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="contact-grid contact-grid-single">
          <div className="contact-info-panel reveal">
            <div className="section-header">
              <span className="section-label">{t('contact.label')}</span>
              <h2>
                {t('contact.titleA')}
                <em>{t('contact.titleEm')}</em>
              </h2>
              <p>{t('contact.subtitle')}</p>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <h4>{t('contact.info.hqTitle')}</h4>
                <p>{t('contact.info.hqLine1')}</p>
                <p className="small-address">{t('contact.info.hqLine2')}</p>
              </div>
              <div className="contact-method">
                <h4>{t('contact.info.officeTitle')}</h4>
                <p>{t('contact.info.officeLine')}</p>
              </div>
              <div className="contact-method">
                <h4>{t('contact.info.phonesTitle')}</h4>
                <p className="mono">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('contact.info.phone1')}
                  </a>{' '}
                  <strong>({t('contact.info.phone1Label')})</strong>
                </p>
                <p className="mono">
                  <a href={`tel:${t('contact.info.phone2').replace(/\s/g, '')}`}>
                    {t('contact.info.phone2')}
                  </a>{' '}
                  ({t('contact.info.phone2Label')})
                </p>
                <p className="mono">
                  <a href={`tel:${t('contact.info.phone3').replace(/\s/g, '')}`}>
                    {t('contact.info.phone3')}
                  </a>{' '}
                  ({t('contact.info.phone3Label')})
                </p>
              </div>
              <div className="contact-method">
                <h4>{t('contact.info.emailTitle')}</h4>
                <p>
                  <a href={`mailto:${t('contact.info.email')}`}>{t('contact.info.email')}</a>
                </p>
              </div>
              <div className="contact-method">
                <h4>{t('contact.info.nifTitle')}</h4>
                <p className="mono">{t('contact.info.nif')}</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              className="btn btn-whatsapp btn-lg contact-whatsapp-cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('whatsapp.ariaLabel')}
            >
              <svg viewBox="0 0 24 24" className="btn-whatsapp-icon" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12.04 2a9.9 9.9 0 0 0-8.51 14.93L2 22l5.19-1.5A9.9 9.9 0 1 0 12.04 2zm5.77 14.06c-.24.68-1.22 1.3-1.68 1.35-.42.05-.93.24-2.61-.54-2.31-.94-3.79-3.29-3.91-3.44-.11-.16-.94-1.26-.94-2.4 0-1.14.59-1.7.8-1.93.21-.22.46-.28.62-.28h.44c.14 0 .33-.05.51.4.18.44.62 1.52.68 1.63.05.1.08.22.01.35-.06.13-.1.21-.19.33l-.29.34c-.1.1-.2.21-.09.42.12.2.52.86 1.11 1.4.76.68 1.4.89 1.6.99.2.1.32.09.44-.05.12-.14.5-.59.64-.79.13-.2.27-.17.45-.1.18.06 1.13.53 1.32.63.19.1.32.15.37.23.05.09.05.5-.19 1.17z"
                />
              </svg>
              <span>{t('contact.whatsappCta')}</span>
            </a>

            {/* Real Interactive Map */}
            <div className="map-container">
              <iframe
                className="map-iframe"
                src={`https://maps.google.com/maps?q=${OFFICE_COORDINATES.lat},${OFFICE_COORDINATES.lng}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
                title={t('contact.info.mapTitle')}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-actions">
                <span>{t('contact.info.mapCaption')}</span>
                <a
                  href={`https://www.google.com/maps?q=${OFFICE_COORDINATES.lat},${OFFICE_COORDINATES.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  aria-label={t('contact.info.mapOpenAria')}
                >
                  {t('contact.info.mapOpen')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
