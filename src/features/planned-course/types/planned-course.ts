import { Dayjs } from 'dayjs';

export default interface PlannedCourse {
  id: number;
  name: string;
  duration: number;
  courseId: number;
  dayOfWeek: number;
  startTime: Dayjs;
  capacityUtilization: number;
  quota: number;
}
