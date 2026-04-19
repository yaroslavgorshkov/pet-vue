<template>
    <div class="flex flex-col gap-3">
        <span>Info</span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex flex-col gap-4 p-4 rounded-md border">
            <span v-if="props.notice === undefined">ID: cannot calculate</span>
            <span v-else>ID: {{ props.notice.id }}</span>

            <span v-if="props.notice === undefined"
                >Title: cannot calculate</span
            >
            <span v-else>Title: {{ props.notice.title }}</span>

            <span v-if="props.notice === undefined"
                >Category: cannot calculate</span
            >
            <span v-else>Category: {{ props.notice.category }}</span>

            <span v-if="props.notice === undefined"
                >Content: cannot calculate</span
            >
            <span v-else>Content: {{ props.notice.content }}</span>

            <span v-if="props.notice === undefined"
                >Pinned: cannot calculate</span
            >
            <span v-else
                >Pinned: {{ props.notice.isPinned ? 'yes' : 'no' }}</span
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Notice } from '~~/shared/task12/types';

const props = defineProps<{
    notice: Notice | undefined;
}>();
</script>
