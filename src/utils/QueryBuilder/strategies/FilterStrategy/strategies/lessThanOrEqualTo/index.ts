import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateLessThanOrEqualToStrategy from './dateLessThanOrEqualTo';
import NumberLessThanOrEqualToStrategy from './numberLessThanOrEqualTo';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class LessThanOrEqualToStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object Number]': new NumberLessThanOrEqualToStrategy(),
      '[object String]': new NumberLessThanOrEqualToStrategy(),
      '[object Date]': new DateLessThanOrEqualToStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return this.strategies[
      Object.prototype.toString.call(filter.value)
    ].createFilterClause(filter);
  }
}
