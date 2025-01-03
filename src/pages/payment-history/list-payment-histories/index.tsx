import { ListPaymentHistories } from '../../../features/payment-history';
import {Outlet} from "react-router-dom";
import useListPaymentHistories from "./use-list-payment-histories";

export default () => {
  const [onDeleteButtonClick, onUpdateButtonClick] = useListPaymentHistories();

  return (
      <>
        <ListPaymentHistories onDeleteButtonClick={onDeleteButtonClick} onUpdateButtonClick={onUpdateButtonClick} />

        <Outlet />
      </>
  )
};
