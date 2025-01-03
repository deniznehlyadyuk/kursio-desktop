import Database from 'tauri-plugin-sql-api';

export default async function DeleteCoursesService(ids: string[]) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`DELETE FROM Course WHERE Id IN (${ids.join(', ')})`);
}
