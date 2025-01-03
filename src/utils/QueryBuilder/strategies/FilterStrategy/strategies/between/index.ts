import { MRT_ColumnFiltersState } from 'mantine-react-table';
import DateBetweenStrategy from './dateBetween';
import NumberBetweenStrategy from './numberBetween';
import { IEqualsFilterStrategy, IFilterStrategy } from '../../../../types';

export default class BetweenStrategy implements IFilterStrategy {
  strategies: Record<string, IEqualsFilterStrategy>;

  constructor() {
    this.strategies = {
      '[object Number]': new NumberBetweenStrategy(),
      '[object String]': new NumberBetweenStrategy(),
      '[object Date]': new DateBetweenStrategy(),
    };
  }

  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    const value = filter.value as any;
    return this.strategies[
      Object.prototype.toString.call(value[0])
    ]?.createFilterClause(filter);
  }
}
