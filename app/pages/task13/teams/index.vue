<template>
    <div class="flex gap-6">
        <div
            v-if="filteredTeams === undefined || error"
            class="flex items-center justify-center p-4 rounded-md border flex-1 h-fit"
        >
            <span> Error during getting teams </span>
        </div>
        <div
            v-else-if="filteredTeams.length === 0"
            class="flex items-center justify-center p-4 rounded-md border flex-1 h-fit"
        >
            <span> Teams list is empty </span>
        </div>
        <div
            v-else-if="pending"
            class="flex items-center justify-center p-4 rounded-md border flex-1 h-fit"
        >
            <span> Pending... </span>
        </div>
        <TeamsList v-else :teams-list="filteredTeams" @refresh="refresh" />
        <div class="flex flex-col gap-4 flex-1">
            <TeamsFilters
                v-model:code-filter="codeFilter"
                v-model:lead-filter="leadFilter"
                v-model:description-filter="descriptionFilter"
                v-model:only-behind-plan-filter="onlyBehindPlanFilter"
                v-model:sort-direction="sortDirection"
                v-model:sort-value="sortValue"
                v-model:title-filter="titleFilter"
            />
            <TeamsAddForm @refresh="refresh" />
            <TeamsStatistics :teams-list="teams" :reports-list="reports" />
        </div>
        <div
            v-if="recentWatchedTeamsList === undefined || recentWatchedTeamsList.length === 0"
            class="flex items-center justify-center p-4 rounded-md border flex-1 h-fit"
        >
            <span> Recent watched teams list is empty </span>
        </div>
        <RecentWatchedTeams v-else :teams-list="recentWatchedTeamsList" />
    </div>
</template>

<script setup lang="ts">
import RecentWatchedTeams from '~/components/Task13/RecentWatchedTeams.vue';
import TeamsAddForm from '~/components/Task13/TeamsAddForm.vue';
import TeamsFilters from '~/components/Task13/TeamsFilters.vue';
import TeamsList from '~/components/Task13/TeamsList.vue';
import TeamsStatistics from '~/components/Task13/TeamsStatistics.vue';
import useTeamsPage from '~/composables/Task13/useTeamsPage';

definePageMeta({
    middleware: 'task13-auth',
    layout: 'task13',
});

const {
    teams,
    reports,
    filteredTeams,
    error,
    pending,
    refreshTeams,
    refreshReports,
    titleFilter,
    codeFilter,
    leadFilter,
    descriptionFilter,
    onlyBehindPlanFilter,
    sortValue,
    sortDirection,
    recentWatchedTeamsList,
} = useTeamsPage();

const refresh = async () => {
    await refreshTeams();
    await refreshReports();
};
</script>
