import {useNavigate} from "react-router-dom";

export default () => {
    const navigate = useNavigate();

    const onDeleteButtonClick = (ids: string[]) => {
        navigate(`/payment-history/delete`, { state: { paymentHistoryIds: ids } });
    };

    const onUpdateButtonClick = (id: string) => {
        navigate(`/payment-history/${id}/update`);
    };

    return [onDeleteButtonClick, onUpdateButtonClick] as const;
}