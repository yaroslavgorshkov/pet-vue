import type { ActionResponse } from '~~/shared/task8/types';
import type { MonthlyWorkLog } from '~~/shared/task9/types';
import {
    isEmpty,
    isMonthValidFormat,
    isNumberPositive,
} from '~~/shared/task9/utils';

const useAddWorklogForm = (refresh: () => void) => {
    const month = ref('');
    const plannedHours = ref<number | ''>('');
    const actualHours = ref<number | ''>('');

    type FormValidationMessages = {
        month: string;
        plannedHours: string;
        actualHours: string;
    };
    const formValidationMessages = ref<FormValidationMessages>({
        actualHours: '',
        month: '',
        plannedHours: '',
    });

    type IsFormTouched = {
        month: boolean;
        plannedHours: boolean;
        actualHours: boolean;
    };
    const isFormTouched = ref<IsFormTouched>({
        actualHours: false,
        month: false,
        plannedHours: false,
    });

    const formResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    const isFormValid = computed(() => {
        const isMonthValidationMessageEmpty =
            formValidationMessages.value.month === '';
        const isPlannedHoursValidationMessageEmpty =
            formValidationMessages.value.plannedHours === '';
        const isActualHoursValidationMessageEmpty =
            formValidationMessages.value.actualHours === '';

        return (
            isMonthValidationMessageEmpty &&
            isPlannedHoursValidationMessageEmpty &&
            isActualHoursValidationMessageEmpty &&
            isFormTouched.value.actualHours &&
            isFormTouched.value.month &&
            isFormTouched.value.plannedHours
        );
    });

    const refreshForm = () => {
        month.value = '';
        plannedHours.value = '';
        actualHours.value = '';

        formValidationMessages.value.actualHours = '';
        formValidationMessages.value.month = '';
        formValidationMessages.value.plannedHours = '';

        isFormTouched.value.actualHours = false;
        isFormTouched.value.month = false;
        isFormTouched.value.plannedHours = false;

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);

        refresh();
    };

    const validateMonth = () => {
        formValidationMessages.value.month = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month value cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month is invalid format. Example: 2026-04';
        }

        if (!isFormTouched.value.month) {
            isFormTouched.value.month = true;
        }
    };

    const validatePlannedHours = () => {
        formValidationMessages.value.plannedHours = '';

        if (plannedHours.value === '') {
            formValidationMessages.value.plannedHours =
                'Planned hours cannot be empty';
        } else if (!isNumberPositive(plannedHours.value)) {
            formValidationMessages.value.plannedHours =
                'Planned hours value must be positive number';
        }

        if (!isFormTouched.value.plannedHours) {
            isFormTouched.value.plannedHours = true;
        }
    };

    const validateActualHours = () => {
        formValidationMessages.value.actualHours = '';

        if (actualHours.value === '') {
            formValidationMessages.value.actualHours =
                'Actual hours cannot be empty';
        } else if (!isNumberPositive(actualHours.value)) {
            formValidationMessages.value.actualHours =
                'Actual hours value must be positive number';
        }

        if (!isFormTouched.value.actualHours) {
            isFormTouched.value.actualHours = true;
        }
    };

    const revalidateForm = () => {
        formValidationMessages.value.actualHours = '';
        formValidationMessages.value.month = '';
        formValidationMessages.value.plannedHours = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month value cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Month is invalid format. Example: 2026-04';
        }

        if (plannedHours.value === '') {
            formValidationMessages.value.plannedHours =
                'Planned hours cannot be empty';
        } else if (!isNumberPositive(plannedHours.value)) {
            formValidationMessages.value.plannedHours =
                'Planned hours value must be positive number';
        }

        if (actualHours.value === '') {
            formValidationMessages.value.actualHours =
                'Actual hours cannot be empty';
        } else if (!isNumberPositive(actualHours.value)) {
            formValidationMessages.value.actualHours =
                'Actual hours value must be positive number';
        }

        const isMonthValidationMessageEmpty =
            formValidationMessages.value.month === '';
        const isPlannedHoursValidationMessageEmpty =
            formValidationMessages.value.plannedHours === '';
        const isActualHoursValidationMessageEmpty =
            formValidationMessages.value.actualHours === '';

        return (
            isMonthValidationMessageEmpty &&
            isPlannedHoursValidationMessageEmpty &&
            isActualHoursValidationMessageEmpty
        );
    };

    const route = useRoute();
    const employeeId = route.params?.employeeId;

    const addWorklog = async () => {
        if (employeeId === undefined || !revalidateForm()) return;

        try {
            const addedWorklog = await $fetch<MonthlyWorkLog>('/api/worklogs', {
                method: 'POST',
                body: {
                    employeeId: Number(employeeId),
                    month: month.value,
                    plannedHours: plannedHours.value,
                    actualHours: actualHours.value,
                },
            });

            formResponse.value = {
                isSucceed: true,
                message: `Successfully added worklog with id ${addedWorklog.id} of employee ${addedWorklog.employeeId}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during adding new worklog',
            };
        }
    };

    return {
        month,
        plannedHours,
        actualHours,
        validateMonth,
        validatePlannedHours,
        validateActualHours,
        formResponse,
        isFormValid,
        addWorklog,
        formValidationMessages,
    };
};

export default useAddWorklogForm;
