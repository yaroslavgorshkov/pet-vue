import type { MonthlyReport, Response } from '~~/shared/task13/types';
import {
    isEmpty,
    isMonthValidFormat,
    isPositiveNumber,
} from '~~/shared/task13/utils';

type Props = {
    report: MonthlyReport | undefined;
};

const useReportPatchForm = (props: Props, refresh: () => void) => {
    const month = ref('');
    const plannedTasks = ref<number | ''>('');
    const completedTasks = ref<number | ''>('');

    type FormValues = {
        month: string;
        plannedTasks: number | '';
        completedTasks: number | '';
    };
    watch(
        [month, plannedTasks, completedTasks],
        ([monthNew, plannedTasksNew, completedTasksNew]) => {
            const newFormValues: FormValues = {
                completedTasks: completedTasksNew,
                month: monthNew,
                plannedTasks: plannedTasksNew,
            };

            localStorage.setItem(
                'reportAddFormData',
                JSON.stringify(newFormValues)
            );
        }
    );

    onMounted(() => {
        const formValues = localStorage.getItem('reportAddFormData');
        if (formValues == null) {
            month.value = '';
            plannedTasks.value = '';
            completedTasks.value = '';
            return;
        }
        try {
            const formValuesParsed = JSON.parse(formValues) as FormValues;
            month.value = formValuesParsed.month;
            plannedTasks.value = formValuesParsed.plannedTasks;
            completedTasks.value = formValuesParsed.completedTasks;
        } catch {
            month.value = '';
            plannedTasks.value = '';
            completedTasks.value = '';
        }
    });

    type FormValidationMessages = {
        month: string;
        plannedTasks: string;
        completedTasks: string;
    };
    const formValidationMessages = ref<FormValidationMessages>({
        completedTasks: '',
        month: '',
        plannedTasks: '',
    });

    type IsFormTouched = {
        month: boolean;
        plannedTasks: boolean;
        completedTasks: boolean;
    };
    const isFormTouched = ref<IsFormTouched>({
        completedTasks: false,
        month: false,
        plannedTasks: false,
    });

    const formResponse = ref<Response>({
        isSucceed: false,
        message: '',
    });

    const isFormValid = computed(() => {
        const isMonthValidationMessageEmpty =
            formValidationMessages.value.month === '';
        const isCompletedTasksValidationMessageEmpty =
            formValidationMessages.value.completedTasks === '';
        const isPlannedTasksValidationMessageEmpty =
            formValidationMessages.value.plannedTasks === '';

        return (
            isMonthValidationMessageEmpty &&
            isCompletedTasksValidationMessageEmpty &&
            isPlannedTasksValidationMessageEmpty &&
            isFormTouched.value.month &&
            isFormTouched.value.completedTasks &&
            isFormTouched.value.plannedTasks
        );
    });

    watch(
        () => props.report,
        (reportNew) => {
            if (reportNew === undefined) return;
            month.value = reportNew.month;
            plannedTasks.value = reportNew.plannedTasks;
            completedTasks.value = reportNew.completedTasks;
            isFormTouched.value = {
                completedTasks: true,
                month: true,
                plannedTasks: true,
            };
        }
    );

    const validateMonth = () => {
        formValidationMessages.value.month = '';

        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Invalid month format. Example: 2026-04';
        }

        if (!isFormTouched.value.month) {
            isFormTouched.value.month = true;
        }
    };

    const validatePlannedTasks = () => {
        formValidationMessages.value.plannedTasks = '';

        if (plannedTasks.value === '') {
            formValidationMessages.value.plannedTasks =
                'Planned tasks value cannot be empty';
        } else if (!isPositiveNumber(plannedTasks.value)) {
            formValidationMessages.value.plannedTasks =
                'Planned tasks value must be positive number';
        }

        if (!isFormTouched.value.plannedTasks) {
            isFormTouched.value.plannedTasks = true;
        }
    };

    const validateCompletedTasks = () => {
        formValidationMessages.value.completedTasks = '';

        if (completedTasks.value === '') {
            formValidationMessages.value.completedTasks =
                'Completed tasks value cannot be empty';
        } else if (!isPositiveNumber(completedTasks.value)) {
            formValidationMessages.value.completedTasks =
                'Completed tasks value must be positive number';
        }

        if (!isFormTouched.value.completedTasks) {
            isFormTouched.value.completedTasks = true;
        }
    };

    const refreshForm = () => {
        month.value = '';
        completedTasks.value = '';
        plannedTasks.value = '';

        formValidationMessages.value = {
            completedTasks: '',
            month: '',
            plannedTasks: '',
        };

        isFormTouched.value = {
            completedTasks: false,
            month: false,
            plannedTasks: false,
        };

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
        if (isEmpty(month.value)) {
            formValidationMessages.value.month = 'Month cannot be empty';
        } else if (!isMonthValidFormat(month.value)) {
            formValidationMessages.value.month =
                'Invalid month format. Example: 2026-04';
        }

        formValidationMessages.value.plannedTasks = '';
        if (plannedTasks.value === '') {
            formValidationMessages.value.plannedTasks =
                'Planned tasks value cannot be empty';
        } else if (!isPositiveNumber(plannedTasks.value)) {
            formValidationMessages.value.plannedTasks =
                'Planned tasks value must be positive number';
        }

        formValidationMessages.value.completedTasks = '';
        if (completedTasks.value === '') {
            formValidationMessages.value.completedTasks =
                'Completed tasks value cannot be empty';
        } else if (!isPositiveNumber(completedTasks.value)) {
            formValidationMessages.value.completedTasks =
                'Completed tasks value must be positive number';
        }

        const isMonthValidationMessageEmpty =
            formValidationMessages.value.month === '';
        const isCompletedTasksValidationMessageEmpty =
            formValidationMessages.value.completedTasks === '';
        const isPlannedTasksValidationMessageEmpty =
            formValidationMessages.value.plannedTasks === '';

        return (
            isMonthValidationMessageEmpty &&
            isCompletedTasksValidationMessageEmpty &&
            isPlannedTasksValidationMessageEmpty
        );
    };

    const route = useRoute();
    const reportId = computed(() => route.params.reportId || '');

    const patchReport = async () => {
        if (!revalidateForm()) return;
        try {
            const patchedReport = await $fetch<MonthlyReport>(
                `/api/reports/${reportId.value}`,
                {
                    method: 'PATCH',
                    body: {
                        month: month.value,
                        completedTasks: completedTasks.value,
                        plannedTasks: plannedTasks.value,
                    },
                }
            );

            formResponse.value = {
                isSucceed: true,
                message: `Successfully patched report with ID ${patchedReport.id}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage || 'Server error during patching report',
            };
        }
    };

    return {
        month,
        completedTasks,
        plannedTasks,
        validateMonth,
        validateCompletedTasks,
        validatePlannedTasks,
        isFormValid,
        formValidationMessages,
        formResponse,
        patchReport,
    };
};

export default useReportPatchForm;
