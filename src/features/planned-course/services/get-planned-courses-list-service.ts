import Database from 'tauri-plugin-sql-api';
import { PlannedCourse } from '../types';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

export default async function GetPlannedCoursesListService() {
  const db = await Database.load('sqlite:data.db');

  const response = (await db.select(`
    SELECT
      PlannedCourse.Id AS id,
      Course.Name AS name,
      Course.Duration AS duration,
      Course.Id as courseId,
      PlannedCourse.DayOfWeek AS dayOfWeek,
      PlannedCourse.StartTime AS startTime,
      COUNT(Student.Id) AS capacityUtilization,
      Course.Quota AS quota
    FROM
      PlannedCourse
    LEFT JOIN
      Course ON Course.Id = PlannedCourse.CourseId
    LEFT JOIN
      PlannedCourseStudent ON PlannedCourseStudent.PlannedCourseId = PlannedCourse.Id
    LEFT JOIN
      Student ON Student.Id = PlannedCourseStudent.StudentId
    GROUP BY
      PlannedCourse.Id
    ORDER BY
      PlannedCourse.DayOfWeek, PlannedCourse.StartTime
  `)) as PlannedCourse[];

  return response.map((item) => ({
    ...item,
    startTime: dayjs(item.startTime, 'HH:mm:ss'),
  })) as PlannedCourse[];
}
