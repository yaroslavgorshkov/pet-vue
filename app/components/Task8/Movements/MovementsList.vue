<template>
    <div class="box-col-md">
        <span
            v-if="deleteResponse.message !== ''"
            :class="
                deleteResponse.isSucceed ? 'text-green-500' : 'text-red-500'
            "
            >{{ deleteResponse.message }}</span
        >
        <ul class="max-h-[800px] overflow-y-auto flex flex-col gap-4 min-w-[500px]">
            <li class="box-col-sm" v-for="m in props.movements">
                <span>ID: {{ m.id }}</span>
                <span>Month: {{ m.month }}</span>
                <span>Incoming: {{ m.incoming }}</span>
                <span>Outgoing: {{ m.outgoing }}</span>
                <div class="flex w-full justify-evenly">
                    <NuxtLink
                        class="figure"
                        :to="`/task8/warehouses/${warehouseId}/movements/${m.id}`"
                    >
                        See info
                    </NuxtLink>
                    <button class="figure" @click="deleteMovement(m.id)">
                        Delete
                    </button>
                </div>
            </li>
        </ul>
        <NuxtLink class="figure w-full" :to="'/task8'">
            Back to homepage
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyMovement } from '~~/shared/task8/types';
import '../../../assets/style.css';
import useMovementList from '~/composables/Task8/useMovementList';

const props = defineProps<{
    movements: MonthlyMovement[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const { deleteMovement, deleteResponse, warehouseId } =
    useMovementList(refresh);
</script>
