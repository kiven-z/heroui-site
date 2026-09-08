'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { DrawerItem } from './drawer-item';
import { closeAllDrawer, useDrawerStore } from './drawer-store';

/**
 * 全局 Drawer 宿主，与路由树并列挂在应用根上。
 * 订阅当前抽屉并渲染；客户端路由变化时清空。
 */
export function DrawerHost() {
  const items = useDrawerStore((state) => state.items);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    closeAllDrawer();
  }, [pathname]);

  return (
    <>
      {items.map((item) => (
        <DrawerItem key={item.id} item={item} />
      ))}
    </>
  );
}
