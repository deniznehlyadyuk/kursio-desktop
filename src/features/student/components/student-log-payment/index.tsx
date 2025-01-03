import { Button, Group, Modal, NumberInput, Stack } from '@mantine/core';
import { Controller } from 'react-hook-form';
import useStudentLogPayment from './use-student-log-payment';

export default () => {
  const [opened, onClose, onSubmit, control] = useStudentLogPayment();

  return (
    <Modal
      opened={opened}
      title={<b>Öğrenci Para Girişi</b>}
      onClose={onClose}
    >
      <form
        autoComplete='off'
        onSubmit={onSubmit}
      >
        <Stack
          gap='md'
          align='stretch'
        >
          <Controller
            name='amountOfMoney'
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                placeholder='Ücret Miktarı'
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
