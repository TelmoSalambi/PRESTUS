/**
 * js/navigation.js
 * Handles sticky header, mobile menu, and active link tracking.
 */

(function () {
  'use strict';

  const header = document.querySelector('.main-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCta = document.querySelector('.mobile-cta-btn');

  /* --------------------------------------------------------
     Sticky header: add shadow class on scroll
  -------------------------------------------------------- */
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------
     Mobile menu: open / close
  -------------------------------------------------------- */
  function openMenu() {
    mobileOverlay.classList.add('open');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Move focus to the first nav link
    const firstLink = mobileOverlay.querySelector('.mobile-nav-link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileOverlay.classList.remove('open');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileOverlay.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close on backdrop click (outside nav panel)
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMenu();
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close after clicking a mobile nav link
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCta) mobileCta.addEventListener('click', closeMenu);

  /* --------------------------------------------------------
     Active nav link on scroll (IntersectionObserver)
  -------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${entry.target.id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* --------------------------------------------------------
     Nav link active style injection (dynamic)
  -------------------------------------------------------- */
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--color-brand-primary);
    }
    .nav-link.active::after {
      transform: scaleX(1);
      transform-origin: left;
    }
    .main-header.scrolled {
      box-shadow: 0 2px 16px rgba(15, 23, 42, 0.08);
    }
  `;
  document.head.appendChild(style);
})();
