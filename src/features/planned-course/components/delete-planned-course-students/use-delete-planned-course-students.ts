import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { DeletePlannedCourseStudentsService } from '../../services';

export default () => {
  const { plannedCourseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);

  const onClose = () => {
    close();

    setTimeout(() => {
      navigate(`/planned-courses/${plannedCourseId}/students`);
    }, 200);
  };

  const onConfirmed = async () => {
    await DeletePlannedCourseStudentsService(
      location.state.plannedCourseStudentIds
    );

    notifications.show({
      title: 'İşlem Başarılı',
      message: 'Seçilen öğrenciler kurstan çıkarıldı.',
    });

    close();

    setTimeout(() => {
      navigate(`/planned-courses/${plannedCourseId}/students`, {
        state: { reFetch: nanoid() },
      });
    }, 200);
  };

  return [opened, onClose, onConfirmed] as const;
};
