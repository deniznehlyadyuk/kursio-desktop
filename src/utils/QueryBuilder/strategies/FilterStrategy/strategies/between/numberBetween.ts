import { MRT_ColumnFiltersState } from 'mantine-react-table';
import { IEqualsFilterStrategy } from '../../../../types';

export default class NumberBetweenStrategy implements IEqualsFilterStrategy {
  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    const [start, end] = filter.value as string[];

    if (!Boolean(start) || !Boolean(end)) {
      return undefined;
    }

    return `${filter.id} > ${start} AND ${filter.id} < ${end}`;
  }
}
