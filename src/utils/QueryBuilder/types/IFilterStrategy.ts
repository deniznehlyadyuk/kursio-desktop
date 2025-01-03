import { MRT_ColumnFiltersState } from 'mantine-react-table';

export default interface IFilterStrategy {
  createFilterClause(filter: MRT_ColumnFiltersState[0]): string | undefined;
}
