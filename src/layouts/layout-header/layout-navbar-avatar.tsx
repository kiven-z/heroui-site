import type { Key } from 'react';

import { Avatar, Dropdown, Label, toast } from '@heroui/react';
import { useTranslation } from 'react-i18next';

/** 头像菜单：账号示例（无真实鉴权） */
export function LayoutNavbarAvatar() {
  const { t } = useTranslation();

  function handleAction(key: Key) {
    const id = String(key);

    toast.info(t('nav.demoOnly'), {
      description: t(`nav.accountMenu.${id}`),
    });
  }

  return (
    <Dropdown>
      <Dropdown.Trigger aria-label={t('nav.account')} className="rounded-full outline-none">
        <Avatar className="size-8 cursor-pointer" size="sm">
          <Avatar.Fallback className="border-none bg-accent text-accent-foreground">H</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover className="min-w-56" placement="bottom end">
        <Dropdown.Menu onAction={handleAction}>
          <Dropdown.Item id="account" textValue={t('nav.accountMenu.account')}>
            <Label>{t('nav.accountMenu.account')}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="workspace" textValue={t('nav.accountMenu.workspace')}>
            <Label>{t('nav.accountMenu.workspace')}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="setting" textValue={t('nav.accountMenu.setting')}>
            <Label>{t('nav.accountMenu.setting')}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="contact-us" textValue={t('nav.accountMenu.contact-us')}>
            <Label>{t('nav.accountMenu.contact-us')}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="sign-out" textValue={t('nav.accountMenu.sign-out')}>
            <Label>{t('nav.accountMenu.sign-out')}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
