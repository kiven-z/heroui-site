import type { ReactNode } from 'react';

import { Button } from '@heroui/react';
import { useState } from 'react';

import { Drawer } from '@/components/ui/drawer';

type DrawerDemoId = 'confirm' | 'noFooter' | 'lockBackdrop' | 'lockEscape' | 'lockDismiss';

interface DrawerDemo {
  title: string;
  hideFooter?: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  content: ReactNode;
}

const DRAWER_DEMOS: Record<DrawerDemoId, DrawerDemo> = {
  confirm: {
    title: 'Confirm loading',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Press Confirm. The button shows a spinner for 400ms, then the drawer closes.</li>
        <li>Cancel, the X, the backdrop, and Escape still close immediately.</li>
      </ol>
    ),
  },
  noFooter: {
    title: 'No footer',
    hideFooter: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>The footer is hidden.</li>
        <li>Close with the X, the backdrop, or Escape.</li>
      </ol>
    ),
  },
  lockBackdrop: {
    title: 'Backdrop locked',
    hideFooter: true,
    isDismissable: false,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Clicking the backdrop does not close this drawer.</li>
        <li>Close with the X or Escape.</li>
      </ol>
    ),
  },
  lockEscape: {
    title: 'Escape locked',
    hideFooter: true,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Escape does not close this drawer.</li>
        <li>Close with the X or by clicking the backdrop.</li>
      </ol>
    ),
  },
  lockDismiss: {
    title: 'Backdrop and Escape locked',
    hideFooter: true,
    isDismissable: false,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>The backdrop and Escape do not close this drawer.</li>
        <li>Close with the X.</li>
      </ol>
    ),
  },
};

/** DEV-only controlled Drawer demo. Omitted from production builds. */
export function HomeDrawerDemo() {
  const [demo, setDemo] = useState<DrawerDemoId | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const current = demo ? DRAWER_DEMOS[demo] : null;

  function handleOpenChange(open: boolean) {
    if (open) {
      return;
    }

    setConfirmLoading(false);
    setDemo(null);
  }

  async function handleConfirm() {
    setConfirmLoading(true);
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 400);
    });
    setConfirmLoading(false);
    setDemo(null);
  }

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onPress={() => setDemo('confirm')}>
          Drawer: Confirm loading
        </Button>
        <Button variant="secondary" onPress={() => setDemo('noFooter')}>
          Drawer: No footer
        </Button>
        <Button variant="tertiary" onPress={() => setDemo('lockBackdrop')}>
          Drawer: Lock backdrop
        </Button>
        <Button variant="ghost" onPress={() => setDemo('lockEscape')}>
          Drawer: Lock Escape
        </Button>
        <Button variant="outline" onPress={() => setDemo('lockDismiss')}>
          Drawer: Lock backdrop and Escape
        </Button>
      </div>

      <Drawer
        confirmLoading={confirmLoading}
        hideFooter={current?.hideFooter}
        isDismissable={current?.isDismissable}
        isKeyboardDismissDisabled={current?.isKeyboardDismissDisabled}
        open={demo !== null}
        title={current?.title ?? ''}
        onConfirm={demo === 'confirm' ? handleConfirm : undefined}
        onOpenChange={handleOpenChange}
      >
        {current?.content}
      </Drawer>
    </>
  );
}
