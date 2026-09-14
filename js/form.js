/**
 * js/form.js
 * Contact form: validation, loading state, and real submission to the PRESTUS API.
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

  const errorEls = {
    name: document.getElementById('error-name'),
    email: document.getElementById('error-email'),
    phone: document.getElementById('error-phone'),
    service: document.getElementById('error-service'),
  };

  const honeypotField = document.getElementById('website_hp');
  const submitBtn = form.querySelector('.btn-submit');
  const successBanner = document.getElementById('form-status-success');
  const errorBanner = document.getElementById('form-status-error');

  // API base: same origin by default; override via window.PRESTUS_API_BASE if
  // the static site is hosted separately from the backend.
  const API_BASE = (window.PRESTUS_API_BASE || '') + '/api/contact';

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

  const isEn = document.documentElement.lang === 'en';

  const messages = {
    name: isEn ? 'Please enter your full name.' : 'Por favor, insira o seu nome completo.',
    email: isEn ? 'Please enter a valid e-mail address.' : 'Por favor, insira um e-mail válido.',
    phone: isEn ? 'Please enter a valid phone number.' : 'Por favor, insira um número de telefone válido.',
    service: isEn ? 'Please select an area of interest.' : 'Por favor, selecione uma área de interesse.',
    network: isEn
      ? 'Could not reach the server. Please try again in a few moments.'
      : 'Não foi possível contactar o servidor. Tente novamente em alguns instantes.',
  };

  function validateField(key) {
    const field = fields[key];
    const errorEl = errorEls[key];
    const value = field.value;

    switch (key) {
      case 'name':
        if (!value.trim() || value.trim().length < 2) {
          setError(field, errorEl, messages.name);
          return false;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          setError(field, errorEl, messages.email);
          return false;
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          setError(field, errorEl, messages.phone);
          return false;
        }
        break;
      case 'service':
        if (!value) {
          setError(field, errorEl, messages.service);
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
     Submit handler — real POST to the backend API
  -------------------------------------------------------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideBanner(successBanner);
    hideBanner(errorBanner);

    // Anti-spam honeypot: bots fill it; real users never see it.
    if (honeypotField && honeypotField.value) {
      showBanner(successBanner); // silent drop, pretend success
      form.reset();
      return;
    }

    const isValid = Object.keys(fields).map((key) => validateField(key)).every(Boolean);

    if (!isValid) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.value.trim(),
          company: (document.getElementById('form-company') || {}).value || '',
          email: fields.email.value.trim(),
          phone: fields.phone.value.trim(),
          service: fields.service.value,
          message: (document.getElementById('form-message') || {}).value || '',
          honeypot: honeypotField ? honeypotField.value : '',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || messages.network);
      }

      showBanner(successBanner);
      form.reset();
    } catch (err) {
      console.warn('[PRESTUS] Form submission failed:', err.message);
      showBanner(errorBanner);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  /* --------------------------------------------------------
     Service pre-selection from card CTAs
  -------------------------------------------------------- */
  const serviceCards = document.querySelectorAll('.portfolio-slide, .service-card');
  const serviceSelect = fields.service;

  serviceCards.forEach((card) => {
    const btn = card.querySelector('.btn-service-select');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const serviceValue = card.dataset.service;

      // Pre-select dropdown option
      if (serviceSelect && serviceValue) {
        serviceSelect.value = serviceValue;
        clearError(serviceSelect, errorEls.service);
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
