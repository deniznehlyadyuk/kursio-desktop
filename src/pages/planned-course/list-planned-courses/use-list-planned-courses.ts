import {
  DayOfWeek,
  PlannedCourse,
} from '../../../features/planned-course';
import { useNavigate } from 'react-router-dom';
import {DayOfWeekSelectData} from "../../../constants";
import {notifications} from "@mantine/notifications";

export default () => {
  const navigate = useNavigate();

  const handleNewButtonClick = async (
    dayOfWeek: DayOfWeek,
    startTime: string
  ) => {
    navigate('/planned-courses/create', { state: { dayOfWeek, startTime } });
  };

  const handleUpdateButtonClick = async (plannedCourse: PlannedCourse) => {
    navigate(`/planned-courses/${plannedCourse.id}/update`);
  };

  const handleDeleteButtonClick = async (plannedCourseId: number) => {
    navigate(`/planned-courses/${plannedCourseId}/delete`);
  };

  const handleStudentsButtonClick = (plannedCourseId: number) => {
    navigate(`/planned-courses/${plannedCourseId}/students`);
  };

  const handleNewSessionButtonClick = (plannedCourse: PlannedCourse) => {
    if (plannedCourse.capacityUtilization === 0) {
      notifications.show({
        color: 'red',
        title: 'İşlem Başarısız',
        message: 'Öğrencisi olmayan planlanmış kurs için oturum açılamaz.'
      })
      return;
    }

    const courseName = plannedCourse.name;
    const dayOfWeek = DayOfWeekSelectData.find(
      (dow) => Number(dow.value) === plannedCourse.dayOfWeek
    )!.label;
    const startTime = plannedCourse.startTime.format('HH:mm');

    navigate(`/course-sessions/create`, {
      state: {
        courseName,
        dayOfWeek,
        startTime,
        dayOfWeekValue: plannedCourse.dayOfWeek,
        courseId: plannedCourse.courseId,
        plannedCourseId: plannedCourse.id,
      },
    });
  };

  return [
    handleNewButtonClick,
    handleUpdateButtonClick,
    handleDeleteButtonClick,
    handleStudentsButtonClick,
    handleNewSessionButtonClick,
  ] as const;
};
