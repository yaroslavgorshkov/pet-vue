<template>
    <div class="box-col-md">
        <span
            v-if="deleteResponse.message !== ''"
            class="text-xl"
            :class="
                deleteResponse.isSucceed ? 'text-red-500' : 'text-green-500'
            "
            >{{ deleteResponse.message }}</span
        >
        <ul class="flex flex-col gap-4 max-h-[800px] min-w-[500px]">
            <li class="box-col-sm" v-for="e in props.employeesList" :key="e.id">
                <span>Full name: {{ e.fullName }}</span>
                <span>Department: {{ e.department }}</span>
                <span>Email: {{ e.email }}</span>
                <span>Position: {{ e.position }}</span>
                <span>Overtime: {{ e.isOvertime ? 'yes' : 'no' }}</span>
                <div class="flex gap-4 w-full">
                    <NuxtLink :to="`/task9/employees/${e.id}`">
                        See info
                    </NuxtLink>
                    <button class="figure" @click="deleteEmployee(e.id)">
                        Delete
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Employee } from '~~/shared/task9/types';
import '../../assets/style.css';
import useEmployeesList from '~/composables/Task9/useEmployeesList';

const props = defineProps<{
    employeesList: Employee[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
};

const { deleteEmployee, deleteResponse } = useEmployeesList(refresh);
</script>
