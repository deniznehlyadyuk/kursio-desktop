import DayOfWeek from './day-of-week';

export default interface UpdatePlannedCourseServiceDto {
  dayOfWeek: DayOfWeek;
  startTime: string;
}
