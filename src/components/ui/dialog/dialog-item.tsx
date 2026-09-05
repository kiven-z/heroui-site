import type { DialogStoreItem } from './dialog-store';
import type { DialogFooterButton } from './types';

import { Button, Modal, Spinner } from '@heroui/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { waitOverlayExitAnimations } from '../overlay';

import { closeDialog, confirmDialog, finalizeDialogClose } from './dialog-store';

interface DialogItemProps {
  item: DialogStoreItem;
}

function DialogActionButton({ label, isDisabled, isPending, variant, onPress }: DialogFooterButton) {
  return (
    <Button isDisabled={isDisabled} isPending={isPending} variant={variant} onPress={onPress}>
      {({ isPending: pending }) => (
        <>
          {pending ? <Spinner color="current" size="sm" /> : null}
          {label}
        </>
      )}
    </Button>
  );
}

/**
 * 单个命令式 Dialog：受控 HeroUI Modal，退出动画结束后再从队列移除。
 */
export function DialogItem({ item }: DialogItemProps) {
  const { t } = useTranslation();
  const { options } = item;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.isOpen) {
      return;
    }

    return waitOverlayExitAnimations(overlayRef.current, () => {
      finalizeDialogClose(item.id);
    });
  }, [item.id, item.isOpen]);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeDialog(item.id, 'close');
    }
  }

  function handleCancel() {
    const done = () => closeDialog(item.id, 'cancel');

    if (options.beforeCancel) {
      options.beforeCancel(done);

      return;
    }

    done();
  }

  const customButtons = options.footerButtons;

  return (
    <Modal.Backdrop
      ref={overlayRef}
      isDismissable={options.isDismissable ?? true}
      isKeyboardDismissDisabled={options.isKeyboardDismissDisabled ?? false}
      isOpen={item.isOpen}
      onOpenChange={handleOpenChange}
    >
      <Modal.Container size={options.size}>
        <Modal.Dialog>
          {options.showClose === false ? null : <Modal.CloseTrigger />}
          <Modal.Header>
            <Modal.Heading>{options.title}</Modal.Heading>
          </Modal.Header>
          <Modal.Body>{options.content}</Modal.Body>
          {options.hideFooter ? null : (
            <Modal.Footer>
              {customButtons && customButtons.length > 0 ? (
                customButtons.map((button, index) => (
                  <DialogActionButton key={`${button.label}-${index}`} {...button} />
                ))
              ) : (
                <>
                  <Button variant="secondary" onPress={handleCancel}>
                    {t('dialog.close')}
                  </Button>
                  <DialogActionButton
                    isPending={item.confirmLoading}
                    label={t('dialog.confirm')}
                    onPress={() => confirmDialog(item.id)}
                  />
                </>
              )}
            </Modal.Footer>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
