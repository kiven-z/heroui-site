import { useEffect } from 'react';

import { DialogItem } from './dialog-item';
import { closeAllDialog, useDialogStore } from './dialog-store';

import { router } from '@/router';

/**
 * 全局 Dialog 宿主，与路由树并列挂在应用根上。
 * 订阅队列渲染各弹层，并在客户端路由变化时清空 Dialog 栈。
 */
export function DialogHost() {
  const items = useDialogStore((state) => state.items);

  useEffect(() => {
    let previousKey = router.state.location.key;

    return router.subscribe((state) => {
      if (state.location.key === previousKey) {
        return;
      }

      previousKey = state.location.key;
      closeAllDialog();
    });
  }, []);

  return (
    <>
      {items.map((item) => (
        <DialogItem key={item.id} item={item} />
      ))}
    </>
  );
}
