<template>
    <div class="flex flex-col border rounded-md p-4 gap-3">
        <span>Debtors filters:</span>
        <BaseTextInput v-model="fioFilterModel" label="FIO:"/>
        <BaseTextInput v-model="licFilterModel" label="LIC:"/>
        <BaseCheckbox v-model="isOnlyDebtorsFilterModel" label="Only debtors:"/>
    </div>
</template>

<script setup lang="ts">
import BaseCheckbox from '../Task5/BaseCheckbox.vue';
import BaseTextInput from '../Task5/BaseTextInput.vue';

const props = defineProps<{
    fioFilter: string;
    licFilter: string;
    isOnlyDebtorsFilter: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:fioFilter', value: string): void;
    (e: 'update:licFilter', value: string): void;
    (e: 'update:isOnlyDebtorsFilter', value: boolean): void;
}>();

const fioFilterModel = computed({
    get: () => props.fioFilter,
    set: (value: string) => {
        emit('update:fioFilter', value);
    },
});

const licFilterModel = computed({
    get: () => props.licFilter,
    set: (value: string) => {
        emit('update:licFilter', value);
    },
});

const isOnlyDebtorsFilterModel = computed({
    get: () => props.isOnlyDebtorsFilter,
    set: (value: boolean) => {
        emit('update:isOnlyDebtorsFilter', value);
    },
});
</script>
