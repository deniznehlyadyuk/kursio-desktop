import Database from 'tauri-plugin-sql-api';

export default async (ids: string[]) => {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `DELETE FROM PaymentHistory WHERE Id IN (${ids.join(', ')})`
  );
};
