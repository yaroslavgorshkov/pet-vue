<template>
    <div class="flex flex-col gap-3">
        <span>Warehouse info</span>
        <div class="line"></div>
        <div class="flex gap-4">
            <span v-if="movements === undefined || errorM"
                >Something went wrong during getting movements</span
            >
            <span v-else-if="movements.length === 0"
                >Movements list is empty</span
            >
            <span v-else-if="pendingM">Pending...</span>
            <MovementsList v-else @refresh="refresh" :movements="movements" />
            <div class="flex flex-col gap-4">
                <span v-if="errorW || warehouse === undefined"
                    >Something went wrong during getting warehouse info</span
                >
                <span v-else-if="pendingW">Pending...</span>
                <WarehouseInfo v-else :warehouse="warehouse" />
                <MovementsAddForm @refresh="refresh" />
                <MovementsStatistics :movement="movements" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MovementsList from '~/components/Task8/Movements/MovementsList.vue';
import "~/assets/style.css"
import useWarehouseMovements from '~/composables/Task8/useWarehouseMovements';
import WarehouseInfo from '~/components/Task8/Warehouses/WarehouseInfo.vue';
import MovementsAddForm from '~/components/Task8/Movements/MovementsAddForm.vue';
import MovementsStatistics from '~/components/Task8/Movements/MovementsStatistics.vue';
const { errorM, errorW, movements, pendingM, pendingW, refresh, warehouse } =
    useWarehouseMovements();
</script>
