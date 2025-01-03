import { useEffect } from 'react';
import { UpdateStudentPaymentFormDto } from './types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@mantine/hooks';
import {
  GetPlannedCourseStudentService,
  UpdateStudentPaymentAmountService,
} from '../../services';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default () => {
  const navigate = useNavigate();
  const { plannedCourseId, plannedCourseStudentId } = useParams();

  const [opened, { open, close }] = useDisclosure(false);

  const schema = z.object({
    paymentAmount: z.number().min(0, 'Ücret bilgisi sıfırdan küçük olamaz.'),
  });

  const { control, handleSubmit, setValue } =
    useForm<UpdateStudentPaymentFormDto>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: {
        studentFullName: '',
        paymentAmount: 0,
      },
      resolver: zodResolver(schema),
    });

  const fetchAndFill = async () => {
    const plannedCourseStudent = await GetPlannedCourseStudentService(
      plannedCourseStudentId!
    );
    setValue('studentFullName', plannedCourseStudent.studentFullName);
    setValue('paymentAmount', plannedCourseStudent.paymentAmount);
  };

  useEffect(() => {
    fetchAndFill().then(() => {
      open();
    });
  }, [plannedCourseStudentId]);

  const onSubmit = handleSubmit(async (data) => {
    await UpdateStudentPaymentAmountService(
      plannedCourseStudentId!,
      data.paymentAmount
    );

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Kurs ücreti güncellendi.',
    });

    close();

    setTimeout(() => {
      navigate(`/planned-courses/${plannedCourseId}/students`, {
        state: { reFetch: nanoid() },
      });
    }, 200);
  });

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate(`/planned-courses/${plannedCourseId}/students`);
    }, 200);
  };

  return [opened, onClose, onSubmit, control] as const;
};
