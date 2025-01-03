import Database from 'tauri-plugin-sql-api';

export default async function AddStudentsToPlannedCourseService(
  plannedCourseId: number,
  students: { studentId: number; paymentAmount: number }[]
) {
  const db = await Database.load('sqlite:data.db');
  await db.execute(`
    INSERT INTO PlannedCourseStudent (
      PlannedCourseId,
      StudentId,
      PaymentAmount
    ) VALUES
    ${students
      .map(
        (student) =>
          `(${plannedCourseId}, ${student.studentId}, ${student.paymentAmount})`
      )
      .join(', ')}
  `);
}
