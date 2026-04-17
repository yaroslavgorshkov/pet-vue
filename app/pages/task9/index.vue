<template>
    <div class="flex flex-col gap-3">
        <span>Employees</span>
        <div class="line"></div>
        <div class="flex gap-4">
            <div
                v-if="errorE || filteredEmployeesList === undefined"
                class="figure w-full flex-1"
            >
                Error: cannot find employee
            </div>
            <div
                v-else-if="filteredEmployeesList.length === 0"
                class="figure w-full flex-1"
            >
                Employee list is empty
            </div>
            <div v-else-if="pendingE" class="figure w-full flex-1">Pending...</div>
            <EmployeesList v-else :employees-list="filteredEmployeesList" class="flex-1" @refresh="refresh"/>
            <div class="flex flex-col gap-4 flex-1">
                <EmployeesFilters
                    v-model:department-filter="departmentFilter"
                    v-model:email-filter="emailFilter"
                    v-model:only-overtime-filter="onlyOvertimeFilter"
                    v-model:position-filter="positionFilter"
                    v-model:sorting-direction="sortingType"
                    v-model:sorting-value="sortingValue"
                    v-model:full-name-filter="fullNameFilter"
                />
                <EmployeeAddForm @refresh="refresh" />
                <EmployeesStatistics
                    :employee-list="filteredEmployeesList"
                    :worklog-list="worklogs"
                />
            </div>
            <div class="flex flex-col gap-3 flex-1">
                <span>Recent watched employees</span>
                <div class="line"></div>
                <div
                    v-if="recentWatchedEmployees.length === 0"
                    class="figure w-full flex justify-center items-center min-w-full"
                >
                    <span>There are no recent watched employees</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useEmployeePage from '~/composables/Task9/useEmployeePage';
import '../../assets/style.css';
import EmployeesList from '~/components/Task9/EmployeesList.vue';
import EmployeesFilters from '~/components/Task9/EmployeesFilters.vue';
import EmployeeAddForm from '~/components/Task9/EmployeeAddForm.vue';
import EmployeesStatistics from '~/components/Task9/EmployeesStatistics.vue';

const refresh = async () => {
    await refreshE();
    await refreshW();
};

const {
    fullNameFilter,
    departmentFilter,
    positionFilter,
    emailFilter,
    onlyOvertimeFilter,
    sortingValue,
    sortingType,
    recentWatchedEmployees,
    filteredEmployeesList,
    errorE,
    pendingE,
    worklogs,
    refreshE,
    refreshW,
} = useEmployeePage();
</script>
