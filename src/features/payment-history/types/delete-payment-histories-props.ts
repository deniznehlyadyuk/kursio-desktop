export default interface DeletePaymentHistoriesProps {
    ids: string[];
    opened: boolean;
    onClose: () => void;
    onSucceed: () => void;
}