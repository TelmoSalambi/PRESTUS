/**
 * js/main.js
 * Application entry point. Initializes utilities and global behaviors.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------
     Smooth scroll for anchor links (fallback for older browsers)
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 72;

      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------------
     Current year in footer copyright
  -------------------------------------------------------- */
  const copyrightEl = document.querySelector('.copyright');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace('2026', year);
  }

  /* --------------------------------------------------------
     Focus-visible polyfill: add keyboard focus class
  -------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Inject keyboard focus styles
  const focusStyle = document.createElement('style');
  focusStyle.textContent = `
    body:not(.keyboard-nav) *:focus {
      outline: none;
    }
    body.keyboard-nav *:focus {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 3px;
    }
  `;
  document.head.appendChild(focusStyle);

  // Section headings with accent lines are handled via CSS section-label class

  /* --------------------------------------------------------
     Log project info (dev only)
  -------------------------------------------------------- */
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('%cPRESTUS Website', 'color: #0B5FA5; font-size: 14px; font-weight: bold;');
    console.log('Frontend-only build. Backend integration pending.');
  }
})();
