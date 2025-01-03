import { Button, Group, Modal, Stack } from '@mantine/core';
import useDeleteCourseSession from './use-delete-course-session';

export default () => {
  const [opened, onClose, onConfirmed] = useDeleteCourseSession();

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
          Seçilen kurs oturumlarını silmek istediğinize emin misiniz? Bu işlem
          geri alınamaz.
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
