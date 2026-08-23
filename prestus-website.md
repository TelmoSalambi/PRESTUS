# Project Plan: PRESTUS Institutional Website Build

## Goal
Build a modern, premium, bilingual (PT/EN), and highly professional institutional website for PRESTUS using Vanilla HTML5, CSS3, and JavaScript, optimized for both Google SEO and AI search engine discovery (GEO).

- **Project Type:** WEB
- **Target Audience:** Public and private clients in Angola looking for construction, health, logistics, IT, and general services.
- **Language Stack:** Portuguese (Default), English (Secondary)

---

## Tech Stack & Rationale
- **Markup:** HTML5 (semantic layouts for accessibility and SEO/GEO parsing)
- **Styles:** Vanilla CSS3 (variables/tokens, flexbox/grid layout, responsive media queries, smooth transition animations, no heavy CSS frameworks)
- **Logic:** Vanilla ES6+ JavaScript (no frameworks, modern module structure, responsive interactions, IntersectionObserver scroll animations)
- **Assets:** WebP image format, responsive `srcset`, Google Fonts (Inter & Poppins)

---

## File Structure
```text
PRESTUS/
│
├── index.html (Portuguese version - default)
│
├── en/
│   └── index.html (English version - references parent assets)
│
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   ├── sections.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   └── form.js
│
├── assets/
│   ├── images/ (mapped from IMG folder)
│   ├── icons/
│   ├── logo/ (reusing Logo.png)
│   └── documents/ (PDF portfolio)
│
└── prestus-website.md (This plan)
```

---

## Tasks

### [ ] Task 1: CSS Foundation & Tokens
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `clean-code`
- **Priority:** High
- **Dependencies:** None
- **INPUT:** Design specifications, colors and fonts.
- **OUTPUT:** Creation of `css/reset.css`, `css/variables.css` (with official color tokens: #0B5FA5, #063D6E, etc., and fonts Inter/Poppins), and `css/global.css`.
- **VERIFY:** Verify that CSS files are correctly loaded without syntax errors.

### [ ] Task 2: Core Page Structure (Portuguese - `index.html`)
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `seo-fundamentals`
- **Priority:** High
- **Dependencies:** Task 1
- **INPUT:** Master Specification, verified company text and contact info from PDF.
- **OUTPUT:** `index.html` created with semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), containing sections: Header, Hero, Trust, About, Services (10 cards), Credentials, Contact, Map, and Footer. Includes default JSON-LD schema markup.
- **VERIFY:** Run HTML validator or inspect structure in browser. Verify NIF and contacts are exactly as in PDF.

### [ ] Task 3: Translation Page (English - `en/index.html`)
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `i18n-localization`, `seo-fundamentals`
- **Priority:** High
- **Dependencies:** Task 2
- **INPUT:** `index.html` in Portuguese, translation requirements.
- **OUTPUT:** `en/index.html` created in subfolder `/en/`, containing the English version of the entire content, linking to parent `/css/` and `/js/` files, and incorporating correct self-referencing and cross-referencing `hreflang` tags.
- **VERIFY:** Verify links to styles and scripts work. Verify the texts are in English and alternate tags point to correct pages.

### [ ] Task 4: Layout & Section Styling
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** High
- **Dependencies:** Task 2, Task 3
- **INPUT:** HTML structures, variables and style definitions.
- **OUTPUT:** `css/components.css` and `css/sections.css` populated with corporate editorial layouts, card grids, floating WhatsApp CTA with pulse, hover states, and smooth buttons.
- **VERIFY:** Open page in browser. Verify colors, typography, hover transitions, and sticky navigation.

### [ ] Task 5: Mobile Navigation & Language Selector (JS)
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** Medium
- **Dependencies:** Task 4
- **INPUT:** Header HTML and CSS classes.
- **OUTPUT:** `js/navigation.js` implementing sticky nav behaviors, mobile hamburger toggle (hamburger to X animation, side navigation, focus management, ESC/click-outside close), and logic for the PT/EN toggle.
- **VERIFY:** Click hamburger menu, resize window, test keyboard navigation (Tab/ESC), and toggle between Portuguese and English versions.

### [ ] Task 6: Scroll Reveal Animations (JS)
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** Medium
- **Dependencies:** Task 4
- **INPUT:** Page structures and layout selectors.
- **OUTPUT:** `js/animations.js` containing `IntersectionObserver` scroll triggers for elements (hero fade-in, statistics, about cards, services, credentials badges) with transition durations under 500ms, respecting `prefers-reduced-motion`.
- **VERIFY:** Scroll through the page and check if elements fade and slide in smoothly. Test with reduced motion enabled.

### [ ] Task 7: Contact Form Validation & Simulation (JS)
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `clean-code`
- **Priority:** Medium
- **Dependencies:** Task 4
- **INPUT:** Contact form elements and select/dropdown options.
- **OUTPUT:** `js/form.js` validating inputs (email format, telephone digits), managing loading states, and showing success/error notification banners. Automatically fills the interest dropdown when a service card CTA is clicked.
- **VERIFY:** Fill the form, try invalid inputs, click submit, check loading simulation, and check success confirmation popup.

### [ ] Task 8: Image Asset Mapping
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** Medium
- **Dependencies:** Task 4
- **INPUT:** `IMG/` generated assets.
- **OUTPUT:** Mapped images reference variables or direct relative paths in both `index.html` and `en/index.html` (e.g. `img/health.png`, `img/construction.png`) matching the specific services.
- **VERIFY:** Verify all images load correctly, display without horizontal scrolling, and are lazy-loaded (except Hero).

### [ ] Task 9: Responsiveness & Browser Verification
- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `webapp-testing`
- **Priority:** Medium
- **Dependencies:** Task 5, Task 6, Task 7, Task 8
- **INPUT:** Project files.
- **OUTPUT:** `css/responsive.css` populated with fine-tuned styles for breakpoints: 480px, 768px, 1024px, 1440px.
- **VERIFY:** Audit responsiveness across standard sizes (320px, 375px, 768px, 1024px, 1440px, 1920px) ensuring zero horizontal scroll.

---

## Phase X: Final Verification

### Checklist
- [ ] No purple/violet color hex codes used (unless overriding brand guidelines).
- [ ] No generic layouts or template slop.
- [ ] Forms verified to simulate and validated completely.
- [ ] Semantic tags and headings correctly structured.
- [ ] All real info (phone, email, NIF, addresses) matches the PDF.

### Script Execution (Windows Powershell CWD)
- **UX Audit:** `python .agents/skills/frontend-design/scripts/ux_audit.py .`
- **Accessibility Checker:** `python .agents/skills/frontend-design/scripts/accessibility_checker.py .` (or equivalent check if available)
- **Lighthouse/SEO Audit:** `python .agents/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:3000` (run during local preview)

---

## Done When
- [ ] Both index.html and en/index.html are fully operational and visually premium.
- [ ] Scroll animations and mobile navigation are smooth and accessible.
- [ ] Form behaves dynamically with valid user notifications.
- [ ] All verification scripts run and pass without critical warnings.
