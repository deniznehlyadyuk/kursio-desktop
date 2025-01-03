import FilterOperator from './FilterOperator';

export default interface FilterOrHavingGroup {
  clauses: string[];
  operator: FilterOperator;
}
