import {Dayjs} from "dayjs";

export default interface StudentAttendance {
    id: number;
    name: string;
    duration: number;
    startTime: Dayjs;
    dayOfWeek: number;
    hasAttended: number;
    yearWeek: string;
}