<template>
    <div class="flex flex-col gap-3">
        <span>Filters</span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex flex-col gap-4 p-4 rounded-md border">
            <CustomInput
                v-model="titleFilterModel"
                label="Title:"
                placeholder="Homework"
            />
            <CustomInput
                v-model="categoryFilterModel"
                label="Category:"
                placeholder="School"
            />
            <CustomInput
                v-model="contentFilterModel"
                label="Content:"
                placeholder="Make math till 21:00"
            />
            <CustomCheckbox
                v-model="onlyPinnedFilterModel"
                label="Only pinned:"
            />
            <CustomTabs
                v-model="sortValueModel"
                :list="sortValueItemsList"
                label="Sort:"
            />
            <CustomTabs
                v-model="sortDirectionModel"
                :list="sortDirectionItemsList"
                label="Direction:"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SortDirection, SortValue } from '~~/shared/task12/types';
import CustomInput from '../Task10/CustomInput.vue';
import CustomCheckbox from '../Task10/CustomCheckbox.vue';
import CustomTabs from '../Task12/CustomTabs.vue';
import { sortValueItems, sortDirectionItems } from '#shared/task12/mockData';

const props = defineProps<{
    titleFilter: string;
    categoryFilter: string;
    contentFilter: string;
    onlyPinnedFilter: boolean;
    sortValue: SortValue;
    sortDirection: SortDirection;
}>();

const emit = defineEmits<{
    (e: 'update:titleFilter', value: string): void;
    (e: 'update:categoryFilter', value: string): void;
    (e: 'update:contentFilter', value: string): void;
    (e: 'update:onlyPinnedFilter', value: boolean): void;
    (e: 'update:sortValue', value: SortValue): void;
    (e: 'update:sortDirection', value: SortDirection): void;
}>();

const sortValueItemsList = computed(() => sortValueItems);
const sortDirectionItemsList = computed(() => sortDirectionItems);

const titleFilterModel = computed({
    get: () => props.titleFilter,
    set: (value: string) => {
        emit('update:titleFilter', value);
    },
});
const categoryFilterModel = computed({
    get: () => props.categoryFilter,
    set: (value: string) => {
        emit('update:categoryFilter', value);
    },
});
const contentFilterModel = computed({
    get: () => props.contentFilter,
    set: (value: string) => {
        emit('update:contentFilter', value);
    },
});
const onlyPinnedFilterModel = computed({
    get: () => props.onlyPinnedFilter,
    set: (value: boolean) => {
        emit('update:onlyPinnedFilter', value);
    },
});

const sortValueModel = computed({
    get: () => props.sortValue,
    set: (value: SortValue) => {
        emit('update:sortValue', value);
    },
});
const sortDirectionModel = computed({
    get: () => props.sortDirection,
    set: (value: SortDirection) => {
        emit('update:sortDirection', value);
    },
});
</script>
