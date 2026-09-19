import type { ReactNode } from 'react';

import { Button, Disclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';

import { Dialog } from '@/components/ui/dialog';

function NativePreviewPanel() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full max-w-md text-center">
      <Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Heading>
          <Button slot="trigger" variant="secondary">
            Preview HeroUI Native
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="shadow-panel flex flex-col items-center rounded-3xl bg-surface p-4 text-center">
            <p className="text-sm text-muted">
              Scan this QR code with your camera app to preview the HeroUI native components.
            </p>
            <img
              alt="Expo Go QR code"
              className="aspect-square w-full max-w-54 object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png"
            />
            <p className="text-sm text-muted">Expo must be installed on your device.</p>
            <Button className="mt-4" variant="primary">
              <Icon icon="tabler:brand-apple-filled" />
              Download on the App Store
            </Button>
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}

type DialogDemoId = 'confirm' | 'noFooter' | 'lockBackdrop' | 'lockEscape' | 'lockDismiss' | 'custom';

interface DialogDemo {
  title: string;
  hideFooter?: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  content: ReactNode;
}

const DIALOG_DEMOS: Record<DialogDemoId, DialogDemo> = {
  confirm: {
    title: 'Confirm loading',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Press Confirm. The button shows a spinner for 400ms, then the dialog closes.</li>
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
        <li>Clicking the backdrop does not close this dialog.</li>
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
        <li>Escape does not close this dialog.</li>
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
        <li>The backdrop and Escape do not close this dialog.</li>
        <li>Close with the X.</li>
      </ol>
    ),
  },
  custom: {
    title: 'Custom content',
    content: <NativePreviewPanel />,
  },
};

/** DEV-only controlled Dialog demo. Omitted from production builds. */
export function HomeDialogDemo() {
  const [demo, setDemo] = useState<DialogDemoId | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const current = demo ? DIALOG_DEMOS[demo] : null;

  function handleOpen(id: DialogDemoId) {
    setDemo(id);
    setConfirmLoading(false);
    setOpen(true);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setConfirmLoading(false);
    }
  }

  async function handleConfirm() {
    setConfirmLoading(true);
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 400);
    });
    setConfirmLoading(false);
    setOpen(false);
  }

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onPress={() => handleOpen('confirm')}>
          Confirm loading
        </Button>
        <Button variant="secondary" onPress={() => handleOpen('noFooter')}>
          No footer
        </Button>
        <Button variant="tertiary" onPress={() => handleOpen('lockBackdrop')}>
          Lock backdrop
        </Button>
        <Button variant="ghost" onPress={() => handleOpen('lockEscape')}>
          Lock Escape
        </Button>
        <Button variant="outline" onPress={() => handleOpen('lockDismiss')}>
          Lock backdrop and Escape
        </Button>
        <Button variant="secondary" onPress={() => handleOpen('custom')}>
          Custom content
        </Button>
      </div>

      <Dialog
        confirmLoading={confirmLoading}
        hideFooter={current?.hideFooter}
        isDismissable={current?.isDismissable}
        isKeyboardDismissDisabled={current?.isKeyboardDismissDisabled}
        open={open}
        title={current?.title ?? ''}
        onConfirm={demo === 'confirm' ? handleConfirm : undefined}
        onOpenChange={handleOpenChange}
      >
        {current?.content}
      </Dialog>
    </>
  );
}
