import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateBetweenInclusiveStrategy from './dateBetweenInclusive';
import NumberBetweenInclusiveStrategy from './numberBetweenInclusive';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class BetweenInclusiveStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object Number]': new NumberBetweenInclusiveStrategy(),
      '[object String]': new NumberBetweenInclusiveStrategy(),
      '[object Date]': new DateBetweenInclusiveStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    const value = filter.value as any;
    return this.strategies[
      Object.prototype.toString.call(value[0])
    ]?.createFilterClause(filter);
  }
}
