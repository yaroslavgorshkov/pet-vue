<template>
    <div class="flex flex-col gap-3">
        <span>Employee info</span>
        <div class="line"></div>
        <div class="flex gap-4">
            <div
                v-if="worklogs === undefined || errorW"
                class="figure flex-1 max-w-[500px] h-fit flex flex-col gap-3"
            >
                <span>Error during getting worklogs</span>
                <NuxtLink class="figure w-full" :to="'/task9'"
                    >Back to homepage
                </NuxtLink>
            </div>
            <div
                v-else-if="worklogs.length === 0"
                class="figure flex-1 max-w-[500px] h-fit flex flex-col gap-3"
            >
                <span>Worklog list is empty</span>
                <NuxtLink class="figure w-full" :to="'/task9'"
                    >Back to homepage
                </NuxtLink>
            </div>
            <div v-else-if="pendingW" class="figure h-fit flex-1 max-w-[500px]">
                <span>Pending...</span>
            </div>
            <div v-else class="flex flex-col gap-3 w-fit">
                <WorklogsList :worklog-list="worklogs" @refresh="refresh" />
                <NuxtLink class="figure w-full" :to="'/task9'"
                    >Back to homepage
                </NuxtLink>
            </div>

            <div class="flex flex-col gap-4">
                <EmployeeInfo :employee="employee" />
                <AddWorklogForm @refresh="refresh" />
                <EmployeeWorklogsStatistics :worklog-list="worklogs" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useEmployeeWorklogsPage from '~/composables/Task9/useEmployeeWorklogsPage';
import '../../../../assets/style.css';
import WorklogsList from '~/components/Task9/WorklogsList.vue';
import EmployeeInfo from '~/components/Task9/EmployeeInfo.vue';
import AddWorklogForm from '~/components/Task9/AddWorklogForm.vue';
import EmployeeWorklogsStatistics from '~/components/Task9/EmployeeWorklogsStatistics.vue';

const { worklogs, errorW, pendingW, refreshW, employee, refreshE } =
    useEmployeeWorklogsPage();

const refresh = async () => {
    await refreshW();
    await refreshE();
};
</script>
