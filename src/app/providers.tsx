'use client';

import type { ReactNode } from 'react';

import { Toast } from '@heroui/react';
import { useEffect } from 'react';

import { DialogHost } from '@/components/ui/dialog';
import { DrawerHost } from '@/components/ui/drawer';
import { applyHydratedUiPreferences } from '@/core/preferences/runtime/apply';
import { Provider } from '@/provider';

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    void applyHydratedUiPreferences();
  }, []);

  return (
    <Provider>
      {children}
      <DialogHost />
      <DrawerHost />
      <Toast.Provider placement="bottom end" />
    </Provider>
  );
}
