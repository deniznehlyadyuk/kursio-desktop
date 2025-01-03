export interface PlannedCourseStudentsProps {
  onNewButtonClick: () => void;
  onDeleteButtonClick: (ids: string[]) => void;
  onUpdateButtonClick: (plannedCourseStudentId: number) => void;
}
