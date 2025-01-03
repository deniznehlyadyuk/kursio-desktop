import { Button, Group, Modal, Stack } from '@mantine/core';
import useDeletePlannedCourseStudents from './use-delete-planned-course-students';

export default () => {
  const [opened, onClose, onConfirmed] = useDeletePlannedCourseStudents();

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
          Seçilen öğrenciler kurstan çıkarılacaktır. Devam etmek istediğinize
          emin misiniz?
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
