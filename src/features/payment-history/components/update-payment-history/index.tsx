import { Button, Group, Modal, NumberInput, Stack } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { UpdatePaymentHistoryProps } from '../../types';
import useUpdatePaymentHistory from './use-update-payment-history';

export default (props: UpdatePaymentHistoryProps) => {
  const [handleSubmit, control] = useUpdatePaymentHistory(props);

  return (
    <Modal
      title={<b>Kurs Güncelle</b>}
      opened={props.opened}
      onClose={props.onClose}
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
            name='paymentAmount'
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                placeholder='Ödeme Tutarı'
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
              onClick={props.onClose}
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
