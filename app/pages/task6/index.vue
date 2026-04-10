<template>
    <div class="flex flex-col gap-3 min-w-[500px] p-4 border rounded-md">
        <span class="text-xl">Debtors</span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex gap-3">
            <span v-if="pending">Pending...</span>
            <span v-else-if="error">Error, cant get debtors list</span>
            <DebtorsList v-else :list="filteredList" />
            <div class="flex flex-col gap-4">
                <DebtorFiltersNew
                    v-model:fio-filter="fioFilter"
                    v-model:lic-filter="licFilter"
                    v-model:is-only-debtors-filter="isOnlyDebtorsFilter"
                />
                <DebtorAddForm @refresh="refreshView" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DebtorAddForm from '~/components/Task6/DebtorAddForm.vue';
import DebtorFiltersNew from '~/components/Task6/DebtorFiltersNew.vue';
import DebtorsList from '~/components/Task6/DebtorsList.vue';
import type { Debtor } from '~~/shared/types';

const fioFilter = ref('');
const licFilter = ref('');
const isOnlyDebtorsFilter = ref(false);

const {
    data: debtors,
    pending,
    error,
    refresh,
} = await useFetch<Debtor[]>('/api/debtors');

const filteredList = computed(() => {
    if (debtors.value) {
        const filtered = debtors.value
            .filter((d) =>
                d.fullName.toLowerCase().includes(fioFilter.value.toLowerCase())
            )
            .filter((d) => d.lic.includes(licFilter.value));
        if (isOnlyDebtorsFilter.value) {
            return filtered.filter((d) => d.isActive);
        }
        return filtered;
    }
});

onMounted(() => {
    type DebtorsFilters = {
        fioFilter: string;
        licFilter: string;
        isOnlyDebtorsFilter: boolean;
    };
    const debtorsFilters = localStorage.getItem('debtors-filters');
    try {
        const debtorsFiltersParsed = JSON.parse(
            debtorsFilters!
        ) as DebtorsFilters;
        fioFilter.value = debtorsFiltersParsed.fioFilter;
        licFilter.value = debtorsFiltersParsed.licFilter;
        isOnlyDebtorsFilter.value = debtorsFiltersParsed.isOnlyDebtorsFilter;
    } catch (err) {
        console.log('error during json parsing', err);
        fioFilter.value = '';
        licFilter.value = '';
        isOnlyDebtorsFilter.value = false;
    }
});

watch(
    [fioFilter, licFilter, isOnlyDebtorsFilter],
    ([fioFilterNew, licFilterNew, isOnlyDebtorsFilterNew]) => {
        const debtorsFilters = {
            fioFilter: fioFilterNew,
            licFilter: licFilterNew,
            isOnlyDebtorsFilter: isOnlyDebtorsFilterNew,
        };
        localStorage.setItem('debtors-filters', JSON.stringify(debtorsFilters));
    }
);

const refreshView = async () => {
    await refresh();
};
</script>
