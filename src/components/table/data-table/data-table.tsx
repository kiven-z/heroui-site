import type { ReactNode } from 'react';
import type { DataTableColumn, DataTableProps } from './types';

import { Checkbox, EmptyState, Spinner, Table } from '@heroui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTablePagination } from './data-table-pagination';

function resolveRowId<T extends object>(row: T, rowKey: DataTableProps<T>['rowKey']): string | number {
  if (typeof rowKey === 'function') {
    return rowKey(row);
  }

  return row[rowKey] as string | number;
}

function resolveCell<T extends object>(column: DataTableColumn<T>, row: T, index: number): ReactNode {
  const value = column.accessor == null ? undefined : row[column.accessor];

  if (column.render) {
    return column.render({ row, value, index });
  }

  if (value == null) {
    return null;
  }

  return value as ReactNode;
}

function resolveHeaderColumns<T>(columns: DataTableColumn<T>[]): DataTableColumn<T>[] {
  if (columns.some((column) => column.isRowHeader)) {
    return columns;
  }

  return columns.map((column, index) => (index === 0 ? { ...column, isRowHeader: true } : column));
}

function resolveRowSelectionLabel<T extends object>(
  column: DataTableColumn<T> | undefined,
  row: T,
  rowId: string | number
): string {
  if (column?.accessor != null) {
    const value = row[column.accessor];

    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
  }

  return String(rowId);
}

function SelectionCheckbox({ label, variant }: { label: string; variant?: 'secondary' }) {
  return (
    <Checkbox aria-label={label} slot="selection" variant={variant}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox.Content>
    </Checkbox>
  );
}

/**
 * L0 表格：列配置驱动的表体 + 受控分页。
 */
export function DataTable<T extends object>({
  'aria-label': ariaLabel,
  className,
  columns,
  data,
  fill = false,
  loading = false,
  pagination = null,
  rowKey,
  selectionMode = 'none',
  selectedKeys,
  onSelectionChange,
  onPageCurrentChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const headerColumns = resolveHeaderColumns(columns);
  const showSelection = selectionMode !== 'none';
  const rowHeaderColumn = headerColumns.find((column) => column.isRowHeader);

  return (
    <div className={clsx('relative min-w-0', fill && 'flex h-full min-h-0 flex-1 flex-col')}>
      <Table className={clsx(fill && 'h-full min-h-0 grid-rows-[minmax(0,1fr)_auto]', className)}>
        <Table.ScrollContainer className={clsx('min-h-0 overflow-auto', fill ? 'h-full' : 'max-h-[min(70vh,40rem)]')}>
          <Table.Content
            aria-label={ariaLabel}
            className="min-w-160 overflow-visible!"
            selectedKeys={selectionMode === 'none' ? undefined : selectedKeys}
            selectionMode={selectionMode}
            onSelectionChange={
              onSelectionChange
                ? (keys) => {
                    onSelectionChange(keys === 'all' ? 'all' : new Set(keys));
                  }
                : undefined
            }
          >
            <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
              {showSelection ? (
                <Table.Column className="pe-0">
                  <SelectionCheckbox label={t('table.selectAll')} />
                </Table.Column>
              ) : null}
              <Table.Collection items={headerColumns}>
                {(column) => (
                  <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                    {column.label}
                  </Table.Column>
                )}
              </Table.Collection>
            </Table.Header>
            <Table.Body
              items={data}
              renderEmptyState={() => <EmptyState className="flex flex-col text-center">{t('table.empty')}</EmptyState>}
            >
              {(row) => {
                const index = data.indexOf(row);
                const rowId = resolveRowId(row, rowKey);

                return (
                  <Table.Row id={rowId}>
                    {showSelection ? (
                      <Table.Cell className="pe-0">
                        <SelectionCheckbox
                          label={t('table.selectRow', { name: resolveRowSelectionLabel(rowHeaderColumn, row, rowId) })}
                          variant="secondary"
                        />
                      </Table.Cell>
                    ) : null}
                    <Table.Collection items={headerColumns}>
                      {(column) => <Table.Cell>{resolveCell(column, row, index)}</Table.Cell>}
                    </Table.Collection>
                  </Table.Row>
                );
              }}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        {pagination ? (
          <Table.Footer>
            <DataTablePagination
              pagination={pagination}
              onPageCurrentChange={onPageCurrentChange}
              onPageSizeChange={onPageSizeChange}
            />
          </Table.Footer>
        ) : null}
      </Table>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
          <Spinner />
        </div>
      ) : null}
    </div>
  );
}
