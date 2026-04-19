<template>
    <div class="flex flex-col gap-3">
        <span>Change notice</span>
        <div class="w-full h-px bg-black"></div>
        <form
            class="flex flex-col gap-4 border rounded-md p-4"
            @submit.prevent="patchNotice"
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
            <CustomTabs
                v-model="pinnedStatus"
                :list="pinnedStatusListComputed"
                label="Pin:"
            />
            <button
                :disabled="!isFormValid"
                class="p-4 border rounded-md"
                type="submit"
            >
                Change
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
import useNoticeChangeForm from '~/composables/Task12/useNoticeChangeForm';
import CustomInput from '../Task10/CustomInput.vue';
import CustomTabs from './CustomTabs.vue';

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
    pinnedStatus,
    pinnedStatusListComputed,
    validateTitle,
    validateCategory,
    validateContent,
    isFormValid,
    patchNotice,
    formResponse,
    formValidationMessages,
} = useNoticeChangeForm(refresh);
</script>
