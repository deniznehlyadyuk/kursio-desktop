import {useEffect, useState} from 'react';
import { PlannedCourseStudent } from '../../types';
import { useLocation, useParams } from 'react-router-dom';
import { QueryBuilder } from '../../../../utils';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';
import {GetCourseByPlannedCourseIdService} from "../../services";

export default () => {
  const location = useLocation();
  const { plannedCourseId } = useParams();

  const [newButtonDisabled, setNewButtonDisabled] = useState(true)

  const states = useDataGridStates({
    columnFilterFns: {
      studentFullName: 'contains',
      paymentAmount: 'equals',
      plannedCourseId: 'equals',
    },
  });

  const deleteButtonDisabled =
    Object.keys(states.rowSelection.state).length === 0;

  const { response, isFetching, reFetch } = useSelectQuery<
    PlannedCourseStudent[]
  >({
    table: 'PlannedCourseStudent',
    select: {
      id: new QueryBuilder.StaticColumnValue('PlannedCourseStudent.Id', false),
      studentFullName: new QueryBuilder.StaticColumnValue('Student.FullName'),
      paymentAmount: new QueryBuilder.StaticColumnValue('PaymentAmount'),
      plannedCourseId: new QueryBuilder.StaticColumnValue(
        'PlannedCourseStudent.PlannedCourseId',
        false
      ),
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: [
      ...states.columnFilters.state,
      { id: 'plannedCourseId', value: plannedCourseId },
    ],
    columnFilterFns: states.columnFilterFns.state,
    sorting: states.sorting.state,
    joins: [
      {
        table: 'Student',
        on: [['Student.Id', 'PlannedCourseStudent.StudentId']],
      },
    ],
  });

  useEffect(() => {
    if (isFetching) {
      return;
    }

    const fetchCourse = async () => {
      return await GetCourseByPlannedCourseIdService(plannedCourseId!)
    }

    fetchCourse().then((course) => {
      setNewButtonDisabled(response?.count === course.quota)
    })
  }, [isFetching]);

  useEffect(() => {
    if (location.state?.reFetch) {
      reFetch();
      states.rowSelection.setState({});
    }
  }, [location.state?.reFetch]);

  const data = !isFetching ? response!.data : [];
  const rowCount = !isFetching ? response!.count : 0;
  const getRowId = !isFetching
    ? (row: PlannedCourseStudent) => row.id.toString()
    : undefined;

  return [
    states,
    { data, rowCount, getRowId, isFetching },
    newButtonDisabled,
    deleteButtonDisabled,
  ] as const;
};
