import { Button, Group, Modal, Stack } from '@mantine/core';
import useDeleteStudents from './use-delete-students';

export default () => {
  const [opened, onClose, onConfirmed] = useDeleteStudents();

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
          Seçilen öğrencileri silmek istediğinize emin misiniz? Bu işlem geri
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
