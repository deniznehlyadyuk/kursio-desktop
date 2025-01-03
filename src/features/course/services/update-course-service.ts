import Database from 'tauri-plugin-sql-api';
import { UpdateCourseDto } from '../types';

export default async function UpdateCourseService(
  id: string,
  course: UpdateCourseDto
) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `UPDATE Course SET Name='${course.name}', Duration=${course.duration}, Quota=${course.quota} WHERE Id=${id}`
  );
}
