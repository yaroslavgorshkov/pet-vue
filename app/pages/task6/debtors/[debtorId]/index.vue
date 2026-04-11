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
                    >This user doesn`t have any debts</span
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
                        <button
                            class="p-3 border rounded-md"
                            @click="() => deleteRecord(debt.id)"
                        >
                            Delete record
                        </button>
                        <NuxtLink class="rounded-md p-3 border flex justify-center" :to="`/task6/debtors/${debtorId}/records/${debt.id}`">
                            See details
                        </NuxtLink>
                    </li>
                </ul>
                <span v-if="totalDebt === undefined"
                    >Cannot calculate total debt</span
                >
                <span v-else>Total debt: {{ totalDebt }}</span>
            </div>
            <form @submit.prevent="addRecord" class="flex flex-col gap-3">
                <BaseTextInput
                    placeholder="2026-03"
                    @blur="validateMonth"
                    type="text"
                    v-model="month"
                    label="Month:"
                />
                <span
                    v-if="formValidationMessage.month !== ''"
                    class="text-sm text-red-400"
                    >{{ formValidationMessage.month }}</span
                >
                <BaseTextInput
                    placeholder="Enter a charge..."
                    type="number"
                    @blur="validateCharge"
                    v-model.number="charge"
                    label="Charge:"
                />
                <span
                    v-if="formValidationMessage.charge !== ''"
                    class="text-sm text-red-400"
                    >{{ formValidationMessage.charge }}</span
                >
                <BaseTextInput
                    placeholder="Enter a payment..."
                    type="number"
                    @blur="validatePayment"
                    v-model.number="payment"
                    label="Payment:"
                />

                <span
                    v-if="formValidationMessage.payment !== ''"
                    class="text-sm text-red-400"
                    >{{ formValidationMessage.payment }}</span
                >
                <ClientOnly>
                    <button
                        :disabled="!isFormValid"
                        type="submit"
                        class="w-fit border rounded-md p-3"
                    >
                        Add monthly record
                    </button>
                </ClientOnly>
                <span
                    v-if="formResponse.message !== ''"
                    class="text-sm"
                    :class="
                        formResponse.isSucceed
                            ? 'text-green-400'
                            : 'text-red-400'
                    "
                    >{{ formResponse.message }}</span
                >
            </form>
            <div class="flex flex-col gap-4 p-4 rounded-md border">
                <span>Record delete message (if deleting was happened):</span>
                <span
                    v-if="deleteRecordResponseInfo.message !== ''"
                    class="text-sm"
                    :class="
                        deleteRecordResponseInfo.isDeletedSuccessfully
                            ? 'text-green-400'
                            : 'text-red-400'
                    "
                    >{{ deleteRecordResponseInfo.message }}</span
                >
            </div>
        </div>
        <NuxtLink :to="'/task6'"> Back home </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import BaseTextInput from '~/components/Task6/BaseTextInput.vue';
import type { Debtor, MonthlyRecord } from '~~/shared/types';

type FormValidationMessage = {
    month: string;
    charge: string;
    payment: string;
};

const formValidationMessage = ref<FormValidationMessage>({
    charge: '',
    month: '',
    payment: '',
});

type IsFormTouched = {
    month: boolean;
    charge: boolean;
    payment: boolean;
};

const isFromTouched = ref<IsFormTouched>({
    charge: false,
    month: false,
    payment: false,
});

const isFormValid = computed(() => {
    const isMonthValidationMessageEmpty =
        formValidationMessage.value.month === '';
    const isChargeValidationMessageEmpty =
        formValidationMessage.value.charge === '';
    const isPaymentValidationMessageEmpty =
        formValidationMessage.value.payment === '';

    return (
        isMonthValidationMessageEmpty &&
        isChargeValidationMessageEmpty &&
        isPaymentValidationMessageEmpty &&
        isFromTouched.value.charge &&
        isFromTouched.value.payment &&
        isFromTouched.value.month
    );
});

const month = ref('');
const validateMonth = () => {
    formValidationMessage.value.month = '';
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/;

    if (month.value.trim() === '') {
        formValidationMessage.value.month = 'Month field cannot be empty';
    } else if (!regex.test(month.value)) {
        formValidationMessage.value.month =
            'Month is not in valid format. Example: 2026-02';
    }

    if (!isFromTouched.value.month) {
        isFromTouched.value.month = true;
    }
};

const charge = ref<number | ''>('');
const validateCharge = () => {
    formValidationMessage.value.charge = '';

    if (charge.value === '') {
        formValidationMessage.value.charge = 'Charge cannot be empty';
    } else if (charge.value < 0) {
        formValidationMessage.value.charge = 'Charge cannot be negative number';
    }

    if (!isFromTouched.value.charge) {
        isFromTouched.value.charge = true;
    }
};

const payment = ref<number | ''>('');
const validatePayment = () => {
    formValidationMessage.value.payment = '';

    if (payment.value === '') {
        formValidationMessage.value.payment = 'Payment cannot be empty';
    } else if (payment.value < 0) {
        formValidationMessage.value.payment =
            'Payment cannot be negative number';
    }

    if (!isFromTouched.value.payment) {
        isFromTouched.value.payment = true;
    }
};

const totalDebt = computed(() => {
    if (monthlyDebts.value !== undefined) {
        return (
            monthlyDebts.value.reduce((acc, r) => acc + Number(r.charge), 0) -
            monthlyDebts.value.reduce((acc, r) => acc + Number(r.payment), 0)
        );
    }
});

const route = useRoute();
const debtorId = Number(route.params.debtorId);

const { data: debtor, refresh: refreshDebtor } = await useFetch<Debtor>(
    `/api/debtors/${debtorId}`
);
const { data: monthlyDebts, refresh: refreshRecord } = await useFetch<
    MonthlyRecord[]
>(`/api/records/${debtorId}`);

const revalidateForm = () => {
    formValidationMessage.value.month = '';
    formValidationMessage.value.charge = '';
    formValidationMessage.value.payment = '';

    if (month.value.trim() === '') {
        formValidationMessage.value.month = 'Month field cannot be empty';
    } else if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(month.value)) {
        formValidationMessage.value.month =
            'Month is not in valid format. Example: 2026-02';
    }

    if (charge.value === '') {
        formValidationMessage.value.charge = 'Charge cannot be empty';
    } else if (charge.value < 0) {
        formValidationMessage.value.charge = 'Charge cannot be negative number';
    }

    if (payment.value === '') {
        formValidationMessage.value.payment = 'Payment cannot be empty';
    } else if (payment.value < 0) {
        formValidationMessage.value.payment =
            'Payment cannot be negative number';
    }

    const isMonthValidationMessageEmpty =
        formValidationMessage.value.month === '';
    const isChargeValidationMessageEmpty =
        formValidationMessage.value.charge === '';
    const isPaymentValidationMessageEmpty =
        formValidationMessage.value.payment === '';

    return (
        isMonthValidationMessageEmpty &&
        isChargeValidationMessageEmpty &&
        isPaymentValidationMessageEmpty &&
        isFromTouched.value.charge &&
        isFromTouched.value.month &&
        isFromTouched.value.payment
    );
};

type FormResponse = {
    isSucceed: boolean;
    message: string;
};

const formResponse = ref<FormResponse>({
    isSucceed: false,
    message: '',
});

const refreshForm = async (record: MonthlyRecord) => {
    month.value = '';
    charge.value = '';
    payment.value = '';

    isFromTouched.value = {
        charge: false,
        month: false,
        payment: false,
    };

    formValidationMessage.value = {
        charge: '',
        month: '',
        payment: '',
    };

    formResponse.value = {
        isSucceed: true,
        message: `Successfully added new month record with ID ${record.id}`,
    };

    await refreshDebtor();
    await refreshRecord();
};

const addRecord = async () => {
    if (!revalidateForm()) return;    

    try {
        const newRecord = await $fetch<MonthlyRecord>(`/api/records`, {
            method: 'POST',
            body: {
                debtorId: debtorId,
                month: month.value,
                charge: charge.value,
                payment: payment.value,
            },
        });

        await refreshForm(newRecord);
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            message: err.message || 'Server error',
        };
    } finally {
        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);
    }
};

type DeleteRecordResponseInfo = {
    isDeletedSuccessfully: boolean;
    message: string;
};
const deleteRecordResponseInfo = ref<DeleteRecordResponseInfo>({
    isDeletedSuccessfully: false,
    message: '',
});

const deleteRecord = async (recordId: number) => {
    try {
        const deletedRecord = $fetch(`/api/records/${recordId}`, {
            method: 'DELETE',
        });

        deleteRecordResponseInfo.value = {
            isDeletedSuccessfully: true,
            message: `Successfully deleted record of user ${debtorId} with ID ${(await deletedRecord).id}`,
        };

        await refreshRecord();
        await refreshDebtor();
    } catch (err: any) {
        deleteRecordResponseInfo.value = {
            isDeletedSuccessfully: false,
            message: err.message || 'Error during deleting record',
        };
    } finally {
        setTimeout(() => {
            deleteRecordResponseInfo.value = {
                isDeletedSuccessfully: false,
                message: '',
            };
        }, 10000);
    }
};
</script>
