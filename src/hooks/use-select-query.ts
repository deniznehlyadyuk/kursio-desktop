import {
  MRT_ColumnFilterFnsState,
  MRT_PaginationState,
  MRT_SortingState,
} from 'mantine-react-table';
import { useEffect, useRef, useState } from 'react';
import { QueryBuilder } from '../utils';
import useDb from './use-db';

interface UseSelectQueryProps {
  table: string;
  select: Record<string, QueryBuilder.IColumnValue>;
  pagination: MRT_PaginationState;
  globalFilter: string;
  columnFilters: { id: string; value: any }[];
  sorting: MRT_SortingState;
  columnFilterFns: MRT_ColumnFilterFnsState;
  joins?: QueryBuilder.Join[];
  groupBy?: string[];
}

const useDeepCompareEffect = (callback: () => void, dependency: string) => {
  const currentDependencyRef = useRef<string>();

  if (currentDependencyRef.current !== dependency) {
    currentDependencyRef.current = dependency;
  }

  useEffect(callback, [currentDependencyRef.current]);
};

export default function useSelectQuery<TResponse>(props: UseSelectQueryProps) {
  const [response, setResponse] = useState<{
    data: TResponse;
    count: number;
  }>();
  const [isFetching, setIsFetching] = useState(true);
  const [dbRef, dbRefLoading] = useDb();

  const fetch = async () => {
    if (!dbRef.current) return;

    const queryBuilder = new QueryBuilder.QueryBuilder(
      props.table,
      props.select
    );

    const globalFilterStrategy = new QueryBuilder.GlobalFilterStrategy(
      props.select,
      props.globalFilter
    );
    const paginationStrategy = new QueryBuilder.PaginationStrategy(
      props.pagination
    );
    const filterStrategy = new QueryBuilder.FilterStrategy(
      props.columnFilters,
      props.select,
      props.columnFilterFns
    );
    const sortStrategy = new QueryBuilder.SortStrategy(props.sorting);
    const joinStrategy = new QueryBuilder.JoinStrategy(props.joins || []);
    const groupByStrategy = new QueryBuilder.GroupByStrategy(
      props.groupBy || []
    );

    const director = new QueryBuilder.QueryDirector(queryBuilder);
    director.addStrategy(globalFilterStrategy);
    director.addStrategy(paginationStrategy);
    director.addStrategy(filterStrategy);
    director.addStrategy(sortStrategy);
    director.addStrategy(joinStrategy);
    director.addStrategy(groupByStrategy);

    director.construct();

    const [selectQuery, countQuery] = director.getQueries();

    console.log(selectQuery);

    setIsFetching(true);

    const data = (await dbRef.current?.select(selectQuery)) as TResponse;
    const count = Object.values(
      ((await dbRef.current?.select(countQuery)) as any)[0] || []
    )[0] as number;

    setIsFetching(false);

    setResponse({ data, count });
  };

  useDeepCompareEffect(() => {
    if (dbRefLoading || !dbRef.current) return;
    fetch();
  }, JSON.stringify([dbRefLoading, props.columnFilters, props.select, props.globalFilter, props.pagination, props.sorting, props.table, props.joins, props.columnFilterFns]));

  return { response, isFetching, reFetch: fetch };
}
