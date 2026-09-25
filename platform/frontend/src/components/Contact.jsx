import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../data/services.js';
import { OFFICE_COORDINATES } from '../config.js';

export default function Contact({ preselectedService }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    deadline: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusBanner, setStatusBanner] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState(null);

  // Update selected service if parent triggers it (via cards or modal)
  const [prevPreselectedService, setPrevPreselectedService] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevPreselectedService) {
    setPrevPreselectedService(preselectedService);
    setFormData((prev) => ({ ...prev, service: preselectedService }));
    setErrors((prev) => ({ ...prev, service: null }));
  }

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'name':
        if (!value.trim() || value.trim().length < 2) {
          error = t('contact.form.errors.name');
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = t('contact.form.errors.email');
        }
        break;
      case 'phone': {
        const digits = value.replace(/[\s\-+()/]/g, '');
        if (digits.length < 7 || !/^\d+$/.test(digits)) {
          error = t('contact.form.errors.phone');
        }
        break;
      }
      case 'service':
        if (!value) {
          error = t('contact.form.errors.service');
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusBanner(null);
    setStatusMessage(null);

    // Trap bots: silent drop if honeypot is filled
    if (formData.honeypot) {
      setStatusBanner('success');
      return;
    }

    // Validate all required fields
    const newErrors = {};
    ['name', 'email', 'phone', 'service'].forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`form-${firstKey}`);
      if (el) el.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          budget: formData.budget.trim(),
          deadline: formData.deadline.trim(),
          description: formData.message.trim(),
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || errorBody.error || `HTTP ${res.status}`);
      }

      setStatusBanner('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        deadline: '',
        message: '',
        honeypot: '',
      });
      setErrors({});
    } catch (err) {
      console.warn('Form submission error:', err.message);
      setStatusMessage(err.message);
      setStatusBanner('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Contact Info and Map */}
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
                  {t('contact.info.phone1')} <strong>({t('contact.info.phone1Label')})</strong>
                </p>
                <p className="mono">
                  {t('contact.info.phone2')} ({t('contact.info.phone2Label')})
                </p>
                <p className="mono">
                  {t('contact.info.phone3')} ({t('contact.info.phone3Label')})
                </p>
              </div>
              <div className="contact-method">
                <h4>{t('contact.info.emailTitle')}</h4>
                <p>{t('contact.info.email')}</p>
              </div>
              <div className="contact-method">
                <h4>{t('contact.info.nifTitle')}</h4>
                <p className="mono">{t('contact.info.nif')}</p>
              </div>
            </div>

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

          {/* Contact Form Container */}
          <div className="contact-form-panel reveal">
            <form id="contact-form" noValidate onSubmit={handleSubmit}>
              {/* Anti-spam Honeypot field (hidden from real users) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website_hp">Website URL</label>
                <input
                  type="text"
                  id="website_hp"
                  name="honeypot"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-name">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name ? 'invalid' : ''}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span className="error-msg" id="error-name" aria-live="polite">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form-company">{t('contact.form.company')}</label>
                <input
                  type="text"
                  id="form-company"
                  name="company"
                  placeholder={t('contact.form.companyPlaceholder')}
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-email">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email ? 'invalid' : ''}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span className="error-msg" id="error-email" aria-live="polite">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form-phone">{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  id="form-phone"
                  name="phone"
                  required
                  placeholder={t('contact.form.phonePlaceholder')}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.phone ? 'invalid' : ''}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <span className="error-msg" id="error-phone" aria-live="polite">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form-service">{t('contact.form.service')}</label>
                <select
                  id="form-service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.service ? 'invalid' : ''}
                  aria-invalid={!!errors.service}
                >
                  <option value="" disabled>
                    {t('contact.form.servicePlaceholder')}
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {t(`services.items.${s.id}.title`)}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="error-msg" id="error-service" aria-live="polite">
                    {errors.service}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form-message">{t('contact.form.message')}</label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group form-group-half">
                  <label htmlFor="form-budget">{t('contact.form.budget')}</label>
                  <input
                    type="text"
                    id="form-budget"
                    name="budget"
                    placeholder={t('contact.form.budgetPlaceholder')}
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group form-group-half">
                  <label htmlFor="form-deadline">{t('contact.form.deadline')}</label>
                  <input
                    type="text"
                    id="form-deadline"
                    name="deadline"
                    placeholder={t('contact.form.deadlinePlaceholder')}
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-submit ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                <span className="btn-text">{t('contact.form.submit')}</span>
                <span className="btn-spinner" aria-hidden="true" />
              </button>
            </form>

            {/* Success Notification */}
            <div
              id="form-status-success"
              className={`form-status-banner success-banner ${
                statusBanner === 'success' ? 'show' : ''
              }`}
              aria-hidden={statusBanner !== 'success'}
            >
              <h4>{t('contact.form.successTitle')}</h4>
              <p>{t('contact.form.successText')}</p>
            </div>

            {/* Error Notification */}
            <div
              id="form-status-error"
              className={`form-status-banner error-banner ${
                statusBanner === 'error' ? 'show' : ''
              }`}
              aria-hidden={statusBanner !== 'error'}
            >
              <h4>{t('contact.form.errorTitle')}</h4>
              <p>{statusMessage || t('contact.form.errorText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
