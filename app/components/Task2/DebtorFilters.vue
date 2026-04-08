<template>
    <div class="flex flex-col gap-4 p-4">
        <BaseTextInput label="FIO" v-model="fioFilterModel"/>
        <BaseTextInput label="LIC" v-model="licFilterModel"/>
        <BaseCheckbox label="Only debtors" v-model="isOnlyDebtorsModel"/>
    </div>
</template>

<script setup lang="ts">
import BaseCheckbox from './BaseCheckbox.vue';
import BaseTextInput from './BaseTextInput.vue';

const props = defineProps<{
    fioFilter: string
    licFilter: string
    isOnlyDebtors: boolean
}>()

const fioFilterModel = computed({
    get: () => props.fioFilter,
    set: (value: string) => {
        emit('update:fioFilter', value);
    }
})

const licFilterModel = computed({
    get: () => props.licFilter,
    set: (value: string) => {
        emit('update:licFilter', value);
    }
})

const isOnlyDebtorsModel = computed({
    get: () => props.isOnlyDebtors,
    set: (value: boolean) => {
        emit('update:isOnlyDebtors', value);
    }
})

const emit = defineEmits<{
    (e: 'update:fioFilter', value: string): void
    (e: 'update:licFilter', value: string): void
    (e: 'update:isOnlyDebtors', value: boolean): void
}>()

</script>
