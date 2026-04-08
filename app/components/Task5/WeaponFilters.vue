<template>
    <div class="flex flex-col gap-3 p-4 rounded-md border">
        <BaseTextInput label="Name:" v-model="weaponNameModel" />
        <BaseTextInput label="Type:" v-model="weaponTypeModel" />
        <BaseCheckbox label="Only equipped:" v-model="weaponIsEquippedModel" />
        <button @click="resetFilters">Reset Filters</button>
    </div>
</template>

<script setup lang="ts">
import BaseCheckbox from './BaseCheckbox.vue';
import BaseTextInput from './BaseTextInput.vue';

const props = defineProps<{
    weaponName: string;
    weaponType: string;
    weaponIsEquipped: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:weapon-name', value: string): void;
    (e: 'update:weapon-type', value: string): void;
    (e: 'update:weapon-is-equipped', value: boolean): void;
}>();

const weaponNameModel = computed({
    get: () => props.weaponName,
    set: (value) => {
        emit('update:weapon-name', value);
    },
});

const weaponTypeModel = computed({
    get: () => props.weaponType,
    set: (value) => {
        emit('update:weapon-type', value);
    },
});

const weaponIsEquippedModel = computed({
    get: () => props.weaponIsEquipped,
    set: (value) => {
        emit('update:weapon-is-equipped', value);
    },
});

const resetFilters = () => {
    emit('update:weapon-name', '');
    emit('update:weapon-type', '');
    emit('update:weapon-is-equipped', false);
}
</script>
