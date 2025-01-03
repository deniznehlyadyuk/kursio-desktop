import { Outlet } from 'react-router-dom';
import { ListCourseSessions } from '../../../features/course-session';
import useCourseSessionsPage from './use-course-sessions-page';

export default () => {
  const [onAttendancesButtonClick, onDeleteButtonClick] =
    useCourseSessionsPage();

  return (
    <>
      <ListCourseSessions
        onAttendancesButtonClick={onAttendancesButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />

      <Outlet />
    </>
  );
};
