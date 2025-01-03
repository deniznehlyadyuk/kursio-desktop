import { Button, Group, Modal, Select, Stack } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { AsyncSelect, TimeInput } from '../../../../components';
import { DayOfWeekSelectData } from '../../../../constants';
import { GetCoursesListService } from '../../../course/services';
import useCreatePlannedCourse from './use-create-planned-course';

export default () => {
  const [opened, onClose, onSubmit, control] = useCreatePlannedCourse();

  return (
    <Modal
      title={<b>Kurs Planla</b>}
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
            name='courseId'
            control={control}
            render={({ field, fieldState }) => (
              <AsyncSelect
                {...field}
                fetchItems={GetCoursesListService}
                keyExpr={(item) => item.id.toString()}
                valueExpr={(item) => item.id.toString()}
                textExpr={(item) => item.name}
                error={fieldState.error?.message}
                placeholder='Kurs'
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
