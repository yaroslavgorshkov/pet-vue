<template>
    <div class="flex flex-col gap-4 p-4 rounded-md border">
        <span v-if="totalTeams === undefined"
            >Total teams: cannot calculate</span
        >
        <span v-else>Total teams: {{ totalTeams }}</span>

        <span v-if="totalTeams === undefined"
            >Total behind plan teams: cannot calculate</span
        >
        <span v-else>Total behind plan teams: {{ totalBehindPlanTeams }}</span>

        <span v-if="allPlannedTasks === undefined"
            >All planned tasks: cannot calculate</span
        >
        <span v-else>All planned tasks: {{ allPlannedTasks }}</span>

        <span v-if="allCompletedTasks === undefined"
            >All completed tasks: cannot calculate</span
        >
        <span v-else>All completed tasks: {{ allCompletedTasks }}</span>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyReport, Team } from '~~/shared/task13/types';

const props = defineProps<{
    teamsList: Team[] | undefined;
    reportsList: MonthlyReport[] | undefined;
}>();

const totalTeams = computed(() => {
    if (props.teamsList === undefined) return undefined;
    return props.teamsList.length;
});

const totalBehindPlanTeams = computed(() => {
    if (props.teamsList === undefined) return undefined;
    return props.teamsList.filter((t) => t.isBehindPlan).length;
});

const allPlannedTasks = computed(() => {
    if (props.reportsList === undefined) return undefined;
    return props.reportsList.reduce((acc, r) => acc + r.plannedTasks, 0);
});

const allCompletedTasks = computed(() => {
    if (props.reportsList === undefined) return undefined;
    return props.reportsList.reduce((acc, r) => acc + r.completedTasks, 0);
});
</script>
