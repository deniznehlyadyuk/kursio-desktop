import {DayOfWeek} from "../../features/planned-course";
import generateTimeSlots from "./generate-time-slots";
import useCalendar from "./use-calendar";
import {WeekCalendarProps, TDataBase} from "./types";
import classes from './index.module.css'

const timeSlots = generateTimeSlots();

export default <TData extends TDataBase,>(props: WeekCalendarProps<TData>) => {
    const [containerRef, items] = useCalendar(props.items);

    return (
        <div
            ref={containerRef}
            className={classes.container}
        >
            <div className={classes.header}>
                <div className={classes.cell}>&nbsp;</div>
                <div className={classes.cell}>Pazartesi</div>
                <div className={classes.cell}>Salı</div>
                <div className={classes.cell}>Çarşamba</div>
                <div className={classes.cell}>Perşembe</div>
                <div className={classes.cell}>Cuma</div>
                <div className={classes.cell}>Cumartesi</div>
                <div className={classes.cell}>Pazar</div>
            </div>

            <div className={classes.content}>
                {timeSlots.map((timeSlot, timeSlotIndex) => (
                    <div
                        key={timeSlotIndex}
                        className={classes.contentRow}
                    >
                        <div className={classes.cell}>{timeSlot.format('HH:mm')}</div>
                        {Array.from({ length: 7 }, (_, dayOfWeekIndex) => (
                            <div
                                key={dayOfWeekIndex}
                                className={classes.cell}
                            >
                                {Array.from({ length: 4 }, (_, quarterIndex) => (
                                    <div
                                        key={`day-${dayOfWeekIndex}-quarter-${quarterIndex}`}
                                        className={classes.quarterSeperator}
                                        data-day-of-week={dayOfWeekIndex + 1}
                                        data-hour={timeSlot.hour()}
                                        data-minute={quarterIndex * 15}
                                        onClick={() =>
                                            props.onEmptyCellClick?.(
                                                (dayOfWeekIndex + 1).toString() as DayOfWeek,
                                                timeSlot
                                                    .add(quarterIndex * 15, 'minute')
                                                    .format('HH:mm')
                                            )
                                        }
                                    >
                                        &nbsp;
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                {items?.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={classes.event}
                            style={item.styles}
                        >
                            {props.itemRenderer(props.items.find(i => i.id === item.id)!)}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}