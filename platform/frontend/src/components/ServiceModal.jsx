import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { lockScroll, unlockScroll } from '../utils/scrollLock.js';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ServiceModal({ serviceKey, onClose, onRequestService }) {
  const { t } = useTranslation();
  const overlayRef = useRef(null);
  const previousFocusRef = useRef(null);

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

  // Focus management: focus the dialog on open, restore focus on close
  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocusRef.current = document.activeElement;
    const closeBtn = document.getElementById('modal-close');
    closeBtn?.focus();
    return () => {
      const prev = previousFocusRef.current;
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [isOpen]);

  // Escape to close + Tab focus trap inside the dialog
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = overlayRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!overlayRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
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
      ref={overlayRef}
      className="modal-overlay active"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
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
          aria-label={t('services.closeModal')}
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
