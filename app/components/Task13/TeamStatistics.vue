<template>
    <div class="flex flex-col gap-3">
        <span>Statistics</span>
        <div class="bg-black h-px w-full"></div>
        <div class="flex flex-col gap-4 p-4 rounded-md border">
            <span v-if="totalCompletedTasks === undefined"
                >Total completed tasks: cannot calculate</span
            >
            <span v-else>Total completed tasks: {{ totalCompletedTasks }}</span>

            <span v-if="totalPlannedTasks === undefined"
                >Total planned tasks: cannot calculate</span
            >
            <span v-else>Total planned tasks: {{ totalPlannedTasks }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyReport } from '~~/shared/task13/types';

const props = defineProps<{
    reportsList: MonthlyReport[] | undefined;
}>();

const totalCompletedTasks = computed(() =>
    props.reportsList?.reduce((acc, r) => acc + r.completedTasks, 0)
);

const totalPlannedTasks = computed(() =>
    props.reportsList?.reduce((acc, r) => acc + r.plannedTasks, 0)
);
</script>
