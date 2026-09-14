/**
 * src/utils/validators.js
 * Shared validation and sanitization helpers for form endpoints.
 */

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function validatePhone(phone) {
  const digits = String(phone).replace(/[\s\-+()/]/g, '');
  return digits.length >= 7 && /^\d+$/.test(digits);
}

/** Escape user input before embedding it into HTML email bodies. */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}