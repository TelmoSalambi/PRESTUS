import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';

export default function Faq() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const items = t('faq.items', { returnObjects: true }) || [];

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{t('faq.label')}</span>
          <h2>
            {t('faq.titleA')}
            <em>{t('faq.titleEm')}</em>
          </h2>
          <p>{t('faq.subtitle')}</p>
        </div>

        <div className="faq-container reveal">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className={`faq-item ${isOpen ? 'active' : ''}`} key={`faq-item-${idx}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  id={`faq-question-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => toggle(idx)}
                >
                  <span>{item.q}</span>
                  <svg
                    className="faq-icon"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className="faq-content"
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  aria-hidden={!isOpen}
                >
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.a || '') }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
