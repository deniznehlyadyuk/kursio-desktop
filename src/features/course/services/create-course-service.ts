import Database from 'tauri-plugin-sql-api';
import { CreateCourseDto } from '../types';

export default async function CreateCourseService(course: CreateCourseDto) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `INSERT INTO Course (Name, Duration, Quota) VALUES ('${course.name}', ${course.duration}, ${course.quota})`
  );
}
