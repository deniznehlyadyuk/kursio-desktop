import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { DeletePlannedCourseService } from '../../services';

export default () => {
  const { plannedCourseId } = useParams();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate('/planned-courses');
    }, 200);
  };

  const onConfirmed = async () => {
    await DeletePlannedCourseService(plannedCourseId!);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Planlamış kurs silindi.',
    });

    close();

    setTimeout(() => {
      navigate('/planned-courses', { state: { reFetch: nanoid() } });
    }, 200);
  };

  return [opened, onClose, onConfirmed] as const;
};
