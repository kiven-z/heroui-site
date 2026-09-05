import { Button, Dropdown, Label } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import TextDirectionL from '~icons/ri/text-direction-l';
import TextDirectionR from '~icons/ri/text-direction-r';
import Translate from '~icons/ri/translate';

import { Icon } from '@/components/ui/icon';
import { DIRECTION_ITEMS, LOCALES } from '@/config/locale-config';
import { THEMES } from '@/config/ui-config';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

/** 顶栏偏好：主题 / 语言 / 文档方向 */
export function LayoutNavbarPreferences() {
  const { t } = useTranslation();

  const locale = useLocalePreferencesStore((state) => state.locale);
  const setLocale = useLocalePreferencesStore((state) => state.setLocale);

  const direction = useDirectionPreferencesStore((state) => state.direction);
  const setDirection = useDirectionPreferencesStore((state) => state.setDirection);
  const DirectionTriggerIcon = direction === 'rtl' ? TextDirectionR : TextDirectionL;

  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const setColorScheme = useThemePreferencesStore((state) => state.setColorScheme);
  const triggerIcon = THEMES.find((item) => item.id === colorScheme)?.icon ?? 'ri:sun-line';

  return (
    <>
      <Dropdown>
        <Button isIconOnly aria-label={t('panel.theme.title')} size="sm" variant="ghost">
          <Icon className="size-4 text-foreground" name={triggerIcon} />
        </Button>

        <Dropdown.Popover placement="bottom end">
          <Dropdown.Menu
            selectedKeys={new Set([colorScheme])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              if (keys === 'all') {
                return;
              }

              const next = keys.values().next().value;

              if (typeof next === 'string') {
                setColorScheme(next);
              }
            }}
          >
            {THEMES.map(({ id, icon }) => (
              <Dropdown.Item key={id} id={id} textValue={t(`panel.theme.${id}`)}>
                <Icon className="size-4" name={icon} />
                <Label>{t(`panel.theme.${id}`)}</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Dropdown>
        <Button isIconOnly aria-label={t('panel.locale.title')} size="sm" variant="ghost">
          <Translate aria-hidden className="size-4 text-foreground" />
        </Button>

        <Dropdown.Popover placement="bottom end">
          <Dropdown.Menu
            selectedKeys={new Set([locale])}
            selectionMode="single"
            onAction={(key) => setLocale(String(key))}
          >
            {LOCALES.map(({ locale: localeId, label }) => (
              <Dropdown.Item key={localeId} id={localeId} textValue={label}>
                <Label>{label}</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Dropdown>
        <Button isIconOnly aria-label={t('panel.direction.title')} size="sm" variant="ghost">
          <DirectionTriggerIcon aria-hidden className="size-4 text-foreground" />
        </Button>

        <Dropdown.Popover placement="bottom end">
          <Dropdown.Menu
            selectedKeys={new Set([direction])}
            selectionMode="single"
            onAction={(key) => setDirection(String(key))}
          >
            {DIRECTION_ITEMS.map(({ id, icon }) => (
              <Dropdown.Item key={id} id={id} textValue={t(`panel.direction.${id}`)}>
                <Icon className="size-4" name={icon} />
                <Label>{t(`panel.direction.${id}`)}</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </>
  );
}
