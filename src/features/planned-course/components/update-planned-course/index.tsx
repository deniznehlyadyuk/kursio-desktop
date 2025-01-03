import { Button, Group, Input, Modal, Select, Stack } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { TimeInput } from '../../../../components';
import { DayOfWeekSelectData } from '../../../../constants';
import useCreatePlannedCourse from './use-update-planned-course';

export default () => {
  const [opened, onClose, onSubmit, control] = useCreatePlannedCourse();

  return (
    <Modal
      title={<b>Kurs Planı Güncelle</b>}
      opened={opened}
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
            name='courseName'
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                disabled
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='dayOfWeek'
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                placeholder='Gün'
                data={DayOfWeekSelectData}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='startTime'
            control={control}
            render={({ field, fieldState }) => (
              <TimeInput
                {...field}
                placeholder='Başlangıç Saati (Saat:Dakika)'
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
