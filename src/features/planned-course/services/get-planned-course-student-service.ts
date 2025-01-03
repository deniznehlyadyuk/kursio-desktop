import Database from 'tauri-plugin-sql-api';
import { UpdatePlannedCourseStudentDto } from '../types';

export default async function GetPlannedCourseStudentService(id: string) {
  const db = await Database.load('sqlite:data.db');

  return (
    (await db.select(`
    SELECT
      PlannedCourseStudent.Id AS id,
      Student.FullName AS studentFullName,
      PlannedCourseStudent.PaymentAmount AS paymentAmount
    FROM
      PlannedCourseStudent
    LEFT JOIN
      Student ON Student.Id = PlannedCourseStudent.StudentId
    WHERE
      PlannedCourseStudent.Id = ${id}
  `)) as UpdatePlannedCourseStudentDto[]
  )[0];
}
