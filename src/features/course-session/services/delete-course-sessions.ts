import Database from 'tauri-plugin-sql-api';

export default async function DeleteCourseSessionsService(
  courseSessionIds: number[]
) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`
    DELETE FROM CourseSessionAttendance WHERE CourseSessionId IN (${courseSessionIds.join(
      ', '
    )})
  `);

  await db.execute(`
    DELETE FROM CourseSession WHERE Id IN (${courseSessionIds.join(', ')})
  `);
}
