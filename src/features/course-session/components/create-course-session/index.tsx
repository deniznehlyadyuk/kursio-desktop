import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import 'dayjs/locale/tr';
import { Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import useCreateCourseSession from './use-create-course-session';

export default () => {
  const location = useLocation();

  const [opened, onClose, handleSubmit, control] = useCreateCourseSession();

  return (
    <Modal
      title={<b>Kurs Oturumu Oluştur</b>}
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
            name='courseName'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                placeholder='Kurs Adı'
                disabled
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='dayOfWeek'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                placeholder='Gün'
                disabled
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='startTime'
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                placeholder='Başlangıç Saati'
                disabled
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='date'
            control={control}
            render={({ field, fieldState }) => (
              <DatePickerInput
                {...field}
                placeholder='Tarih Seçiniz'
                locale='tr'
                excludeDate={(date) =>
                  date.getDay() !==
                  (location.state.dayOfWeekValue === 7
                    ? 0
                    : location.state.dayOfWeekValue)
                }
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
