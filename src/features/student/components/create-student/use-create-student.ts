import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateStudentDto } from '../../types';
import { CreateStudentService } from '../../services';
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
    fullName: z.string().min(1, 'Bu alan zorunludur'),
    phoneNumber: z.string().regex(/^5\d{9}$/, 'Geçersiz format'),
    parentFullName: z.string().min(1, 'Bu alan zorunludur'),
    parentPhoneNumber: z.string().regex(/^5\d{9}$/, 'Geçersiz format'),
  });

  const { control, handleSubmit } = useForm<CreateStudentDto>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      parentFullName: '',
      parentPhoneNumber: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await CreateStudentService(data);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Öğrenci oluşturuldu.',
    });

    close();

    setTimeout(() => {
      navigate('/students', { state: { reFetch: nanoid() } });
    }, 200);
  });

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate('/students');
    }, 200);
  };

  return [opened, onClose, onSubmit, control] as const;
};
