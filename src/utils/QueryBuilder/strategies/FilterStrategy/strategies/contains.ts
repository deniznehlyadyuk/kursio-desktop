import { MRT_ColumnFiltersState } from 'mantine-react-table';
import { IFilterStrategy } from '../../../types';

export default class ContainsStrategy implements IFilterStrategy {
  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return `${filter.id} LIKE '%${filter.value}%'`;
  }
}
