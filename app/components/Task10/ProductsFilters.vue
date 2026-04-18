<template>
    <div class="flex flex-col gap-3">
        <span>Filters</span>
        <div class="line"></div>
        <div class="box-col-md">
            <CustomInput
                v-model="titleFilterModel"
                label="Title:"
                placeholder="Keyboard"
            />
            <CustomInput
                v-model="categoryFilterModel"
                label="Category:"
                placeholder="Tech"
            />
            <CustomInput
                v-model="minPriceFilterModel"
                label="Min price:"
                placeholder="100"
                type="number"
            />
            <CustomInput
                v-model="maxPriceFilterModel"
                label="Max price:"
                placeholder="500"
                type="number"
            />
            <CustomCheckbox v-model="inStockFilterModel" label="In stock: " />
            <CustomTabs
                label="Sorting:"
                v-model="sortValueModel"
                :list="tabsSortingValue"
            />
            <CustomTabs
                label="Direction:"
                v-model="sortDirectionModel"
                :list="tabsSortingDirection"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    TabsSortingDirection,
    TabsSortingValue,
} from '~~/shared/task10/types';
import '../../assets/style.css';
import CustomInput from './CustomInput.vue';
import CustomCheckbox from './CustomCheckbox.vue';
import CustomTabs from './CustomTabs.vue';
import {
    tabsSortingValue,
    tabsSortingDirection,
} from '#shared/task10/mockData';

const props = defineProps<{
    titleFilter: string;
    categoryFilter: string;
    maxPriceFilter: number | '';
    minPriceFilter: number | '';
    inStockFilter: boolean;
    sortValue: TabsSortingValue;
    sortDirection: TabsSortingDirection;
}>();

const emit = defineEmits<{
    (e: 'update:titleFilter', value: string): void;
    (e: 'update:categoryFilter', value: string): void;
    (e: 'update:maxPriceFilter', value: number): void;
    (e: 'update:minPriceFilter', value: number): void;
    (e: 'update:inStockFilter', value: boolean): void;
    (e: 'update:sortValue', value: TabsSortingValue): void;
    (e: 'update:sortDirection', value: TabsSortingDirection): void;
}>();

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
const maxPriceFilterModel = computed({
    get: () => props.maxPriceFilter,
    set: (value: number) => {
        emit('update:maxPriceFilter', value);
    },
});
const minPriceFilterModel = computed({
    get: () => props.minPriceFilter,
    set: (value: number) => {
        emit('update:minPriceFilter', value);
    },
});
const inStockFilterModel = computed({
    get: () => props.inStockFilter,
    set: (value: boolean) => {
        emit('update:inStockFilter', value);
    },
});
const sortValueModel = computed({
    get: () => props.sortValue,
    set: (value: TabsSortingValue) => {
        emit('update:sortValue', value);
    },
});
const sortDirectionModel = computed({
    get: () => props.sortDirection,
    set: (value: TabsSortingDirection) => {
        emit('update:sortDirection', value);
    },
});
</script>
