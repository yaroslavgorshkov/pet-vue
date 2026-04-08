<template>
    <div class="flex flex-col gap-3 p-4 border rounded-2xl">
        <BaseTextInput v-model="qTitleModel" label="Enter quest title" />
        <BaseTextInput v-model="qZoneModel" label="Enter quest zone" />
        <BaseCheckbox v-model="qIncompleteModel" label="Only incomplete:" />
        <button @click="resetFilters">
            Reset filters
        </button>
    </div>
</template>

<script setup lang="ts">
import BaseCheckbox from './BaseCheckbox.vue';
import BaseTextInput from './BaseTextInput.vue';

const props = defineProps<{
    qTitle: string;
    qZone: string;
    qIncomplete: boolean;
}>()

const emit = defineEmits<{
    (e: 'update:qTitle', value: string): void,
    (e: 'update:qZone', value: string): void,
    (e: 'update:qIncomplete', value: boolean): void,
}>()

const qTitleModel = computed({
    get: () => props.qTitle,
    set: (value) => {
        emit('update:qTitle', value)
    }
})

const qZoneModel = computed({
    get: () => props.qZone,
    set: (value) => {
        emit('update:qZone', value)
    }
})

const qIncompleteModel = computed({
    get: () => props.qIncomplete,
    set: (value) => {
        emit('update:qIncomplete', value)
    }
})

const resetFilters = () => {
    emit('update:qTitle', '');
    emit('update:qZone', '');
    emit('update:qIncomplete', false);
}

</script>
