<template>
    <div class="h-dvh w-full bg-slate-300 flex items-center justify-center">
        <form
            @submit.prevent="checkPassword"
            class="flex flex-col gap-4 p-4 rounded-md border items-center bg-slate-50"
        >
            <span>Password</span>
            <CustomInput
                v-model="password"
                placeholder="*********"
            />
            <button class="w-full p-4 border rounded-md" type="submit">
                Submit
            </button>
            <span
                v-if="formResponse.statusMessage !== ''"
                class="w-full text-red-500 text-center"
                >{{ formResponse.statusMessage }}
            </span>
            <span
                v-if="passwordValidationMessage !== ''"
                class="w-full text-red-500 text-center"
                >{{ passwordValidationMessage }}
            </span>
        </form>
    </div>
</template>

<script setup lang="ts">
import CustomInput from '~/components/Task10/CustomInput.vue';
import type { Response } from '~~/shared/task12/types';

const password = ref('');

const formResponse = ref<Response>({
    isSucceed: false,
    statusMessage: '',
});

const passwordValidationMessage = ref('');

const validatePassword = () => {
    passwordValidationMessage.value = '';
    if (password.value.trim() === '') {
        passwordValidationMessage.value = 'Password cant be empty';
    }
    const isPasswordValidationMessageEmpty =
        passwordValidationMessage.value === '';
    return isPasswordValidationMessageEmpty;
};

const checkPassword = async () => {
    if (!validatePassword()) {
        setTimeout(() => {
            passwordValidationMessage.value = '';
        }, 5000);
        return;
    }

    try {
        const response = await $fetch<Response>('/api/auth/login', {
            method: 'POST',
            body: {
                password: password.value,
            },
        });

        await navigateTo('/task12/notices');
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            statusMessage:
                err.statusMessage || 'Error during checking password',
        };
    } finally {
        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                statusMessage: '',
            };
        }, 5000);
    }
};
</script>
