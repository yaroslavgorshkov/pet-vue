<template>
    <div class="flex flex-col gap-3">
        <span> All debtors count: {{ allDebtorsCount }} </span>
        <span> All debtors with positive debt count: {{ allDebtorsWithPositiveDebtCount }} </span>
        <span> All debt: {{ allDebt }} </span>
    </div>
</template>

<script setup lang="ts">
import type { DebtorInfo } from '~/assets/debtorsMockData';


const props = defineProps<{
    list: DebtorInfo[]
}>()

const allDebtorsCount = computed(() => props.list.length)
const allDebtorsWithPositiveDebtCount = computed(() => props.list.filter(d => d.debt > 0).length);
const allDebt = computed(() => props.list.reduce((acc, d) => acc + d.debt, 0));

</script>