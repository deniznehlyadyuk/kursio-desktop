import {UpdatePaymentHistory} from "../../../features/payment-history";
import useUpdatePaymentHistory from "./use-update-payment-history";

export default () => {
    const [id, opened, openModal, navigateToPaymentHistoriesWithRefetch, navigateToPaymentHistoriesWithoutRefetch] = useUpdatePaymentHistory();
    return <UpdatePaymentHistory id={id} opened={opened} onInputsReady={openModal} onSucceed={navigateToPaymentHistoriesWithRefetch} onClose={navigateToPaymentHistoriesWithoutRefetch}   />
}