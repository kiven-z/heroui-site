import type { ReactNode } from 'react';

import { LayoutFooter } from '@/layouts/layout-footer';
import { LayoutHeader } from '@/layouts/layout-header';
import { LayoutMain } from '@/layouts/layout-main';

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <LayoutHeader />
      <LayoutMain>{children}</LayoutMain>
      <LayoutFooter />
    </div>
  );
}
