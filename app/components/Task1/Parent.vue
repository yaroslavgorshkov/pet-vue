<template>
    <div class="flex flex-col gap-4">
        <DebtorFilters v-model:fio-filter="fioFilter" v-model:lic-filter="licFilter"
            v-model:is-only-debtors-filter="isOnlyDebtorsFilter" />
        <button @click="resetFiltersAndLS" class="rounded-full max-w-[240px] border p-3 ml-4">
            Reset filters and local storage
        </button>
        <ul class="flex flex-col gap-2 p-4 border rounded-sm m-0">
            <li v-for="debtor in filteredDebtors" :key="debtor.id" class="p-2 rounded-sm flex flex-col gap-1 text-sm">
                <span>Full name: {{ debtor.fullName }}</span>
                <span>Full lic: {{ debtor.lic }}</span>
                <span>Full debt: {{ debtor.debt }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { debtorsMockData } from '~/assets/debtorsMockData';
import DebtorFilters from './DebtorFilters.vue';

onMounted(() => {
    const fioFilterFromLS = localStorage.getItem('fioFilter');
    if (fioFilterFromLS !== null) {
        fioFilter.value = fioFilterFromLS;
    }

    const licFilterFromLS = localStorage.getItem('licFilter');
    if (licFilterFromLS !== null) {
        licFilter.value = licFilterFromLS;
    }

    const isOnlyDebtorsFilterFromLS = localStorage.getItem('isOnlyDebtorsFilter');
    console.log(isOnlyDebtorsFilterFromLS);
    if (isOnlyDebtorsFilterFromLS === 'false' || isOnlyDebtorsFilterFromLS === null) {
        isOnlyDebtorsFilter.value = false;
    } else {
        isOnlyDebtorsFilter.value = true;
    }
})

const fioFilter = ref('')
const licFilter = ref('')
const isOnlyDebtorsFilter = ref(false)

const filteredDebtors = computed(() => {
    const filtered = debtorsMockData
        .filter(d => d.fullName.toLocaleLowerCase().includes(fioFilter.value.toLowerCase()))
        .filter(d => d.lic.includes(licFilter.value));
    if (isOnlyDebtorsFilter.value) {
        return filtered.filter(d => d.debt > 0);
    }
    return filtered;
})

watch([fioFilter, licFilter, isOnlyDebtorsFilter], ([fioFilterNew, licFilterNew, isOnlyDebtorsFilterNew]) => {
    localStorage.setItem('fioFilter', fioFilterNew);
    localStorage.setItem('licFilter', licFilterNew);
    localStorage.setItem('isOnlyDebtorsFilter', String(isOnlyDebtorsFilterNew));
})

const resetFiltersAndLS = () => {
    fioFilter.value = '';
    licFilter.value = '';
    isOnlyDebtorsFilter.value = false;
}

</script>