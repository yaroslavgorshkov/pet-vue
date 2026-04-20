<template>
    <div class="flex gap-10">
        <div
            v-if="reports === undefined || error"
            class="flex-1 flex items-center justify-center p-4 border rounded-md h-fit"
        >
            <span>Error during getting reports</span>
        </div>
        <div
            v-else-if="pending"
            class="flex-1 flex items-center justify-center p-4 border rounded-md h-fit"
        >
            <span>Pending...</span>
        </div>
        <div
            v-else-if="reports.length === 0"
            class="flex-1 flex items-center justify-center p-4 border rounded-md h-fit"
        >
            <span>Reports list is empty</span>
        </div>
        <TeamReportsList v-else :reports-list="reports" @refresh="refresh"/>
        <div class="flex-1 flex flex-col gap-4">
            <TeamInfo :team="team"/>
            <ReportAddForm @refresh="refresh"/>
            <TeamStatistics :reports-list="reports"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import ReportAddForm from '~/components/Task13/ReportAddForm.vue';
import TeamInfo from '~/components/Task13/TeamInfo.vue';
import TeamReportsList from '~/components/Task13/TeamReportsList.vue';
import TeamStatistics from '~/components/Task13/TeamStatistics.vue';
import useTeamReportsPage from '~/composables/Task13/useTeamReportsPage';

definePageMeta({
    layout: 'task13',
    middleware: 'task13-auth',
});

const { reports, team, error, pending, refreshReports, refreshTeam } =
    useTeamReportsPage();

const refresh = async () => {
    await refreshReports();
    await refreshTeam();
}
</script>
