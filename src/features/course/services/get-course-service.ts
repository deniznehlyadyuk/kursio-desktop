import Database from 'tauri-plugin-sql-api';
import { Course } from '../types';

export default async function GetCourseService(id: string) {
  const db = await Database.load('sqlite:data.db');

  return (
    (await db.select(`
    SELECT
      Course.Id as id,
      Course.Name as name,
      Course.Duration as duration,
      Course.Quota as quota
    FROM
      Course
    WHERE
      Course.Id = ${id}
  `)) as Course[]
  )?.[0];
}
