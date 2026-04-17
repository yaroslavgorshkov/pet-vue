<template>
    <div class="flex flex-col gap-3">
        <span>Add worklog</span>
        <div class="line"></div>
        <form class="box-col-md" @submit.prevent="addWorklog">
            <CustomInput
                v-model="month"
                @blur="validateMonth"
                label="Month: "
                placeholder="2026-04"
            />
            <span
                v-if="formValidationMessages.month !== ''"
                class="text-sm text-red-500"
                >{{ formValidationMessages.month }}</span
            >
            <CustomInput
                v-model="plannedHours"
                @blur="validatePlannedHours"
                label="Planned hours: "
                placeholder="180"
                type="number"
            />
            <span
                v-if="formValidationMessages.plannedHours !== ''"
                class="text-sm text-red-500"
                >{{ formValidationMessages.plannedHours }}</span
            >
            <CustomInput
                v-model="actualHours"
                @blur="validateActualHours"
                label="Actual hours"
                placeholder="172"
                type="number"
            />
            <span
                v-if="formValidationMessages.actualHours !== ''"
                class="text-sm text-red-500"
                >{{ formValidationMessages.actualHours }}</span
            >
            <button :disabled="!isFormValid" type="submit" class="figure">
                Add
            </button>
        </form>
        <span
            v-if="formResponse.message !== ''"
            :class="formResponse.isSucceed ? 'text-green-500' : 'text-red-500'"
            >{{ formResponse.message }}</span
        >
    </div>
</template>

<script setup lang="ts">
import useAddWorklogForm from '~/composables/Task9/useAddWorklogForm';
import '../../assets/style.css';
import CustomInput from './CustomInput.vue';

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const {
    month,
    plannedHours,
    actualHours,
    validateMonth,
    validatePlannedHours,
    validateActualHours,
    formResponse,
    isFormValid,
    addWorklog,
    formValidationMessages,
} = useAddWorklogForm(refresh);
</script>
