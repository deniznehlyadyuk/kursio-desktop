import { DayOfWeek } from '../../types';

export interface CreatePlannedCourseFormDto {
  courseId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
}
