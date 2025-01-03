import { Button, Group, Modal, Stack } from '@mantine/core';
import useDeletePlannedCourse from './use-delete-planned-course';

export default () => {
  const [opened, onClose, onConfirmed] = useDeletePlannedCourse();

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
          Planlamış olan kursu silmek istediğinize emin misiniz? Bu işlem geri
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
