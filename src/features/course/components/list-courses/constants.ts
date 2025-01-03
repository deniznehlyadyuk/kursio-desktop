import { MRT_ColumnDef } from 'mantine-react-table';
import { Course } from '../../types';
import {
  NumberColumnFilterModeOptions,
  StringColumnFilterModeOptions,
} from '../../../../constants';

export const columns: MRT_ColumnDef<Course>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Ad',
    columnFilterModeOptions: StringColumnFilterModeOptions,
  },
  {
    id: 'duration',
    accessorKey: 'duration',
    header: 'Süresi (dakika)',
    columnFilterModeOptions: NumberColumnFilterModeOptions,
  },
  {
    id: 'quota',
    accessorKey: 'quota',
    header: 'Kontenjan',
    columnFilterModeOptions: NumberColumnFilterModeOptions,
  },
];
