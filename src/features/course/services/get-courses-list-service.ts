import Database from 'tauri-plugin-sql-api';
import { Course } from '../types';

export default async function GetCoursesListService(
  searchQuery: string,
  id?: string
) {
  const db = await Database.load('sqlite:data.db');

  return (await db.select(`
    SELECT
      Course.Id as id,
      Course.Name as name,
      Course.Duration as duration
    FROM
      Course
    WHERE
      Course.Name LIKE '%${searchQuery}%' ${id ? `AND Course.Id = ${id}` : ''}
    LIMIT
      5
  `)) as Course[];
}
