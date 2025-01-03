import { MRT_ColumnFiltersState } from 'mantine-react-table';
import { IEqualsFilterStrategy } from '../../../../types';

export default class NumberGreaterThanStrategy
  implements IEqualsFilterStrategy
{
  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    return `${filter.id} > ${filter.value}`;
  }
}
