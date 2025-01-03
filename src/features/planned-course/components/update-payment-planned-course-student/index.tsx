import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { Controller } from 'react-hook-form';
import useUpdatePaymentPlannedCourseStudent from './use-update-payment-planned-course-student';

export default () => {
  const [opened, onClose, handleSubmit, control] =
    useUpdatePaymentPlannedCourseStudent();

  return (
    <Modal
      title={<b>Öğrenci Kurs Ücreti Güncelle</b>}
      opened={opened}
      onClose={onClose}
    >
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Stack
          gap='md'
          align='stretch'
        >
          <Controller
            name='studentFullName'
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled
              />
            )}
          />
          <Controller
            name='paymentAmount'
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                placeholder='Ücret'
                error={fieldState.error?.message}
              />
            )}
          />
          <Group
            gap='xs'
            style={{ alignSelf: 'flex-end' }}
          >
            <Button
              variant='subtle'
              onClick={onClose}
            >
              Kapat
            </Button>
            <Button type='submit'>Kaydet</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
