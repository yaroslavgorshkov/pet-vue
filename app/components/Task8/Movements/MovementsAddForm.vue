<template>
    <div class="flex flex-col gap-3">
        <span>Add new month movement</span>
        <div class="line"></div>
        <form @submit.prevent="addMovement" class="box-col-md">
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
            >
                {{ formValidationMessages.month }}
            </span>
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
            >
                {{ formValidationMessages.incoming }}
            </span>
            <CustomInput
                v-model="outgoing"
                type="number"
                label="Outgoing: "
                placeholder="800"
                @blur="validateOutgoing"
            />
            <span
                v-if="formValidationMessages.outgoing !== ''"
                class="text-red-500"
            >
                {{ formValidationMessages.outgoing }}
            </span>
            <button type="submit" :disabled="!isFormValid" class="figure">Add movement</button>
        </form>
        <span
            v-if="formResponse.message !== ''"
            :class="formResponse.isSucceed ? 'text-green-500' : 'text-red-500'"
            >{{ formResponse.message }}</span
        >
    </div>
</template>

<script setup lang="ts">
import useAddMovement from '~/composables/Task8/useAddMovement';
import '../../../assets/style.css';
import CustomInput from '../CustomFormItems/CustomInput.vue';
const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const onRefresh = () => {
    emit('refresh');
};

const {
    addMovement,
    formResponse,
    formValidationMessages,
    incoming,
    isFormValid,
    month,
    outgoing,
    validateIncoming,
    validateMonth,
    validateOutgoing,
} = useAddMovement(onRefresh);
</script>
