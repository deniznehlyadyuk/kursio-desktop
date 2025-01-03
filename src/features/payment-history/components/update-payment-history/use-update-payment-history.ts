import {UpdatePaymentHistoryDto, UpdatePaymentHistoryProps} from "../../types";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {notifications} from "@mantine/notifications";
import {GetPaymentHistoryService, UpdatePaymentHistoryService} from "../../services";

export default (props: UpdatePaymentHistoryProps) => {
    const schema = z.object({
        paymentAmount: z.number().min(0, 'Ücret bilgisi sıfırdan küçük olamaz.'),
    });

    const { control, handleSubmit, setValue } = useForm<UpdatePaymentHistoryDto>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {},
        resolver: zodResolver(schema),
    });

    const fetchAndFill = async () => {
        const paymentHistory = await GetPaymentHistoryService(props.id);
        setValue('paymentAmount', paymentHistory.paymentAmount);
    };

    useEffect(() => {
        fetchAndFill().then(() => {
            props.onInputsReady();
        });
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        await UpdatePaymentHistoryService(props.id, data);

        notifications.show({
            title: 'İşlem Başarılı',
            message: 'Ödeme tutarı güncellendi.',
        });

        props.onSucceed();
    });

    return [onSubmit, control] as const;
}