import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { DeleteStudentsService } from '../../services';

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
      navigate('/students');
    }, 200);
  };

  const onConfirmed = async () => {
    await DeleteStudentsService(location.state.studentIds);

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Seçilen öğrenciler silindi.',
    });

    close();

    setTimeout(() => {
      navigate('/students', { state: { reFetch: nanoid() } });
    }, 200);
  };

  return [opened, onClose, onConfirmed] as const;
};
