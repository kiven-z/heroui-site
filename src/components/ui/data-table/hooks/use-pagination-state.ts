import type { DataTableSelection, FetchTableDataOptions, PageResult, PaginationTableState } from '../types.ts';

import { toast } from '@heroui/react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaginationSnapshot {
  total: number;
  pageSize: number;
  currentPage: number;
}

/** {@link usePaginationState} 配置 */
interface UsePaginationStateOptions<T, TQuery extends Record<string, unknown>> {
  fetchApi: (params: TQuery & { pageIndex: number; pageSize: number }) => Promise<PageResult<T>>;
  searchForm: TQuery;
  defaultPageSize?: number;
}

function buildPaginationQuery<TQuery extends Record<string, unknown>>(
  searchForm: TQuery,
  currentPage: number,
  pageSize: number
): TQuery & { pageIndex: number; pageSize: number } {
  const query: Record<string, unknown> = {
    ...searchForm,
    pageIndex: currentPage,
    pageSize,
  };

  for (const key of Object.keys(query)) {
    const value = query[key];

    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
      delete query[key];
    }
  }

  return query as TQuery & { pageIndex: number; pageSize: number };
}

function applyPageResult<T>(prev: PaginationSnapshot, page: PageResult<T>): PaginationSnapshot {
  return {
    total: page.total,
    currentPage: typeof page.pageNo === 'number' && page.pageNo >= 1 ? page.pageNo : prev.currentPage,
    pageSize: typeof page.pageSize === 'number' && page.pageSize >= 1 ? page.pageSize : prev.pageSize,
  };
}

/**
 * 分页列表状态：loading / 数据 / 分页 / 选择，以及拉取与翻页。
 */
export function usePaginationState<T extends object, TQuery extends Record<string, unknown> = Record<string, unknown>>(
  options: UsePaginationStateOptions<T, TQuery>
): PaginationTableState<T> {
  const { defaultPageSize = 30 } = options;
  const { t } = useTranslation();
  const searchFormRef = useRef(options.searchForm);
  const fetchApiRef = useRef(options.fetchApi);

  searchFormRef.current = options.searchForm;
  fetchApiRef.current = options.fetchApi;

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<T[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<DataTableSelection>(() => new Set());
  const [pagination, setPagination] = useState<PaginationSnapshot>({
    total: 0,
    pageSize: defaultPageSize,
    currentPage: 1,
  });
  const paginationRef = useRef(pagination);

  paginationRef.current = pagination;

  const runFetch = useCallback(
    async (next: PaginationSnapshot, silent: boolean) => {
      paginationRef.current = next;
      setPagination(next);

      if (!silent) {
        setLoading(true);
      }

      const query = buildPaginationQuery(searchFormRef.current, next.currentPage, next.pageSize);

      try {
        const page = await fetchApiRef.current(query);

        setTableData(page.list);
        const applied = applyPageResult(next, page);

        paginationRef.current = applied;
        setPagination(applied);
      } catch (error: unknown) {
        const description = error instanceof Error ? error.message : undefined;

        toast.danger(t('table.fetchFailed'), description ? { description } : undefined);
        setTableData([]);
        const failed = { ...next, total: 0 };

        paginationRef.current = failed;
        setPagination(failed);
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [t]
  );

  const fetchTableData = useCallback(
    async (input?: FetchTableDataOptions) => {
      await runFetch(paginationRef.current, input?.silent === true);
    },
    [runFetch]
  );

  const handlePageSizeChange = useCallback(
    async (size: number) => {
      await runFetch({ ...paginationRef.current, pageSize: size, currentPage: 1 }, false);
    },
    [runFetch]
  );

  const handlePageCurrentChange = useCallback(
    async (page: number) => {
      await runFetch({ ...paginationRef.current, currentPage: page }, false);
    },
    [runFetch]
  );

  return {
    loading,
    tableData,
    selectedKeys,
    pagination,
    fetchTableData,
    handlePageSizeChange,
    handlePageCurrentChange,
    handleSelectionChange: setSelectedKeys,
  };
}
