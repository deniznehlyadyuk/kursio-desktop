import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateGreaterThanStrategy from './dateGreaterThan';
import NumberGreaterThanStrategy from './numberGreaterThan';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class GreaterThanStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object Number]': new NumberGreaterThanStrategy(),
      '[object String]': new NumberGreaterThanStrategy(),
      '[object Date]': new DateGreaterThanStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return this.strategies[
      Object.prototype.toString.call(filter.value)
    ].createFilterClause(filter);
  }
}
