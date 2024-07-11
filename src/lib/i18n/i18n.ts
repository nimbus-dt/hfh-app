import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishTranslations from 'data/translations/en/main.json';
import spanishTranslations from 'data/translations/es/main.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: englishTranslations,
    },
    es: {
      translation: spanishTranslations,
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
