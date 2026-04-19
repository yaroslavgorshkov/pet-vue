<template>
    <div class="flex flex-col">
        <header
            class="border rounded-b p-4 flex items-center justify-center gap-4 pr-32"
        >
            <span class="flex-1 text-center"> Task11 panel </span>
            <button class="border p-4 rounded-md" @click="onLogout">
                Logout
            </button>
        </header>
        <main class="flex">
            <aside class="w-64 border p-4">
                <nav class="flex flex-col gap-4">
                    <NuxtLink
                        :to="'/task11/notices'"
                        class="border p-3 rounded-md"
                    >
                        Notices
                    </NuxtLink>
                    <NuxtLink
                        :to="'/task11/profile'"
                        class="border p-3 rounded-md"
                    >
                        Profile
                    </NuxtLink>
                    <NuxtLink
                        :to="'/task11/settings'"
                        class="border p-3 rounded-md"
                    >
                        Settings
                    </NuxtLink>
                </nav>
            </aside>
            <section class="flex-1">
                <slot />
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
const access = useCookie<null | 'granted'>('access');

const onLogout = async () => {
    access.value = null;
    await navigateTo('/task11/login')
};
</script>
