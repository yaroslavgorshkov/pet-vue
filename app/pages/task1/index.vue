<template>
    <div class="flex flex-col gap-4 items-start">
        <DebtorFilters v-model:fio-filter="fioFilter" v-model:is-only-debtors="isOnlyDebtors"
            v-model:lic-filter="licFilter" />
        <button class="p-3 rounded-xl border" @click="onFiltersReset">
            Reset filters
        </button>
        <div class="flex gap-4">
            <DebtorList :list="filteredDebtorsList" />
            <DebtorStats :list="filteredDebtorsList" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { debtorsMockData } from '~/assets/debtorsMockData';
import DebtorFilters  from '~/components/Task2/DebtorFilters.vue';
import DebtorList  from '~/components/Task2/DebtorList.vue';
import DebtorStats  from '~/components/Task2/DebtorStats.vue';

type DebtsFilters = {
    fioFilter: string
    licFilter: string
    isOnlyDebtors: boolean
}

const fioFilter = ref('');
const licFilter = ref('');
const isOnlyDebtors = ref(false);

const filteredDebtorsList = computed(() => {
    const filteredList = debtorsMockData
        .filter(d => d.fullName.toLowerCase().includes(fioFilter.value.toLowerCase()))
        .filter(d => d.lic.includes(licFilter.value))
    if (isOnlyDebtors.value) {
        return filteredList.filter(d => d.debt > 0);
    }
    return filteredList;
})

watch([fioFilter, licFilter, isOnlyDebtors], ([fioFilterNew, licFilterNew, isOnlyDebtorsNew]) => {
    const filters = { fioFilter: fioFilterNew, licFilter: licFilterNew, isOnlyDebtors: isOnlyDebtorsNew };
    localStorage.setItem('debt-filters', JSON.stringify(filters));
})

onMounted(() => {
    const debtFilters = localStorage.getItem('debt-filters');
    if (debtFilters !== null) {
        try {
            const debtFiltersParsed: DebtsFilters = JSON.parse(debtFilters);

            fioFilter.value = debtFiltersParsed.fioFilter;
            licFilter.value = debtFiltersParsed.licFilter;
            isOnlyDebtors.value = debtFiltersParsed.isOnlyDebtors;
        } catch (error) {
            console.error('json parse error:', error);
        }
    }
})

const onFiltersReset = () => {
    fioFilter.value = ''
    licFilter.value = ''
    isOnlyDebtors.value = false
}

</script>
