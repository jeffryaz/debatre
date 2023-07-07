import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { id, en } from './locales/index';

export const resources = {
    id: {
        translation: id,
    },
    en: {
        translation: en,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'id',
    fallbackLng: 'id',
    compatibilityJSON: 'v3',
    interpolation: {
        escapeValue: false
    }
});