'use client';

import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('./_components/home'), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  return <HomePage />;
}
