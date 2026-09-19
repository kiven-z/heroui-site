import { Surface } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';

import { createMemberColumns } from './member-columns';
import { EMPTY_QUERY, fetchMembers, type Member } from './members';

import { DataTable, usePaginationState } from '@/components/ui/data-table';
import { Dialog } from '@/components/ui/dialog';

export function DataTableDemo() {
  const [editing, setEditing] = useState<Member | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const columns = useMemo(
    () =>
      createMemberColumns((member) => {
        setEditing(member);
        setEditOpen(true);
      }),
    []
  );

  const selectableState = usePaginationState<Member>({
    fetchApi: fetchMembers,
    searchForm: EMPTY_QUERY,
    defaultPageSize: 10,
  });
  const plainState = usePaginationState<Member>({
    fetchApi: fetchMembers,
    searchForm: EMPTY_QUERY,
    defaultPageSize: 10,
  });

  useEffect(() => {
    void selectableState.fetchTableData();
    void plainState.fetchTableData();
  }, [selectableState.fetchTableData, plainState.fetchTableData]);

  return (
    <div className="flex w-full flex-col gap-6">
      <Surface className="w-full rounded-3xl p-4">
        <p className="m-0 mb-3 truncate text-base font-semibold">Members</p>
        <DataTable
          aria-label="Members"
          columns={columns}
          data={selectableState.tableData}
          loading={selectableState.loading}
          pagination={selectableState.pagination}
          rowKey="id"
          selectedKeys={selectableState.selectedKeys}
          selectionMode="multiple"
          onPageCurrentChange={selectableState.handlePageCurrentChange}
          onPageSizeChange={selectableState.handlePageSizeChange}
          onSelectionChange={selectableState.handleSelectionChange}
        />
      </Surface>

      <Surface className="w-full rounded-3xl p-4">
        <p className="m-0 mb-3 truncate text-base font-semibold">Members (no selection)</p>
        <DataTable
          aria-label="Members without selection"
          columns={columns}
          data={plainState.tableData}
          loading={plainState.loading}
          pagination={plainState.pagination}
          rowKey="id"
          onPageCurrentChange={plainState.handlePageCurrentChange}
          onPageSizeChange={plainState.handlePageSizeChange}
        />
      </Surface>

      <Dialog hideFooter open={editOpen} title="Edit" onOpenChange={setEditOpen}>
        <p className="text-sm text-muted">{editing?.email}</p>
      </Dialog>
    </div>
  );
}
