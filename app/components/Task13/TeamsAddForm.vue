<template>
    <div class="flex flex-col gap-3">
        <span>Team add form</span>
        <div class="w-full h-px bg-black"></div>
        <form
            class="flex flex-col gap-4 p-4 border rounded-md"
            @submit.prevent="addTeam"
        >
            <CustomInput
                v-model="title"
                label="Title:"
                placeholder="Title"
                @blur="validateTitle"
            />
            <span
                v-if="formValidationMessages.title !== ''"
                class="text-red-500"
                >{{ formValidationMessages.title }}</span
            >

            <CustomInput
                v-model="code"
                label="Code:"
                placeholder="abc-01"
                @blur="validateCode"
            />
            <span
                v-if="formValidationMessages.code !== ''"
                class="text-red-500"
                >{{ formValidationMessages.code }}</span
            >

            <CustomInput
                v-model="lead"
                label="Lead:"
                placeholder="Yar Yun Go"
                @blur="validateLead"
            />
            <span
                v-if="formValidationMessages.lead !== ''"
                class="text-red-500"
                >{{ formValidationMessages.lead }}</span
            >

            <CustomInput
                v-model="description"
                label="Description:"
                placeholder="Description"
                @blur="validateDescription"
            />
            <span
                v-if="formValidationMessages.description !== ''"
                class="text-red-500"
                >{{ formValidationMessages.description }}</span
            >
            <button
                type="submit"
                class="w-full p-4 border rounded-md"
                :disabled="!isFormValid"
            >
                Add
            </button>
            <span
                v-if="formResponse.message !== ''"
                class="w-full text-center"
                :class="
                    formResponse.isSucceed ? 'text-green-500' : 'text-red-500'
                "
                >{{ formResponse.message }}</span
            >
        </form>
    </div>
</template>

<script setup lang="ts">
import useTeamsAddForm from '~/composables/Task13/useTeamsAddForm';
import CustomInput from './CustomInput.vue';

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const {
    title,
    code,
    lead,
    description,
    isFormValid,
    formValidationMessages,
    formResponse,
    validateTitle,
    validateCode,
    validateLead,
    validateDescription,
    addTeam,
} = useTeamsAddForm(refresh);
</script>
