import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateGreaterThanOrEqualToStrategy from './dateGreaterThanOrEqualTo';
import NumberGreaterThanOrEqualToStrategy from './numberGreaterThanOrEqualTo';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class GreaterThanOrEqualToStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object Number]': new NumberGreaterThanOrEqualToStrategy(),
      '[object String]': new NumberGreaterThanOrEqualToStrategy(),
      '[object Date]': new DateGreaterThanOrEqualToStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return this.strategies[
      Object.prototype.toString.call(filter.value)
    ].createFilterClause(filter);
  }
}
