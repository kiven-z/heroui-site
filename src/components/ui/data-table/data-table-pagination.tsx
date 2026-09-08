import type { Key } from 'react';
import type { DataTablePagination as DataTablePaginationValue } from './types';

import { ListBox, Pagination, Select } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZES } from './constants';

interface DataTablePaginationProps {
  pagination: DataTablePaginationValue;
  onPageCurrentChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

type PageItem = number | 'ellipsis';

/**
 * 生成带省略号的页码序列。
 */
function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];

  if (currentPage > 3) {
    items.push('ellipsis');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (currentPage < totalPages - 2) {
    items.push('ellipsis');
  }

  items.push(totalPages);

  return items;
}

/**
 * 把 total / pageSize / currentPage 编成 HeroUI Pagination，含每页条数。
 */
export function DataTablePagination({ pagination, onPageCurrentChange, onPageSizeChange }: DataTablePaginationProps) {
  const { t } = useTranslation();
  const { currentPage, pageSize, total } = pagination;
  const pageSizes = pagination.pageSizes ?? DEFAULT_PAGE_SIZES;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  function handlePageSizeChange(value: Key | Key[] | null) {
    if (typeof value === 'string' || typeof value === 'number') {
      onPageSizeChange?.(Number(value));
    }
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <Select
        aria-label={t('table.pageSizeLabel')}
        className="w-36"
        value={String(pageSize)}
        variant="secondary"
        onChange={handlePageSizeChange}
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {pageSizes.map((size) => (
              <ListBox.Item key={size} id={String(size)} textValue={t('table.pageSize', { size })}>
                {t('table.pageSize', { size })}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <Pagination className="min-w-0 flex-1" size="sm">
        <Pagination.Summary>{t('table.summary', { start: startItem, end: endItem, total })}</Pagination.Summary>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous isDisabled={currentPage <= 1} onPress={() => onPageCurrentChange?.(currentPage - 1)}>
              <Pagination.PreviousIcon />
              {t('table.previous')}
            </Pagination.Previous>
          </Pagination.Item>
          {buildPageItems(currentPage, totalPages).map((item, index) =>
            item === 'ellipsis' ? (
              <Pagination.Item key={`ellipsis-${index}`}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={item}>
                <Pagination.Link isActive={item === currentPage} onPress={() => onPageCurrentChange?.(item)}>
                  {item}
                </Pagination.Link>
              </Pagination.Item>
            )
          )}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage >= totalPages}
              onPress={() => onPageCurrentChange?.(currentPage + 1)}
            >
              {t('table.next')}
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}
