<template>
    <div class="flex flex-col gap-4">
        <QuestFilters v-model:q-title="questTitleFilter" v-model:q-zone="questZoneFilter"
            v-model:q-incomplete="isOnlyIncompleteFilter" />
        <div class="flex gap-4">
            <QuestList :list="filteredQuestList" />
            <QuestStats :list="filteredQuestList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import QuestFilters from './QuestFilters.vue';
import QuestList from './QuestList.vue';
import { questsMockData } from './questsMockData';
import QuestStats from './QuestStats.vue';

type QuestFilters = {
    questTitleFilter: string;
    questZoneFilter: string;
    isOnlyIncompleteFilter: boolean;
}

const questTitleFilter = ref('');
const questZoneFilter = ref('');
const isOnlyIncompleteFilter = ref(false);

const filteredQuestList = computed(() => {
    const filteredList = questsMockData
        .filter(q => q.title.toLowerCase().includes(questTitleFilter.value.toLowerCase()))
        .filter(q => q.zone.toLowerCase().includes(questZoneFilter.value.toLowerCase()));
    if (isOnlyIncompleteFilter.value) {
        return filteredList.filter(q => !q.isCompleted);
    }
    return filteredList;
})

watch([questTitleFilter, questZoneFilter, isOnlyIncompleteFilter], ([titleNew, zoneNew, onlyNew]) => {
    const questFilters = {
        questTitleFilter: titleNew,
        questZoneFilter: zoneNew,
        isOnlyIncompleteFilter: onlyNew
    }

    localStorage.setItem('quest-filters', JSON.stringify(questFilters));
})

onMounted(() => {
    const questFilters = localStorage.getItem('quest-filters');
    if (questFilters !== null) {
        try {
            const questFiltersParsed = JSON.parse(questFilters) as QuestFilters;
            questTitleFilter.value = questFiltersParsed.questTitleFilter;
            questZoneFilter.value = questFiltersParsed.questZoneFilter;
            isOnlyIncompleteFilter.value = questFiltersParsed.isOnlyIncompleteFilter;
        } catch (err) {
            questTitleFilter.value = '';
            questZoneFilter.value = '';
            isOnlyIncompleteFilter.value = false;
            console.log('json parse error:', err);
        }
    }
})

</script>