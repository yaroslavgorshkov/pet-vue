<template>
    <div class="py-10 px-16">
        <div class="flex flex-col gap-6">
            <header class="flex gap-10 pl-4 items-center">
                <span class="text-xl">Teams explorer</span>
                <button @click="onLogout" class="p-4 border rounded-md">
                    Logout
                </button>
                <span v-if="formResponse.message !== ''" class="text-red-500">{{
                    formResponse.message
                }}</span>
            </header>
            <div class="w-full h-px bg-black"></div>
            <main class="flex gap-10">
                <aside class="flex flex-col gap-4 p-4 rounded-xl border min-w-[200px]">
                    <span>Navigation</span>
                    <div class="w-full h-px bg-black"></div>
                    <nav class="flex flex-col gap-3">
                        <NuxtLink :to="'/task13/teams'"> - Teams </NuxtLink>
                        <NuxtLink :to="'/task13/device-info'">
                            - Device info
                        </NuxtLink>
                    </nav>
                </aside>
                <section class="flex-1">
                    <slot />
                </section>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Response } from '~~/shared/task13/types';

const formResponse = ref<Response>({
    isSucceed: false,
    message: '',
});

const onLogout = async () => {
    try {
        const response = await $fetch<Response>('/api/auth13/logout', {
            method: 'POST',
        });

        await navigateTo('/task13/login');
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error during logout',
        };
    }
};
</script>
