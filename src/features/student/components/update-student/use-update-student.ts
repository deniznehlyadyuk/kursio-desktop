import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { UpdateStudentDto } from '../../types';
import { GetStudentService, UpdateStudentService } from '../../services';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    fullName: z.string().min(1, 'Bu alan zorunludur'),
    phoneNumber: z.string().regex(/^5\d{9}$/, 'Geçersiz format'),
    parentFullName: z.string().min(1, 'Bu alan zorunludur'),
    parentPhoneNumber: z.string().regex(/^5\d{9}$/, 'Geçersiz format'),
  });

  const { control, handleSubmit, setValue } = useForm<UpdateStudentDto>({
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

  const fillFormInputs = async () => {
    const student = await GetStudentService(studentId!);
    setValue('fullName', student.fullName);
    setValue('parentFullName', student.parentFullName);
    setValue('parentPhoneNumber', student.parentPhoneNumber);
    setValue('phoneNumber', student.phoneNumber);
  };

  useEffect(() => {
    fillFormInputs().then(() => {
      open();
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    await UpdateStudentService(studentId!, data);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Öğrenci güncellendi.',
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
