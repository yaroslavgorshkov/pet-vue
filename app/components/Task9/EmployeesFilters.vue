<template>
    <div class="flex flex-col gap-3">
        <span>Filters</span>
        <div class="line"></div>
        <div class="box-col-md">
            <CustomInput
                v-model="fullNameFilterModel"
                label="Full name:"
                placeholder="John Doe"
            />
            <CustomInput
                v-model="departmentFilterModel"
                label="Department:"
                placeholder="IT"
            />
            <CustomInput
                v-model="emailFilterModel"
                label="Email:"
                placeholder="john.doe@gmail.com"
            />
            <CustomInput
                v-model="positionFilterModel"
                label="Position:"
                placeholder="worker"
            />
            <CustomCheckbox
                v-model="onlyOvertimeFilterModel"
                label="Only overtime:"
            />
            <div class="line"></div>
            <div class="flex gap-3 items-center">
                Sorting:
                <CustomTabs
                    v-model="sortingValueModel"
                    :list="employeesFiltersSortType"
                />
            </div>
            <div class="flex gap-3 items-center">
                Direction:
                <CustomTabs
                    v-model="sortingDirectionModel"
                    :list="employeesSortingDirectionType"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {
    EmployeesFiltersSortTabsValues,
    EmployeeSortingDirectionValue,
} from '~~/shared/task9/types';
import {
    employeesFiltersSortTabs,
    employeesSortingDirection,
} from '#shared/task9/mockData';
import CustomCheckbox from './CustomCheckbox.vue';
import CustomInput from './CustomInput.vue';
import CustomTabs from './CustomTabs.vue';
import '../../assets/style.css';

const props = defineProps<{
    fullNameFilter: string;
    departmentFilter: string;
    emailFilter: string;
    positionFilter: string;
    onlyOvertimeFilter: boolean;
    sortingValue: EmployeesFiltersSortTabsValues;
    sortingDirection: EmployeeSortingDirectionValue;
}>();

const emit = defineEmits<{
    (e: 'update:fullNameFilter', value: string): void;
    (e: 'update:departmentFilter', value: string): void;
    (e: 'update:emailFilter', value: string): void;
    (e: 'update:positionFilter', value: string): void;
    (e: 'update:onlyOvertimeFilter', value: boolean): void;
    (e: 'update:sortingValue', value: EmployeesFiltersSortTabsValues): void;
    (e: 'update:sortingDirection', value: EmployeeSortingDirectionValue): void;
}>();

const employeesFiltersSortType = computed(() => employeesFiltersSortTabs);
const employeesSortingDirectionType = computed(() => employeesSortingDirection);

const fullNameFilterModel = computed({
    get: () => props.fullNameFilter,
    set: (value: string) => {
        emit('update:fullNameFilter', value);
    },
});
const departmentFilterModel = computed({
    get: () => props.departmentFilter,
    set: (value: string) => {
        emit('update:departmentFilter', value);
    },
});
const emailFilterModel = computed({
    get: () => props.emailFilter,
    set: (value: string) => {
        emit('update:emailFilter', value);
    },
});
const positionFilterModel = computed({
    get: () => props.positionFilter,
    set: (value: string) => {
        emit('update:positionFilter', value);
    },
});
const onlyOvertimeFilterModel = computed({
    get: () => props.onlyOvertimeFilter,
    set: (value: boolean) => {
        emit('update:onlyOvertimeFilter', value);
    },
});
const sortingValueModel = computed({
    get: () => props.sortingValue,
    set: (value: EmployeesFiltersSortTabsValues) => {
        emit('update:sortingValue', value);
    },
});
const sortingDirectionModel = computed({
    get: () => props.sortingDirection,
    set: (value: EmployeeSortingDirectionValue) => {
        emit('update:sortingDirection', value);
    },
});

const sortingValueChange = (value: EmployeesFiltersSortTabsValues) => {
    emit('update:sortingValue', value);
};
const sortingDirectionChange = (value: EmployeeSortingDirectionValue) => {
    emit('update:sortingDirection', value);
};
</script>
