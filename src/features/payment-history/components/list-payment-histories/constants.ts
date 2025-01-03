import { MRT_ColumnDef } from 'mantine-react-table';
import { PaymentHistory } from '../../types';
import {
  StringColumnFilterModeOptions,
  NumberColumnFilterModeOptions, DateTimeColumnFilterModeOptions,
} from '../../../../constants';
import dayjs from "dayjs";

export const columns: MRT_ColumnDef<PaymentHistory>[] = [
  {
    id: 'studentFullName',
    accessorKey: 'studentFullName',
    header: 'Öğrenci Adı',
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'paymentAmount',
    accessorKey: 'paymentAmount',
    header: 'Ödeme Miktarı',
    columnFilterModeOptions: NumberColumnFilterModeOptions,
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
  }
];
