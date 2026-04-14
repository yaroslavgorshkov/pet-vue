import {
    isMonthValidFormat,
    isEmpty,
    isPositiveNumber,
} from '#shared/task8/utils';
import type { ActionResponse, MonthlyMovement } from '~~/shared/task8/types';

const useAddMovement = (onRefresh: () => void) => {
    const month = ref('');
    const incoming = ref<number | ''>('');
    const outgoing = ref<number | ''>('');

    type FormValidationMessages = {
        month: string;
        incoming: string;
        outgoing: string;
    };

    const formValidationMessages = ref<FormValidationMessages>({
        incoming: '',
        outgoing: '',
        month: '',
    });

    type IsFormTouched = {
        month: boolean;
        incoming: boolean;
        outgoing: boolean;
    };

    const isFormTouched = ref<IsFormTouched>({
        incoming: false,
        month: false,
        outgoing: false,
    });

    const isFormValid = computed(() => {
        const isMonthValidationMessafeEmpty =
            formValidationMessages.value.month === '';
        const isIncomingValidationMessafeEmpty =
            formValidationMessages.value.incoming === '';
        const isOutgoingValidationMessafeEmpty =
            formValidationMessages.value.outgoing === '';

        return (
            isMonthValidationMessafeEmpty &&
            isIncomingValidationMessafeEmpty &&
            isOutgoingValidationMessafeEmpty &&
            isFormTouched.value.incoming &&
            isFormTouched.value.outgoing &&
            isFormTouched.value.month
        );
    });

    const validateMonth = () => {
        formValidationMessages.value.month = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month is invalid format. Exapmle: 2026-02';
        }

        if (!isFormTouched.value.month) {
            isFormTouched.value.month = true;
        }
    };

    const validateIncoming = () => {
        formValidationMessages.value.incoming = '';

        if (incoming.value === '') {
            formValidationMessages.value.incoming = 'Incoming cannot be empty';
        } else if (!isPositiveNumber(incoming.value)) {
            formValidationMessages.value.incoming =
                'Incoming number must be positive';
        }

        if (!isFormTouched.value.incoming) {
            isFormTouched.value.incoming = true;
        }
    };

    const validateOutgoing = () => {
        formValidationMessages.value.outgoing = '';

        if (outgoing.value === '') {
            formValidationMessages.value.outgoing = 'Outgoing cannot be empty';
        } else if (!isPositiveNumber(outgoing.value)) {
            formValidationMessages.value.outgoing =
                'Outgoing number must be positive';
        }

        if (!isFormTouched.value.outgoing) {
            isFormTouched.value.outgoing = true;
        }
    };

    const revalidateForm = () => {
        formValidationMessages.value.outgoing = '';
        formValidationMessages.value.incoming = '';
        formValidationMessages.value.month = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month is invalid format. Exapmle: 2026-02';
        }

        if (incoming.value === '') {
            formValidationMessages.value.incoming = 'Incoming cannot be empty';
        } else if (!isPositiveNumber(incoming.value)) {
            formValidationMessages.value.incoming =
                'Incoming number must be positive';
        }

        if (outgoing.value === '') {
            formValidationMessages.value.outgoing = 'Outgoing cannot be empty';
        } else if (!isPositiveNumber(outgoing.value)) {
            formValidationMessages.value.outgoing =
                'Outgoing number must be positive';
        }

        const isMonthValidationMessafeEmpty =
            formValidationMessages.value.month === '';
        const isIncomingValidationMessafeEmpty =
            formValidationMessages.value.incoming === '';
        const isOutgoingValidationMessafeEmpty =
            formValidationMessages.value.outgoing === '';

        return (
            isMonthValidationMessafeEmpty &&
            isIncomingValidationMessafeEmpty &&
            isOutgoingValidationMessafeEmpty
        );
    };

    const formResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    const refreshForm = () => {
        month.value = '';
        incoming.value = '';
        outgoing.value = '';

        formValidationMessages.value.outgoing = '';
        formValidationMessages.value.incoming = '';
        formValidationMessages.value.month = '';

        isFormTouched.value.incoming = false;
        isFormTouched.value.outgoing = false;
        isFormTouched.value.month = false;

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        });

        onRefresh();
    };

    const route = useRoute();
    const warehouseId = route.params.warehouseId;

    const addMovement = async () => {
        if (!revalidateForm() || warehouseId === undefined) return;

        try {
            const addedMovement = await $fetch<MonthlyMovement>(
                '/api/movements',
                {
                    method: 'POST',
                    body: {
                        warehouseId: Number(warehouseId),
                        month: month.value,
                        incoming: incoming.value,
                        outgoing: outgoing.value,
                    },
                }
            );

            formResponse.value = {
                isSucceed: true,
                message: `Successfully added new movement with ID ${addedMovement.id} to warehouse with ID ${warehouseId}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during adding new movement',
            };
        }
    };

    return {
        month,
        incoming,
        outgoing,
        addMovement,
        isFormValid,
        formResponse,
        formValidationMessages,
        validateMonth,
        validateIncoming,
        validateOutgoing,
    };
};

export default useAddMovement;
