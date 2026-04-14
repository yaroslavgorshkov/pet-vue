<template>
    <div class="flex flex-col gap-3">
        <span>Movement info</span>
        <div class="line"></div>
        <div class="box-col-md">
            <span>ID: {{ movement.id }}</span>
            <span>Month: {{ movement.month }}</span>
            <span>Incoming: {{ movement.incoming }}</span>
            <span>Outgoing: {{ movement.outgoing }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MonthlyMovement } from '~~/shared/task8/types';
import '../../../assets/style.css';

const props = defineProps<{
    movement: MonthlyMovement
}>();

</script>
