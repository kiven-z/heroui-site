'use client';

import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('./_components/login'), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  return <LoginPage />;
}
