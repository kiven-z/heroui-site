'use client';

import type { ReactNode } from 'react';

import { Button, Modal, Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';

/** Dialog 尺寸，对应 HeroUI `Modal.Container` 的 `size` */
type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full';

/** 受控 Dialog 打开参数，对应 antd Modal 的 `open` 模型 */
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  size?: DialogSize;
  /** 传给 `Modal.Dialog` 的 className */
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
 * 受控弹窗：调用方持有 `open`，正文作为 children 进入同一棵树。
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  size = 'sm',
  className,
  hideFooter = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  showClose = true,
  confirmLoading = false,
  onConfirm,
  onCancel,
}: DialogProps) {
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
    <Modal.Backdrop
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={open}
      onOpenChange={onOpenChange}
    >
      <Modal.Container size={size}>
        <Modal.Dialog className={className}>
          {showClose ? <Modal.CloseTrigger /> : null}
          <Modal.Header>
            <Modal.Heading>{title}</Modal.Heading>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          {hideFooter ? null : (
            <Modal.Footer>
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
            </Modal.Footer>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
