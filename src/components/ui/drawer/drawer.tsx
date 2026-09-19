'use client';

import type { ReactNode } from 'react';

import { Button, Drawer as HeroDrawer, Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';

/** 滑出边，对应 HeroUI `Drawer.Content` 的 `placement` */
type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

/** 受控 Drawer 打开参数，对应 antd Drawer 的 `open` 模型 */
interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  /** 滑出边；默认 `right` */
  placement?: DrawerPlacement;
  /** 传给 `Drawer.Dialog` 的 className，用于覆盖默认宽度等 */
  className?: string;
  /** 隐藏底部操作区；默认 `false` */
  hideFooter?: boolean;
  /** 点击遮罩关闭；默认 `true` */
  isDismissable?: boolean;
  /** 禁用 ESC 关闭；默认 `false` */
  isKeyboardDismissDisabled?: boolean;
  /** 显示右上角关闭钮；默认 `true` */
  showClose?: boolean;
  confirmLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * 受控抽屉：调用方持有 `open`，正文作为 children 进入同一棵树。
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  placement = 'right',
  className,
  hideFooter = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  showClose = true,
  confirmLoading = false,
  onConfirm,
  onCancel,
}: DrawerProps) {
  const { t } = useTranslation();

  function handleCancel() {
    if (onCancel) {
      onCancel();

      return;
    }

    onOpenChange(false);
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();

      return;
    }

    onOpenChange(false);
  }

  return (
    <HeroDrawer.Backdrop
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={open}
      onOpenChange={onOpenChange}
    >
      <HeroDrawer.Content placement={placement}>
        <HeroDrawer.Dialog className={className}>
          {showClose ? <HeroDrawer.CloseTrigger /> : null}
          <HeroDrawer.Header>
            <HeroDrawer.Heading>{title}</HeroDrawer.Heading>
          </HeroDrawer.Header>
          <HeroDrawer.Body>{children}</HeroDrawer.Body>
          {hideFooter ? null : (
            <HeroDrawer.Footer>
              <Button variant="secondary" onPress={handleCancel}>
                {t('dialog.close')}
              </Button>
              <Button isPending={confirmLoading} onPress={handleConfirm}>
                {({ isPending }) => (
                  <>
                    {isPending ? <Spinner color="current" size="sm" /> : null}
                    {t('dialog.confirm')}
                  </>
                )}
              </Button>
            </HeroDrawer.Footer>
          )}
        </HeroDrawer.Dialog>
      </HeroDrawer.Content>
    </HeroDrawer.Backdrop>
  );
}
