import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

import englishTranslations from 'data/translations/en/main.json';
import spanishTranslations from 'data/translations/es/main.json';

i18n
  .use(initReactI18next)
  .use(ChainedBackend)
  .init({
    resources: {
      en: {
        translation: englishTranslations,
      },
      es: {
        translation: spanishTranslations,
      },
    },
    lng: localStorage.getItem('lng') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  });

export default i18n;
