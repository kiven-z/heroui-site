import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, LOCALES, type LocaleType } from '@/config/locale-config';

type MessageTree = Record<string, unknown>;

/**
 * 扫描 locales 下各语言目录的 yaml，按 locale 合并文案树
 */
function loadMessages(): Record<LocaleType, MessageTree> {
  const modules = import.meta.glob('../../../locales/**/*.yaml', {
    eager: true,
    import: 'default',
  }) as Record<string, MessageTree>;

  const cache = Object.fromEntries(LOCALES.map(({ locale }) => [locale, {} as MessageTree])) as Record<
    LocaleType,
    MessageTree
  >;

  for (const [filePath, messages] of Object.entries(modules)) {
    const lang = /locales\/([A-Za-z0-9_-]+)\//.exec(filePath)?.[1];

    if (!lang || !(lang in cache)) {
      continue;
    }

    Object.assign(cache[lang as LocaleType], messages);
  }

  return cache;
}

const messages = loadMessages();

void i18n.use(initReactI18next).init({
  resources: Object.fromEntries(LOCALES.map(({ locale }) => [locale, { translation: messages[locale] ?? {} }])),
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});

export { i18n };
