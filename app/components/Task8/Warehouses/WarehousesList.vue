<template>
    <ul class="box-col-md max-h-[800px] min-w-[600px] overflow-y-auto">
        <span
            class="text-sm"
            :class="formResponse.isSucceed ? 'text-green-500' : 'text-red-500'"
            >{{ formResponse.message }}</span
        >
        <li v-for="w in warehousesList" class="box-col-sm">
            <span>Title: {{ w.title }}</span>
            <span>Code: {{ w.code }}</span>
            <span>Manager: {{ w.manager }}</span>
            <span>City: {{ w.city }}</span>
            <span>Is in deficit?: {{ w.isInDeficit ? 'yes' : 'no' }}</span>
            <div class="flex gap-3 justify-evenly">
                <NuxtLink :to="`/task8/warehouses/${w.id}`" class="figure">
                    See info
                </NuxtLink>
                <button @click="deleteWarehouse(w.id)" class="figure">
                    Delete
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Warehouse } from '#shared/task8/types';
import useWarehouseList from '~/composables/Task8/useWarehousesList';
import '../../../assets/style.css';

const props = defineProps<{
    warehousesList: Warehouse[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const onRefresh = () => {
    emit('refresh');
};

const { deleteWarehouse, formResponse } = useWarehouseList(onRefresh);
</script>
