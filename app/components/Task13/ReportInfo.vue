<template>
    <div class="flex flex-col gap-3">
        <span>Report info</span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex flex-col gap-4 p-4 rounded-md border">
            <span v-if="props.report === undefined">ID: cannot calculate</span>
            <span v-else>ID: {{ props.report.id }}</span>

            <span v-if="props.report === undefined"
                >Month: cannot calculate</span
            >
            <span v-else>Month: {{ props.report.month }}</span>

            <span v-if="props.report === undefined"
                >Planned tasks: cannot calculate</span
            >
            <span v-else>Planned tasks: {{ props.report.plannedTasks }}</span>

            <span v-if="props.report === undefined"
                >Completed tasks: cannot calculate</span
            >
            <span v-else
                >Completed tasks: {{ props.report.completedTasks }}</span
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyReport } from '~~/shared/task13/types';

const props = defineProps<{
    report: MonthlyReport | undefined;
}>();
</script>
