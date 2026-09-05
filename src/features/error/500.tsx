import { ErrorStatus } from './error-status';

export default function ServerErrorPage() {
  return <ErrorStatus code={500} />;
}
