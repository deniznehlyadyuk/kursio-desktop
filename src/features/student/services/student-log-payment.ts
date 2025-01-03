import Database from 'tauri-plugin-sql-api';

export default async (id: string, amountOfMoney: number) => {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`
    INSERT INTO PaymentHistory
      (StudentId, PaymentAmount, "DateTime")
    VALUES
      (${id}, ${amountOfMoney}, ${Date.now()})
  `);
};
