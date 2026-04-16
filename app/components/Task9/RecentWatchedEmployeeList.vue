<template>
    <ul class="box-col-md">
        <li v-for="e in employeeList" class="box-col-sm">
            <span>ID: {{ e.id }}</span>
            <span>Full name: {{ e.fullName }}</span>
            <span>Department: {{ e.department }}</span>
            <span>Email: {{ e.email }}</span>
            <span>Position: {{ e.position }}</span>
            <span>Overtime: {{ e.isOvertime ? 'yes' : 'no' }}</span>
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
