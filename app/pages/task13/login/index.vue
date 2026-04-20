<template>
    <div class="w-full h-dvh bg-slate-300 flex items-center justify-center">
        <form
            @submit.prevent="onLogin"
            class="flex flex-col gap-3 p-6 rounded-xl border border-gray-400 items-center bg-gray-500"
        >
            <span>Password</span>
            <div class="h-px bg-black w-full"></div>
            <input
                type="text"
                v-model="password"
                class="p-4 rounded-md border outline-none w-full"
            />
            <button type="submit" class="p-4 rounded-md w-full bg-slate-600">Login</button>
            <span
                class="text-center w-full text-lg text-red-800"
                v-if="loginResponse.message !== ''"
                >{{ loginResponse.message }}</span
            >
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Response } from '~~/shared/task13/types';

const password = ref('');
const loginResponse = ref<Response>({
    isSucceed: false,
    message: '',
});

const onLogin = async () => {
    try {
        const response = await $fetch<Response>('/api/auth13/login', {
            method: 'POST',
            body: {
                password: password.value,
            },
        });

        await navigateTo('/task13/teams');
    } catch (err: any) {
        loginResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error during login',
        };
    }
};
</script>
