import { DataTableDemo } from './data-table-demo';

import { subtitle, title } from '@/components/primitives';

export default function DataTablePage() {
  return (
    <section className="flex w-full flex-col items-start gap-6 py-8 md:py-10">
      <div className="max-w-xl">
        <h1 className={title()}>Table</h1>
        <p className={subtitle({ class: 'mt-4' })}>Column-driven table with controlled pagination.</p>
      </div>

      <DataTableDemo />
    </section>
  );
}
