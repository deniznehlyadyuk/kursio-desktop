import { DayOfWeek } from '../../types';

export type UpdatePlannedCourseFormDto = {
  courseName: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
};
