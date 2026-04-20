<template>
    <div class="flex flex-col gap-3">
        <span>Patch report</span>
        <div class="w-full h-px bg-black"></div>
        <form
            class="flex flex-col gap-4 p-4 border rounded-md"
            @submit.prevent="patchReport"
        >
            <CustomInput
                v-model="month"
                label="Month:"
                placeholder="2026-04"
                @blur="validateMonth"
            />
            <span
                v-if="formValidationMessages.month !== ''"
                class="text-red-500"
                >{{ formValidationMessages.month }}</span
            >

            <CustomInput
                v-model="plannedTasks"
                label="Planned tasks:"
                placeholder="100"
                @blur="validatePlannedTasks"
                type="number"
            />
            <span
                v-if="formValidationMessages.plannedTasks !== ''"
                class="text-red-500"
                >{{ formValidationMessages.plannedTasks }}</span
            >

            <CustomInput
                v-model="completedTasks"
                label="Completed tasks:"
                placeholder="120"
                @blur="validateCompletedTasks"
                type="number"
            />
            <span
                v-if="formValidationMessages.completedTasks !== ''"
                class="text-red-500"
                >{{ formValidationMessages.completedTasks }}</span
            >

            <button
                class="w-full p-4 border rounded-md"
                :disabled="!isFormValid"
                type="submit"
            >
                Patch
            </button>
        </form>
        <span
            class="w-full text-center"
            v-if="formResponse.message !== ''"
            :class="formResponse.isSucceed ? 'text-green-500' : 'text-red-500'"
            >{{ formResponse.message }}</span
        >
    </div>
</template>

<script setup lang="ts">
import useReportPatchForm from '~/composables/Task13/useReportPatchForm';
import CustomInput from './CustomInput.vue';
import type { MonthlyReport } from '~~/shared/task13/types';

const props = defineProps<{
    report: MonthlyReport | undefined;
}>()

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
}

const {
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
} = useReportPatchForm(props, refresh);
</script>
