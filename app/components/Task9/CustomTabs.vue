<template>
    <ul class="flex rounded-md gap-3 p-2">
        <li
            v-for="v in list"
            :key="v.id"
            :class="
                props.modelValue === v.value ? 'bg-gray-500' : 'bg-transparent'
            "
            class="rounded-lg p-2"
        >
            <button @click="onClick(v.value)">{{ v.label }}</button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type {
    EmployeesFiltersSortTabs,
    EmployeesFiltersSortTabsValues,
    EmployeeSortingDirection,
    EmployeeSortingDirectionValue,
} from '#shared/task9/types';

const props = defineProps<{
    list: EmployeesFiltersSortTabs[] | EmployeeSortingDirection[];
    modelValue: EmployeesFiltersSortTabsValues | EmployeeSortingDirectionValue;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onClick = (value: string) => {
    emit('update:modelValue', value);
};
</script>
