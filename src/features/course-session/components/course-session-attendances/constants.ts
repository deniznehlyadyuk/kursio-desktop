import { MRT_ColumnDef } from 'mantine-react-table';
import { CourseSessionAttendance } from '../../types';
import {
  NumberColumnFilterModeOptions,
  StringColumnFilterModeOptions,
} from '../../../../constants';

export const columns: MRT_ColumnDef<CourseSessionAttendance>[] = [
  {
    id: 'studentFullName',
    accessorKey: 'studentFullName',
    header: 'Öğrenci Adı',
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'paymentAmount',
    accessorKey: 'paymentAmount',
    header: 'Ödeme Tutarı',
    columnFilterModeOptions: NumberColumnFilterModeOptions,
  },
  {
    id: 'hasAttended',
    accessorKey: 'hasAttended',
    header: 'Derse Geldi',
    enableColumnFilter: false,
    enableSorting: false,
    Cell: (props) => {
      if (props.row.original.hasAttended === null) {
        return 'Belirtilmemiş';
      }

      if (props.row.original.hasAttended === 0) {
        return 'Hayır';
      }

      return 'Evet';
    },
  },
];
