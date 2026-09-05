import { Button, Disclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import { addDialog } from '@/components/ui/dialog';

function NativePreviewPanel() {
  const [isExpanded, setIsExpanded] = React.useState(true);

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

/** Confirm stays pending until `beforeSure` resolves, then closes. */
function openConfirmLoadingDialog() {
  addDialog({
    title: 'Confirm loading',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Press Confirm. The button shows a spinner for 400ms, then the dialog closes.</li>
        <li>Cancel, the X, the backdrop, and Escape still close immediately.</li>
      </ol>
    ),
    beforeSure: async (done) => {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 400);
      });
      done();
    },
  });
}

/** Footer hidden. Default dismiss: X, backdrop, and Escape. */
function openFooterLessDialog() {
  addDialog({
    title: 'No footer',
    hideFooter: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>The footer is hidden.</li>
        <li>Close with the X, the backdrop, or Escape.</li>
      </ol>
    ),
  });
}

/** Backdrop click does not close. X and Escape still do. */
function openBackdropLockedDialog() {
  addDialog({
    title: 'Backdrop locked',
    hideFooter: true,
    isDismissable: false,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Clicking the backdrop does not close this dialog.</li>
        <li>Close with the X or Escape.</li>
      </ol>
    ),
  });
}

/** Escape does not close. X and backdrop still do. */
function openEscapeLockedDialog() {
  addDialog({
    title: 'Escape locked',
    hideFooter: true,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Escape does not close this dialog.</li>
        <li>Close with the X or by clicking the backdrop.</li>
      </ol>
    ),
  });
}

/** Backdrop and Escape both locked. Only the X closes. */
function openDismissLockedDialog() {
  addDialog({
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
  });
}

function openCustomContentDialog() {
  addDialog({
    title: 'Custom content',
    content: <NativePreviewPanel />,
  });
}

function openStackedDialogs() {
  addDialog({
    title: 'Bottom dialog',
    content: 'This dialog sits behind the second one.',
  });

  addDialog({
    title: 'Top dialog',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>This dialog is stacked above the first one.</li>
        <li>Press Confirm to show loading, then close this layer.</li>
      </ol>
    ),
    beforeSure: async (done) => {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 400);
      });
      done();
    },
  });
}

/** DEV-only imperative Dialog demo. Omitted from production builds. */
export function HomeDialogDemo() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onPress={openConfirmLoadingDialog}>
        Confirm loading
      </Button>
      <Button variant="secondary" onPress={openFooterLessDialog}>
        No footer
      </Button>
      <Button variant="tertiary" onPress={openBackdropLockedDialog}>
        Lock backdrop
      </Button>
      <Button variant="ghost" onPress={openEscapeLockedDialog}>
        Lock Escape
      </Button>
      <Button variant="outline" onPress={openDismissLockedDialog}>
        Lock backdrop and Escape
      </Button>
      <Button variant="secondary" onPress={openCustomContentDialog}>
        Custom content
      </Button>
      <Button variant="tertiary" onPress={openStackedDialogs}>
        Stacked dialogs
      </Button>
    </div>
  );
}
