import Database from 'tauri-plugin-sql-api';

export default async function UpdateStudentPaymentAmountService(
  id: string,
  paymentAmount: number
) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`
    UPDATE PlannedCourseStudent SET
      PaymentAmount = ${paymentAmount}
    WHERE
      Id=${id}
  `);
}
