<template>
    <div class="flex flex-col gap-3">
        <span> My weaponry </span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex gap-4">
            <span v-if="pending">Pending...</span>
            <span v-else-if="error">Error during getting weapons list</span>
            <span v-else-if="filteredList.length === 0"
                >Weapons list is empty</span
            >
            <WeaponList v-else :list="filteredList" @refresh="refreshView" />
            <div class="flex flex-col gap-3">
                <WeaponFilters
                    v-model:weapon-is-equipped="wOnlyEquippedFilter"
                    v-model:weapon-name="wNameFilter"
                    v-model:weapon-type="wTypeFilter"
                />
                <WeaponStats :list="filteredList" />
                <WeaponCreationForm @refresh="refreshView"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '#shared/types';
import WeaponCreationForm from '~/components/Task5/WeaponCreationForm.vue';
import WeaponFilters from '~/components/Task5/WeaponFilters.vue';
import WeaponList from '~/components/Task5/WeaponList.vue';
import WeaponStats from '~/components/Task5/WeaponStats.vue';

const wNameFilter = ref('');
const wTypeFilter = ref('');
const wOnlyEquippedFilter = ref(false);

const {
    data: weaponList,
    error,
    pending,
    refresh,
} = await useFetch<Weapon[]>('/api/weapons');

const filteredList = computed(() => {
    let filtered = weaponList.value;
    if (filtered !== undefined) {
        filtered = filtered
            .filter((w) =>
                w.name.toLowerCase().includes(wNameFilter.value.toLowerCase())
            )
            .filter((w) =>
                w.type.toLowerCase().includes(wTypeFilter.value.toLowerCase())
            );
        if (wOnlyEquippedFilter.value) {
            return filtered.filter((w) => w.isEquipped);
        }
        return filtered;
    }
    return [];
});

const refreshView = async () => {
    await refresh();
};

type WeaponFilters = {
    wNameFilter: string;
    wTypeFilter: string;
    wOnlyEquippedFilter: boolean;
};

watch(
    [wNameFilter, wTypeFilter, wOnlyEquippedFilter],
    ([wNameFilterNew, wTypeFilterNew, wOnlyEquippedFilterNew]) => {
        const weaponFilter = {
            wNameFilter: wNameFilterNew,
            wTypeFilter: wTypeFilterNew,
            wOnlyEquippedFilter: wOnlyEquippedFilterNew,
        };
        localStorage.setItem('weapon-filters', JSON.stringify(weaponFilter));
    }
);

onMounted(() => {
    const weaponFilters = localStorage.getItem('weapon-filters');
    if (weaponFilters !== null) {
        try {
            const weaponFiltersParsed = JSON.parse(
                weaponFilters
            ) as WeaponFilters;
            wNameFilter.value = weaponFiltersParsed.wNameFilter;
            wTypeFilter.value = weaponFiltersParsed.wTypeFilter;
            wOnlyEquippedFilter.value = weaponFiltersParsed.wOnlyEquippedFilter;
        } catch (err) {
            wNameFilter.value = '';
            wTypeFilter.value = '';
            wOnlyEquippedFilter.value = false;
            console.log('error during json parse', err);
        }
    }
});
</script>
