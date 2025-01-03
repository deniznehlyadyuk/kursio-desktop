import { MRT_ColumnFiltersState } from 'mantine-react-table';
import { IEqualsFilterStrategy } from '../../../../types';

export default class DateGreaterThanOrEqualToStrategy
  implements IEqualsFilterStrategy
{
  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    const localOffset = (filter.value as Date).getTimezoneOffset() * 60000;
    const timestamp = (filter.value as Date).valueOf() - localOffset;

    return `date(strftime('%Y-%m-%d', ${filter.id}/1000, 'unixepoch')) >= date(strftime('%Y-%m-%d', ${timestamp}/1000, 'unixepoch'))`;
  }
}
