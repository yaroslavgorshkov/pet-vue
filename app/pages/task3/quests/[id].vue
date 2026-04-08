<template>
    <div v-if="quest" class="flex flex-col gap-3 p-4">
        <span>Title: {{ quest.title }}</span>
        <span>Zone: {{ quest.zone }}</span>
        <span>Reward: {{ quest.reward }}</span>
        <span>Is completed?: {{ quest.isCompleted ? "yes" : "no" }}</span>
        <NuxtLink :to="`/task3`">
            Back home
        </NuxtLink>
    </div>
    <span v-else>
        No quests with this id
    </span>
</template>

<script setup lang="ts">
import { questsMockData } from '~/components/Task3/questsMockData';

const routeParams = useRoute().params;
const quest = computed(() => questsMockData.find(q => q.id === Number(routeParams.id)))

</script>