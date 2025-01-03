import Database from 'tauri-plugin-sql-api';

export default async function DeleteStudentsService(ids: string[]) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`DELETE FROM Student WHERE Id IN (${ids.join(', ')})`);
}
