import { useDisclosure } from '@mantine/hooks';
import { CreatePlannedCourseFormDto } from './types';
import { useEffect } from 'react';
import { DayOfWeek } from '../../types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePlannedCourseService } from '../../services';
import { notifications } from '@mantine/notifications';
import { useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    courseId: z.string(),
    dayOfWeek: z.nativeEnum(DayOfWeek),
    startTime: z
      .string()
      .regex(/^(?:[01]\d|2[0-3]):(?:00|15|30|45)$/, 'Geçersiz saat formatı'),
  });

  const { control, handleSubmit, setValue } =
    useForm<CreatePlannedCourseFormDto>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: {
        courseId: '',
        dayOfWeek: DayOfWeek.Monday,
        startTime: '',
      },
      resolver: zodResolver(schema),
    });

  useEffect(() => {
    open();
    setValue('dayOfWeek', location.state.dayOfWeek);
    setValue('startTime', location.state.startTime);
  }, [location.state]);

  const onSubmit = handleSubmit(async (data) => {
    await CreatePlannedCourseService({
      courseId: Number(data.courseId),
      dayOfWeek: Number(data.dayOfWeek),
      startTime: data.startTime,
    });

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Kurs planlandı.',
    });

    close();

    setTimeout(() => {
      navigate('/planned-courses', { state: { reFetch: nanoid() } });
    }, 200);
  });

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate('/planned-courses');
    }, 200);
  };

  return [opened, onClose, onSubmit, control] as const;
};
