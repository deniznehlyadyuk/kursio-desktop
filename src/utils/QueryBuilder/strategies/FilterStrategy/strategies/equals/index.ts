import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateEqualsStrategy from './dateEquals';
import NumberEqualsStrategy from './numberEquals';
import StringEqualsStrategy from './stringEquals';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';
import NullEqualsStrategy from './nullEquals';

export default class EqualsStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object String]': new StringEqualsStrategy(),
      '[object Number]': new NumberEqualsStrategy(),
      '[object Date]': new DateEqualsStrategy(),
      '[object Null]': new NullEqualsStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return this.strategies[
      Object.prototype.toString.call(filter.value)
    ].createFilterClause(filter);
  }
}
