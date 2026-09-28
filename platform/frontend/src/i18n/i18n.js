/**
 * src/i18n/i18n.js
 * Configuração central do react-i18next.
 * Idioma padrão e de fallback: 'pt' (Português).
 * O atributo <html lang> é gerido por App.jsx.
 *
 * Ordem de prioridade do idioma inicial:
 *   1. Parâmetro URL  ?lang=en|pt   (usado pelo hreflang do sitemap)
 *   2. Preferência guardada no localStorage (última escolha do visitante)
 *   3. 'pt' (default)
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from '../locales/pt.js';
import en from '../locales/en.js';

const SUPPORTED = ['pt', 'en'];

function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'pt';

  // 1. URL param (?lang=en) — needed so the hreflang in sitemap/head works
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && SUPPORTED.includes(urlLang.toLowerCase())) {
    return urlLang.toLowerCase();
  }

  // 2. Saved preference
  const savedLang = localStorage.getItem('prestus_lang');
  if (savedLang && SUPPORTED.includes(savedLang)) {
    return savedLang;
  }

  return 'pt';
}

i18n.use(initReactI18next).init({
  resources: {
    pt,
    en,
  },
  lng: detectInitialLanguage(),
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prestus_lang', lng);
  }
});

export default i18n;
