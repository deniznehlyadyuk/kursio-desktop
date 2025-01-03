import { UpdatePaymentHistoryDto } from '../types';
import Database from 'tauri-plugin-sql-api';

export default async (id: string, paymentHistory: UpdatePaymentHistoryDto) => {
  const db = await Database.load('sqlite:data.db');

  await db.execute(
    `UPDATE PaymentHistory SET PaymentAmount='${paymentHistory.paymentAmount}' WHERE Id=${id}`
  );
};
