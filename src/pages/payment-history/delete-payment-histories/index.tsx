import { DeletePaymentHistories } from '../../../features/payment-history';
import useDeletePaymentHistories from "./use-delete-payment-histories";

export default () => {
  const [ids, opened, onClose, onSucceed] = useDeletePaymentHistories();

  return <DeletePaymentHistories ids={ids} opened={opened} onSucceed={onSucceed} onClose={onClose} />;
};
