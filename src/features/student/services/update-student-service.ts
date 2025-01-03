import Database from 'tauri-plugin-sql-api';
import { UpdateStudentDto } from '../types';

export default async function UpdateStudentService(
  id: string,
  student: UpdateStudentDto
) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`
    UPDATE Student SET
      FullName = '${student.fullName}',
      PhoneNumber = '${student.phoneNumber}',
      ParentFullName = '${student.parentFullName}',
      ParentPhoneNumber = '${student.parentPhoneNumber}'
    WHERE
      Id=${id}
  `);
}
