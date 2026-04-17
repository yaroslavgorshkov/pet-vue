<template>
    <ul class="box-col-md max-h-[400px] overflow-y-auto">
        <li v-for="e in employeeList" class="box-col-sm">
            <span>ID: {{ e.id }}</span>
            <span>Full name: {{ e.fullName }}</span>
            <span>Department: {{ e.department }}</span>
            <span>Email: {{ e.email }}</span>
            <span>Position: {{ e.position }}</span>
            <span>Overtime: {{ e.isOvertime ? 'yes' : 'no' }}</span>
            <NuxtLink class="figure" :to="`/task9/employees/${e.id}`">
                See info
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Employee } from '~~/shared/task9/types';
import '../../assets/style.css';

const props = defineProps<{
    employeeList: Employee[];
}>();
</script>
