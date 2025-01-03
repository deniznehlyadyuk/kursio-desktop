import {useElementSize} from "@mantine/hooks";
import {TDataBase} from "./types";
import {useMemo} from "react";
import {useDebounce} from "../../hooks";

export default <TData extends TDataBase>(items: TData[]) => {
    const { ref: containerRef, width } = useElementSize();

    const columnWidth = useDebounce((width - 122) / 7, 100);

    const itemsWithStyles = useMemo(() => {
        return items?.map((item) => ({
            id: item.id,
            styles: {
                top:
                    100 * (item.startTime.hour() - 8) +
                    25 * (item.startTime.minute() / 15),
                left:
                    100 +
                    item.dayOfWeek +
                    columnWidth * (item.dayOfWeek - 1),
                width: columnWidth,
                height: 25 * (item.duration / 15) - 1,
            },
        }));
    }, [items, columnWidth]);

    return [containerRef, itemsWithStyles] as const;
}