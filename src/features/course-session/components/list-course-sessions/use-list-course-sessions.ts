import { useEffect } from 'react';
import { CourseSession } from '../../types';
import { useLocation } from 'react-router-dom';
import { QueryBuilder } from '../../../../utils';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';

export default () => {
  const { state } = useLocation();

  const states = useDataGridStates({
    columnFilterFns: {
      courseName: 'contains',
      dateTime: 'equals',
    },
  });

  const deleteButtonDisabled =
    Object.keys(states.rowSelection.state).length === 0;

  const {
    response,
    isFetching,
    reFetch: reFetchCourseSessions,
  } = useSelectQuery<CourseSession[]>({
    table: 'CourseSession',
    select: {
      id: new QueryBuilder.StaticColumnValue('CourseSession.Id', false),
      courseName: new QueryBuilder.StaticColumnValue('CourseSession.CourseName'),
      dateTime: new QueryBuilder.StaticColumnValue('DateTime', false),
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: states.columnFilters.state,
    sorting: [...states.sorting.state, { id: 'dateTime', desc: true }],
    columnFilterFns: states.columnFilterFns.state,
  });

  useEffect(() => {
    if (state?.reFetch) {
      states.rowSelection.setState({});
      reFetchCourseSessions();
    }
  }, [state?.reFetch]);

  const data = !isFetching ? response!.data : [];
  const rowCount = !isFetching ? response!.count : 0;
  const getRowId = !isFetching
    ? (row: CourseSession) => row.id.toString()
    : undefined;

  return [
    states,
    { data, rowCount, getRowId, isFetching },
    deleteButtonDisabled,
  ] as const;
};
