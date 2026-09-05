import { ErrorStatus } from './error-status';

export default function ForbiddenPage() {
  return <ErrorStatus code={403} />;
}
