import Database from 'tauri-plugin-sql-api';

export default async (value: number, courseId: string) => {
  const db = await Database.load('sqlite:data.db');

  const query = `
        SELECT
            MAX(capacityUtilization) AS MaxCapacityUtilization
        FROM (
            SELECT
                COUNT(*) AS capacityUtilization
            FROM
                PlannedCourseStudent
            LEFT JOIN
                PlannedCourse ON PlannedCourse.Id = PlannedCourseStudent.PlannedCourseId
            WHERE
                PlannedCourse.CourseId = ${courseId}
            GROUP BY
                PlannedCourseStudent.PlannedCourseId
        );
    `;

  const countResponse: any[] = await db.select(query);

  return countResponse[0]['MaxCapacityUtilization'] <= value;
};
