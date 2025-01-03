import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { DataGridLocalization } from '../../../../constants';
import { GetSelectedIds } from '../../../../utils';
import { columns } from './constants';
import RowActions from './row-actions';
import ToolbarInternalActions from './toolbar-internal-actions';
import TopToolbarCustomActions from './top-toolbar-custom-actions';
import useListStudents from './use-list-students';

export default () => {
  const [
    states,
    response,
    deleteButtonDisabled,
    onLogPaymentButtonClick,
    onNewButtonClick,
    onUpdateButtonClick,
    onDeleteButtonClick,
    onShowAttendancesButtonClick
  ] = useListStudents();

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
        onNewButtonClick={onNewButtonClick}
        onDeleteButtonClick={() =>
          onDeleteButtonClick(GetSelectedIds(states.rowSelection.state))
        }
        deleteButtonDisabled={deleteButtonDisabled}
      />
    ),
    renderToolbarInternalActions: ({ table }) => (
      <ToolbarInternalActions table={table} />
    ),
    renderRowActions: ({ row }) => (
      <RowActions
          student={row.original}
        onUpdateButtonClick={() => onUpdateButtonClick(row.original.id)}
        onLogPaymentButtonClick={() => onLogPaymentButtonClick(row.original.id)}
        onShowAttendancesButtonClick={() => onShowAttendancesButtonClick(row.original.id)}
      />
    ),
    localization: DataGridLocalization,
  });

  return <MantineReactTable table={table} />;
};
