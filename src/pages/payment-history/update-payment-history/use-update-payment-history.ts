import {useNavigate, useParams} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {nanoid} from "nanoid";

export default () => {
    const navigate = useNavigate();
    const {paymentHistoryId} = useParams();

    const [opened, {open, close}] = useDisclosure();

    const openModal = () => {
        open();
    }

    const navigateToPaymentHistoriesWithRefetch = () => {
        close();

        setTimeout(() => {
            navigate('/payment-history', {state: {reFetch: nanoid()}})
        }, 200)
    }

    const navigateToPaymentHistoriesWithoutRefetch = () => {
        close();

        setTimeout(() => {
            navigate('/payment-history')
        }, 200)
    }

    return [paymentHistoryId!, opened, openModal, navigateToPaymentHistoriesWithRefetch, navigateToPaymentHistoriesWithoutRefetch] as const;
}