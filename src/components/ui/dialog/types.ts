import type { ReactNode } from 'react';

/** Dialog 尺寸，对应 HeroUI `Modal.Container` 的 `size` */
export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full';

/** 关闭来源：`cancel` 取消按钮、`sure` 确定按钮、`close` 关闭钮 / 遮罩 / ESC */
export type DialogCloseCommand = 'cancel' | 'sure' | 'close';

/** Dialog 底部按钮变体，对应 HeroUI Button */
export type DialogFooterButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'danger-soft'
  | 'outline';

/** Dialog 自定义底部按钮 */
export interface DialogFooterButton {
  label: string;
  variant?: DialogFooterButtonVariant;
  isPending?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}

/** `beforeSure` 回调上下文 */
export interface DialogBeforeSureContext {
  options: DialogOptions;
  id: string;
  /** 手动关闭确定按钮 loading；未调用 `done` 时壳层会在 `beforeSure` 结束后自动关闭 */
  closeLoading: () => void;
}

/** 命令式 Dialog 打开参数 */
export interface DialogOptions {
  title: string;
  content: ReactNode;
  size?: DialogSize;
  /** 隐藏底部操作区；默认 `false` */
  hideFooter?: boolean;
  /** 点击遮罩关闭；默认 `true` */
  isDismissable?: boolean;
  /** 禁用 ESC 关闭；默认 `false` */
  isKeyboardDismissDisabled?: boolean;
  /** 显示右上角关闭钮；默认 `true` */
  showClose?: boolean;
  /** 确定时是否显示 loading；未配置时有 `beforeSure` 则默认开启 */
  confirmLoadingEnabled?: boolean;
  /**
   * 点击确定：调用 `done()` 后才关闭。
   * 确定按钮不得使用 HeroUI `slot="close"`，否则会跳过本钩子。
   */
  beforeSure?: (done: () => void, ctx: DialogBeforeSureContext) => void | Promise<void>;
  /** 点击取消：调用 `done()` 后才关闭 */
  beforeCancel?: (done: () => void) => void;
  /** 关闭动画结束后回调 */
  closeCallBack?: (args: { command: DialogCloseCommand }) => void;
  /** 自定义底部按钮；未传或空数组时为取消 + 确定 */
  footerButtons?: DialogFooterButton[];
}
