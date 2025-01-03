import { notifications } from '@mantine/notifications';
import { DeletePaymentHistoriesService } from '../../services';
import {DeletePaymentHistoriesProps} from "../../types";

export default (props: DeletePaymentHistoriesProps) => {
    const onConfirmed = async () => {
        await DeletePaymentHistoriesService(props.ids);

        notifications.show({
            title: 'İşlem Başarılı',
            message: 'Seçilen ödemeler silindi.',
        });

        props.onSucceed();
    };

    return [onConfirmed] as const;
};
