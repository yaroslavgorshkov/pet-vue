<template>
    <span>Statistics</span>
    <div class="line"></div>
    <div class="box-col-md">
        <span v-if="totalWarehouses === undefined"
            >Total warehouses: cannot calculate</span
        >
        <span v-else> Total warehouses: {{ totalWarehouses }} </span>
        <span v-if="deficitWarehouses == undefined">
            Total deficit warehouses: cannot calculate
        </span>
        <span v-else> Total deficit warehouses: {{ deficitWarehouses }} </span>
        <span v-if="totalIncoming === undefined">
            Total incoming: cannot calculate
        </span>
        <span v-else> Total incoming: {{ totalIncoming }} </span>
        <span v-if="totalOutgoing === undefined">
            Total outgoing: cannot calculate</span
        >
        <span v-else> Total outgoing: {{ totalOutgoing }} </span>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyMovement, Warehouse } from '~~/shared/task8/types';
import '../../../assets/style.css';
import useWarehousesStatistics from '~/composables/Task8/useWarehousesStatistics';

const props = defineProps<{
    warehouses: Warehouse[] | undefined;
    movements: MonthlyMovement[] | undefined;
}>();

const { deficitWarehouses, totalIncoming, totalOutgoing, totalWarehouses } =
    useWarehousesStatistics(props);
</script>
