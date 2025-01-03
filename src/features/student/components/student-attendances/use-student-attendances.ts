import {useParams} from "react-router-dom";
import {GetStudentAttendancesCountService, GetStudentAttendancesService} from "../../services";
import {useEffect, useState} from "react";
import {StudentAttendance} from "../../types";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import tr from 'dayjs/locale/tr';

dayjs.extend(isoWeek);
dayjs.locale(tr);

export default () => {
    const {studentId} = useParams();

    const [attendances, setAttendances] = useState<StudentAttendance[]>([]);
    const [startOfWeek, setStartOfWeek] = useState<string>();
    const [endOfWeek, setEndOfWeek] = useState<string>();
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        const fetchAndSetPage = async () => {
            const count: number = await GetStudentAttendancesCountService(studentId!);
            setTotalPage(count)
            setCurrentPage(count)
        }

        fetchAndSetPage();
    }, []);

    useEffect(() => {
        if (!currentPage) return;

        const fetchAttendances = async () => {
            return await GetStudentAttendancesService(studentId!, currentPage);
        }

        const getWeekDates = async (year: number, week: number) => {
            const startOfWeek = dayjs().year(year).isoWeek(week).startOf('isoWeek').format('MMMM DD, YYYY');
            const endOfWeek = dayjs().year(year).isoWeek(week).endOf('isoWeek').format('MMMM DD, YYYY');

            setStartOfWeek(startOfWeek)
            setEndOfWeek(endOfWeek)
        }

        fetchAttendances().then((attendances) => {
            const [year, week] = attendances[0].yearWeek.split('-').map(yw => Number(yw))

            setAttendances(attendances);
            getWeekDates(year, week);
        });
    }, [currentPage]);

    return [attendances, startOfWeek, endOfWeek, currentPage, setCurrentPage, totalPage] as const;
}