import { Button, Group, Modal, Stack } from '@mantine/core';
import useDeletePaymentHistories from "./use-delete-payment-histories";
import {DeletePaymentHistoriesProps} from "../../types";

export default (props: DeletePaymentHistoriesProps) => {
    const [onConfirmed] = useDeletePaymentHistories(props);

    return (
        <Modal
            opened={props.opened}
            title={<b>Dikkat</b>}
            onClose={props.onClose}
        >
            <Stack
                align='stretch'
                gap='lg'
            >
                <div>
                    Seçilen ödemeleri silmek istediğinize emin misiniz? Bu işlem geri
                    alınamaz.
                </div>
                <Group
                    gap='xs'
                    style={{ alignSelf: 'flex-end' }}
                >
                    <Button
                        variant='outline'
                        color='gray'
                        onClick={props.onClose}
                    >
                        Hayır
                    </Button>
                    <Button
                        color='red'
                        onClick={onConfirmed}
                    >
                        Evet
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
