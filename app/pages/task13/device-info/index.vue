<template>
    <ClientOnly>
        <DeviceInfo />
    </ClientOnly>
</template>

<script setup lang="ts">
import DeviceInfo from '~/components/Task13/DeviceInfo.vue';

definePageMeta({
    layout: 'task13',
    middleware: 'task13-auth',
});
</script>
