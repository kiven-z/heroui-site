import { ErrorStatus } from './error-status';

export default function NotFoundPage() {
  return <ErrorStatus code={404} />;
}
