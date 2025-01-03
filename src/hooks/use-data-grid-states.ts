import {
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_PaginationState,
  MRT_RowSelectionState,
  MRT_SortingState,
} from 'mantine-react-table';
import { useState } from 'react';

const globalFilterDefaultValue = '';
const columnFiltersDefaultValue: MRT_ColumnFiltersState = [];
const sortingDefaultValue: MRT_SortingState = [];
const paginationDefaultValue = (pageSize?: number) => ({
  pageIndex: 0,
  pageSize: pageSize || 100,
});
const rowSelectionDefaultValue: MRT_RowSelectionState = {};

interface useDataGridStatesProps {
  pageSize?: number;
  columnFilterFns: Record<string, MRT_FilterOption>;
}

export default function useDataGridStates(props: useDataGridStatesProps) {
  const [globalFilter, setGlobalFilter] = useState(globalFilterDefaultValue);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    columnFiltersDefaultValue
  );
  const [sorting, setSorting] = useState<MRT_SortingState>(sortingDefaultValue);
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    paginationDefaultValue(props.pageSize)
  );
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>(
    rowSelectionDefaultValue
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(props.columnFilterFns);

  return {
    globalFilter: {
      state: globalFilter,
      setState: setGlobalFilter,
    },
    columnFilters: {
      state: columnFilters,
      setState: setColumnFilters,
    },
    sorting: {
      state: sorting,
      setState: setSorting,
    },
    pagination: {
      state: pagination,
      setState: setPagination,
    },
    rowSelection: {
      state: rowSelection,
      setState: setRowSelection,
    },
    columnFilterFns: {
      state: columnFilterFns,
      setState: setColumnFilterFns,
    },
    reset: () => {
      setGlobalFilter(globalFilterDefaultValue);
      setColumnFilters(columnFiltersDefaultValue);
      setSorting(sortingDefaultValue);
      setPagination(paginationDefaultValue(props.pageSize));
      setRowSelection(rowSelectionDefaultValue);
    },
  } as const;
}
