/**
 * src/i18n/i18n.js
 * Configuração central do react-i18next.
 * Idioma padrão e de fallback: 'pt' (Português).
 * O atributo <html lang> é gerido por App.jsx.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from '../locales/pt.js';
import en from '../locales/en.js';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('prestus_lang') : null;

i18n.use(initReactI18next).init({
  resources: {
    pt,
    en,
  },
  lng: savedLang || 'pt',
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
