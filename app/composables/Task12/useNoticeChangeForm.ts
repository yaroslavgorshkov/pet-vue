import { pinnedStatusList } from '~~/shared/task12/mockData';
import type { Notice, PinnedStatus, Response } from '~~/shared/task12/types';

const useNoticeChangeForm = (refresh: () => void) => {
    const title = ref('');
    const category = ref('');
    const content = ref('');
    const pinnedStatus = ref<PinnedStatus>('no');
    const pinnedStatusListComputed = computed(() => pinnedStatusList);

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
        const isPinnedStatusValid =
            pinnedStatus.value === 'no' || pinnedStatus.value === 'yes';

        return (
            isTitleValidationMessageEmpty &&
            isCategoryValidationMessageEmpty &&
            isContentValidationMessageEmpty &&
            isFormTouched.value.category &&
            isFormTouched.value.content &&
            isFormTouched.value.title &&
            isPinnedStatusValid
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
        const isPinnedStatusCorrect =
            pinnedStatus.value === 'no' || pinnedStatus.value === 'yes';

        return (
            isTitleValidationMessageEmpty &&
            isCategoryValidationMessageEmpty &&
            isContentValidationMessageEmpty &&
            isPinnedStatusCorrect
        );
    };

    const route = useRoute();
    const noticeId = computed(() => route.params.noticeId ?? '');
    console.log('nId');

    const patchNotice = async () => {
        if (!revalidateForm()) return;

        try {
            const patchedNotice = await $fetch<Notice>(
                `/api/notices/${noticeId.value}`,
                {
                    method: 'PATCH',
                    body: {
                        title: title.value,
                        category: category.value,
                        content: content.value,
                        isPinned: pinnedStatus.value === 'no' ? false : true,
                    },
                }
            );

            formResponse.value = {
                isSucceed: true,
                statusMessage: `Successfully patched notice with ID ${patchedNotice.id}`,
            };

            refreshForm();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                statusMessage:
                    err.statusMessage || 'Server error during patching notice',
            };
        }
    };

    return {
        title,
        category,
        content,
        pinnedStatus,
        pinnedStatusListComputed,
        validateTitle,
        validateCategory,
        validateContent,
        isFormValid,
        patchNotice,
        formResponse,
        formValidationMessages,
    };
};

export default useNoticeChangeForm;
