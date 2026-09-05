import { useEffect } from 'react';

import { DrawerItem } from './drawer-item';
import { closeAllDrawer, useDrawerStore } from './drawer-store';

import { router } from '@/router';

/**
 * 全局 Drawer 宿主，与路由树并列挂在应用根上。
 * 订阅队列渲染各抽屉，并在客户端路由变化时清空 Drawer 栈。
 */
export function DrawerHost() {
  const items = useDrawerStore((state) => state.items);

  useEffect(() => {
    let previousKey = router.state.location.key;

    return router.subscribe((state) => {
      if (state.location.key === previousKey) {
        return;
      }

      previousKey = state.location.key;
      closeAllDrawer();
    });
  }, []);

  return (
    <>
      {items.map((item) => (
        <DrawerItem key={item.id} item={item} />
      ))}
    </>
  );
}
