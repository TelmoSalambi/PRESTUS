/**
 * js/animations.js
 * Scroll-reveal animations using IntersectionObserver.
 * Respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  // Respect user's motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    // Immediately reveal all elements — no transitions
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  /* --------------------------------------------------------
     IntersectionObserver: reveal elements on scroll
  -------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  /* --------------------------------------------------------
     Hero elements: trigger immediately on load
  -------------------------------------------------------- */
  function revealHeroElements() {
    const heroElements = document.querySelectorAll('.hero-section .reveal, .hero-banner-section .reveal');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 120);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHeroElements);
  } else {
    revealHeroElements();
  }

  // WhatsApp pulse is already handled by components.css
  // No dynamic injection needed
})();
