<template>
    <div class="flex flex-col gap-3">
        <span>Filters</span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex flex-col gap-4 p-4 rounded-md border">
            <CustomInput
                v-model="titleFilterModel"
                label="Title:"
                placeholder="title"
            />
            <CustomInput
                v-model="codeFilterModel"
                label="Code:"
                placeholder="abc-01"
            />
            <CustomInput
                v-model="leadFilterModel"
                label="Lead:"
                placeholder="Horshkov Y.D."
            />
            <CustomInput
                v-model="descriptionFilterModel"
                label="Description"
                placeholder="description"
            />
            <CustomCheckbox
                v-model="onlyBehindPlanFilterModel"
                label="Only behind plan"
            />
            <CustomTabs
                v-model="sortValueModel"
                :list="sortValueListModel"
                label="Sorting:"
            />
            <CustomTabs
                v-model="sortDirectionModel"
                :list="sortDirectionListModel"
                label="Direction:"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SortDirection, SortValues } from '~~/shared/task13/types';
import CustomInput from './CustomInput.vue';
import { sortDirectionList, sortValueList } from '#shared/task13/mockData';
import CustomCheckbox from './CustomCheckbox.vue';
import CustomTabs from './CustomTabs.vue';

const props = defineProps<{
    titleFilter: string;
    codeFilter: string;
    leadFilter: string;
    descriptionFilter: string;
    onlyBehindPlanFilter: boolean;
    sortValue: SortValues;
    sortDirection: SortDirection;
}>();

const emit = defineEmits<{
    (e: 'update:titleFilter', value: string): void;
    (e: 'update:codeFilter', value: string): void;
    (e: 'update:leadFilter', value: string): void;
    (e: 'update:descriptionFilter', value: string): void;
    (e: 'update:onlyBehindPlanFilter', value: boolean): void;
    (e: 'update:sortValue', value: SortValues): void;
    (e: 'update:sortDirection', value: SortDirection): void;
}>();

const titleFilterModel = computed({
    get: () => props.titleFilter,
    set: (value: string) => {
        emit('update:titleFilter', value);
    },
});
const codeFilterModel = computed({
    get: () => props.codeFilter,
    set: (value: string) => {
        emit('update:codeFilter', value);
    },
});
const leadFilterModel = computed({
    get: () => props.leadFilter,
    set: (value: string) => {
        emit('update:leadFilter', value);
    },
});
const descriptionFilterModel = computed({
    get: () => props.descriptionFilter,
    set: (value: string) => {
        emit('update:descriptionFilter', value);
    },
});
const onlyBehindPlanFilterModel = computed({
    get: () => props.onlyBehindPlanFilter,
    set: (value: boolean) => {
        emit('update:onlyBehindPlanFilter', value);
    },
});

const sortValueModel = computed({
    get: () => props.sortValue,
    set: (value: SortValues) => {
        emit('update:sortValue', value);
    },
});
const sortDirectionModel = computed({
    get: () => props.sortDirection,
    set: (value: SortDirection) => {
        emit('update:sortDirection', value);
    },
});
const sortValueListModel = computed(() => sortValueList);
const sortDirectionListModel = computed(() => sortDirectionList);
</script>
