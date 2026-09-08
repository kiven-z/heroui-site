import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { i18n } from '@/i18n';
import { DEFAULT_LOCALE, LOCALES, type LocaleType } from '@/config/locale-config';

const LOCALE_SET = new Set<string>(LOCALES.map((item) => item.locale));

function isLocale(value: unknown): value is LocaleType {
  return typeof value === 'string' && LOCALE_SET.has(value);
}

interface LocalePreferencesState {
  /** 界面语言 */
  locale: LocaleType;
  /** 设置界面语言 */
  setLocale: (value: string) => void;
  /** 应用语言到 i18n 与 DOM */
  applyToDom: () => void;
}

/** 语言偏好（ui.locale） */
export const useLocalePreferencesStore = create<LocalePreferencesState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,

      setLocale: (value) => {
        if (!isLocale(value)) {
          return;
        }

        set({ locale: value });
        get().applyToDom();
      },

      applyToDom: () => {
        const { locale } = get();

        void i18n.changeLanguage(locale);
        document.documentElement.lang = locale;
      },
    }),
    {
      name: 'ui.locale',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ locale: state.locale }),
      skipHydration: true,
    }
  )
);
