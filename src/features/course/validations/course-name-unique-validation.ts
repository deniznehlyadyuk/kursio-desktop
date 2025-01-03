import Database from 'tauri-plugin-sql-api';

export default async function courseNameUniqueValidation(
  value: string,
  courseId?: string
) {
  const db = await Database.load('sqlite:data.db');

  const query = `SELECT COUNT(*) FROM Course WHERE Name='${value}' ${
    courseId ? 'AND Id != ' + courseId : ''
  }`;

  const countResponse: any[] = await db.select(query);

  return countResponse[0]['COUNT(*)'] === 0;
}
