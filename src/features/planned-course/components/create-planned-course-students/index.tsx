import { Button, Group, Modal } from '@mantine/core';
import { MantineReactTable } from 'mantine-react-table';
import useCreatePlannedCourseStudents from './use-create-planned-course-students';

export default () => {
  const [table, opened, onClose, handleSave] = useCreatePlannedCourseStudents();

  return (
    <Modal
      title={<b>Öğrenci Ekle</b>}
      size={1200}
      opened={opened}
      onClose={onClose}
    >
      <MantineReactTable table={table} />

      <Group
        mt='md'
        justify='end'
      >
        <Button onClick={handleSave}>Kaydet</Button>
      </Group>
    </Modal>
  );
};
