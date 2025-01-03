import Database from 'tauri-plugin-sql-api';

export default async function MarkStudentAsMissedService(id: number) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `UPDATE CourseSessionAttendance SET HasAttended=0 WHERE CourseSessionAttendance.Id=${id}`
  );
}
