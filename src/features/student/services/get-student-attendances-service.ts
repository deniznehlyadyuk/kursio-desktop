import Database from 'tauri-plugin-sql-api';
import { StudentAttendance } from '../types';
import dayjs from 'dayjs';

export default async (id: string, page: number) => {
  const db = await Database.load('sqlite:data.db');

  const attendances = (await db.select(`
        SELECT
            CourseSessionAttendance.Id AS id,
            CourseSessionAttendance.CourseName AS name,
            CourseSessionAttendance.Duration AS duration,
            CourseSession."DateTime" as "dateTime",
            CourseSessionAttendance.HasAttended AS hasAttended,
            STRFTIME("%Y-%W", CourseSession."DateTime" / 1000, 'unixepoch') AS yearWeek
        FROM
            CourseSessionAttendance
        LEFT JOIN
            CourseSession ON CourseSession.Id = CourseSessionAttendance.CourseSessionId
        WHERE
            CourseSessionAttendance.StudentId = ${id} AND
            yearWeek = (
                SELECT
                    DISTINCT
                    STRFTIME("%Y-%W", CourseSession."DateTime" / 1000, 'unixepoch')
                FROM
                    CourseSessionAttendance
                LEFT JOIN
                    CourseSession ON CourseSession.Id = CourseSessionAttendance.CourseSessionId
                WHERE
                    CourseSessionAttendance.StudentId = ${id}
                ORDER BY
                    CourseSession."DateTime"
                LIMIT
                    1
                OFFSET
                    ${page - 1}
            )
    `)) as any[];

  return attendances.map((attendance) => {
    const dateTime = dayjs(attendance.dateTime);
    const dayOfWeek = dateTime.day();

    return {
      id: attendance.id,
      name: attendance.name,
      duration: attendance.duration,
      startTime: dateTime,
      dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek,
      hasAttended: attendance.hasAttended,
      yearWeek: attendance.yearWeek,
    } as StudentAttendance;
  });
};
