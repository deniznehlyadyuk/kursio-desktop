import { Outlet } from 'react-router-dom';
import { PlannedCourseStudents } from '../../../features/planned-course';
import useListPlannedCourseStudents from './use-list-planned-course-students';

export default () => {
  const [
    createPlannedCourseStudent,
    updateStudentPayment,
    deletePlannedCourseStudents,
  ] = useListPlannedCourseStudents();

  return (
    <>
      <PlannedCourseStudents
        onNewButtonClick={createPlannedCourseStudent}
        onUpdateButtonClick={updateStudentPayment}
        onDeleteButtonClick={deletePlannedCourseStudents}
      />

      <Outlet />
    </>
  );
};
