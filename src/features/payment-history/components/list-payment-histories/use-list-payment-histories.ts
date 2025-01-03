import { useEffect } from 'react';
import { PaymentHistory } from '../../types';
import { useLocation } from 'react-router-dom';
import { QueryBuilder } from '../../../../utils';
import { useDataGridStates, useSelectQuery } from '../../../../hooks';

export default () => {
  const location = useLocation();

  const states = useDataGridStates({
    columnFilterFns: {
      studentFullName: 'contains',
      paymentAmount: 'equals',
      dateTime: 'equals'
    },
  });

  const deleteButtonDisabled =
    Object.keys(states.rowSelection.state).length === 0;

  const {
    response,
    isFetching,
    reFetch: reFetchPaymentHistories,
  } = useSelectQuery<PaymentHistory[]>({
    table: 'PaymentHistory',
    select: {
      id: new QueryBuilder.StaticColumnValue('PaymentHistory.Id', false),
      studentFullName: new QueryBuilder.StaticColumnValue('COALESCE(Student.FullName, PaymentHistory.StudentFullName)'),
      paymentAmount: new QueryBuilder.StaticColumnValue(
        'PaymentHistory.PaymentAmount'
      ),
      dateTime: new QueryBuilder.StaticColumnValue('PaymentHistory."DateTime"')
    },
    pagination: states.pagination.state,
    globalFilter: states.globalFilter.state,
    columnFilters: states.columnFilters.state,
    columnFilterFns: states.columnFilterFns.state,
    sorting: states.sorting.state,
    joins: [
      {
        table: 'Student',
        on: [['Student.Id', 'PaymentHistory.StudentId']],
      },
    ],
  });

  useEffect(() => {
    if (location.state?.reFetch) {
      states.rowSelection.setState({});
      reFetchPaymentHistories();
    }
  }, [location.state?.reFetch]);

  const data = !isFetching ? response!.data : [];
  const rowCount = !isFetching ? response!.count : 0;
  const getRowId = !isFetching
    ? (row: PaymentHistory) => row.id.toString()
    : undefined;

  return [
    states,
    { data, rowCount, getRowId, isFetching },
    deleteButtonDisabled
  ] as const;
};
