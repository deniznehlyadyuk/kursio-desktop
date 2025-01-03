export default interface CourseSessionAttendance {
  id: number;
  studentFullName: string;
  paymentAmount: number;
  hasAttended?: number;
}
