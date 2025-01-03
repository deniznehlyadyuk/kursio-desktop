import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'mantine-react-table';
import {
  DateTimeColumnFilterModeOptions,
  StringColumnFilterModeOptions,
} from '../../../../constants';
import { CourseSession } from '../../types';

export const columns: MRT_ColumnDef<CourseSession>[] = [
  {
    id: 'courseName',
    accessorKey: 'courseName',
    header: 'Kurs Adı',
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'dateTime',
    accessorKey: 'dateTime',
    header: 'Tarih & Saat',
    Cell: (props) => {
      return dayjs(props.row.original.dateTime).format('DD.MM.YYYY HH:mm');
    },
    columnFilterModeOptions: DateTimeColumnFilterModeOptions,
    filterVariant: 'date',
  },
];
