import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();

  const createPlannedCourseStudent = async () => {
    navigate('create');
  };

  const updateStudentPayment = async (plannedCourseStudentId: number) => {
    navigate(`${plannedCourseStudentId}/update-payment-amount`);
  };

  const deletePlannedCourseStudents = async (
    plannedCourseStudentIds: string[]
  ) => {
    navigate('delete', { state: { plannedCourseStudentIds } });
  };

  return [
    createPlannedCourseStudent,
    updateStudentPayment,
    deletePlannedCourseStudents,
  ] as const;
};
