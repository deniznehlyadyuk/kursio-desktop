import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error-page';
import { DefaultLayout } from './layouts';
import {
  CourseSessionAttendances,
  CreateCourse,
  CreateCourseSession,
  CreatePlannedCourse,
  CreatePlannedCourseStudents,
  CreateStudent,
  DeleteCourses,
  DeleteCourseSession,
  DeletePaymentHistories,
  DeletePlannedCourse,
  DeletePlannedCourseStudents,
  DeleteStudent,
  ListCourses,
  ListCourseSessions,
  ListPaymentHistories,
  ListPlannedCourses,
  ListPlannedCourseStudents,
  ListStudents, StudentAttendances,
  StudentLogPayment,
  UpdateCourse, UpdatePaymentHistory,
  UpdatePaymentPlannedCourseStudent,
  UpdatePlannedCourse,
  UpdateStudent
} from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to='students' />,
      },
      {
        path: 'students',
        element: <ListStudents />,
        children: [
          {
            path: 'create',
            element: <CreateStudent />,
          },
          {
            path: ':studentId/update',
            element: <UpdateStudent />,
          },
          {
            path: 'delete',
            element: <DeleteStudent />,
          },
          {
            path: ':studentId/logPayment',
            element: <StudentLogPayment />,
          },
        ],
      },
      {
        path: 'students/:studentId/attendances',
        element: <StudentAttendances />
      },
      {
        path: 'courses',
        element: <ListCourses />,
        children: [
          {
            path: 'create',
            element: <CreateCourse />,
          },
          {
            path: ':courseId/update',
            element: <UpdateCourse />,
          },
          {
            path: 'delete',
            element: <DeleteCourses />,
          },
        ],
      },
      {
        path: 'planned-courses',
        element: <ListPlannedCourses />,
        children: [
          {
            path: 'create',
            element: <CreatePlannedCourse />,
          },
          {
            path: ':plannedCourseId/update',
            element: <UpdatePlannedCourse />,
          },
          {
            path: ':plannedCourseId/delete',
            element: <DeletePlannedCourse />,
          },
        ],
      },
      {
        path: 'planned-courses/:plannedCourseId/students',
        element: <ListPlannedCourseStudents />,
        children: [
          {
            path: 'create',
            element: <CreatePlannedCourseStudents />,
          },
          {
            path: ':plannedCourseStudentId/update-payment-amount',
            element: <UpdatePaymentPlannedCourseStudent />,
          },
          {
            path: 'delete',
            element: <DeletePlannedCourseStudents />,
          },
        ],
      },
      {
        path: 'course-sessions',
        element: <ListCourseSessions />,
        children: [
          {
            path: 'create',
            element: <CreateCourseSession />,
          },
          {
            path: 'delete',
            element: <DeleteCourseSession />,
          },
        ],
      },
      {
        path: 'course-sessions/:courseSessionId/attendances',
        element: <CourseSessionAttendances />,
      },
      {
        path: 'payment-history',
        element: <ListPaymentHistories />,
        children: [
          {
            path: 'delete',
            element: <DeletePaymentHistories />
          },
          {
            path: ':paymentHistoryId/update',
            element: <UpdatePaymentHistory />
          }
        ]
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Notifications position='top-right' />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
