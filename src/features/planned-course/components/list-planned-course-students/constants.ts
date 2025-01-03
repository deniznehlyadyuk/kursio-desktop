import { MRT_ColumnDef } from 'mantine-react-table';
import { PlannedCourseStudent } from '../../types';

export const columns: MRT_ColumnDef<PlannedCourseStudent>[] = [
  {
    id: 'studentFullName',
    accessorKey: 'studentFullName',
    header: 'Ad Soyad',
  },
  {
    accessorKey: 'paymentAmount',
    header: 'Kurs Ücreti',
    enableColumnFilter: false,
  },
];
