'use client';

import { ErrorStatus } from '../_error/error-status';

export default function Page() {
  return <ErrorStatus code={500} />;
}
