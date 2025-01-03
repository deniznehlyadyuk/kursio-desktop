import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { Controller } from 'react-hook-form';
import useUpdateCourse from './use-update-course';

export default () => {
  const [opened, onClose, handleSubmit, control] = useUpdateCourse();

  return (
    <Modal
      title={<b>Kurs Güncelle</b>}
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
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                placeholder='Kurs Adı'
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='duration'
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                step={15}
                placeholder='Süresi (dakika)'
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='quota'
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                placeholder='Kontenjan'
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
