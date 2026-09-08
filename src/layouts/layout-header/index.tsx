'use client';

import { Button, Drawer, useOverlayState } from '@heroui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/icon';
import { siteConfig } from '@/config/site';
import { LayoutDrawerPreferences } from '@/layouts/layout-header/layout-drawer-preferences';
import { LayoutNavbarAvatar } from '@/layouts/layout-header/layout-navbar-avatar';
import { LayoutNavbarPreferences } from '@/layouts/layout-header/layout-navbar-preferences';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';

function navLinkClassName(isActive: boolean) {
  return clsx(
    'text-sm transition-colors',
    isActive ? 'font-medium text-foreground' : 'text-muted hover:text-foreground'
  );
}

function isNavActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LayoutHeader() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const menu = useOverlayState();
  const direction = useDirectionPreferencesStore((state) => state.direction);

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-6">
      <nav className="mx-auto flex h-14 items-center justify-between rounded-2xl border border-separator bg-surface px-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <Button
            isIconOnly
            aria-expanded={menu.isOpen}
            aria-label={t('nav.menu')}
            className="md:hidden"
            size="sm"
            variant="ghost"
            onPress={menu.open}
          >
            <Icon className="size-4 text-foreground" name="ri:menu-line" />
          </Button>

          <Link className="flex min-w-0 shrink-0 items-center gap-2 text-foreground" href="/">
            <img alt="" className="size-7" src="/logo.svg" />
            <span className="truncate text-base font-semibold tracking-tight">{siteConfig.name}</span>
          </Link>
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <Link className={navLinkClassName(isNavActive(pathname, item.href))} href={item.href}>
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden md:flex">
            <LayoutNavbarPreferences />
          </div>
          <LayoutNavbarAvatar />
        </div>
      </nav>

      <Drawer.Backdrop isOpen={menu.isOpen} onOpenChange={menu.setOpen}>
        <Drawer.Content placement={direction === 'rtl' ? 'right' : 'left'}>
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>{t('nav.menu')}</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <ul className="flex flex-col gap-1">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={clsx(
                        navLinkClassName(isNavActive(pathname, item.href)),
                        'block rounded-xl px-3 py-2.5'
                      )}
                      href={item.href}
                      onClick={menu.close}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
              <LayoutDrawerPreferences />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </header>
  );
}
