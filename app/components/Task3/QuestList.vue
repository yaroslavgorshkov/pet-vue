<template>
    <ul class="flex flex-col gap-3 p-4 border rounded-2xl m-0">
        <li v-for="quest in props.list" :key="quest.id" class="flex flex-col gap-2 p-2 m-0 border rounded-md">
            <span>Quest title: {{ quest.title }}</span>
            <span>Quest zone: {{ quest.zone }}</span>
            <span>Quest reward: {{ quest.reward }}</span>
            <span>Is completed?: {{ quest.isCompleted ? 'yes' : 'no' }}</span>
            <NuxtLink :to="`/task3/quests/${quest.id}`">
                See details
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { QuestData } from './questsMockData';

const props = defineProps<{
    list: QuestData[];
}>()

</script>