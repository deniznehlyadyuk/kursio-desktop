import { useDisclosure } from '@mantine/hooks';
import { UpdatePlannedCourseFormDto } from './types';
import { useEffect } from 'react';
import { DayOfWeek } from '../../types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GetPlannedCourseService,
  UpdatePlannedCourseService,
} from '../../services';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default () => {
  const navigate = useNavigate();
  const { plannedCourseId } = useParams();

  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    courseName: z.string(),
    dayOfWeek: z.nativeEnum(DayOfWeek),
    startTime: z.string(),
  });

  const { control, handleSubmit, setValue } =
    useForm<UpdatePlannedCourseFormDto>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: {
        courseName: '',
        dayOfWeek: DayOfWeek.Monday,
        startTime: '',
      },
      resolver: zodResolver(schema),
    });

  const fetchAndFill = async () => {
    const plannedCourse = await GetPlannedCourseService(plannedCourseId!);
    const dayOfWeek: DayOfWeek =
      plannedCourse.dayOfWeek.toString() as unknown as DayOfWeek;

    setValue('courseName', plannedCourse.name);
    setValue('dayOfWeek', dayOfWeek);
    setValue('startTime', plannedCourse.startTime);
  };

  useEffect(() => {
    fetchAndFill().then(() => {
      open();
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    await UpdatePlannedCourseService(plannedCourseId!, {
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime + ':00',
    });

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Kurs planı güncellendi.',
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
