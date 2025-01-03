import Database from 'tauri-plugin-sql-api';
import { Course } from '../../course';

export default async (id: string) => {
  const db = await Database.load('sqlite:data.db');

  return (
    (await db.select(`
    SELECT
      Course.Id AS id,
      Course.Name AS name,
      Course.Duration AS duration,
      Course.Quota AS quota
    FROM
      PlannedCourse
    LEFT JOIN
      Course ON Course.Id = PlannedCourse.CourseId
    WHERE
      PlannedCourse.Id = ${id}
  `)) as Course[]
  )[0];
};
