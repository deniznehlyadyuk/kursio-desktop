import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Database from 'tauri-plugin-sql-api';

dayjs.extend(customParseFormat);

export default async (dateTimeValue: Date, startTimeStr: string) => {
  const db = await Database.load('sqlite:data.db');

  const startTime = dayjs(startTimeStr, 'HH:mm');
  const dateTime = dayjs(dateTimeValue)
    .add(startTime.hour(), 'hour')
    .add(startTime.minute(), 'minute');

  const query = `SELECT COUNT(*) FROM CourseSession WHERE DateTime=${dateTime.valueOf()}`;

  const countResponse: any[] = await db.select(query);

  return countResponse[0]['COUNT(*)'] === 0;
};
