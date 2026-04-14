<template>
    <div class="flex flex-col gap-3">
        <span>Warehouses</span>
        <div class="line"></div>
        <div class="flex gap-4">
            <span v-if="filteredWarehouses === undefined || errorW"
                >Something went wrong during getting warehouses</span
            >
            <span v-else-if="filteredWarehouses.length === 0"
                >Warehouses list is empty</span
            >
            <span v-else-if="pendingW">Pending</span>
            <WarehousesList v-else :warehouses-list="filteredWarehouses" />
            <div class="flex flex-col gap-4">
                <WarehousesFilters
                    v-model:title-filter="titleFilter"
                    v-model:code-filter="codeFilter"
                    v-model:only-deficit-filter="onlyDeficitFilter"
                />
                <WarehousesAddForm @refresh="refresh" />
                <WarehousesStatistics
                    :warehouses="filteredWarehouses"
                    :movements="filteredMovements"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useWarehouses from '~/composables/Task8/useWarehouses';
import '../../assets/style.css';
import WarehousesList from '~/components/Task8/Warehouses/WarehousesList.vue';
import WarehousesFilters from '~/components/Task8/Warehouses/WarehousesFilters.vue';
import WarehousesAddForm from '~/components/Task8/Warehouses/WarehousesAddForm.vue';
import WarehousesStatistics from '~/components/Task8/Warehouses/WarehousesStatistics.vue';

const {
    codeFilter,
    errorW,
    filteredMovements,
    filteredWarehouses,
    onlyDeficitFilter,
    pendingW,
    refresh,
    titleFilter,
} = useWarehouses();
</script>
