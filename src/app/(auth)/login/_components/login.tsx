'use client';

import type { SyntheticEvent } from 'react';

import { Button, Card, Input, Label, TextField, toast } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info(t('login.demoOnly'));
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>{t('login.title')}</Card.Title>
        </Card.Header>
        <Card.Content>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField isRequired name="email" type="email">
              <Label>{t('login.email')}</Label>
              <Input placeholder="name@example.com" />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label>{t('login.password')}</Label>
              <Input />
            </TextField>
            <Button className="w-full" type="submit">
              {t('login.submit')}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
