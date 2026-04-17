<template>
    <div class="box-col-md">
        <span v-if="worklogList === undefined"
            >Total planned hours: cannot calculate</span
        >
        <span v-else>Total planned hours: {{ totalPlannedHours }}</span>
        <span v-if="worklogList === undefined"
            >Total Actual hours: cannot calculate</span
        >
        <span v-else>Total actual hours: {{ totalActualHours }}</span>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyWorkLog } from '~~/shared/task9/types';
import '../../assets/style.css';

const props = defineProps<{
    worklogList: MonthlyWorkLog[] | undefined;
}>();

const totalActualHours = computed(() =>
    props.worklogList?.reduce((acc, w) => acc + w.actualHours, 0)
);
const totalPlannedHours = computed(() =>
    props.worklogList?.reduce((acc, w) => acc + w.plannedHours, 0)
);
</script>
