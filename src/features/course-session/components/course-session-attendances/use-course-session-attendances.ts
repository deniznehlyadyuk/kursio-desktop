import { notifications } from '@mantine/notifications';
import { CourseSessionAttendance } from '../../types';
import { MarkStudentAsMissedService, MarkStudentAsAttandedService } from '../../services';
import { useParams } from 'react-router-dom';
import { QueryBuilder } from '../../../../utils';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';

export default () => {
  const { courseSessionId } = useParams();

  const states = useDataGridStates({
    columnFilterFns: {
      studentFullName: 'contains',
      paymentAmount: 'equals',
      courseSessionId: 'equals',
    },
  });

  const {
    response,
    isFetching,
    reFetch: reFetchCourseSessionAttendances,
  } = useSelectQuery<CourseSessionAttendance[]>({
    table: 'CourseSessionAttendance',
    select: {
      id: new QueryBuilder.StaticColumnValue(
        'CourseSessionAttendance.Id',
        false
      ),
      studentFullName: new QueryBuilder.StaticColumnValue('COALESCE(Student.FullName, CourseSessionAttendance.StudentFullName)'),
      paymentAmount: new QueryBuilder.StaticColumnValue(
        'CourseSessionAttendance.PaymentAmount'
      ),
      hasAttended: new QueryBuilder.StaticColumnValue(
        'CourseSessionAttendance.HasAttended',
        false
      ),
      courseSessionId: new QueryBuilder.StaticColumnValue(
        'CourseSessionAttendance.CourseSessionId',
        false
      ),
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: [
      ...states.columnFilters.state,
      { id: 'courseSessionId', value: courseSessionId },
    ],
    sorting: [...states.sorting.state],
    joins: [
      {
        table: 'Student',
        on: [['Student.Id', 'CourseSessionAttendance.StudentId']],
      },
    ],
    columnFilterFns: states.columnFilterFns.state,
  });

  const data = !isFetching ? response!.data : [];
  const rowCount = !isFetching ? response!.count : 0;
  const getRowId = !isFetching
    ? (row: CourseSessionAttendance) => row.id.toString()
    : undefined;

  const onAttended = async (courseSessionAttendanceId: number) => {
    await MarkStudentAsAttandedService(courseSessionAttendanceId);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Öğrenci derse geldi olarak işaretlendi.',
    });

    reFetchCourseSessionAttendances();
  };

  const onMissed = async (courseSessionAttendanceId: number) => {
    await MarkStudentAsMissedService(courseSessionAttendanceId);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Öğrenci derse gelmedi olarak işaretlendi.',
    });

    reFetchCourseSessionAttendances();
  };

  return [
    states,
    { data, rowCount, getRowId, isFetching },
    onAttended,
    onMissed,
  ] as const;
};
