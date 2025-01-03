import { useEffect } from 'react';
import { Course } from '../../types';
import { QueryBuilder } from '../../../../utils';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const states = useDataGridStates({
    columnFilterFns: {
      name: 'contains',
      duration: 'equals',
      quota: 'equals',
    },
  });

  const deleteButtonDisabled =
    Object.keys(states.rowSelection.state).length === 0;

  const {
    response,
    isFetching,
    reFetch: reFetchCourses,
  } = useSelectQuery<Course[]>({
    table: 'Course',
    select: {
      id: new QueryBuilder.StaticColumnValue('Id', false),
      name: new QueryBuilder.StaticColumnValue('Name'),
      duration: new QueryBuilder.StaticColumnValue('Duration'),
      quota: new QueryBuilder.StaticColumnValue('Quota'),
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: states.columnFilters.state,
    sorting: states.sorting.state,
    columnFilterFns: states.columnFilterFns.state,
  });

  useEffect(() => {
    if (location.state?.reFetch) {
      states.rowSelection.setState({});
      reFetchCourses();
    }
  }, [location.state?.reFetch]);

  const data = !isFetching ? response!.data : [];
  const rowCount = !isFetching ? response!.count : 0;
  const getRowId = !isFetching ? (row: Course) => row.id.toString() : undefined;

  const onNewButtonClick = () => {
    navigate('/courses/create');
  };

  const onUpdateButtonClick = (courseId: number) => {
    navigate(`/courses/${courseId}/update`);
  };

  const onDeleteButtonClick = (courseIds: string[]) => {
    navigate('/courses/delete', { state: { courseIds } });
  };

  return [
    states,
    { data, rowCount, getRowId, isFetching },
    deleteButtonDisabled,
    onNewButtonClick,
    onUpdateButtonClick,
    onDeleteButtonClick,
  ] as const;
};
