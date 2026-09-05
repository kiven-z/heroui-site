import type { DataTableColumn } from '@/components/table/data-table';

import { Button, Chip } from '@heroui/react';

import { STATUS_COLOR, type Member } from './members';

import { addDialog } from '@/components/ui/dialog';

export const memberColumns: DataTableColumn<Member>[] = [
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
      <Button
        size="sm"
        variant="ghost"
        onPress={() => {
          addDialog({
            title: 'Edit',
            hideFooter: true,
            content: <p className="text-sm text-muted">{row.email}</p>,
          });
        }}
      >
        Edit
      </Button>
    ),
  },
];
