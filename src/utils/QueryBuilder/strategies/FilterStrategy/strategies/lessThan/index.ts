import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateLessThanStrategy from './dateLessThan';
import NumberLessThanStrategy from './numberLessThan';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class LessThanStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object Number]': new NumberLessThanStrategy(),
      '[object String]': new NumberLessThanStrategy(),
      '[object Date]': new DateLessThanStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return this.strategies[
      Object.prototype.toString.call(filter.value)
    ].createFilterClause(filter);
  }
}
