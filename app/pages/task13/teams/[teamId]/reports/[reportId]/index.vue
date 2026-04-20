<template>
    <div class="flex flex-col max-w-[600px] gap-4">
        <ReportInfo :report="report" />
        <ReportPatchForm @refresh="refresh" :report="report"/>
        <NuxtLink
            class="w-full text-center p-4 border rounded-md"
            :to="`/task13/teams/${teamId}`"
        >
            Back to team info
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import ReportInfo from '~/components/Task13/ReportInfo.vue';
import ReportPatchForm from '~/components/Task13/ReportPatchForm.vue';
import type { MonthlyReport } from '~~/shared/task13/types';

definePageMeta({
    layout: 'task13',
    middleware: 'task13-auth',
});

const route = useRoute();
const teamId = computed(() => route.params.teamId || '');
const reportId = computed(() => route.params.reportId || '');

const { data: report, refresh: refreshReport } = useFetch<MonthlyReport>(
    `/api/teams/${teamId.value}/reports/${reportId.value}`
);
const refresh = async () => {
    await refreshReport();
};
</script>
