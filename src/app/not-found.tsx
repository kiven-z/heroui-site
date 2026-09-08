'use client';

import { ErrorStatus } from './_error/error-status';

export default function NotFound() {
  return <ErrorStatus code={404} />;
}
