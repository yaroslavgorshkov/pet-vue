<template>
    <div class="flex flex-col p-10 gap-6 h-full">
        <header class="flex gap-6 pl-4 items-center">
            <span class="text-lg">Notices explorer</span>
            <button class="p-4 border rounded-md" @click="onLogout">
                Logout
            </button>
            <span v-if="formResponse.statusMessage !== ''" class="text-red-500">
                {{ formResponse.statusMessage }}
            </span>
        </header>
        <div class="w-full h-px bg-black"></div>
        <main class="flex gap-10 h-full">
            <aside
                class="w-[300px] p-4 rounded-md border h-full flex flex-col gap-3"
            >
                <span> Navigation </span>
                <div class="w-full h-px bg-black"></div>
                <nav class="flex flex-col gap-4">
                    <NuxtLink :to="'/task12/notices'"> - Notices </NuxtLink>
                    <NuxtLink :to="'/task12/profile'"> - Profile </NuxtLink>
                    <NuxtLink :to="'/task12/settings'"> - Settings </NuxtLink>
                </nav>
            </aside>
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Response } from '#shared/task12/types';

const formResponse = ref<Response>({
    isSucceed: false,
    statusMessage: '',
});

const onLogout = async () => {
    try {
        const response = await $fetch<Response>('/api/auth/logout', {
            method: 'POST',
        });
        console.log('response:', response.statusMessage);

        await navigateTo('/task12/auth');
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            statusMessage: err.statusMessage || 'Error during logout',
        };
    }
};
</script>
