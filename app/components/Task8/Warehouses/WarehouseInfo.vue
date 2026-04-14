<template>
    <span>Warehouse info</span>
    <div class="line"></div>
    <div class="box-col-md">
        <span>ID: {{ props.warehouse.id }}</span>
        <span>Title: {{ props.warehouse.title }}</span>
        <span>Code: {{ props.warehouse.code }}</span>
        <span>Manager: {{ props.warehouse.manager }}</span>
        <span>City: {{ props.warehouse.city }}</span>
        <span
            >Is deficit?:
            {{ props.warehouse.isInDeficit ? 'yes' : 'no' }}</span
        >
    </div>
</template>

<script setup lang="ts">
import type { Warehouse } from '~~/shared/task8/types';
import '../../../assets/style.css';

const props = defineProps<{
    warehouse: Warehouse;
}>();
</script>
