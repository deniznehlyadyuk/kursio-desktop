import { Dayjs } from 'dayjs';

export default interface CreateCourseSessionDto {
  plannedCourseId: number;
  courseId: number;
  dateTime: Dayjs;
}
