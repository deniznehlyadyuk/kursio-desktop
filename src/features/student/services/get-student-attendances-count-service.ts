import Database from 'tauri-plugin-sql-api';

export default async (id: string) => {
  const db = await Database.load('sqlite:data.db');

  return (
    (await db.select(`
        SELECT
            COUNT(
                DISTINCT
                    STRFTIME("%Y", CourseSession."DateTime" / 1000, 'unixepoch') || '-' ||
                    STRFTIME("%W", CourseSession."DateTime" / 1000, 'unixepoch')
                ) AS Count
            FROM
                CourseSessionAttendance
            LEFT JOIN
                CourseSession ON CourseSession.Id = CourseSessionAttendance.CourseSessionId
            WHERE
                CourseSessionAttendance.StudentId = ${id}
    `)) as any[]
  )[0]['Count'];
};
