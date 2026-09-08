import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

/**
 * 客户端重新水合各偏好 store 后，将 UI 偏好应用到 DOM
 */
export async function applyHydratedUiPreferences(): Promise<void> {
  await Promise.all([
    useThemePreferencesStore.persist.rehydrate(),
    useLocalePreferencesStore.persist.rehydrate(),
    useDirectionPreferencesStore.persist.rehydrate(),
  ]);

  const theme = useThemePreferencesStore.getState();
  const locale = useLocalePreferencesStore.getState();
  const direction = useDirectionPreferencesStore.getState();

  theme.applyToDom();
  theme.startSystemThemeWatch();
  locale.applyToDom();
  direction.applyToDom();
}
