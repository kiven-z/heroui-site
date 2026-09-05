import type { ReactNode } from 'react';

import { I18nProvider } from '@heroui/react';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/app/i18n';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';

export function Provider({ children }: { children: ReactNode }) {
  const locale = useLocalePreferencesStore((state) => state.locale);

  return (
    <I18nextProvider i18n={i18n}>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </I18nextProvider>
  );
}
