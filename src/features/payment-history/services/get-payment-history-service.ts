import Database from 'tauri-plugin-sql-api';
import { UpdatePaymentHistoryDto } from '../types';

export default async function GetCourseService(id: string) {
  const db = await Database.load('sqlite:data.db');

  return (
    (await db.select(`
    SELECT
      PaymentHistory.PaymentAmount as paymentAmount
    FROM
      PaymentHistory
    WHERE
      PaymentHistory.Id = ${id}
  `)) as UpdatePaymentHistoryDto[]
  )?.[0];
}
