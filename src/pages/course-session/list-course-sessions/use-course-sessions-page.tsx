import { useNavigate } from 'react-router-dom';
import { CourseSession } from '../../../features/course-session';

export default () => {
  const navigate = useNavigate();

  const onAttendancesButtonClick = (courseSession: CourseSession) => {
    navigate(`/course-sessions/${courseSession.id}/attendances`);
  };

  const onDeleteButtonClick = (courseSessionIds: string[]) => {
    navigate(`/course-sessions/delete`, { state: { courseSessionIds } });
  };

  return [onAttendancesButtonClick, onDeleteButtonClick] as const;
};
