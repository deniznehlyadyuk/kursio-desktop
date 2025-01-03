import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { DataGridLocalization } from '../../../../constants';
import { GetSelectedIds } from '../../../../utils';
import { columns } from './constants';
import RowActions from './row-actions';
import ToolbarInternalActions from './toolbar-internal-actions';
import TopToolbarCustomActions from './top-toolbar-custom-actions';
import useListPaymentHistories from './use-list-payment-histories';
import {ListPaymentHistoriesProps} from "../../types";

export default (props: ListPaymentHistoriesProps) => {
  const [
    states,
    response,
    deleteButtonDisabled
  ] = useListPaymentHistories();

  const table = useMantineReactTable({
    columns,
    data: response.data,
    rowCount: response.rowCount,
    getRowId: response.getRowId,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableRowSelection: true,
    enableColumnFilterModes: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    onGlobalFilterChange: states.globalFilter.setState,
    onColumnFiltersChange: states.columnFilters.setState,
    onSortingChange: states.sorting.setState,
    onPaginationChange: states.pagination.setState,
    onRowSelectionChange: states.rowSelection.setState,
    onColumnFilterFnsChange: states.columnFilterFns.setState,
    positionToolbarAlertBanner: 'bottom',
    enableEditing: true,
    positionActionsColumn: 'last',
    mantineTableContainerProps: {
      style: {
        height: '100%',
      },
    },
    mantinePaperProps: {
      style: {
        '--paper-shadow': '',
        height: 'calc(100vh - 32px)',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    mantineTableProps: {
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
      striped: 'odd',
      highlightOnHover: false,
      style: {
        border: 'none',
      },
    },
    state: {
      globalFilter: states.globalFilter.state,
      columnFilters: states.columnFilters.state,
      sorting: states.sorting.state,
      pagination: states.pagination.state,
      isLoading: response.isFetching,
      showProgressBars: response.isFetching,
      rowSelection: states.rowSelection.state,
      columnFilterFns: states.columnFilterFns.state,
    },
    initialState: {
      density: 'xs',
      showColumnFilters: true,
    },
    renderTopToolbarCustomActions: () => (
      <TopToolbarCustomActions
        onDeleteButtonClick={() =>
          props.onDeleteButtonClick(GetSelectedIds(states.rowSelection.state))
        }
        deleteButtonDisabled={deleteButtonDisabled}
      />
    ),
    renderToolbarInternalActions: ({ table }) => (
      <ToolbarInternalActions table={table} />
    ),
    renderRowActions: ({ row }) => (
      <RowActions
        onUpdateButtonClick={() => props.onUpdateButtonClick(row.original.id.toString())}
      />
    ),
    localization: DataGridLocalization,
  });

  return <MantineReactTable table={table} />;
};
