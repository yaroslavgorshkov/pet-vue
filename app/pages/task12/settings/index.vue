<template>
    <div class="flex flex-col gap-3 max-w-[500px]">
        <span>Settings</span>
        <div class="w-full h-px bg-black"></div>
        <span>Some settings :)</span>
    </div>
</template>

<script>
definePageMeta({
    layout: 'task12',
    middleware: 'task12-auth',
});
</script>
