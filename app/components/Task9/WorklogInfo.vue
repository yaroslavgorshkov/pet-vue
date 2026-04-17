<template>
    <div class="box-col-md">
        <span v-if="props.worklog === undefined">
            ID: cannot calculate
        </span>
        <span v-else>
            ID: {{ props.worklog.id }}
        </span>

        <span v-if="props.worklog === undefined">
            Month: cannot calculate
        </span>
        <span v-else>
            Month: {{ props.worklog.month }}
        </span>

        <span v-if="props.worklog === undefined">
            Planned hours: cannot calculate
        </span>
        <span v-else>
            Planned hours: {{ props.worklog.plannedHours }}
        </span>

        <span v-if="props.worklog === undefined">
            Actual hours: cannot calculate
        </span>
        <span v-else>
            Actual hours: {{ props.worklog.actualHours }}
        </span>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyWorkLog } from '~~/shared/task9/types';
import '../../assets/style.css';

const props = defineProps<{
    worklog: MonthlyWorkLog | undefined;
}>()

</script>