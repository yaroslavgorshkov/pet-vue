<template>
    <div class="flex flex-col gap-4">
        <div v-if="debtor" class="flex flex-col gap-2">
            <span> Name: {{ debtor.fullName }} </span>
            <span> Lic: {{ debtor.lic }} </span>
            <span> Debt: {{ debtor.debt }} </span>
        </div>
        <div v-else>
            <span>
                There are no debtors with this ID
            </span>
        </div>
        <NuxtLink :to="'/'">
            Return to homepage
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { debtorsMockData } from '~/assets/debtorsMockData';


const route = useRoute();
const debtor = computed(() => {
    return debtorsMockData.find(d => d.id === Number(route.params.id))
})

</script>