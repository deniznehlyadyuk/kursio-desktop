import Database from 'tauri-plugin-sql-api';
import { Student } from '../types';

export default async function GetStudentService(id: string) {
  const db = await Database.load('sqlite:data.db');

  return (
    (await db.select(`
    SELECT
      Student.Id AS id,
      Student.FullName AS fullName,
      Student.ParentFullName AS parentFullName,
      Student.PhoneNumber AS phoneNumber,
      Student.ParentPhoneNumber AS parentPhoneNumber
    FROM
      Student
    WHERE
      Student.Id = ${id}
  `)) as Student[]
  )?.[0];
}
