'use client';

import type { DrawerStoreItem } from './drawer-store';
import type { DrawerFooterButton } from './types';

import { Button, Drawer, Spinner } from '@heroui/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { waitOverlayExitAnimations } from '../overlay';

import { closeDrawer, confirmDrawer, finalizeDrawerClose } from './drawer-store';

interface DrawerItemProps {
  item: DrawerStoreItem;
}

function DrawerActionButton({ label, isDisabled, isPending, variant, onPress }: DrawerFooterButton) {
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
 * 单个命令式 Drawer：受控 HeroUI Drawer，退出动画结束后再移除。
 */
export function DrawerItem({ item }: DrawerItemProps) {
  const { t } = useTranslation();
  const { options } = item;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.isOpen) {
      return;
    }

    return waitOverlayExitAnimations(overlayRef.current, () => {
      finalizeDrawerClose(item.id);
    });
  }, [item.id, item.isOpen]);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeDrawer(item.id, 'close');
    }
  }

  function handleCancel() {
    const done = () => closeDrawer(item.id, 'cancel');

    if (options.beforeCancel) {
      options.beforeCancel(done);

      return;
    }

    done();
  }

  const customButtons = options.footerButtons;

  return (
    <Drawer.Backdrop
      ref={overlayRef}
      isDismissable={options.isDismissable ?? true}
      isKeyboardDismissDisabled={options.isKeyboardDismissDisabled ?? false}
      isOpen={item.isOpen}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Content placement={options.placement ?? 'right'}>
        <Drawer.Dialog className={options.className}>
          {options.showClose === false ? null : <Drawer.CloseTrigger />}
          <Drawer.Header>
            <Drawer.Heading>{options.title}</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body>{options.content}</Drawer.Body>
          {options.hideFooter ? null : (
            <Drawer.Footer>
              {customButtons && customButtons.length > 0 ? (
                customButtons.map((button, index) => (
                  <DrawerActionButton key={`${button.label}-${index}`} {...button} />
                ))
              ) : (
                <>
                  <Button variant="secondary" onPress={handleCancel}>
                    {t('dialog.close')}
                  </Button>
                  <DrawerActionButton
                    isPending={item.confirmLoading}
                    label={t('dialog.confirm')}
                    onPress={() => confirmDrawer(item.id)}
                  />
                </>
              )}
            </Drawer.Footer>
          )}
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
