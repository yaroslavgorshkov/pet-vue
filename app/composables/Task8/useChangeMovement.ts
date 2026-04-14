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

    type FormValues = {
        month: string;
        incoming: number | '';
        outgoing: number | '';
    };

    watch(
        [month, incoming, outgoing],
        ([monthNew, incomingNew, outgoingNew]) => {
            const changeMovementFormValues = {
                month: monthNew,
                incoming: incomingNew,
                outgoing: outgoingNew,
            };

            localStorage.setItem(
                'changeMovementFormValues',
                JSON.stringify(changeMovementFormValues)
            );
        }
    );

    onMounted(() => {
        const changeMovementFormValues = localStorage.getItem(
            'changeMovementFormValues'
        );
        if (changeMovementFormValues === null) {
            if (props.movement !== undefined) {
                month.value = props.movement.month;
                incoming.value = props.movement.incoming;
                outgoing.value = props.movement.outgoing;
                return;
            }
            month.value = '';
            incoming.value = '';
            outgoing.value = '';
            return;
        }
        try {
            const changeMovementFormValuesParsed = JSON.parse(
                changeMovementFormValues
            ) as FormValues;
            if (
                changeMovementFormValuesParsed.incoming === '' &&
                changeMovementFormValuesParsed.month === '' &&
                changeMovementFormValuesParsed.outgoing === ''
            ) {
                if (props.movement !== undefined) {
                    month.value = props.movement.month;
                    incoming.value = props.movement.incoming;
                    outgoing.value = props.movement.outgoing;
                    return;
                }
            }
            month.value = changeMovementFormValuesParsed.month;
            incoming.value = changeMovementFormValuesParsed.incoming;
            outgoing.value = changeMovementFormValuesParsed.outgoing;
        } catch {
            month.value = '';
            incoming.value = '';
            outgoing.value = '';
        }
    });

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

    const formResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    type FormMetadata = {
        formValidationMessages: FormValidationMessages;
        isFormTouched: IsFormTouched;
        formResponse: ActionResponse;
    };

    watch(
        [formValidationMessages, isFormTouched, formResponse],
        ([formValidationMessagesNew, isFormTouchedNew, formResponseNew]) => {
            const changeMovementFormMetadata: FormMetadata = {
                formResponse: formResponseNew,
                formValidationMessages: formValidationMessagesNew,
                isFormTouched: isFormTouchedNew,
            };

            localStorage.setItem(
                'changeMovementFormMetadata',
                JSON.stringify(changeMovementFormMetadata)
            );
        }
    );

    onMounted(() => {
        const changeMovementFormMetadata = localStorage.getItem(
            'changeMovementFormMetadata'
        );
        if (changeMovementFormMetadata === null) {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };

            formValidationMessages.value = {
                incoming: '',
                month: '',
                outgoing: '',
            };

            isFormTouched.value = {
                incoming: false,
                month: false,
                outgoing: false,
            };
            return;
        }
        try {
            const changeMovementFormMetadataParsed = JSON.parse(
                changeMovementFormMetadata
            ) as FormMetadata;
            formResponse.value = changeMovementFormMetadataParsed.formResponse;
            formValidationMessages.value =
                changeMovementFormMetadataParsed.formValidationMessages;
            isFormTouched.value =
                changeMovementFormMetadataParsed.isFormTouched;
        } catch {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };

            formValidationMessages.value = {
                incoming: '',
                month: '',
                outgoing: '',
            };

            isFormTouched.value = {
                incoming: false,
                month: false,
                outgoing: false,
            };
        }
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

        if (!isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month value cannot be empty';
        } else if (isMonthValidFormat(month.value)) {
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
        } else if (isPositiveNumber(incoming.value)) {
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
        } else if (isPositiveNumber(outgoing.value)) {
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

        if (!isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month value cannot be empty';
        } else if (isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month value is invalid. Example: 2026-02';
        }

        if (incoming.value === '') {
            formValidationMessages.value.incoming =
                'Incoming value cannot be empty';
        } else if (isPositiveNumber(incoming.value)) {
            formValidationMessages.value.incoming =
                'Incoming value must be positive';
        }

        if (outgoing.value === '') {
            formValidationMessages.value.outgoing =
                'Outgoing value cannot be empty';
        } else if (isPositiveNumber(outgoing.value)) {
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
