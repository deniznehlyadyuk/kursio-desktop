import { CourseSession } from '../../types';

export interface ListCourseSessionsProps {
  onDeleteButtonClick: (courseSessionIds: string[]) => void;
  onAttendancesButtonClick: (courseSession: CourseSession) => void;
}
