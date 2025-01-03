import { Outlet } from 'react-router-dom';
import { ListStudents } from '../../../features/student';

export default () => {
  return (
    <>
      <ListStudents />

      <Outlet />
    </>
  );
};
