import { Outlet } from 'react-router-dom';
import { ListPlannedCourses } from '../../../features/planned-course';
import useListPlannedCourses from './use-list-planned-courses';

export default () => {
  const [
    handleNewButtonClick,
    handleUpdateButtonClick,
    handleDeleteButtonClick,
    handleStudentsButtonClick,
    handleNewSessionButtonClick,
  ] = useListPlannedCourses();

  return (
    <>
      <ListPlannedCourses
        onDeleteButtonClick={handleDeleteButtonClick}
        onUpdateButtonClick={handleUpdateButtonClick}
        onStudentsButtonClick={handleStudentsButtonClick}
        onNewButtonClick={handleNewButtonClick}
        onNewSessionButtonClick={handleNewSessionButtonClick}
      />

      <Outlet />
    </>
  );
};
