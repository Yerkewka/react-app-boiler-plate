import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Resources
import commonKk from '../locales/kk/common.json';
import commonRu from '../locales/ru/common.json';
import commonEn from '../locales/en/common.json';

const resources = {
  kk: {
    common: commonKk
  },
  ru: {
    common: commonRu
  },
  en: {
    common: commonEn
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ru',
    fallbackLng: 'ru',
    fallbackNS: 'common',
    defaultNS: 'common',
    ns: ['common'],
    debug: process.env.NODE_ENV === 'development',
    nonExplicitWhitelist: true,
    interpolation: {
      escapeValue: false
    },
    resources
  });

export default i18n;