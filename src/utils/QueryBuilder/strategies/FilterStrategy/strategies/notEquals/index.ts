import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateNotEqualsStrategy from './dateNotEquals';
import NumberNotEqualsStrategy from './numberNotEquals';
import StringNotEqualsStrategy from './stringNotEquals';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class NotEqualsStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object String]': new StringNotEqualsStrategy(),
      '[object Number]': new NumberNotEqualsStrategy(),
      '[object Date]': new DateNotEqualsStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return this.strategies[
      Object.prototype.toString.call(filter.value)
    ].createFilterClause(filter);
  }
}
