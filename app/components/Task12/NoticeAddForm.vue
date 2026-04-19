<template>
    <div class="flex flex-col gap-3">
        <span>Add notice</span>
        <div class="w-full h-px bg-black"></div>
        <form
            class="flex flex-col gap-4 border rounded-md p-4"
            @submit.prevent="addNotice"
        >
            <CustomInput
                v-model="title"
                label="Title:"
                placeholder="Workout"
                @blur="validateTitle"
            />
            <span
                v-if="formValidationMessages.title !== ''"
                class="text-red-500"
                >{{ formValidationMessages.title }}</span
            >
            <CustomInput
                v-model="category"
                label="Category:"
                placeholder="Sports"
                @blur="validateCategory"
            />
            <span
                v-if="formValidationMessages.category !== ''"
                class="text-red-500"
                >{{ formValidationMessages.category }}</span
            >
            <CustomInput
                v-model="content"
                label="Content:"
                placeholder="Make 10 push-ups"
                @blur="validateContent"
            />
            <span
                v-if="formValidationMessages.content !== ''"
                class="text-red-500"
                >{{ formValidationMessages.content }}</span
            >
            <button
                :disabled="!isFormValid"
                class="p-4 border rounded-md"
                type="submit"
            >
                Add
            </button>
        </form>
        <span
            v-if="formResponse.statusMessage !== ''"
            class="text-lg"
            :class="formResponse.isSucceed ? 'text-green-500' : 'text-red-500'"
            >{{ formResponse.statusMessage }}</span
        >
    </div>
</template>

<script setup lang="ts">
import useNoticeAddForm from '~/composables/Task12/useNoticeAddForm';
import CustomInput from '../Task10/CustomInput.vue';

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const {
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
} = useNoticeAddForm(refresh);
</script>
