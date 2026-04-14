import type { ActionResponse, MonthlyMovement } from '~~/shared/task8/types';
import {
    isEmpty,
    isMonthValidFormat,
    isPositiveNumber,
} from '#shared/task8/utils';

type Props = {
    movement: MonthlyMovement | undefined;
};

const useChangeMovement = (props: Props, refresh: () => void) => {
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
        month: '',
        outgoing: '',
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

    watch(
        () => props.movement,
        (newMovement) => {
            if (newMovement === undefined) {
                month.value = '';
                incoming.value = '';
                outgoing.value = '';
                return;
            }
            month.value = newMovement.month;
            incoming.value = newMovement.incoming;
            outgoing.value = newMovement.outgoing;
            isFormTouched.value.month = true;
            isFormTouched.value.incoming = true;
            isFormTouched.value.outgoing = true;
        },
        { immediate: true }
    );

    const formResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    const isFormValid = computed(() => {
        const isMonthValidateMessageEmpty =
            formValidationMessages.value.month === '';
        const isIncomingValidateMessageEmpty =
            formValidationMessages.value.incoming === '';
        const isOutgoingValidateMessageEmpty =
            formValidationMessages.value.outgoing === '';

        return (
            isMonthValidateMessageEmpty &&
            isIncomingValidateMessageEmpty &&
            isOutgoingValidateMessageEmpty &&
            isFormTouched.value.incoming &&
            isFormTouched.value.month &&
            isFormTouched.value.outgoing
        );
    });

    const validateMonth = () => {
        formValidationMessages.value.month = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month value cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month value is invalid. Example: 2026-02';
        }

        if (!isFormTouched.value.month) {
            isFormTouched.value.month = true;
        }
    };

    const validateIncoming = () => {
        formValidationMessages.value.incoming = '';

        if (incoming.value === '') {
            formValidationMessages.value.incoming =
                'Incoming value cannot be empty';
        } else if (!isPositiveNumber(incoming.value)) {
            formValidationMessages.value.incoming =
                'Incoming value must be positive';
        }

        if (!isFormTouched.value.incoming) {
            isFormTouched.value.incoming = true;
        }
    };

    const validateOutgoing = () => {
        formValidationMessages.value.outgoing = '';

        if (outgoing.value === '') {
            formValidationMessages.value.outgoing =
                'Outgoing value cannot be empty';
        } else if (!isPositiveNumber(outgoing.value)) {
            formValidationMessages.value.outgoing =
                'Outgoing value must be positive';
        }

        if (!isFormTouched.value.outgoing) {
            isFormTouched.value.outgoing = true;
        }
    };

    const refreshForm = () => {
        month.value = '';
        incoming.value = '';
        outgoing.value = '';

        formValidationMessages.value.month = '';
        formValidationMessages.value.incoming = '';
        formValidationMessages.value.outgoing = '';

        isFormTouched.value.incoming = false;
        isFormTouched.value.outgoing = false;
        isFormTouched.value.month = false;

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);

        refresh();
    };

    const revalidateForm = () => {
        formValidationMessages.value.month = '';
        formValidationMessages.value.incoming = '';
        formValidationMessages.value.outgoing = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month value cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month value is invalid. Example: 2026-02';
        }

        if (incoming.value === '') {
            formValidationMessages.value.incoming =
                'Incoming value cannot be empty';
        } else if (!isPositiveNumber(incoming.value)) {
            formValidationMessages.value.incoming =
                'Incoming value must be positive';
        }

        if (outgoing.value === '') {
            formValidationMessages.value.outgoing =
                'Outgoing value cannot be empty';
        } else if (!isPositiveNumber(outgoing.value)) {
            formValidationMessages.value.outgoing =
                'Outgoing value must be positive';
        }

        const isMonthValidateMessageEmpty =
            formValidationMessages.value.month === '';
        const isIncomingValidateMessageEmpty =
            formValidationMessages.value.incoming === '';
        const isOutgoingValidateMessageEmpty =
            formValidationMessages.value.outgoing === '';

        return (
            isMonthValidateMessageEmpty &&
            isIncomingValidateMessageEmpty &&
            isOutgoingValidateMessageEmpty
        );
    };
    const route = useRoute();
    const movementId = route.params.movementId;

    const changeMovement = async () => {
        if (!revalidateForm() || props.movement === undefined) return;

        try {
            const patchedMovement = await $fetch<MonthlyMovement>(
                `/api/movements/${movementId}`,
                {
                    method: 'PATCH',
                    body: {
                        month: month.value,
                        incoming: incoming.value,
                        outgoing: outgoing.value,
                    },
                }
            );

            formResponse.value = {
                isSucceed: true,
                message: `Successfully patched movement with ID ${patchedMovement.id}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during patching movement',
            };
        }
    };

    return {
        incoming,
        outgoing,
        month,
        formResponse,
        formValidationMessages,
        validateMonth,
        validateIncoming,
        validateOutgoing,
        changeMovement,
        isFormValid,
    };
};

export default useChangeMovement;
