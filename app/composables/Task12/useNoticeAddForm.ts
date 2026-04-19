import type { Notice, Response } from '~~/shared/task12/types';

const useNoticeAddForm = (refresh: () => void) => {
    const title = ref('');
    const category = ref('');
    const content = ref('');

    type FormValidationMessages = {
        title: string;
        category: string;
        content: string;
    };
    const formValidationMessages = ref<FormValidationMessages>({
        category: '',
        content: '',
        title: '',
    });

    type IsFormTouched = {
        title: boolean;
        category: boolean;
        content: boolean;
    };
    const isFormTouched = ref<IsFormTouched>({
        category: false,
        content: false,
        title: false,
    });

    const isFormValid = computed(() => {
        const isTitleValidationMessageEmpty =
            formValidationMessages.value.title === '';
        const isCategoryValidationMessageEmpty =
            formValidationMessages.value.category === '';
        const isContentValidationMessageEmpty =
            formValidationMessages.value.content === '';

        return (
            isTitleValidationMessageEmpty &&
            isCategoryValidationMessageEmpty &&
            isContentValidationMessageEmpty &&
            isFormTouched.value.category &&
            isFormTouched.value.content &&
            isFormTouched.value.title
        );
    });

    const formResponse = ref<Response>({
        isSucceed: false,
        statusMessage: '',
    });

    const validateTitle = () => {
        formValidationMessages.value.title = '';

        if (title.value === '') {
            formValidationMessages.value.title = 'Title cannot be empty';
        }

        if (!isFormTouched.value.title) {
            isFormTouched.value.title = true;
        }
    };

    const validateContent = () => {
        formValidationMessages.value.content = '';

        if (content.value === '') {
            formValidationMessages.value.content = 'Content cannot be empty';
        }

        if (!isFormTouched.value.content) {
            isFormTouched.value.content = true;
        }
    };

    const validateCategory = () => {
        formValidationMessages.value.category = '';

        if (category.value === '') {
            formValidationMessages.value.category = 'Category cannot be empty';
        }

        if (!isFormTouched.value.category) {
            isFormTouched.value.category = true;
        }
    };

    const refreshForm = () => {
        title.value = '';
        category.value = '';
        content.value = '';

        formValidationMessages.value.category = '';
        formValidationMessages.value.title = '';
        formValidationMessages.value.content = '';

        isFormTouched.value.category = false;
        isFormTouched.value.content = false;
        isFormTouched.value.title = false;

        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                statusMessage: '',
            };
        }, 10000);

        refresh();
    };

    const revalidateForm = () => {
        formValidationMessages.value.title = '';
        if (title.value === '') {
            formValidationMessages.value.title = 'Title cannot be empty';
        }

        formValidationMessages.value.content = '';
        if (content.value === '') {
            formValidationMessages.value.content = 'Content cannot be empty';
        }

        formValidationMessages.value.category = '';
        if (category.value === '') {
            formValidationMessages.value.category = 'Category cannot be empty';
        }

        const isTitleValidationMessageEmpty =
            formValidationMessages.value.title === '';
        const isCategoryValidationMessageEmpty =
            formValidationMessages.value.category === '';
        const isContentValidationMessageEmpty =
            formValidationMessages.value.content === '';

        return (
            isTitleValidationMessageEmpty &&
            isCategoryValidationMessageEmpty &&
            isContentValidationMessageEmpty
        );
    };

    const addNotice = async () => {
        if (!revalidateForm()) return;

        try {
            const newNotice = await $fetch<Notice>('/api/notices', {
                method: 'POST',
                body: {
                    title: title.value,
                    category: category.value,
                    content: content.value,
                },
            });

            formResponse.value = {
                isSucceed: true,
                statusMessage: `Successfully added notice with ID ${newNotice.id}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                statusMessage:
                    err.statusMessage ||
                    'Server error during adding new notice',
            };
        }
    };

    return {
        title,
        category,
        content,
        validateTitle,
        validateCategory,
        validateContent,
        formResponse,
        formValidationMessages,
        addNotice,
        isFormValid,
    };
};

export default useNoticeAddForm;
