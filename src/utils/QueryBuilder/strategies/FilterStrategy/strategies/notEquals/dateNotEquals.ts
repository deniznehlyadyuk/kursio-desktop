import { MRT_ColumnFiltersState } from 'mantine-react-table';
import { IEqualsFilterStrategy } from '../../../../types';

export default class DateNotEqualsStrategy implements IEqualsFilterStrategy {
  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    const localOffset = (filter.value as Date).getTimezoneOffset() * 60000;
    const timestamp = (filter.value as Date).valueOf() - localOffset;

    return `strftime('%d.%m.%Y', ${filter.id}/1000, 'unixepoch') != strftime('%d.%m.%Y', ${timestamp}/1000, 'unixepoch')`;
  }
}
