'use client';

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { subtitle, title } from '@/components/primitives';

interface ErrorStatusProps {
  code: 403 | 404 | 500;
}

export function ErrorStatus({ code }: ErrorStatusProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6">
      <p className="text-6xl font-semibold tracking-tight text-muted">{code}</p>
      <h1 className={title({ size: 'sm' })}>{t(`error.${code}.title`)}</h1>
      <p className={subtitle({ class: 'text-center' })}>{t(`error.${code}.description`)}</p>
      <Button onPress={() => router.push('/')}>{t('error.backHome')}</Button>
    </div>
  );
}
