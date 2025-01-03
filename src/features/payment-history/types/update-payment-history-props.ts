export default interface UpdatePaymentHistoryProps {
    id: string;
    opened: boolean;
    onClose: () => void;
    onSucceed: () => void;
    onInputsReady: () => void;
}