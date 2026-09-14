/**
 * src/hooks/useScrollReveal.js
 * React hook replicating the institutional animations and scroll-reveal system.
 * Respects prefers-reduced-motion.
 */
import { useEffect } from 'react';

const GRID_SELECTOR =
  '.values-grid, .credentials-grid, .trust-grid, .services-grid';
const REVEAL_SELECTOR = '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale';
const HERO_SELECTOR =
  '.hero-section .reveal, .hero-section .hero-kicker, .hero-section .hero-title, .hero-section .hero-subtitle, .hero-section .hero-actions';

export function useScrollReveal(deps = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    // Auto-stagger for grid items (reset previous delay classes to avoid accumulation)
    const gridContainers = document.querySelectorAll(GRID_SELECTOR);
    gridContainers.forEach((container) => {
      Array.from(container.children).forEach((child, idx) => {
        if (!child.classList.contains('reveal')) {
          child.classList.add('reveal');
        }
        for (let i = 1; i <= 5; i += 1) {
          child.classList.remove(`delay-${i}`);
        }
        child.classList.add(`delay-${(idx % 5) + 1}`);
      });
    });

    // IntersectionObserver for reveal elements
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

    const elements = document.querySelectorAll(REVEAL_SELECTOR);
    elements.forEach((el) => {
      revealObserver.observe(el);
    });

    // Hero staggered entrance
    const heroElements = document.querySelectorAll(HERO_SELECTOR);
    const timers = [];
    heroElements.forEach((el, index) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      const t = setTimeout(() => {
        el.classList.add('revealed');
      }, index * 140 + 100);
      timers.push(t);
    });

    return () => {
      revealObserver.disconnect();
      timers.forEach(clearTimeout);
    };
  }, deps);
}