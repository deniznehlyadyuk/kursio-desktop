import Database from 'tauri-plugin-sql-api';

export default async function MarkStudentAsAtandedService(id: number) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `UPDATE CourseSessionAttendance SET HasAttended=1 WHERE CourseSessionAttendance.Id=${id}`
  );
}
