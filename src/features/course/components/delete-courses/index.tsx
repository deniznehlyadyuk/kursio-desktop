import { Button, Group, Modal, Stack } from '@mantine/core';
import useDeleteCourses from './use-delete-courses';

export default () => {
  const [opened, onClose, onConfirmed] = useDeleteCourses();

  return (
    <Modal
      opened={opened}
      title={<b>Dikkat</b>}
      onClose={onClose}
    >
      <Stack
        align='stretch'
        gap='lg'
      >
        <div>
          Seçilen kursları silmek istediğinize emin misiniz? Bu işlem geri
          alınamaz.
        </div>
        <Group
          gap='xs'
          style={{ alignSelf: 'flex-end' }}
        >
          <Button
            variant='outline'
            color='gray'
            onClick={onClose}
          >
            Hayır
          </Button>
          <Button
            color='red'
            onClick={onConfirmed}
          >
            Evet
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
