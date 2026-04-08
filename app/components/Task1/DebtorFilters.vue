<template>
    <div class="flex flex-col gap-3 p-4 border rounded-sm">
        <BaseTextInput label="FIO" :value="props.fioFilter" @update:value="updateFio" />
        <BaseTextInput label="Lic" :value="props.licFilter" @update:value="updateLic" />
        <BaseCheckbox label="Only with debt > 0" :checked="props.isOnlyDebtorsFilter" @update:checked="updateIsOnlyDebtorsFilter" />
    </div>
</template>

<script setup lang="ts">
import BaseCheckbox from './BaseCheckbox.vue';
import BaseTextInput from './BaseTextInput.vue';

const props = defineProps<{
    fioFilter: string
    licFilter: string
    isOnlyDebtorsFilter: boolean
}>()

const emit = defineEmits<{
    (e: 'update:fioFilter', value: string): void
    (e: 'update:licFilter', value: string): void
    (e: 'update:isOnlyDebtorsFilter', value: boolean): void
}>()

const updateFio = (value: string) => {
    emit('update:fioFilter', value);
}

const updateLic = (value: string) => {
    emit('update:licFilter', value);
}

const updateIsOnlyDebtorsFilter = (value: boolean) => {
    emit('update:isOnlyDebtorsFilter', value);
}

</script>