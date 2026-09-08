import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../locales/en/common.yaml';
import zhCN from '../../locales/zh-CN/common.yaml';

import { DEFAULT_LOCALE, LOCALES, type LocaleType } from '@/config/locale-config';

type MessageTree = Record<string, unknown>;

const messages: Record<LocaleType, MessageTree> = {
  en,
  'zh-CN': zhCN,
};

void i18n.use(initReactI18next).init({
  resources: Object.fromEntries(LOCALES.map(({ locale }) => [locale, { translation: messages[locale] ?? {} }])),
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});

export { i18n };
