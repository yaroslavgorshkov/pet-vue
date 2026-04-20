<template>
    <ul
        class="flex flex-col gap-4 p-4 rounded border flex-1 max-h-[500px] overflow-y-auto"
    >
        <li
            class="flex flex-col gap-3 rounded-md border p-3"
            v-for="t in props.teamsList"
        >
            <span>ID: {{ t.id }}</span>
            <span>Title: {{ t.title }}</span>
            <span>Code: {{ t.code }}</span>
            <span>Lead: {{ t.lead }}</span>
            <span>Description: {{ t.description }}</span>
            <span>Behind plan?: {{ t.isBehindPlan ? 'yes' : 'no' }}</span>
            <NuxtLink
                class="p-4 border rounded-md text-center w-full"
                :to="`/task13/teams/${t.id}`"
            >
                See info
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Team } from '~~/shared/task13/types';

const props = defineProps<{
    teamsList: Team[];
}>();
</script>
