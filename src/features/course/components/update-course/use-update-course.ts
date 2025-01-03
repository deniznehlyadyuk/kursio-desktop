import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { UpdateCourseDto } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetCourseService, UpdateCourseService } from '../../services';
import { notifications } from '@mantine/notifications';
import { nanoid } from 'nanoid';
import { useNavigate, useParams } from 'react-router-dom';
import {CourseNameUniqueValidation, CourseQuotaValidation} from "../../validations";

export default () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    name: z
      .string()
      .min(1, 'Bu alan zorunludur')
      .refine(
        async (value) => CourseNameUniqueValidation(value, courseId!),
        'Bu kurs adı kullanılmaktadır'
      ),
    duration: z.number(),
    quota: z.number()
        .refine(
            async (value) => CourseQuotaValidation(value, courseId!),
            'Bu değerden daha fazla öğrenciye sahip planlanmış kurslar mevcut'
        ),
  });

  const { control, handleSubmit, setValue } = useForm<UpdateCourseDto>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      duration: 60,
      quota: 6,
    },
    resolver: zodResolver(schema),
  });

  const fetchAndFill = async () => {
    const course = await GetCourseService(courseId!);
    setValue('duration', course.duration);
    setValue('name', course.name);
    setValue('quota', course.quota);
  };

  useEffect(() => {
    fetchAndFill().then(() => {
      open();
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    await UpdateCourseService(courseId!, data);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Kurs güncellendi.',
    });

    close();

    setTimeout(() => {
      navigate('/courses', { state: { reFetch: nanoid() } });
    }, 200);
  });

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate('/courses');
    }, 200);
  };

  return [opened, onClose, onSubmit, control] as const;
};
