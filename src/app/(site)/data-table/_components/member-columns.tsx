import type { DataTableColumn } from '@/components/ui/data-table';

import { Button, Chip } from '@heroui/react';

import { type Member, STATUS_COLOR } from './members';

export function createMemberColumns(onEdit: (member: Member) => void): DataTableColumn<Member>[] {
  return [
    { id: 'name', accessor: 'name', label: 'Name', isRowHeader: true },
    { id: 'role', accessor: 'role', label: 'Role' },
    {
      id: 'status',
      accessor: 'status',
      label: 'Status',
      render: ({ row }) => (
        <Chip color={STATUS_COLOR[row.status]} size="sm" variant="soft">
          {row.status}
        </Chip>
      ),
    },
    { id: 'email', accessor: 'email', label: 'Email' },
    {
      id: 'actions',
      label: 'Actions',
      render: ({ row }) => (
        <Button size="sm" variant="ghost" onPress={() => onEdit(row)}>
          Edit
        </Button>
      ),
    },
  ];
}
