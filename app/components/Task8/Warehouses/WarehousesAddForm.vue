<template>
    <div class="box-col-md">
        <CustomInput
            type="text"
            v-model="title"
            label="Title: "
            placeholder="title..."
            @blur="validateTitle"
        />
        <span
            v-if="formValidationMessages.title !== ''"
            class="text-sm text-red-500"
            >{{ formValidationMessages.title }}</span
        >
        <CustomInput
            type="text"
            v-model="code"
            label="Code: "
            placeholder="code..."
            @blur="validateCode"
        />
        <span
            v-if="formValidationMessages.code !== ''"
            class="text-sm text-red-500"
            >{{ formValidationMessages.code }}</span
        >
        <CustomInput
            type="text"
            v-model="manager"
            label="Manager: "
            placeholder="manager..."
            @blur="validateManager"
        />
        <span
            v-if="formValidationMessages.manager !== ''"
            class="text-sm text-red-500"
            >{{ formValidationMessages.manager }}</span
        >
        <CustomInput
            type="text"
            v-model="city"
            label="City: "
            placeholder="city..."
            @blur="validateCity"
        />
        <span
            v-if="formValidationMessages.city !== ''"
            class="text-sm text-red-500"
            >{{ formValidationMessages.city }}</span
        >
        <button :disabled="isFormValid" @click="addWarehouse">
            Add warehouse
        </button>
        <span
            v-if="formResponse.message !== ''"
            class="text-xl"
            :class="formResponse.isSucceed ? 'text-green-500' : 'text-red-500'"
            >{{ formResponse.message }}</span
        >
    </div>
</template>

<script setup lang="ts">
import useAddWarehouse from '~/composables/Task8/useAddWarehouse';
import CustomInput from '../CustomFormItems/CustomInput.vue';

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const onRefreshWarehouses = () => {
    emit('refresh');
};

const {
    addWarehouse,
    city,
    code,
    formResponse,
    formValidationMessages,
    isFormValid,
    manager,
    title,
    validateCity,
    validateCode,
    validateManager,
    validateTitle,
} = await useAddWarehouse(onRefreshWarehouses);
</script>
