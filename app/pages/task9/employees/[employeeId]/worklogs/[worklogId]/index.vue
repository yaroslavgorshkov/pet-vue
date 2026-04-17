<template>
    <div class="flex flex-col gap-3">
        <span>Worklog info</span>
        <div class="line"></div>
        <WorklogInfo :worklog="worklog" />
        <ChangeWorklogForm @refresh="refresh" />
        <NuxtLink :to="`/task9/employees/${employeeId}`" class="figure">
            Return to employee info
        </NuxtLink>
        <NuxtLink :to="`/task9`" class="figure">
            Return to homepage
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import ChangeWorklogForm from '~/components/Task9/ChangeWorklogForm.vue';
import WorklogInfo from '~/components/Task9/WorklogInfo.vue';
import type { MonthlyWorkLog } from '~~/shared/task9/types';

const route = useRoute();
const worklogId = computed(() =>
    route.params.worklogId ? Number(route.params.worklogId) : -1
);
const employeeId = computed(() => route.params.employeeId);

const { data: worklog, refresh: refreshWorklog } = useFetch<MonthlyWorkLog>(
    `/api/worklogs/${worklogId.value}`
);

const refresh = async () => {
    await refreshWorklog();
};
</script>
