/**
 * js/form.js
 * Contact form: validation, loading state, success/error simulation.
 * Also handles service pre-selection from card CTAs.
 */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: document.getElementById('form-name'),
    email: document.getElementById('form-email'),
    phone: document.getElementById('form-phone'),
    service: document.getElementById('form-service'),
  };

  const errors = {
    name: document.getElementById('error-name'),
    email: document.getElementById('error-email'),
    phone: document.getElementById('error-phone'),
    service: document.getElementById('error-service'),
  };

  const submitBtn = form.querySelector('.btn-submit');
  const successBanner = document.getElementById('form-status-success');
  const errorBanner = document.getElementById('form-status-error');

  /* --------------------------------------------------------
     Validation helpers
  -------------------------------------------------------- */
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validatePhone(value) {
    const digits = value.replace(/[\s\-+()/]/g, '');
    return digits.length >= 7 && /^\d+$/.test(digits);
  }

  function setError(field, errorEl, message) {
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function clearError(field, errorEl) {
    field.classList.remove('invalid');
    field.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  function validateField(key) {
    const field = fields[key];
    const errorEl = errors[key];
    const value = field.value;

    switch (key) {
      case 'name':
        if (!value.trim() || value.trim().length < 2) {
          setError(field, errorEl, 'Por favor, insira o seu nome completo.');
          return false;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          setError(field, errorEl, 'Por favor, insira um e-mail válido.');
          return false;
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          setError(field, errorEl, 'Por favor, insira um número de telefone válido.');
          return false;
        }
        break;
      case 'service':
        if (!value) {
          setError(field, errorEl, 'Por favor, selecione uma área de interesse.');
          return false;
        }
        break;
    }
    clearError(field, errorEl);
    return true;
  }

  /* --------------------------------------------------------
     Real-time inline validation (on blur)
  -------------------------------------------------------- */
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener('blur', () => validateField(key));
    fields[key].addEventListener('input', () => {
      if (fields[key].classList.contains('invalid')) {
        validateField(key);
      }
    });
  });

  /* --------------------------------------------------------
     Banner display helpers
  -------------------------------------------------------- */
  function showBanner(el) {
    el.classList.add('show');
    el.removeAttribute('aria-hidden');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideBanner(el) {
    el.classList.remove('show');
    el.setAttribute('aria-hidden', 'true');
  }

  /* --------------------------------------------------------
     Submit handler
  -------------------------------------------------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideBanner(successBanner);
    hideBanner(errorBanner);

    const validations = Object.keys(fields).map((key) => validateField(key));
    const isValid = validations.every(Boolean);

    if (!isValid) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate async send (frontend-only, no backend)
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Simulate success (in production: replace with real fetch)
      const simulateSuccess = true;

      if (simulateSuccess) {
        showBanner(successBanner);
        form.reset();
      } else {
        showBanner(errorBanner);
      }
    }, 1500);
  });

  /* --------------------------------------------------------
     Service pre-selection from card CTAs
  -------------------------------------------------------- */
  const serviceCards = document.querySelectorAll('.portfolio-slide, .service-card');
  const serviceSelect = document.getElementById('form-service');

  serviceCards.forEach((card) => {
    const btn = card.querySelector('.btn-service-select');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const serviceValue = card.dataset.service;

      // Pre-select dropdown option
      if (serviceSelect && serviceValue) {
        serviceSelect.value = serviceValue;
        clearError(serviceSelect, errors.service);
      }

      // Smooth scroll to contact form
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // After scroll, focus the name field if empty
        setTimeout(() => {
          if (!fields.name.value) fields.name.focus();
          else if (serviceSelect) serviceSelect.focus();
        }, 600);
      }
    });
  });
})();
