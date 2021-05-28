import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './data/locales/en/translation.json'

const resources = {
  en: {
    translation: enTranslation,
  },
}

const savedLanguage = window.localStorage.getItem('appUILang') || 'en'

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  whitelist: ['en'],
  debug: false,
  keySeparator: '.', // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
