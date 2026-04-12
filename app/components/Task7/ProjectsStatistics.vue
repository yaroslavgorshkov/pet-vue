<template>
    <div class="flex flex-col gap-3">
        <span>Statistics</span>
        <div class="w-full h-px bg-black"></div>
        <span v-if="projects.length === 0"
            >Projects list is empty, cannot calculate statistics</span
        >
        <div v-else class="flex flex-col rounded-md border p-4 gap-3">
            <span>All project count: {{ allProjectCount }}</span>
            <span
                >Over budget projects count: {{ overBudgetProjectsCount }}</span
            >
            <span>Planned sum: {{ plannedSum }}</span>
            <span>Actual sum: {{ actualSum }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyExpense, Project } from '~~/shared/types';

// PROPS
const props = defineProps<{
    projects: Project[];
    expenses: MonthlyExpense[] | undefined;
}>();

// COMPUTED
const allProjectCount = computed(() => props.projects.length);
const overBudgetProjectsCount = computed(() => {
    return props.projects.filter((p) => p.isOverBudget).length;
});
const plannedSum = computed(() => {
    if (props.expenses === undefined) {
        throw createError({
            statusCode: 404,
            statusText:
                'Cannot calculate planned sum due to expenses array is undefined',
        });
    }
    const sum = props.expenses.reduce((acc, e) => acc + e.planned, 0);
    return sum;
});
const actualSum = computed(() => {
    if (props.expenses === undefined) {
        throw createError({
            statusCode: 404,
            statusText:
                'Cannot calculate actual sum due to expenses array is undefined',
        });
    }
    const sum = props.expenses.reduce((acc, e) => acc + e.actual, 0);
    return sum;
});
</script>
