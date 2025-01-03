import { MRT_SortingState } from 'mantine-react-table';
import QueryBuilder from '../QueryBuilder';
import { IStrategy } from '../types';

class SortStrategy implements IStrategy {
  sorts: MRT_SortingState;

  constructor(sorts: MRT_SortingState) {
    this.sorts = sorts;
  }

  apply(builder: QueryBuilder) {
    this.sorts
      .map((sort) => `${sort.id}${sort.desc ? ' DESC' : ''}`)
      .forEach((sort) => {
        builder.addOrderByClause(sort);
      });
  }
}

export default SortStrategy;
