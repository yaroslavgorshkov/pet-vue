<template>
    <div class="flex flex-col gap-3 p-4 border rounded-2xl">
        <span>All quests count: {{ questCount }}</span>
        <span>All incomplete quests count: {{ incompleteQuestCount }}</span>
        <span>All rewards sum: {{ questRewardCount }}</span>
    </div>
</template>

<script setup lang="ts">
import type { QuestData } from './questsMockData';


const props = defineProps < {
    list: QuestData[];
} > ()

const questCount = computed(() => props.list.length);
const incompleteQuestCount = computed(() => props.list.filter(q => !q.isCompleted).length);
const questRewardCount = computed(() => props.list.reduce((acc, q) => acc + q.reward, 0));

</script>