import type { Key } from 'react';

import { Label, ListBox, Select, Separator, ToggleButton, ToggleButtonGroup } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/icon';
import { DIRECTION_ITEMS, LOCALES } from '@/config/locale-config';
import { THEMES } from '@/config/ui-config';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

function applySingleKey(keys: Set<Key>, apply: (value: string) => void) {
  const next = keys.values().next().value;

  if (typeof next === 'string') {
    apply(next);
  }
}

/** 抽屉内偏好：主题 / 语言 / 文档方向 */
export function LayoutDrawerPreferences() {
  const { t } = useTranslation();

  const locale = useLocalePreferencesStore((state) => state.locale);
  const setLocale = useLocalePreferencesStore((state) => state.setLocale);

  const direction = useDirectionPreferencesStore((state) => state.direction);
  const setDirection = useDirectionPreferencesStore((state) => state.setDirection);

  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const setColorScheme = useThemePreferencesStore((state) => state.setColorScheme);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Separator />

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted">{t('panel.theme.title')}</span>
        <ToggleButtonGroup
          disallowEmptySelection
          fullWidth
          aria-label={t('panel.theme.title')}
          selectedKeys={new Set([colorScheme])}
          selectionMode="single"
          size="sm"
          onSelectionChange={(keys) => applySingleKey(keys, setColorScheme)}
        >
          {THEMES.map(({ id, icon }, index) => (
            <ToggleButton key={id} id={id}>
              {index > 0 ? <ToggleButtonGroup.Separator /> : null}
              <Icon className="size-3.5" name={icon} />
              {t(`panel.theme.${id}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <Select
        fullWidth
        value={locale}
        variant="secondary"
        onChange={(value) => {
          if (typeof value === 'string') {
            setLocale(value);
          }
        }}
      >
        <Label className="px-1 text-xs font-medium text-muted">{t('panel.locale.title')}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {LOCALES.map(({ locale: localeId, label }) => (
              <ListBox.Item key={localeId} id={localeId} textValue={label}>
                {label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted">{t('panel.direction.title')}</span>
        <ToggleButtonGroup
          disallowEmptySelection
          fullWidth
          aria-label={t('panel.direction.title')}
          selectedKeys={new Set([direction])}
          selectionMode="single"
          size="sm"
          onSelectionChange={(keys) => applySingleKey(keys, setDirection)}
        >
          {DIRECTION_ITEMS.map(({ id, icon }, index) => (
            <ToggleButton key={id} id={id}>
              {index > 0 ? <ToggleButtonGroup.Separator /> : null}
              <Icon className="size-3.5" name={icon} />
              {t(`panel.direction.${id}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
