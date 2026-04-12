<template>
    <div class="flex flex-col gap-3 items-start">
        <span>Add project</span>
        <div class="h-px w-full bg-black"></div>
        <form
            @submit.prevent="addProject"
            class="flex flex-col gap-3 p-4 rounded-md border"
        >
            <CustomInput
                placeholder="Project-1"
                v-model="title"
                label="Title:"
                type="text"
                @blur="validateTitle"
            />
            <span
                v-if="validateFormMessages.title !== ''"
                class="text-sm text-red-400"
            >
                {{ validateFormMessages.title }}
            </span>
            <CustomInput
                placeholder="ABC-01"
                v-model="code"
                label="Code:"
                type="text"
                @blur="validateCode"
            />
            <span
                v-if="validateFormMessages.code !== ''"
                class="text-sm text-red-400"
            >
                {{ validateFormMessages.code }}
            </span>
            <CustomInput
                placeholder="Yaroslav Horshkov"
                v-model="owner"
                label="Owner:"
                type="text"
                @blur="validateOwner"
            />
            <span
                v-if="validateFormMessages.owner !== ''"
                class="text-sm text-red-400"
            >
                {{ validateFormMessages.owner }}
            </span>
            <CustomInput
                placeholder="Project about..."
                v-model="description"
                label="Description:"
                type="text"
                @blur="validateDescription"
            />
            <span
                v-if="validateFormMessages.description !== ''"
                class="text-sm text-red-400"
            >
                {{ validateFormMessages.description }}
            </span>
            <button
                :disabled="!isFormValid"
                type="submit"
                class="p-3 border rounded-md"
            >
                Add project
            </button>
            <span
                v-if="formResponse.message !== ''"
                class="text-sm"
                :class="
                    formResponse.isSucceed ? 'text-green-400' : 'text-red-400'
                "
                >{{ formResponse.message }}
            </span>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '~~/shared/types';
import CustomInput from './CustomInput.vue';

// BASE REFS
const title = ref('');
const code = ref('');
const owner = ref('');
const description = ref('');

// EMIT
const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

// VALIDATION REFS
type ValidateFormMessages = {
    title: string;
    code: string;
    owner: string;
    description: string;
};
const validateFormMessages = ref<ValidateFormMessages>({
    code: '',
    description: '',
    owner: '',
    title: '',
});

type IsFormTouched = {
    title: boolean;
    code: boolean;
    owner: boolean;
    description: boolean;
};
const isFormTouched = ref<IsFormTouched>({
    code: false,
    description: false,
    owner: false,
    title: false,
});

type FormResponse = {
    isSucceed: boolean;
    message: string;
};
const formResponse = ref<FormResponse>({
    isSucceed: false,
    message: '',
});

// IS FORM VALID
const isFormValid = computed(() => {
    const isTitleValidationMessageEmpty =
        validateFormMessages.value.title === '';
    const isCodeValidationMessageEmpty = validateFormMessages.value.code === '';
    const isOwnerValidationMessageEmpty =
        validateFormMessages.value.owner === '';
    const isDescriptionValidationMessageEmpty =
        validateFormMessages.value.description === '';

    return (
        isTitleValidationMessageEmpty &&
        isCodeValidationMessageEmpty &&
        isOwnerValidationMessageEmpty &&
        isDescriptionValidationMessageEmpty &&
        isFormTouched.value.code &&
        isFormTouched.value.description &&
        isFormTouched.value.owner &&
        isFormTouched.value.title
    );
});

// VALIDATION FUNCTIONS
const validateTitle = () => {
    validateFormMessages.value.title = '';
    if (title.value.trim() === '') {
        validateFormMessages.value.title = 'Title cannot be empty';
    }

    if (!isFormTouched.value.title) {
        isFormTouched.value.title = true;
    }
};

const validateCode = () => {
    validateFormMessages.value.code = '';
    if (code.value.trim() === '') {
        validateFormMessages.value.code = 'Code cannot be empty';
    }

    if (!isFormTouched.value.code) {
        isFormTouched.value.code = true;
    }
};

const validateOwner = () => {
    validateFormMessages.value.owner = '';
    if (owner.value.trim() === '') {
        validateFormMessages.value.owner = 'Owner field cannot be empty';
    }

    if (!isFormTouched.value.owner) {
        isFormTouched.value.owner = true;
    }
};

const validateDescription = () => {
    validateFormMessages.value.description = '';
    if (description.value.trim() === '') {
        validateFormMessages.value.description = 'Description cannot be empty';
    }

    if (!isFormTouched.value.description) {
        isFormTouched.value.description = true;
    }
};

// REFRESH AND REVALIDATE FORM
const revalidateForm = () => {
    validateFormMessages.value.code = '';
    validateFormMessages.value.description = '';
    validateFormMessages.value.owner = '';
    validateFormMessages.value.title = '';

    if (title.value.trim() === '') {
        validateFormMessages.value.title = 'Title cannot be empty';
    }
    if (code.value.trim() === '') {
        validateFormMessages.value.code = 'Code cannot be empty';
    }
    if (owner.value.trim() === '') {
        validateFormMessages.value.owner = 'Owner field cannot be empty';
    }
    if (description.value.trim() === '') {
        validateFormMessages.value.description = 'Description cannot be empty';
    }

    const isTitleValidationMessageEmpty =
        validateFormMessages.value.title === '';
    const isCodeValidationMessageEmpty = validateFormMessages.value.code === '';
    const isOwnerValidationMessageEmpty =
        validateFormMessages.value.owner === '';
    const isDescriptionValidationMessageEmpty =
        validateFormMessages.value.description === '';

    return (
        isTitleValidationMessageEmpty &&
        isCodeValidationMessageEmpty &&
        isOwnerValidationMessageEmpty &&
        isDescriptionValidationMessageEmpty
    );
};

const refreshForm = (newProject: Project) => {
    isFormTouched.value.code = false;
    isFormTouched.value.description = false;
    isFormTouched.value.owner = false;
    isFormTouched.value.title = false;

    validateFormMessages.value.code = '';
    validateFormMessages.value.description = '';
    validateFormMessages.value.owner = '';
    validateFormMessages.value.title = '';

    title.value = '';
    code.value = '';
    owner.value = '';
    description.value = '';

    formResponse.value = {
        isSucceed: true,
        message: `Successfully added new project with ID ${newProject.id} and code ${newProject.code}`,
    };

    emit('refresh');
};

// ADD PROJECT FUNC
const addProject = async () => {
    if (!revalidateForm()) return;

    try {
        const newProject = await $fetch<Project>('/api/projects', {
            method: 'POST',
            body: {
                title: title.value,
                code: code.value,
                owner: owner.value,
                description: description.value,
            },
        });

        refreshForm(newProject);
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error',
        };
    } finally {
        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);
    }
};
</script>
