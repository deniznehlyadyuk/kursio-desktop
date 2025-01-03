import {DayOfWeek} from "../../features/planned-course";
import {Dayjs} from "dayjs";
import {ReactNode} from "react";

export interface TDataBase {
    id: number;
    startTime: Dayjs;
    dayOfWeek: number;
    duration: number;
}

export interface WeekCalendarProps<TData extends TDataBase> {
    onEmptyCellClick?: (dayOfWeek: DayOfWeek, startTime: string) => void;
    items: TData[];
    itemRenderer: (item: TData) => ReactNode;
}