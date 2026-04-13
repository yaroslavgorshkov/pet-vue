import { isEmpty, isCodeUnique, isPositiveNumber } from '#shared/task8/utils';
import type { FormResponse, Warehouse } from '~~/shared/task8/types';

export const useAddWarehouse = async (onRefreshWarehouses: () => void) => {
    const title = ref('');
    const code = ref('');
    const manager = ref('');
    const city = ref('');

    watch(
        [title, code, manager, city],
        ([titleNew, codeNew, managerNew, cityNew]) => {
            const addWarehouseFormData = {
                title: titleNew,
                code: codeNew,
                manager: managerNew,
                city: cityNew,
            };
            localStorage.setItem(
                'addWarehouseFormData',
                JSON.stringify(addWarehouseFormData)
            );
        }
    );

    type FormValidationMessages = {
        title: string;
        code: string;
        manager: string;
        city: string;
    };

    const formValidationMessages = ref<FormValidationMessages>({
        city: '',
        code: '',
        manager: '',
        title: '',
    });

    type IsFormTouched = {
        city: boolean;
        code: boolean;
        manager: boolean;
        title: boolean;
    };

    const isFormTouched = ref<IsFormTouched>({
        city: false,
        code: false,
        manager: false,
        title: false,
    });

    const isFormValid = computed(() => {
        const isCityFormValidationMessageEmpty =
            formValidationMessages.value.city === '';
        const isTitleFormValidationMessageEmpty =
            formValidationMessages.value.title === '';
        const isManagerFormValidationMessageEmpty =
            formValidationMessages.value.manager === '';
        const isCodeFormValidationMessageEmpty =
            formValidationMessages.value.code === '';

        return (
            isCityFormValidationMessageEmpty &&
            isTitleFormValidationMessageEmpty &&
            isManagerFormValidationMessageEmpty &&
            isCodeFormValidationMessageEmpty &&
            isFormTouched.value.city &&
            isFormTouched.value.code &&
            isFormTouched.value.manager &&
            isFormTouched.value.title
        );
    });

    watch(
        [formValidationMessages, isFormTouched],
        ([formValidationMessagesNew, isFormTouchedNew]) => {
            const addWarehouseFormMetadata = {
                formValidationMessages: formValidationMessagesNew,
                isFormTouched: isFormTouchedNew,
            };
            localStorage.setItem(
                'addWarehouseFormMetadata',
                JSON.stringify(addWarehouseFormMetadata)
            );
        }
    );

    onMounted(() => {
        const addWarehouseFormData = localStorage.getItem(
            'addWarehouseFormData'
        );
        const addWarehouseFormMetadata = localStorage.getItem(
            'addWarehouseFormMetadata'
        );
        try {
            if (
                addWarehouseFormData === null ||
                addWarehouseFormMetadata === null
            ) {
                throw createError({});
            }
            type AddWarehouseFormData = {
                title: string;
                code: string;
                manager: string;
                city: string;
            };

            type AddWarehouseFormMetadata = {
                formValidationMessages: FormValidationMessages;
                isFormTouched: IsFormTouched;
            };

            const addWarehouseFormDataParsed: AddWarehouseFormData =
                JSON.parse(addWarehouseFormData);
            const addWarehouseFormMetadataParsed: AddWarehouseFormMetadata =
                JSON.parse(addWarehouseFormMetadata);

            title.value = addWarehouseFormDataParsed.title;
            city.value = addWarehouseFormDataParsed.city;
            code.value = addWarehouseFormDataParsed.code;
            manager.value = addWarehouseFormDataParsed.manager;

            formValidationMessages.value = {
                city: addWarehouseFormMetadataParsed.formValidationMessages
                    .city,
                code: addWarehouseFormMetadataParsed.formValidationMessages
                    .code,
                manager:
                    addWarehouseFormMetadataParsed.formValidationMessages
                        .manager,
                title: addWarehouseFormMetadataParsed.formValidationMessages
                    .title,
            };

            isFormTouched.value = {
                city: false,
                code: false,
                manager: false,
                title: false,
            };
        } catch {
            formValidationMessages.value = {
                city: '',
                code: '',
                manager: '',
                title: '',
            };

            isFormTouched.value = {
                city: false,
                code: false,
                manager: false,
                title: false,
            };
        }
    });

    const validateTitle = () => {
        formValidationMessages.value.title = '';
        if (isEmpty(title.value)) {
            formValidationMessages.value.title = 'Title cannot be empty';
        }

        if (!isFormTouched.value.title) {
            isFormTouched.value.title = true;
        }
    };

    const {
        data: warehouses,
        refresh,
        pending,
        error,
    } = await useFetch<Warehouse[]>('/api/warehouses');

    const validateCode = () => {
        if (warehouses.value === undefined) return;
        formValidationMessages.value.code = '';
        if (isEmpty(code.value)) {
            formValidationMessages.value.code = 'Code cannot be empty';
        } else if (!isCodeUnique(code.value, warehouses.value)) {
            formValidationMessages.value.code = 'Code must be unique';
        }

        if (!isFormTouched.value.code) {
            isFormTouched.value.code = true;
        }
    };

    const validateCity = () => {
        formValidationMessages.value.city = '';
        if (isEmpty(city.value)) {
            formValidationMessages.value.city = 'City cannot be empty';
        }

        if (!isFormTouched.value.city) {
            isFormTouched.value.city = true;
        }
    };

    const validateManager = () => {
        formValidationMessages.value.manager = '';
        if (isEmpty(manager.value)) {
            formValidationMessages.value.manager = 'Manager cannot be empty';
        }

        if (!isFormTouched.value.manager) {
            isFormTouched.value.manager = true;
        }
    };

    const formResponse = ref<FormResponse>({
        isSucceed: false,
        message: '',
    });

    const refreshForm = async () => {
        manager.value = '';
        city.value = '';
        code.value = '';
        title.value = '';

        formValidationMessages.value.city = '';
        formValidationMessages.value.code = '';
        formValidationMessages.value.manager = '';
        formValidationMessages.value.title = '';

        isFormTouched.value.city = false;
        isFormTouched.value.code = false;
        isFormTouched.value.manager = false;
        isFormTouched.value.title = false;

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);

        await refresh();
        onRefreshWarehouses();
    };

    const revalidateForm = () => {
        if (warehouses.value === undefined) return false;
        formValidationMessages.value.city = '';
        formValidationMessages.value.code = '';
        formValidationMessages.value.manager = '';
        formValidationMessages.value.title = '';

        if (isEmpty(title.value)) {
            formValidationMessages.value.title = 'Title cannot be empty';
        }

        if (isEmpty(code.value)) {
            formValidationMessages.value.code = 'Code cannot be empty';
        } else if (!isCodeUnique(code.value, warehouses.value)) {
            formValidationMessages.value.code = 'Code must be unique';
        }

        if (isEmpty(city.value)) {
            formValidationMessages.value.city = 'City cannot be empty';
        }

        if (isEmpty(manager.value)) {
            formValidationMessages.value.manager = 'Manager cannot be empty';
        }

        const isCityFormValidationMessageEmpty =
            formValidationMessages.value.city === '';
        const isTitleFormValidationMessageEmpty =
            formValidationMessages.value.title === '';
        const isManagerFormValidationMessageEmpty =
            formValidationMessages.value.manager === '';
        const isCodeFormValidationMessageEmpty =
            formValidationMessages.value.code === '';

        return (
            isCityFormValidationMessageEmpty &&
            isTitleFormValidationMessageEmpty &&
            isManagerFormValidationMessageEmpty &&
            isCodeFormValidationMessageEmpty
        );
    };

    const addWarehouse = async () => {
        if (!revalidateForm()) return;

        try {
            const addedWarehouse = await $fetch<Warehouse>('/api/warehouses', {
                method: 'POST',
                body: {
                    city: city.value,
                    title: title.value,
                    manager: manager.value,
                    code: code.value,
                },
            });

            formResponse.value = {
                isSucceed: true,
                message: `Successfully added warehouse with ID ${addedWarehouse.id} and code ${addedWarehouse.code}`,
            };

            await refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during adding new warehouse',
            };
        }
    };

    return {
        city,
        manager,
        title,
        code,
        formValidationMessages,
        isFormValid,
        validateTitle,
        validateCode,
        validateCity,
        validateManager,
        formResponse,
        addWarehouse,
    };
};

export default useAddWarehouse;
