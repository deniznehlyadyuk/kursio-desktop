import Database from 'tauri-plugin-sql-api';
import { CreateCourseSessionDto } from '../types';
import { GetCourseService } from '../../course';

export default async function CreateCourseSessionService(
  courseSession: CreateCourseSessionDto
) {
  const db = await Database.load('sqlite:data.db');

  const course = await GetCourseService(courseSession.courseId.toString());

  await db.execute(
    `INSERT INTO CourseSession (CourseName, DateTime) VALUES ('${
      course.name
    }', ${courseSession.dateTime.valueOf()})`
  );

  const courseSessionId = (
    (await db.select('SELECT last_insert_rowid()')) as any
  )[0]['last_insert_rowid()'];

  await db.execute(`
    INSERT INTO
      CourseSessionAttendance (CourseSessionId, StudentId, PaymentAmount, Duration, CourseName, HasAttended)
    SELECT
      ${courseSessionId} as CourseSessionId,
      StudentId,
      PaymentAmount,
      ${course!.duration},
      "${course!.name}",
      NULL as HasAttended
    FROM
      PlannedCourseStudent
    WHERE
      PlannedCourseId = ${courseSession.plannedCourseId}
  `);
}
