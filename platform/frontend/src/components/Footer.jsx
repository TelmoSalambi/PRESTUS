import { useTranslation } from 'react-i18next';
import { PORTFOLIO_FILE } from '../config.js';

export default function Footer() {
  const { t } = useTranslation();
  const footerServices = t('footer.services', { returnObjects: true }) || [];
  const contactEmail = t('contact.info.email', 'prestuslda1@gmail.com');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        {/* Col 1: About */}
        <div className="footer-col reveal">
          <img src="/Logo.png" alt="PRESTUS Logo" className="footer-logo" />
          <p className="footer-desc">{t('footer.description')}</p>
          <div className="footer-tax-info">
            <p>{t('topbar.nif')}</p>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="footer-col reveal">
          <h4>{t('footer.servicesTitle')}</h4>
          <ul>
            {footerServices.map((serviceName, idx) => (
              <li key={idx}>
                <a href="#servicos">{serviceName}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="footer-col reveal">
          <h4>{t('footer.linksTitle')}</h4>
          <ul>
            <li>
              <a href="#inicio">{t('nav.home')}</a>
            </li>
            <li>
              <a href="#sobre">{t('nav.about')}</a>
            </li>
            <li>
              <a href="#servicos">{t('nav.services')}</a>
            </li>
            <li>
              <a href="#credenciais">{t('nav.credentials')}</a>
            </li>
            <li>
              <a href="#faq">{t('nav.faq')}</a>
            </li>
            <li>
              <a href="#contacto">{t('nav.contact')}</a>
            </li>
            <li>
              <a href={PORTFOLIO_FILE} download={PORTFOLIO_FILE.split('/').pop()}>
                {t('footer.downloadPortfolio')}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Address */}
        <div className="footer-col reveal">
          <h4>{t('footer.officesTitle')}</h4>
          <p>{t('footer.officeHuila')}</p>
          <p>{t('footer.officeLuanda')}</p>
          <p>
            {t('footer.emailLabel')} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright">
          &copy; {currentYear}
          {t('footer.copyright')}
        </p>
        <p className="developer-credit">{t('footer.tagline')}</p>
      </div>
    </footer>
  );
}
