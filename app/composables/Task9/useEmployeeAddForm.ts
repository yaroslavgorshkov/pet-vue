import type { ActionResponse } from '~~/shared/task8/types';
import { isEmpty, isValidEmailFormat } from '#shared/task9/utils';
import type { Employee } from '~~/shared/task9/types';

const useEmployeeAddForm = (refresh: () => void) => {
    const fullName = ref('');
    const department = ref('');
    const email = ref('');
    const position = ref('');

    type FormValidationMessages = {
        fullName: string;
        department: string;
        email: string;
        position: string;
    };
    const formValidationMessages = ref<FormValidationMessages>({
        department: '',
        email: '',
        fullName: '',
        position: '',
    });

    type IsFormTouched = {
        fullName: boolean;
        department: boolean;
        email: boolean;
        position: boolean;
    };
    const isFormTouched = ref<IsFormTouched>({
        department: false,
        email: false,
        fullName: false,
        position: false,
    });

    const formResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    const fullNameValidation = () => {
        formValidationMessages.value.fullName = '';

        if (isEmpty(fullName.value)) {
            formValidationMessages.value.fullName = 'Full name cannot be empty';
        }

        if (!isFormTouched.value.fullName) {
            isFormTouched.value.fullName = true;
        }
    };
    const departmentValidation = () => {
        formValidationMessages.value.department = '';

        if (isEmpty(department.value)) {
            formValidationMessages.value.department =
                'Department name cannot be empty';
        }

        if (!isFormTouched.value.department) {
            isFormTouched.value.department = true;
        }
    };
    const positionValidation = () => {
        formValidationMessages.value.position = '';

        if (isEmpty(position.value)) {
            formValidationMessages.value.position =
                'Position name cannot be empty';
        }

        if (!isFormTouched.value.position) {
            isFormTouched.value.position = true;
        }
    };
    const emailValidation = () => {
        formValidationMessages.value.email = '';

        if (isEmpty(email.value)) {
            formValidationMessages.value.email = 'Email name cannot be empty';
        } else if (!isValidEmailFormat(email.value)) {
            formValidationMessages.value.email = 'Email must be valid format';
        }

        if (!isFormTouched.value.email) {
            isFormTouched.value.email = true;
        }
    };

    const isFormValid = computed(() => {
        const isFullNameValidationMessageEmpty =
            formValidationMessages.value.fullName === '';
        const isDepartmentValidationMessageEmpty =
            formValidationMessages.value.department === '';
        const isEmailValidationMessageEmpty =
            formValidationMessages.value.email === '';
        const isPositionValidationMessageEmpty =
            formValidationMessages.value.position === '';

        return (
            isFullNameValidationMessageEmpty &&
            isDepartmentValidationMessageEmpty &&
            isEmailValidationMessageEmpty &&
            isPositionValidationMessageEmpty &&
            isFormTouched.value.department &&
            isFormTouched.value.email &&
            isFormTouched.value.fullName &&
            isFormTouched.value.position
        );
    });

    const revalidateForm = () => {
        formValidationMessages.value.department = '';
        formValidationMessages.value.email = '';
        formValidationMessages.value.fullName = '';
        formValidationMessages.value.position = '';
        if (isEmpty(fullName.value)) {
            formValidationMessages.value.fullName = 'Full name cannot be empty';
        }
        if (isEmpty(department.value)) {
            formValidationMessages.value.department =
                'Department name cannot be empty';
        }
        if (isEmpty(position.value)) {
            formValidationMessages.value.position =
                'Position name cannot be empty';
        }
        if (isEmpty(email.value)) {
            formValidationMessages.value.email = 'Email name cannot be empty';
        } else if (!isValidEmailFormat(email.value)) {
            formValidationMessages.value.email = 'Email must be valid format';
        }

        const isFullNameValidationMessageEmpty =
            formValidationMessages.value.fullName === '';
        const isDepartmentValidationMessageEmpty =
            formValidationMessages.value.department === '';
        const isEmailValidationMessageEmpty =
            formValidationMessages.value.email === '';
        const isPositionValidationMessageEmpty =
            formValidationMessages.value.position === '';

        return (
            isFullNameValidationMessageEmpty &&
            isDepartmentValidationMessageEmpty &&
            isEmailValidationMessageEmpty &&
            isPositionValidationMessageEmpty
        );
    };

    const refreshForm = () => {
        fullName.value = '';
        department.value = '';
        position.value = '';
        email.value = '';

        isFormTouched.value = {
            department: false,
            email: false,
            fullName: false,
            position: false,
        };

        formValidationMessages.value = {
            department: '',
            email: '',
            fullName: '',
            position: '',
        };

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);

        refresh();
    };

    const addEmployee = async () => {
        if (!revalidateForm()) return;

        try {
            const addedEmployee = await $fetch<Employee>('/api/employees', {
                method: 'POST',
                body: {
                    fullName: fullName.value,
                    position: position.value,
                    department: department.value,
                    email: email.value,
                },
            });

            formResponse.value = {
                isSucceed: true,
                message: `Successfully added employee with ID ${addedEmployee.id}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage || 'Server error during adding employee',
            };
        }
    };

    return {
        fullName,
        department,
        email,
        position,
        fullNameValidation,
        departmentValidation,
        emailValidation,
        positionValidation,
        addEmployee,
        formValidationMessages,
        isFormValid,
        formResponse,
    };
};

export default useEmployeeAddForm;
