import { MRT_ColumnFiltersState } from 'mantine-react-table';
import { IEqualsFilterStrategy } from '../../../../types';

export default class DateBetweenStrategy implements IEqualsFilterStrategy {
  createFilterClause(filter: MRT_ColumnFiltersState[0]) {
    const [start, end] = filter.value as Date[];

    if (
      Object.prototype.toString.call(start) !==
      Object.prototype.toString.call(end)
    ) {
      return undefined;
    }

    const localOffset = start.getTimezoneOffset() * 60000;

    const startTimestamp = start.valueOf() - localOffset;
    const endTimestamp = end.valueOf() - localOffset;

    return `date(strftime('%Y-%m-%d', ${filter.id}/1000, 'unixepoch')) > date(strftime('%Y-%m-%d', ${startTimestamp}/1000, 'unixepoch')) AND
            date(strftime('%Y-%m-%d', ${filter.id}/1000, 'unixepoch')) < date(strftime('%Y-%m-%d', ${endTimestamp}/1000, 'unixepoch'))`;
  }
}
