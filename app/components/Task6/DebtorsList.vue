<template>
    <span v-if="list === undefined || list.length === 0">Debtors list is empty</span>
    <ul v-else class="flex flex-col rounded-md border p-4 gap-2 min-w-[300px]">
        <li
            v-for="debtor in list"
            class="flex flex-col p-2 gap-2 rounded-md border"
        >
            <span>Full name: {{ debtor.fullName }}</span>
            <span>Address: {{ debtor.address }}</span>
            <span>Lic: {{ debtor.lic }}</span>
            <span>Phone: {{ debtor.phone }}</span>
            <span>Is active debtor?: {{ debtor.isActive ? 'yes' : 'no' }}</span>
            <NuxtLink :to="`/task6/debtors/${debtor.id}`">
                See details
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Debtor } from '~~/shared/types';

const props = defineProps<{
    list: Debtor[] | undefined;
}>();
</script>
