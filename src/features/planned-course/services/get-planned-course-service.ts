import Database from 'tauri-plugin-sql-api';
import { UpdatePlannedCourseFormDto } from '../types';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

export default async function GetPlannedCourseService(id: string) {
  const db = await Database.load('sqlite:data.db');

  const plannedCourse = (
    (await db.select(`
    SELECT
      PlannedCourse.Id AS id,
      Course.Name AS name,
      PlannedCourse.DayOfWeek AS dayOfWeek,
      PlannedCourse.StartTime AS startTime
    FROM
      PlannedCourse
    LEFT JOIN
      Course ON Course.Id = PlannedCourse.CourseId
    WHERE
      PlannedCourse.Id = ${id}
  `)) as UpdatePlannedCourseFormDto[]
  )[0];

  return {
    ...plannedCourse,
    startTime: dayjs(plannedCourse.startTime, 'HH:mm:ss').format('HH:mm'),
  };
}
