import useStudentAttendances from "./use-student-attendances";
import {Box, Flex, Group, Pagination, Stack, Text} from "@mantine/core";
import {WeekCalendar} from "../../../../components";
import classes from './index.module.css'

const attendedColor = '#3cf6a9';
const missedColor = '#f6703c';
const unknownColor = '#999';

export default () => {
    const [attendances, startOfWeek, endOfWeek, currentPage, setCurrentPage, totalPage] = useStudentAttendances();

    return (
        <Stack style={{overflow: 'hidden', height: 'calc(100vh - 32px)'}}>
            <Group>
                <Text>{startOfWeek}</Text>
                <Text>━</Text>
                <Text>{endOfWeek}</Text>
            </Group>

            <WeekCalendar
                items={attendances}
                itemRenderer={(attendance) => {
                    let backgroundColor = attendedColor // attended

                    if (attendance.hasAttended === 0) {
                        backgroundColor = missedColor
                    } else if (attendance.hasAttended === null) {
                        backgroundColor = unknownColor
                    }

                    return (
                        <Box className={classes.wrapper} style={{backgroundColor}}>
                            <Stack>
                                {attendance.name}
                            </Stack>
                        </Box>
                    )
                }}
            />

            <Flex justify='space-between'>
                <Group>
                    <Group gap='xs'>
                        <Box h={16} w={16} style={{backgroundColor: attendedColor, border: '1px solid #555'}} />
                        <Text>Katıldı</Text>
                    </Group>
                    <Group gap='xs'>
                        <Box h={16} w={16} style={{backgroundColor: missedColor, border: '1px solid #555'}} />
                        <Text>Katılmadı</Text>
                    </Group>
                    <Group gap='xs'>
                        <Box h={16} w={16} style={{backgroundColor: unknownColor, border: '1px solid #555'}} />
                        <Text>Bilinmiyor</Text>
                    </Group>
                </Group>
                <Pagination total={totalPage} value={currentPage} onChange={setCurrentPage} />
            </Flex>
        </Stack>
    )
}