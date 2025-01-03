import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteCourseSessionsService } from '../../services';
import { notifications } from '@mantine/notifications';

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate('/course-sessions');
    }, 200);
  };

  const onConfirmed = async () => {
    await DeleteCourseSessionsService(location.state.courseSessionIds);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Seçilen kurs oturumları silindi.',
    });

    close();

    setTimeout(() => {
      navigate('/course-sessions', { state: { reFetch: nanoid() } });
    }, 200);
  };

  return [opened, onClose, onConfirmed] as const;
};
