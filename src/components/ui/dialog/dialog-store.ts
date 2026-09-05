import type { DialogCloseCommand, DialogOptions } from './types';

import { create } from 'zustand';

import { runOverlayBeforeSure } from '@/components/ui/overlay';

/** 队列中的单个 Dialog 运行时项 */
export interface DialogStoreItem {
  id: string;
  isOpen: boolean;
  options: DialogOptions;
  confirmLoading: boolean;
  _closeCommand?: DialogCloseCommand;
  _finalizeScheduled?: boolean;
}

interface DialogStoreState {
  items: DialogStoreItem[];
}

const useDialogStore = create<DialogStoreState>()(() => ({
  items: [],
}));

function patchItem(id: string, patch: Partial<DialogStoreItem>) {
  useDialogStore.setState((state) => ({
    items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
  }));
}

/**
 * 打开 Dialog
 * @param options 打开参数
 * @returns 稳定 id，供 `closeDialog` / `confirmDialog` 使用
 */
export function addDialog(options: DialogOptions): string {
  const id = crypto.randomUUID();

  useDialogStore.setState((state) => ({
    items: [
      ...state.items,
      {
        id,
        isOpen: true,
        options,
        confirmLoading: false,
      },
    ],
  }));

  return id;
}

/**
 * 发起关闭：仅置 `isOpen=false`，退出动画结束后由宿主 `finalizeDialogClose`
 * @param id 弹层 id
 * @param command 关闭来源；默认 `close`
 */
export function closeDialog(id: string, command: DialogCloseCommand = 'close'): void {
  const item = useDialogStore.getState().items.find((entry) => entry.id === id);

  if (!item?.isOpen) {
    return;
  }

  patchItem(id, { isOpen: false, _closeCommand: command });
}

/**
 * 关闭动画结束后：回调一次并从队列移除
 * @param id 弹层 id
 */
export function finalizeDialogClose(id: string): void {
  const item = useDialogStore.getState().items.find((entry) => entry.id === id);

  if (!item || item._finalizeScheduled) {
    return;
  }

  item._finalizeScheduled = true;
  item.options.closeCallBack?.({ command: item._closeCommand ?? 'close' });

  useDialogStore.setState((state) => ({
    items: state.items.filter((entry) => entry.id !== id),
  }));
}

/**
 * 触发确定：有 `beforeSure` 时走 loading → beforeSure → done；否则直接以 `sure` 关闭
 * @param id 弹层 id
 */
export function confirmDialog(id: string): void {
  const item = useDialogStore.getState().items.find((entry) => entry.id === id);

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
      onDone: () => closeDialog(id, 'sure'),
      options,
      id,
    });

    return;
  }

  closeDialog(id, 'sure');
}

/** 立即清空全部 Dialog（无退出动画） */
export function closeAllDialog(): void {
  useDialogStore.setState({ items: [] });
}

export { useDialogStore };
