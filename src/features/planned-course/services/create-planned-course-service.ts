import Database from 'tauri-plugin-sql-api';
import { CreatePlannedCourseDto } from '../types';

export default async function CreatePlannedCourseService(
  plannedCourse: CreatePlannedCourseDto
) {
  const db = await Database.load('sqlite:data.db');
  await db.execute(`
    INSERT INTO PlannedCourse (
      CourseId,
      DayOfWeek,
      StartTime
    ) VALUES (
      ${plannedCourse.courseId},
      ${plannedCourse.dayOfWeek},
      '${plannedCourse.startTime + ':00'}'
    )
  `);
}
