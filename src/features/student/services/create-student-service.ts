import Database from 'tauri-plugin-sql-api';
import { CreateStudentDto } from '../types';

export default async function CreateStudentService(student: CreateStudentDto) {
  const db = await Database.load('sqlite:data.db');

  await db.execute(`
    INSERT INTO Student (
      FullName,
      PhoneNumber,
      ParentFullName,
      ParentPhoneNumber
    ) VALUES (
      '${student.fullName}',
      '${student.phoneNumber}',
      '${student.parentFullName}',
      '${student.parentPhoneNumber}'
    )
  `);
}
