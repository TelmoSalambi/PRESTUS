/**
 * js/animations.js
 * Advanced Institutional Scroll-Reveal & Dynamic Micro-Interactions System.
 * Respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  /* --------------------------------------------------------
     Stagger Auto-Assigner for Grids (Values, Services, Credentials, Team)
  -------------------------------------------------------- */
  const gridContainers = document.querySelectorAll('.values-grid, .credentials-grid, .team-grid, .trust-grid, .services-grid');
  gridContainers.forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, idx) => {
      if (!child.classList.contains('reveal')) {
        child.classList.add('reveal');
      }
      child.classList.add(`delay-${(idx % 5) + 1}`);
    });
  });

  /* --------------------------------------------------------
     IntersectionObserver for Smooth Scroll Reveal
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
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  const revealSelector = '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale';
  document.querySelectorAll(revealSelector).forEach((el) => {
    revealObserver.observe(el);
  });

  /* --------------------------------------------------------
     Hero Section Staggered Entrance
  -------------------------------------------------------- */
  function revealHeroElements() {
    const heroElements = document.querySelectorAll('.hero-section .reveal, .hero-section .hero-kicker, .hero-section .hero-title, .hero-section .hero-subtitle, .hero-section .hero-actions');
    heroElements.forEach((el, index) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 140 + 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHeroElements);
  } else {
    revealHeroElements();
  }
})();
