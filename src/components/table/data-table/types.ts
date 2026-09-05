import type { ReactNode } from 'react';

/** 单元格 render 上下文 */
export interface DataTableCellContext<T> {
  row: T;
  value: unknown;
  index: number;
}

/** 行 id / 选择键 */
export type DataTableRowKey = string | number;

/** HeroUI Table 行选择值 */
export type DataTableSelection = 'all' | Set<DataTableRowKey>;

/** 列定义 */
export interface DataTableColumn<T> {
  id: string;
  label: ReactNode;
  accessor?: keyof T;
  render?: (ctx: DataTableCellContext<T>) => ReactNode;
  /** 行头列；未指定时第一列作为行头 */
  isRowHeader?: boolean;
}

/** 分页对象（只读展示；页码变更由回调交给父级） */
export interface DataTablePagination {
  total: number;
  pageSize: number;
  currentPage: number;
  pageSizes?: number[];
}

/** L0 表格：表体 + 分页 */
export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string | number);
  'aria-label': string;
  className?: string;
  /** 表体吃满已定高父级；默认表体封顶并内部滚动 */
  fill?: boolean;
  loading?: boolean;
  pagination?: DataTablePagination | null;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedKeys?: DataTableSelection;
  onSelectionChange?: (keys: DataTableSelection) => void;
  onPageCurrentChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

/** 分页接口响应 */
export interface PageResult<T> {
  list: T[];
  total: number;
  pageNo?: number;
  pageSize?: number;
}

/** 表格拉取选项 */
export interface FetchTableDataOptions {
  /** 为 true 时不切换 loading */
  silent?: boolean;
}

/** {@link usePaginationState} 返回的分页表格状态 */
export interface PaginationTableState<T> {
  loading: boolean;
  tableData: T[];
  selectedKeys: DataTableSelection;
  pagination: DataTablePagination;
  fetchTableData: (options?: FetchTableDataOptions) => Promise<void>;
  handlePageSizeChange: (size: number) => Promise<void>;
  handlePageCurrentChange: (page: number) => Promise<void>;
  handleSelectionChange: (keys: DataTableSelection) => void;
}
