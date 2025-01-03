import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { DataGridLocalization } from '../../../../constants';
import { GetSelectedIds } from '../../../../utils';
import { columns } from './constants';
import RowActions from './row-actions';
import ToolbarInternalActions from './toolbar-internal-actions';
import TopToolbarCustomActions from './top-toolbar-custom-actions';
import { PlannedCourseStudentsProps } from './types';
import useListPlannedCourseStudents from './use-list-planned-course-students';

export default (props: PlannedCourseStudentsProps) => {
  const [states, response, newButtonDisabled, deleteButtonDisabled] = useListPlannedCourseStudents();

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
    positionActionsColumn: 'last',
    enableEditing: true,
    mantineTableContainerProps: {
      style: {
        flex: 1,
      },
    },
    mantinePaperProps: {
      style: {
        '--paper-shadow': '',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
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
        onNewButtonClick={props.onNewButtonClick}
        onDeleteButtonClick={() =>
          props.onDeleteButtonClick(GetSelectedIds(states.rowSelection.state))
        }
        newButtonDisabled={newButtonDisabled}
        deleteButtonDisabled={deleteButtonDisabled}
      />
    ),
    renderToolbarInternalActions: ({ table }) => (
      <ToolbarInternalActions table={table} />
    ),
    renderRowActions: ({ row }) => (
      <RowActions
        onUpdateButtonClick={() => props.onUpdateButtonClick(row.original.id)}
      />
    ),
    localization: DataGridLocalization,
  });

  return <MantineReactTable table={table} />;
};
