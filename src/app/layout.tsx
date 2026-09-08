import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { AppProviders } from '@/app/providers';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'heroui-site',
  description: 'Next.js + React + HeroUI site',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={inter.variable} lang="en">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
