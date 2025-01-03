import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { LogPaymentFormDto } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { StudentLogPaymentService } from '../../services';

export default () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);

  const schema = z.object({
    amountOfMoney: z.number(),
  });

  const { control, handleSubmit } = useForm<LogPaymentFormDto>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      amountOfMoney: undefined,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await StudentLogPaymentService(studentId!, data.amountOfMoney);

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
