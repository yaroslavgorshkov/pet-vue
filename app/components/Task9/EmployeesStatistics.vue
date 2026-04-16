<template>
    <div class="flex flex-col gap-3">
        <span>Statistics</span>
        <div class="line"></div>
        <div class="box-col-md">
            <span v-if="allEmployee === undefined">
                All employee: cannot calculate
            </span>
            <span v-else> All employee: {{ allEmployee }} </span>

            <span v-if="allOvertimeEmployee === undefined">
                All overtime employee: cannot calculate
            </span>
            <span v-else>
                All overtime employee: {{ allOvertimeEmployee }}
            </span>

            <span v-if="allPlannedHours === undefined">
                All planned hours: cannot calculate
            </span>
            <span v-else> All planned hours: {{ allPlannedHours }} </span>

            <span v-if="allActualHours === undefined">
                All actual hours: cannot calculate
            </span>
            <span v-else> All actual hours: {{ allActualHours }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Employee, MonthlyWorkLog } from '~~/shared/task9/types';
import '../../assets/style.css';

const props = defineProps<{
    employeeList: Employee[] | undefined;
    worklogList: MonthlyWorkLog[] | undefined;
}>();

const allEmployee = computed(() => props.employeeList?.length);
const allOvertimeEmployee = computed(
    () => props.employeeList?.filter((e) => e.isOvertime).length
);
const allPlannedHours = computed(() =>
    props.worklogList?.reduce((acc, w) => acc + w.plannedHours, 0)
);
const allActualHours = computed(() =>
    props.worklogList?.reduce((acc, w) => acc + w.actualHours, 0)
);
</script>
