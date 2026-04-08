<template>
    <ul class="m-0 p-4 flex flex-col gap-4">
        <li v-for="item in list" class="flex flex-col gap-1 border rounded-md p-4">
            <span>Name: {{ item.fullName }}</span>
            <span>Lic: {{ item.lic }}</span>
            <span>Debt: {{ item.debt }}</span>
            <NuxtLink :to="`/debtors/${item.id}`">
                See details
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { DebtorInfo } from '~/assets/debtorsMockData';

const route = useRoute();

const props = defineProps<{
    list: DebtorInfo[]
}>()

</script>