import Database from 'tauri-plugin-sql-api';

export default async function DeletePlannedCourseStudentsService(
  ids: string[]
) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `DELETE FROM PlannedCourseStudent WHERE Id IN (${ids.join(', ')})`
  );
}
