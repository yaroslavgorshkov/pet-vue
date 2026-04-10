<template>
    <div class="flex flex-col gap-4">
        <span v-if="!debtor">There are no debtors with this ID</span>
        <div v-else class="flex gap-4">
            <div class="flex flex-col gap-4 p-4 rounded-md border">
                <div class="flex flex-col gap-2 p-3 rounded-md border">
                    <span>FullName: {{ debtor.fullName }}</span>
                    <span>Address: {{ debtor.address }}</span>
                    <span>Lic: {{ debtor.lic }}</span>
                    <span>Phone: {{ debtor.phone }}</span>
                    <span
                        >Is active debtor?:
                        {{ debtor.isActive ? 'yes' : 'no' }}</span
                    >
                </div>
                <span
                    v-if="
                        monthlyDebts === undefined || monthlyDebts.length === 0
                    "
                    >This user doesn`t have any debts`</span
                >
                <ul v-else class="flex flex-col gap-2 p-3 rounded-md border">
                    <li
                        v-for="debt in monthlyDebts"
                        class="flex flex-col gap-2 p-2 rounded-md border"
                    >
                        <span>Month: {{ debt.month }}</span>
                        <span>Charge: {{ debt.charge }}</span>
                        <span>Payment: {{ debt.payment }}</span>
                        <span>Debtor ID: {{ debt.debtorId }}</span>
                    </li>
                </ul>
                <span v-if="totalDebt === undefined">Cannot calculate total debt</span>
                <span v-else>Total debt: {{ totalDebt }}</span>
            </div>
            <form @submit.prevent="addRecord">
                <BaseTextInput v-model="month" label="Month:" />
                <BaseTextInput v-model.number="charge" label="Charge:" />
                <BaseTextInput v-model.number="payment" label="Payment:" />
                <button type="submit" class="w-fit border rounded-md p-3">
                    Add monthly record
                </button>
            </form>
        </div>
        <NuxtLink :to="'/task6'"> Back home </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import BaseTextInput from '~/components/Task5/BaseTextInput.vue';
import type { Debtor, MonthlyRecord } from '~~/shared/types';

const month = ref('');
const charge = ref(0);
const payment = ref(0);

const route = useRoute();
const id = Number(route.params.id);

const { data: debtor, refresh: refreshDebtor } = await useFetch<Debtor>(
    `/api/debtors/${id}`
);
const { data: monthlyDebts, refresh: refreshRecord } = await useFetch<
    MonthlyRecord[]
>(`/api/records/${id}`);

const totalDebt = computed(() => {
    if (monthlyDebts.value !== undefined) {
        return (
            monthlyDebts.value.reduce((acc, r) => acc + r.charge, 0) -
            monthlyDebts.value.reduce((acc, r) => acc + r.payment, 0)
        );
    }
});

const addRecord = async () => {
    await $fetch(`/api/records`, {
        method: 'POST',
        body: {
            debtorId: id,
            month: month.value,
            charge: charge.value,
            payment: payment.value,
            totalDebt: totalDebt.value
        },
    });

    month.value = '';
    charge.value = 0;
    payment.value = 0;

    await refreshDebtor();
    await refreshRecord();
};
</script>
