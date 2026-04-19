<template>
    <div class="flex flex-col gap-3 max-w-[500px]">
        <span>Profile</span>
        <div class="h-px bg-black w-full"></div>
        <div class="p-4 rounded-md border flex flex-col gap-4">
            <span>Name: Admin</span>
            <span>Surname: Adminenko</span>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'task12',
    middleware: 'task12-auth',
});
</script>
