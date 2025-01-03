import {Student} from "../../../types";

export interface RowActionsProps {
  student: Student;
  onUpdateButtonClick: () => void;
  onLogPaymentButtonClick: () => void;
  onShowAttendancesButtonClick: () => void;
}
