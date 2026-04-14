<template>
    <div class="flex flex-col gap-3">
        <span>Change movement</span>
        <div class="line"></div>
        <form class="box-col-md" @submit.prevent="changeMovement">
            <CustomInput
                v-model="month"
                type="text"
                label="Month: "
                placeholder="2026-02"
                @blur="validateMonth"
            />
            <span
                v-if="formValidationMessages.month !== ''"
                class="text-red-500"
                >{{ formValidationMessages.month }}</span
            >

            <CustomInput
                v-model="incoming"
                type="number"
                label="Incoming: "
                placeholder="1000"
                @blur="validateIncoming"
            />
            <span
                v-if="formValidationMessages.incoming !== ''"
                class="text-red-500"
                >{{ formValidationMessages.incoming }}</span
            >

            <CustomInput
                v-model="outgoing"
                type="number"
                label="Outgoing: "
                placeholder="1000"
                @blur="validateOutgoing"
            />
            <span
                v-if="formValidationMessages.outgoing !== ''"
                class="text-red-500"
                >{{ formValidationMessages.outgoing }}</span
            >

            <button type="submit" class="figure" :disabled="!isFormValid">
                Change
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
import type { MonthlyMovement } from '~~/shared/task8/types';
import '../../../assets/style.css';
import CustomInput from '../CustomFormItems/CustomInput.vue';
import useChangeMovement from '~/composables/Task8/useChangeMovement';

const props = defineProps<{
    movement: MonthlyMovement | undefined;
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const {
    changeMovement,
    formResponse,
    formValidationMessages,
    incoming,
    month,
    outgoing,
    validateIncoming,
    validateMonth,
    validateOutgoing,
    isFormValid,
} = useChangeMovement(props, refresh);
</script>
