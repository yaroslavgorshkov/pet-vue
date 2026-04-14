<template>
    <div class="flex flex-col gap-3">
        <span>Movement statistics</span>
        <div class="line"></div>
        <div class="box-col-md">
            <span v-if="movement === undefined"
                >Total incoming: cannot calculate</span
            >
            <span v-else>Total incoming: {{ totalIncoming }}</span>
            <span v-if="movement === undefined"
                >Total outgoing: cannot calculate</span
            >
            <span v-else>Total outgoing: {{ totalOutgoing }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyMovement } from '~~/shared/task8/types';
import '../../../assets/style.css';
import useMovementsStatistics from '~/composables/Task8/useMovementsStatistics';

const props = defineProps<{
    movement: MonthlyMovement[] | undefined;
}>();

const { totalIncoming, totalOutgoing } = useMovementsStatistics(props);
</script>
