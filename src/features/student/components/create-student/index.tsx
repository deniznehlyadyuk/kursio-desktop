import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { Controller } from 'react-hook-form';
import useCreateStudent from './use-create-student';

export default () => {
  const [opened, onClose, handleSubmit, control] = useCreateStudent();

  return (
    <Modal
      title={<b>Öğrenci Oluştur</b>}
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
            name='fullName'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                placeholder='Öğrenci Ad Soyad'
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                maxLength={10}
                placeholder='Öğrenci Telefon Numarası'
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='parentFullName'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                placeholder='Ebeveyn Ad Soyad'
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='parentPhoneNumber'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                maxLength={10}
                placeholder='Ebeveyn Telefon Numarası'
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
