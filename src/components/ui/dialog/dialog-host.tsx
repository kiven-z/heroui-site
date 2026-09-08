'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { DialogItem } from './dialog-item';
import { closeAllDialog, useDialogStore } from './dialog-store';

/**
 * 全局 Dialog 宿主，与路由树并列挂在应用根上。
 * 订阅当前弹层并渲染；客户端路由变化时清空。
 */
export function DialogHost() {
  const items = useDialogStore((state) => state.items);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    closeAllDialog();
  }, [pathname]);

  return (
    <>
      {items.map((item) => (
        <DialogItem key={item.id} item={item} />
      ))}
    </>
  );
}
