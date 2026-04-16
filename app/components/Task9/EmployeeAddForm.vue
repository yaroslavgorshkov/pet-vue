<template>
    <div class="flex flex-col gap-3">
        <span>Filters</span>
        <div class="line"></div>
        <form class="box-col-md" @submit.prevent="addEmployee">
            <CustomInput
                v-model="fullName"
                label="Full name:"
                placeholder="John Doe"
                @blur="fullNameValidation"
            />
            <span
                v-if="formValidationMessages.fullName !== ''"
                class="text-sm text-red-500"
            >
                {{ formValidationMessages.fullName }}
            </span>
            <CustomInput
                v-model="department"
                label="Department:"
                placeholder="IT"
                @blur="departmentValidation"
            />
            <span
                v-if="formValidationMessages.department !== ''"
                class="text-sm text-red-500"
            >
                {{ formValidationMessages.department }}
            </span>
            <CustomInput
                v-model="email"
                label="Email:"
                placeholder="john.doe@gmail.com"
                @blur="emailValidation"
            />
            <span
                v-if="formValidationMessages.email !== ''"
                class="text-sm text-red-500"
            >
                {{ formValidationMessages.email }}
            </span>
            <CustomInput
                v-model="position"
                label="Position:"
                placeholder="worker"
                @blur="positionValidation"
            />
            <span
                v-if="formValidationMessages.position !== ''"
                class="text-sm text-red-500"
            >
                {{ formValidationMessages.position }}
            </span>
            <button class="figure" type="submit" :disabled="!isFormValid">
                Add
            </button>
            <span
                v-if="formResponse.message !== ''"
                :class="
                    formResponse.isSucceed ? 'text-green-500' : 'text-red-500'
                "
                >{{ formResponse.message }}</span
            >
        </form>
    </div>
</template>

<script setup lang="ts">
import useEmployeeAddForm from '~/composables/Task9/useEmployeeAddForm';
import '../../assets/style.css';
import CustomInput from './CustomInput.vue';

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const {
    addEmployee,
    department,
    departmentValidation,
    email,
    emailValidation,
    formValidationMessages,
    fullName,
    fullNameValidation,
    isFormValid,
    position,
    positionValidation,
    formResponse,
} = useEmployeeAddForm(refresh);
</script>
