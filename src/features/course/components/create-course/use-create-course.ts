import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import courseNameUniqueValidation from '../../validations/course-name-unique-validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCourseDto } from '../../types';
import { CreateCourseService } from '../../services';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default () => {
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);

  const schema = z.object({
    name: z
      .string()
      .min(1, 'Bu alan zorunludur')
      .refine(
        async (value) => courseNameUniqueValidation(value),
        'Bu kurs adı kullanılmaktadır'
      ),
    duration: z.number(),
    quota: z.number(),
  });

  const { control, handleSubmit } = useForm<CreateCourseDto>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      duration: 60,
      quota: 6,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await CreateCourseService(data);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Kurs oluşturuldu.',
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
