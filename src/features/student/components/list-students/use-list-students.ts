import { useEffect } from 'react';
import { Student } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryBuilder } from '../../../../utils';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const states = useDataGridStates({
    columnFilterFns: {
      fullName: 'contains',
      phoneNumber: 'contains',
      parentFullName: 'contains',
      parentPhoneNumber: 'contains',
      debt: 'equals'
    },
  });

  const deleteButtonDisabled =
    Object.keys(states.rowSelection.state).length === 0;

  const {
    response,
    isFetching,
    reFetch: reFetchStudents,
  } = useSelectQuery<Student[]>({
    table: 'Student',
    select: {
      id: new QueryBuilder.StaticColumnValue('Student.Id', false),
      fullName: new QueryBuilder.StaticColumnValue('Student.FullName'),
      phoneNumber: new QueryBuilder.StaticColumnValue('Student.PhoneNumber'),
      parentFullName: new QueryBuilder.StaticColumnValue(
        'Student.ParentFullName'
      ),
      parentPhoneNumber: new QueryBuilder.StaticColumnValue(
        'Student.ParentPhoneNumber'
      ),
      debt: new QueryBuilder.CalculatedColumnValue(
          'COALESCE((SELECT SUM(CourseSessionAttendance.PaymentAmount) FROM CourseSessionAttendance WHERE CourseSessionAttendance.StudentId = Student.Id AND CourseSessionAttendance.HasAttended = true), 0) - COALESCE((SELECT SUM(PaymentHistory.PaymentAmount) FROM PaymentHistory WHERE PaymentHistory.StudentId = Student.Id), 0)'),
      hasAttended: new QueryBuilder.CalculatedColumnValue(
          'CASE WHEN (SELECT COUNT(*) FROM CourseSessionAttendance WHERE CourseSessionAttendance.StudentId = Student.Id) > 0 THEN 1 ELSE 0 END')
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: states.columnFilters.state,
    columnFilterFns: states.columnFilterFns.state,
    sorting: states.sorting.state,
  });

  useEffect(() => {
    if (location.state?.reFetch) {
      states.rowSelection.setState({});
      reFetchStudents();
    }
  }, [location.state?.reFetch]);

  const data = !isFetching ? response!.data : [];
  const rowCount = !isFetching ? response!.count : 0;
  const getRowId = !isFetching
    ? (row: Student) => row.id.toString()
    : undefined;

  const onLogPaymentButtonClick = (studentId: number) => {
    navigate(`/students/${studentId}/logPayment`);
  };

  const onNewButtonClick = () => {
    navigate('/students/create');
  };

  const onUpdateButtonClick = (studentId: number) => {
    navigate(`/students/${studentId}/update`);
  };

  const onDeleteButtonClick = (studentIds: string[]) => {
    navigate(`/students/delete`, { state: { studentIds } });
  };

  const onShowAttendancesButtonClick = (studentId: number) => {
    navigate(`/students/${studentId}/attendances`);
  }

  return [
    states,
    { data, rowCount, getRowId, isFetching },
    deleteButtonDisabled,
    onLogPaymentButtonClick,
    onNewButtonClick,
    onUpdateButtonClick,
    onDeleteButtonClick,
    onShowAttendancesButtonClick
  ] as const;
};
