import { Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import {StringColumnFilterModeOptions} from '../../../../constants';
import { Student } from '../../types';

export const columns: MRT_ColumnDef<Student>[] = [
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: 'Ad Soyad',
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'parentFullName',
    accessorKey: 'parentFullName',
    header: 'Ebeveyn Ad Soyad',
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'phoneNumber',
    accessorKey: 'phoneNumber',
    header: 'Öğrenci Telefon Numarası',
    enableSorting: false,
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'parentPhoneNumber',
    accessorKey: 'parentPhoneNumber',
    header: 'Ebeveyn Telefon Numarası',
    enableSorting: false,
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'debt',
    accessorKey: 'debt',
    header: 'Borç / Alacak',
    enableColumnFilter: false,
    Cell: (props) => {
      const debtor = props.row.original.debt > 0;
      const text = debtor
        ? props.row.original.debt
        : props.row.original.debt * -1;

      return (
        <Text
          style={{ color: debtor ? 'red' : 'green' }}
          fw={500}
        >
          {text}
        </Text>
      );
    },
  },
];
