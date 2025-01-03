import { Outlet } from 'react-router-dom';
import { ListCourses } from '../../../features/course';

export default () => {
  return (
    <>
      <ListCourses />

      <Outlet />
    </>
  );
};
