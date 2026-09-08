'use client';

import dynamic from 'next/dynamic';

const DataTablePage = dynamic(() => import('./_components/data-table-page'), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  return <DataTablePage />;
}
