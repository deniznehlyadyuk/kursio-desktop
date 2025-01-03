import {
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
} from 'mantine-react-table';
import QueryBuilder from '../../QueryBuilder';
import {
  BetweenInclusiveStrategy,
  BetweenStrategy,
  ContainsStrategy,
  EndsWithStrategy,
  EqualsStrategy,
  GreaterThanOrEqualToStrategy,
  GreaterThanStrategy,
  LessThanOrEqualToStrategy,
  LessThanStrategy,
  NotEqualsStrategy,
  StartsWithStrategy,
} from './strategies';
import {
  CalculatedColumnValue,
  IColumnValue,
  IFilterStrategy,
  IStrategy,
  StaticColumnValue,
} from '../../types';

class FilterStrategy implements IStrategy {
  state: MRT_ColumnFiltersState;
  select: Record<string, IColumnValue>;
  filterFns: MRT_ColumnFilterFnsState;
  strategies: Record<string, IFilterStrategy>;

  constructor(
    state: MRT_ColumnFiltersState,
    select: Record<string, IColumnValue>,
    filterFns: MRT_ColumnFilterFnsState
  ) {
    this.state = state;
    this.select = select;
    this.filterFns = filterFns;
    this.strategies = {
      contains: new ContainsStrategy(),
      startsWith: new StartsWithStrategy(),
      endsWith: new EndsWithStrategy(),
      equals: new EqualsStrategy(),
      notEquals: new NotEqualsStrategy(),
      between: new BetweenStrategy(),
      betweenInclusive: new BetweenInclusiveStrategy(),
      greaterThan: new GreaterThanStrategy(),
      greaterThanOrEqualTo: new GreaterThanOrEqualToStrategy(),
      lessThan: new LessThanStrategy(),
      lessThanOrEqualTo: new LessThanOrEqualToStrategy(),
    };
  }

  apply(builder: QueryBuilder) {
    const filterClauses = this.state
      .filter((filter) => this.select[filter.id] instanceof StaticColumnValue)
      .map((filter) => {
        const filterFn = this.filterFns[filter.id];
        const strategy = this.strategies[filterFn];
        return strategy.createFilterClause({
          ...filter,
          id: this.select[filter.id].value,
        });
      })
      .filter((clause) => clause !== undefined);

    const havingClauses = this.state
      .filter(
        (filter) => this.select[filter.id] instanceof CalculatedColumnValue
      )
      .map((filter) => {
        const filterFn = this.filterFns[filter.id];
        const strategy = this.strategies[filterFn];
        return strategy.createFilterClause({
          ...filter,
          id: this.select[filter.id].value,
        });
      })
      .filter((clause) => clause !== undefined);

    builder.addFilterGroup({
      clauses: filterClauses,
      operator: 'AND',
    });

    builder.addHavingGroup({
      clauses: havingClauses,
      operator: 'AND',
    });
  }
}

export default FilterStrategy;
