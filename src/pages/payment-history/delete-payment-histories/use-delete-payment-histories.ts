import {useDisclosure} from "@mantine/hooks";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";

export default () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        open();
    }, []);

    const onClose = () => {
        close();

        setTimeout(() => {
            navigate('/payment-history')
        }, 200)
    }

    const onSucceed = () => {
        close();

        setTimeout(() => {
            navigate('/payment-history', {state: { reFetch: nanoid() } });
        }, 200)
    }

    return [state.paymentHistoryIds, opened, onClose, onSucceed] as const;
}