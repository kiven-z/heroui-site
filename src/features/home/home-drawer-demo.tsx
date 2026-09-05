import { Button } from '@heroui/react';

import { addDrawer } from '@/components/ui/drawer';

/** Confirm stays pending until `beforeSure` resolves, then closes. */
function openConfirmLoadingDrawer() {
  addDrawer({
    title: 'Confirm loading',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Press Confirm. The button shows a spinner for 400ms, then the drawer closes.</li>
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
function openFooterLessDrawer() {
  addDrawer({
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
function openBackdropLockedDrawer() {
  addDrawer({
    title: 'Backdrop locked',
    hideFooter: true,
    isDismissable: false,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Clicking the backdrop does not close this drawer.</li>
        <li>Close with the X or Escape.</li>
      </ol>
    ),
  });
}

/** Escape does not close. X and backdrop still do. */
function openEscapeLockedDrawer() {
  addDrawer({
    title: 'Escape locked',
    hideFooter: true,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Escape does not close this drawer.</li>
        <li>Close with the X or by clicking the backdrop.</li>
      </ol>
    ),
  });
}

/** Backdrop and Escape both locked. Only the X closes. */
function openDismissLockedDrawer() {
  addDrawer({
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
  });
}

function openStackedDrawers() {
  addDrawer({
    title: 'Bottom drawer',
    className: 'w-[600px]',
    content: 'This drawer sits behind the second one.',
  });

  addDrawer({
    title: 'Top drawer',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>This drawer is stacked above the first one.</li>
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

/** DEV-only imperative Drawer demo. Omitted from production builds. */
export function HomeDrawerDemo() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onPress={openConfirmLoadingDrawer}>
        Drawer: Confirm loading
      </Button>
      <Button variant="secondary" onPress={openFooterLessDrawer}>
        Drawer: No footer
      </Button>
      <Button variant="tertiary" onPress={openBackdropLockedDrawer}>
        Drawer: Lock backdrop
      </Button>
      <Button variant="ghost" onPress={openEscapeLockedDrawer}>
        Drawer: Lock Escape
      </Button>
      <Button variant="outline" onPress={openDismissLockedDrawer}>
        Drawer: Lock backdrop and Escape
      </Button>
      <Button variant="tertiary" onPress={openStackedDrawers}>
        Stacked drawers
      </Button>
    </div>
  );
}
