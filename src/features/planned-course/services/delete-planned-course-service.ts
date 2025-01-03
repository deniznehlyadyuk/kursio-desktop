import Database from 'tauri-plugin-sql-api';

export default async function DeletePlannedCourseService(
  plannedCourseId: string
) {
  const db = await Database.load('sqlite:data.db');
  await db.execute(`
    DELETE FROM PlannedCourse WHERE Id = ${plannedCourseId}
  `);
}
