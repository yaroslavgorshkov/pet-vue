<template>
    <div class="flex justify-center items-center w-full h-dvh bg-slate-500">
        <form
            class="flex flex-col p-4 border rounded-md bg-white items-center gap-4"
            @submit.prevent="onSubmit"
        >
            <span>Password</span>
            <input
                v-model="password"
                type="text"
                class="w-full outline-none p-4 rounded-md border"
            />
            <button type="submit" class="w-full border p-4 rounded-md">
                Submit
            </button>
            <span v-if="formResponse !== ''" class="text-red-500">{{
                formResponse
            }}</span>
        </form>
    </div>
</template>

<script setup lang="ts">
const formResponse = ref('');
const password = ref('');
const access = useCookie<null | 'granted'>('access', {
    default: () => null,
    maxAge: 60 * 60 * 24,
});

const onSubmit = async () => {
    if (password.value === '') {
        formResponse.value = 'Password cannot be empty';
        return;
    }
    if (password.value !== 'password') {
        formResponse.value = 'Invalid password';
        return;
    }
    access.value = 'granted';
    await navigateTo('/task11/notices');
};
</script>
