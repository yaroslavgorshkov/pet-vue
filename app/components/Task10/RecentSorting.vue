<template>
    <ul
        class="flex flex-col gap-4 p-4 rounded-md border flex-1 max-h-[400px] overflow-y-auto"
    >
        <li
            v-for="r in props.recentSortingList"
            :key="r.id"
            class="flex flex-col gap-3 p-3 rounded-md border"
        >
            <span>Value: {{ r.value }}</span>
            <span>Direction: {{ r.direction }}</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { RecentSorting } from '~~/shared/task10/types';

const props = defineProps<{
    recentSortingList: RecentSorting[];
}>();
</script>
