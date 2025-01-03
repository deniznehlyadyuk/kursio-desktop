import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import CreateCourseSessionFormDto from './types';
import { CreateCourseSessionService } from '../../services';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import courseSessionUniqueTimeValidation from './course-session-unique-time-validation';

dayjs.extend(customParseFormat);

export default () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    courseName: z.string(),
    dayOfWeek: z.string(),
    startTime: z.string(),
    date: z
      .date()
      .refine(
        async (value) =>
          courseSessionUniqueTimeValidation(
            value,
            location.state.startTime
          ),
        'Bu kurs oturumu zaten oluşturulmuş.'
      ),
  });

  const { control, handleSubmit } = useForm<CreateCourseSessionFormDto>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...location.state,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const time = dayjs(location.state.startTime, 'HH:mm');

    await CreateCourseSessionService({
      plannedCourseId: location.state.plannedCourseId,
      courseId: location.state.courseId,
      dateTime: dayjs(data.date)
        .add(time.hour(), 'hour')
        .add(time.minute(), 'minute'),
    });

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Kurs oturumu oluşturuldu.',
    });

    handleClose();
  });

  const handleClose = () => {
    close();

    setTimeout(() => {
      navigate('/course-sessions', { state: { reFetch: nanoid() } });
    }, 200);
  };

  useEffect(() => {
    open();
  }, []);

  return [opened, handleClose, onSubmit, control] as const;
};
