<template>
    <div class="flex flex-col gap-3">
        <span>Filters</span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex flex-col gap-4 rounded-md border p-4">
            <CustomInput
                v-model="titleFilterModel"
                placeholder="enter filter..."
                label="Title filter"
                type="text"
            />
            <CustomInput
                v-model="codeFilterModel"
                placeholder="enter filter..."
                label="Code filter"
                type="text"
            />
            <CustomCheckbox
                v-model="isOnlyOverBudgetFilterModel"
                placeholder="enter filter..."
                label="Only over budget filter"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomCheckbox from './CustomCheckbox.vue';
import CustomInput from './CustomInput.vue';

// PROPS EMITS
const props = defineProps<{
    titleFilter: string;
    codeFilter: string;
    isOnlyOverBudgetFilter: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:titleFilter', value: string): void;
    (e: 'update:codeFilter', value: string): void;
    (e: 'update:isOnlyOverBudgetFilter', value: boolean): void;
}>();

// COMPUTED
const titleFilterModel = computed({
    get: () => props.titleFilter,
    set: (value) => {
        emit('update:titleFilter', value);
    },
});

const codeFilterModel = computed({
    get: () => props.codeFilter,
    set: (value) => {
        emit('update:codeFilter', value);
    },
});

const isOnlyOverBudgetFilterModel = computed({
    get: () => props.isOnlyOverBudgetFilter,
    set: (value) => {
        emit('update:isOnlyOverBudgetFilter', value);
    },
});
</script>
