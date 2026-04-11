<template>
    <div v-if="debtor === undefined" class="flex flex-col gap-3 p-4">
        <span>There are no debtors with this ID</span>
        <NuxtLink :to="'/task6'"> Return home </NuxtLink>
    </div>
    <div v-else class="flex flex-col gap-3 p-4 rounded-md border">
        <span>Record changing menu</span>
        <div class="w-full h-px bg-black"></div>
        <span v-if="record === undefined"> Record is not found </span>
        <span v-else-if="pending"> Pending... </span>
        <span v-else-if="error"> Error during getting record </span>
        <div v-else class="flex flex-col gap-2 p-2 rounded-md border">
            <span>Debtor ID: {{ record.debtorId }}</span>
            <span>Record ID: {{ record.id }}</span>
            <span>Month: {{ record.month }}</span>
            <span>Charge: {{ record.charge }}</span>
            <span>Payment: {{ record.payment }}</span>
        </div>
        <form
            @submit.prevent="patchRecord"
            class="flex flex-col gap-2 p-2 rounded-md border"
        >
            <BaseTextInput
                type="text"
                v-model="month"
                label="Month:"
                placeholder="Enter month"
                @blur="validateMonth"
            />
            <span
                v-if="formValidationMessage.month !== ''"
                class="text-sm text-red-400"
                >{{ formValidationMessage.month }}</span
            >
            <BaseTextInput
                type="number"
                v-model="charge"
                label="Charge:"
                placeholder="Enter charge"
                @blur="validateCharge"
            />
            <span
                v-if="formValidationMessage.charge !== ''"
                class="text-sm text-red-400"
                >{{ formValidationMessage.charge }}</span
            >
            <BaseTextInput
                type="number"
                v-model="payment"
                label="Payment:"
                placeholder="Enter payment"
                @blur="validatePayment"
            />
            <span
                v-if="formValidationMessage.payment !== ''"
                class="text-sm text-red-400"
                >{{ formValidationMessage.payment }}</span
            >
            <div class="flex gap-3 items-center">
                <button
                    :disabled="!isFormValid"
                    type="submit"
                    class="p-3 rounded-md border w-fit"
                >
                    Patch record
                </button>
                <span
                    v-if="formResponse.message !== ''"
                    class="text-sm font-bold"
                    :class="
                        formResponse.isSucceed
                            ? 'text-green-400'
                            : 'text-red-400'
                    "
                >
                    {{ formResponse.message }}
                </span>
            </div>
        </form>
        <NuxtLink
            :to="`/task6/debtors/${debtorId}`"
            class="p-3 rounded-md border-[2px] w-fit"
        >
            Return to debtor info
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import BaseTextInput from '~/components/Task6/BaseTextInput.vue';
import type { MonthlyRecord } from '~~/shared/types';

const route = useRoute();
const debtorId = route.params.debtorId;

const { data: debtor } = await useFetch(`/api/debtors/${debtorId}`);

const recordId = route.params.recordId;

const {
    data: record,
    pending,
    error,
    refresh,
} = await useFetch<MonthlyRecord>(`/api/records/oneRecord/${recordId}`);

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
    charge: boolean;
    month: boolean;
    payment: boolean;
};
const isFormTouched = ref<IsFormTouched>({
    charge: false,
    month: false,
    payment: false,
});

const isFormValid = computed(() => {
    const isChargeValidationMessageEmpty =
        formValidationMessage.value.charge === '';
    const isPaymentValidationMessageEmpty =
        formValidationMessage.value.payment === '';
    const isMonthValidationMessageEmpty =
        formValidationMessage.value.month === '';

    return (
        isChargeValidationMessageEmpty &&
        isPaymentValidationMessageEmpty &&
        isMonthValidationMessageEmpty &&
        isFormTouched.value.charge &&
        isFormTouched.value.month &&
        isFormTouched.value.payment
    );
});

const month = ref('');
const validateMonth = () => {
    formValidationMessage.value.month = '';

    if (month.value.trim() === '') {
        formValidationMessage.value.month = 'Month field cannot be empty';
    } else if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(month.value)) {
        formValidationMessage.value.month =
            'Month is not in valid format. Example: 2026-02';
    }

    if (!isFormTouched.value.month) {
        isFormTouched.value.month = true;
    }
};

const charge = ref<number | ''>('');
const validateCharge = () => {
    formValidationMessage.value.charge = '';

    if (charge.value === '') {
        formValidationMessage.value.charge = 'Charge cannot be empty';
    } else if (charge.value < 0) {
        formValidationMessage.value.charge = 'Charge must be positive number';
    }

    if (!isFormTouched.value.charge) {
        isFormTouched.value.charge = true;
    }
};
const payment = ref<number | ''>('');
const validatePayment = () => {
    formValidationMessage.value.payment = '';

    if (payment.value === '') {
        formValidationMessage.value.payment = 'Payment cannot be empty';
    } else if (payment.value < 0) {
        formValidationMessage.value.payment = 'Payment must be positive number';
    }

    if (!isFormTouched.value.payment) {
        isFormTouched.value.payment = true;
    }
};

const refreshForm = async (record: MonthlyRecord) => {
    charge.value = '';
    month.value = '';
    payment.value = '';

    isFormTouched.value = {
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
        message: `Successfully patched record user ${debtorId} with id ${record.id}`,
    };
    await refresh();
};

const revalidateForm = () => {
    formValidationMessage.value.month = '';
    formValidationMessage.value.payment = '';
    formValidationMessage.value.charge = '';

    if (month.value.trim() === '') {
        formValidationMessage.value.month = 'Month field cannot be empty';
    } else if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(month.value)) {
        formValidationMessage.value.month =
            'Month is not in valid format. Example: 2026-02';
    }

    if (charge.value === '') {
        formValidationMessage.value.charge = 'Charge cannot be empty';
    } else if (charge.value < 0) {
        formValidationMessage.value.charge = 'Charge must be positive number';
    }

    if (payment.value === '') {
        formValidationMessage.value.payment = 'Payment cannot be empty';
    } else if (payment.value < 0) {
        formValidationMessage.value.payment = 'Payment must be positive number';
    }

    const isChargeValidationMessageEmpty =
        formValidationMessage.value.charge === '';
    const isPaymentValidationMessageEmpty =
        formValidationMessage.value.payment === '';
    const isMonthValidationMessageEmpty =
        formValidationMessage.value.month === '';

    return (
        isChargeValidationMessageEmpty &&
        isPaymentValidationMessageEmpty &&
        isMonthValidationMessageEmpty &&
        isFormTouched.value.charge &&
        isFormTouched.value.month &&
        isFormTouched.value.payment
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


const patchRecord = async () => {
    if (!revalidateForm()) return;

    try {
        const patchedRecord = await $fetch<MonthlyRecord>(
            `/api/records/oneRecord/${recordId}`,
            {
                method: 'PATCH',
                body: {
                    debtorId: Number(debtorId),
                    charge: charge.value,
                    payment: payment.value,
                    month: month.value,
                },
            }
        );        

        await refreshForm(patchedRecord);
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            message: err.statusMessage
                ? `Message: ${err.statusMessage}, code: ${err.statusCode}`
                : 'Error during patching changes',
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
</script>
