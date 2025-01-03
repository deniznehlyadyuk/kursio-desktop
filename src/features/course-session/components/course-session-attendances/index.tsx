import { Card, Text } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { DataGridLocalization } from '../../../../constants';
import { columns } from './constants';
import RowActions from './row-actions';
import useCourseSessionAttendances from './use-course-session-attendances';

export default () => {
  const [states, response, onAttended, onMissed] =
    useCourseSessionAttendances();

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
    enableTopToolbar: false,
    enableEditing: true,
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
    mantineTableContainerProps: {
      style: {
        flex: 1,
      },
    },
    mantinePaperProps: {
      style: {
        '--paper-shadow': '',
        flex: 1,
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
    renderRowActions: ({ row }) => (
      <RowActions
        onAttended={() => onAttended(row.original.id)}
        onMissed={() => onMissed(row.original.id)}
      />
    ),
    localization: DataGridLocalization,
  });

  return (
    <Card
      withBorder
      shadow='sm'
      radius='sm'
      styles={{ root: { flex: 1 } }}
    >
      <Card.Section
        withBorder
        inheritPadding
        py='xs'
      >
        <Text fw={500}>Devamsızlık Girişi</Text>
      </Card.Section>
      <Card.Section
        withBorder
        inheritPadding
        py='xs'
        flex={1}
        styles={{ section: { display: 'flex', flexDirection: 'column' } }}
      >
        <MantineReactTable table={table} />
      </Card.Section>
    </Card>
  );
};
