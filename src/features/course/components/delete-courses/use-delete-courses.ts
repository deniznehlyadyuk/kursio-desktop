import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { DeleteCoursesService } from '../../services';

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
      navigate('/courses');
    }, 200);
  };

  const onConfirmed = async () => {
    await DeleteCoursesService(location.state.courseIds);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Seçilen kurslar silindi.',
    });

    close();

    setTimeout(() => {
      navigate('/courses', { state: { reFetch: nanoid() } });
    }, 200);
  };

  return [opened, onClose, onConfirmed] as const;
};
