import { MRT_PaginationState } from 'mantine-react-table';
import QueryBuilder from '../QueryBuilder';
import { IStrategy } from '../types';

class PaginationStrategy implements IStrategy {
  state: MRT_PaginationState;

  constructor(state: MRT_PaginationState) {
    this.state = state;
  }

  apply(builder: QueryBuilder) {
    builder.setLimitClause(
      `LIMIT ${this.state.pageSize} OFFSET ${
        this.state.pageIndex * this.state.pageSize
      }`
    );
  }
}

export default PaginationStrategy;
