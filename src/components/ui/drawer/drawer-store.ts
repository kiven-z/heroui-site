import type { DrawerCloseCommand, DrawerOptions } from './types';

import { create } from 'zustand';

import { runOverlayBeforeSure } from '@/components/ui/overlay';

/** 当前 Drawer 运行时项（同刻至多一项） */
export interface DrawerStoreItem {
  id: string;
  isOpen: boolean;
  options: DrawerOptions;
  confirmLoading: boolean;
  _closeCommand?: DrawerCloseCommand;
  _finalizeScheduled?: boolean;
}

interface DrawerStoreState {
  items: DrawerStoreItem[];
}

const useDrawerStore = create<DrawerStoreState>()(() => ({
  items: [],
}));

function patchItem(id: string, patch: Partial<DrawerStoreItem>) {
  useDrawerStore.setState((state) => ({
    items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
  }));
}

/**
 * 打开 Drawer。同刻仅一层：再次打开会直接替换当前项（无障碍优先，不支持堆叠）。
 * @param options 打开参数
 * @returns 稳定 id，供 `closeDrawer` / `confirmDrawer` 使用
 */
export function addDrawer(options: DrawerOptions): string {
  const id = crypto.randomUUID();

  useDrawerStore.setState({
    items: [
      {
        id,
        isOpen: true,
        options,
        confirmLoading: false,
      },
    ],
  });

  return id;
}

/**
 * 发起关闭：仅置 `isOpen=false`，退出动画结束后由宿主 `finalizeDrawerClose`
 * @param id 弹层 id
 * @param command 关闭来源；默认 `close`
 */
export function closeDrawer(id: string, command: DrawerCloseCommand = 'close'): void {
  const item = useDrawerStore.getState().items.find((entry) => entry.id === id);

  if (!item?.isOpen) {
    return;
  }

  patchItem(id, { isOpen: false, _closeCommand: command });
}

/**
 * 关闭动画结束后：回调一次并从列表移除
 * @param id 弹层 id
 */
export function finalizeDrawerClose(id: string): void {
  const item = useDrawerStore.getState().items.find((entry) => entry.id === id);

  if (!item || item._finalizeScheduled) {
    return;
  }

  item._finalizeScheduled = true;
  item.options.closeCallBack?.({ command: item._closeCommand ?? 'close' });

  useDrawerStore.setState((state) => ({
    items: state.items.filter((entry) => entry.id !== id),
  }));
}

/**
 * 触发确定：有 `beforeSure` 时走 loading → beforeSure → done；否则直接以 `sure` 关闭
 * @param id 弹层 id
 */
export function confirmDrawer(id: string): void {
  const item = useDrawerStore.getState().items.find((entry) => entry.id === id);

  if (!item?.isOpen) {
    return;
  }

  const { options } = item;
  const loadingEnabled = options.confirmLoadingEnabled ?? Boolean(options.beforeSure);

  if (options.beforeSure) {
    runOverlayBeforeSure({
      beforeSure: options.beforeSure,
      loadingEnabled,
      setConfirmLoading: (loading) => {
        patchItem(id, { confirmLoading: loading });
      },
      onDone: () => closeDrawer(id, 'sure'),
      options,
      id,
    });

    return;
  }

  closeDrawer(id, 'sure');
}

/** 立即清空全部 Drawer（无退出动画） */
export function closeAllDrawer(): void {
  useDrawerStore.setState({ items: [] });
}

export { useDrawerStore };
