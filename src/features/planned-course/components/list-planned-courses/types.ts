import { DayOfWeek, PlannedCourse } from '../../types';

export interface CalendarPlannedCoursesProps {
  onStudentsButtonClick: (plannedCourseId: number) => void;
  onDeleteButtonClick: (plannedCourseId: number) => void;
  onUpdateButtonClick: (plannedCourse: PlannedCourse) => void;
  onNewButtonClick: (dayOfWeek: DayOfWeek, startTime: string) => void;
  onNewSessionButtonClick: (plannedCourse: PlannedCourse) => void;
}
