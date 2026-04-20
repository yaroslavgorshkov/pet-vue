const useReportAddForm = (refresh: () => void) => {
    const month = ref('');
    const plannedTasks = ref<number | ''>('');
    const completedTasks = ref<number | ''>('');

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
};

export default useReportAddForm;
