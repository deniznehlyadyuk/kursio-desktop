import Database from 'tauri-plugin-sql-api';
import { UpdatePlannedCourseServiceDto } from '../types';

export default async function UpdatePlannedCourseService(
  id: string,
  plannedCourse: UpdatePlannedCourseServiceDto
) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`
    UPDATE PlannedCourse SET
      DayOfWeek='${plannedCourse.dayOfWeek}',
      StartTime='${plannedCourse.startTime}'
    WHERE
      Id=${id}
  `);
}
