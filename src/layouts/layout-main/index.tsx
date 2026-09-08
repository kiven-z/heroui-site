import type { ReactNode } from 'react';

export function LayoutMain({ children }: { children: ReactNode }) {
  return <main className="container mx-auto max-w-7xl grow px-4 pt-6 pb-8 sm:px-6 sm:pt-10">{children}</main>;
}
