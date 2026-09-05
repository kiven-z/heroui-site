import type { PageResult } from '@/components/table/data-table';

export interface Member {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  email: string;
}

const ROLES = ['CEO', 'CTO', 'CMO', 'CFO', 'Engineer', 'Designer', 'Product Manager'] as const;
const STATUSES: Member['status'][] = ['Active', 'On Leave', 'Inactive'];

const MEMBERS: Member[] = Array.from({ length: 80 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    name: `Member ${id}`,
    role: ROLES[index % ROLES.length],
    status: STATUSES[index % STATUSES.length],
    email: `member${id}@acme.com`,
  };
});

export const STATUS_COLOR: Record<Member['status'], 'success' | 'warning' | 'danger'> = {
  Active: 'success',
  'On Leave': 'warning',
  Inactive: 'danger',
};

export const EMPTY_QUERY: Record<string, never> = {};

export async function fetchMembers(query: { pageIndex: number; pageSize: number }): Promise<PageResult<Member>> {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 280);
  });

  const start = (query.pageIndex - 1) * query.pageSize;

  return {
    list: MEMBERS.slice(start, start + query.pageSize),
    total: MEMBERS.length,
    pageNo: query.pageIndex,
    pageSize: query.pageSize,
  };
}
