<template>
    <div class="flex flex-col gap-3">
        <span>Employee Info</span>
        <div class="line"></div>
        <div class="box-col-md">
            <span v-if="props.employee === undefined">
                Full name: undefined
            </span>
            <span v-else> Full name: {{ props.employee.fullName }} </span>

            <span v-if="props.employee === undefined">
                Department: undefined
            </span>
            <span v-else> Department: {{ props.employee.department }} </span>

            <span v-if="props.employee === undefined"> Email: undefined </span>
            <span v-else> Email: {{ props.employee.email }} </span>

            <span v-if="props.employee === undefined">
                Position: undefined
            </span>
            <span v-else> Position: {{ props.employee.position }} </span>

            <span v-if="props.employee === undefined">
                Is overtime: undefined
            </span>
            <span
                v-else
                :class="
                    props.employee.isOvertime
                        ? 'text-red-500'
                        : 'text-green-500'
                "
            >
                Is overtime: {{ props.employee.isOvertime ? 'yes' : 'no' }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Employee } from '~~/shared/task9/types';
import '../../assets/style.css';

const props = defineProps<{
    employee: Employee | undefined;
}>();
</script>
