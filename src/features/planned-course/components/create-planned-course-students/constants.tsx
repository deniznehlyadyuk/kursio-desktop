import { MRT_ColumnDef } from 'mantine-react-table';
import { StringColumnFilterModeOptions } from '../../../../constants';
import { Student } from './types';

export const columns: MRT_ColumnDef<Student>[] = [
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: 'Ad Soyad',
    enableEditing: false,
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'parentFullName',
    accessorKey: 'parentFullName',
    header: 'Ebeveyn Ad Soyad',
    enableEditing: false,
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'phoneNumber',
    accessorKey: 'phoneNumber',
    header: 'Öğrenci Telefon Numarası',
    enableSorting: false,
    enableEditing: false,
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'parentPhoneNumber',
    accessorKey: 'parentPhoneNumber',
    header: 'Ebeveyn Telefon Numarası',
    enableSorting: false,
    enableEditing: false,
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'paymentAmount',
    accessorKey: 'paymentAmount',
    header: 'Ücret',
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ renderedCellValue, row }) => {
      if (row.getIsSelected()) {
        return renderedCellValue;
      }
      return <span>━</span>;
    },
    enableEditing(row) {
      return row.getIsSelected();
    },
  },
];
