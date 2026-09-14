import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { lockScroll, unlockScroll } from '../utils/scrollLock.js';

export default function ServiceModal({ serviceKey, onClose, onRequestService }) {
  const { t } = useTranslation();

  const isOpen = Boolean(serviceKey);
  const serviceData = serviceKey
    ? t(`services.items.${serviceKey}`, { returnObjects: true })
    : null;

  const modalInfo = serviceData?.modal || {};

  // Lock body scroll while open (ref-counted with other scroll locks)
  useEffect(() => {
    if (isOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="service-modal"
      className="modal-overlay active"
      aria-hidden="false"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target.id === 'service-modal') onClose();
      }}
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close"
          id="modal-close"
          aria-label={t('services.closeModal', 'Close details window')}
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-header">
          <span className="section-label" id="modal-category">
            {modalInfo.category || t('services.label')}
          </span>
          <h3 id="modal-title">{modalInfo.title || serviceData?.title}</h3>
        </div>

        <div
          className="modal-body"
          id="modal-body-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modalInfo.html || '') }}
        />

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-accent modal-cta-btn"
            id="modal-cta"
            onClick={() => onRequestService(serviceKey)}
          >
            {t('services.modalCta')}
          </button>
        </div>
      </div>
    </div>
  );
}