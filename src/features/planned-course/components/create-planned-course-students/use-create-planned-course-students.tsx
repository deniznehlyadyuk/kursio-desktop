import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMantineReactTable } from 'mantine-react-table';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGridLocalization } from '../../../../constants';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';
import { QueryBuilder } from '../../../../utils';
import { AddStudentsToPlannedCourseService } from '../../services';
import { columns } from './constants';
import ToolbarInternalActions from './toolbar-internal-actions';
import { Student } from './types';

export default () => {
  const navigate = useNavigate();
  const { plannedCourseId } = useParams();

  const states = useDataGridStates({
    pageSize: 5,
    columnFilterFns: {
      fullName: 'contains',
      parentFullName: 'contains',
      phoneNumber: 'contains',
      parentPhoneNumber: 'contains',
      plannedCourseStudentId: 'equals',
    },
  });

  const { response, isFetching } = useSelectQuery<Student[]>({
    table: 'Student',
    select: {
      id: new QueryBuilder.StaticColumnValue('Student.Id', false),
      fullName: new QueryBuilder.StaticColumnValue('FullName'),
      phoneNumber: new QueryBuilder.StaticColumnValue('PhoneNumber'),
      parentFullName: new QueryBuilder.StaticColumnValue('ParentFullName'),
      parentPhoneNumber: new QueryBuilder.StaticColumnValue(
        'ParentPhoneNumber'
      ),
      plannedCourseStudentId: new QueryBuilder.StaticColumnValue(
        'PlannedCourseStudent.Id',
        false
      ),
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: [
      ...states.columnFilters.state,
      { id: 'plannedCourseStudentId', value: null },
    ],
    columnFilterFns: states.columnFilterFns.state,
    sorting: states.sorting.state,
    joins: [
      {
        table: 'PlannedCourseStudent',
        on: [
          ['PlannedCourseStudent.StudentId', 'Student.Id'],
          ['PlannedCourseStudent.PlannedCourseId', plannedCourseId!],
        ],
      },
    ],
  });

  const table = useMantineReactTable({
    columns,
    data: !isFetching ? response!.data : [],
    rowCount: !isFetching ? response!.count : 0,
    getRowId: !isFetching ? (row: Student) => row.id.toString() : undefined,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableRowSelection: true,
    enableColumnFilterModes: true,
    enableEditing: true,
    editDisplayMode: 'table',
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
    mantineEditTextInputProps: ({ cell }) => ({
      onBlur: (event) => {
        handleEdit(cell.row.id, event.target.value);
      },
    }),
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    mantineTableContainerProps: {
      style: {
        flex: 1,
      },
    },
    mantinePaperProps: {
      style: {
        '--paper-shadow': '',
        minHeight: '408px',
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
      isLoading: isFetching,
      showProgressBars: isFetching,
      rowSelection: states.rowSelection.state,
      columnFilterFns: states.columnFilterFns.state,
    },
    initialState: {
      density: 'xs',
      showColumnFilters: true,
    },
    renderToolbarInternalActions: ({ table }) => (
      <ToolbarInternalActions table={table} />
    ),
    localization: DataGridLocalization,
  });

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);

  const paymentAmountsRef = useRef<Record<string, string>>({});

  const handleEdit = (rowId: string, paymentAmount: string) => {
    paymentAmountsRef.current = {
      ...paymentAmountsRef.current,
      [rowId]: paymentAmount,
    };
  };

  const handleSave = async () => {
    const selectedStudentIds = Object.keys(states.rowSelection.state);

    const paymentAmountStudentIds = Object.keys(paymentAmountsRef.current);

    const allPaymentAmountsFilled = selectedStudentIds.every(
      (selectedRowKey) =>
        paymentAmountStudentIds.includes(selectedRowKey) &&
        paymentAmountsRef.current[selectedRowKey] !== ''
    );

    if (!allPaymentAmountsFilled) {
      notifications.show({
        title: 'Hata',
        message: 'Kurs ücreti belirlenmemiş öğrenci / öğrenciler var.',
        color: 'red',
      });
      return;
    }

    const allPaymentAmountIsNumber = Object.values(
      paymentAmountsRef.current
    ).every((paymentAmount) => !isNaN(Number(paymentAmount)));

    if (!allPaymentAmountIsNumber) {
      notifications.show({
        title: 'Hata',
        message: 'Sayısal olarak girilmemiş kurs ücreti / ücretleri var.',
        color: 'red',
      });
      return;
    }

    const studentPayments = selectedStudentIds.map((studentId) => ({
      studentId: Number(studentId),
      paymentAmount: Number(paymentAmountsRef.current[studentId]),
    }));

    await AddStudentsToPlannedCourseService(
      Number(plannedCourseId),
      studentPayments
    );

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Seçilen öğrenciler kursa eklendi.',
    });

    close();

    setTimeout(() => {
      navigate(`/planned-courses/${plannedCourseId}/students`, {
        state: { reFetch: nanoid() },
      });
    }, 200);
  };

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate(`/planned-courses/${plannedCourseId}/students`);
    }, 200);
  };

  return [table, opened, onClose, handleSave] as const;
};
