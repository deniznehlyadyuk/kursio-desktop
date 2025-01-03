import { Dayjs } from 'dayjs';

export default interface PlannedCourse {
  id: string;
  courseId: string;
  courseName: string;
  startTime: Dayjs;
}
