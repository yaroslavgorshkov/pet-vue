<template>
    <div class="flex flex-col gap-3 max-w-[1000px]">
        <span>Expense info</span>
        <div class="w-full h-px bg-black"></div>
        <span v-if="expense === undefined">Expense has not found</span>
        <span v-else-if="pending">Pending...</span>
        <span v-else-if="error">Error during getting expense</span>
        <div v-else class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 p-4 rounded-md border">
                <span>ID: {{ expense.id }}</span>
                <span>Project ID: {{ expense.projectId }}</span>
                <span>Month: {{ expense.month }}</span>
                <span>Planned: {{ expense.planned }}</span>
                <span>Actual: {{ expense.actual }}</span>
            </div>
            <div class="flex flex-col gap-3">
                <span>Change expense</span>
                <div class="w-full h-px bg-black"></div>
                <form
                    class="flex flex-col gap-4 rounded-md border p-4"
                    @submit.prevent="patchExpense"
                >
                    <CustomInput
                        type="text"
                        label="Month:"
                        v-model="month"
                        placeholder="2026-02"
                        @blur="validateMonth"
                    />
                    <span
                        v-if="formValidationMessages.month !== ''"
                        class="test-sm text-red-400"
                    >
                        {{ formValidationMessages.month }}
                    </span>
                    <CustomInput
                        type="number"
                        label="Planned:"
                        v-model.number="planned"
                        placeholder="1000"
                        @blur="validatePlanned"
                    />
                    <span
                        v-if="formValidationMessages.planned !== ''"
                        class="test-sm text-red-400"
                    >
                        {{ formValidationMessages.planned }}
                    </span>
                    <CustomInput
                        type="number"
                        label="Actual:"
                        v-model.number="actual"
                        placeholder="950"
                        @blur="validateActual"
                    />
                    <span
                        v-if="formValidationMessages.actual !== ''"
                        class="test-sm text-red-400"
                    >
                        {{ formValidationMessages.actual }}
                    </span>
                    <button
                        :disabled="!isFormValid"
                        type="submit"
                        class="rounded-md border w-fit p-4"
                    >
                        Patch expense
                    </button>
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
            </div>
        </div>
        <NuxtLink
            class="p-3 w-fit rounded-md border"
            :to="`/task7/projects/${projectId}`"
        >
            Back to project info
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import CustomInput from '~/components/Task7/CustomInput.vue';
import type { MonthlyExpense } from '~~/shared/types';

// FETCH AND ROUTE
const route = useRoute();
const expenseId = route.params.expenseId;
const projectId = route.params.projectId;
const {
    data: expense,
    pending,
    error,
    refresh,
} = await useFetch<MonthlyExpense>(
    `/api/projects/${projectId}/expenses/${expenseId}`
);

// BASE REFS
const month = ref('');
const planned = ref<number | ''>('');
const actual = ref<number | ''>('');

// WATCH
watch(expense, (newValue) => {
    if (newValue === undefined) return;

    month.value = newValue.month;
    actual.value = newValue.actual;
    planned.value = newValue.planned;
});

// VALIDATION REFS
type FormValidationMessages = {
    month: string;
    planned: string;
    actual: string;
};
const formValidationMessages = ref<FormValidationMessages>({
    actual: '',
    month: '',
    planned: '',
});

type IsFormTouched = {
    actual: boolean;
    month: boolean;
    planned: boolean;
};
const isFormTouched = ref<IsFormTouched>({
    actual: false,
    month: false,
    planned: false,
});

const isFormValid = computed(() => {
    const isActualValidationMessageEmpty =
        formValidationMessages.value.actual === '';
    const isMonthValidationMessageEmpty =
        formValidationMessages.value.month === '';
    const isPlannedValidationMessageEmpty =
        formValidationMessages.value.planned === '';

    return (
        isActualValidationMessageEmpty &&
        isMonthValidationMessageEmpty &&
        isPlannedValidationMessageEmpty &&
        isFormTouched.value.actual &&
        isFormTouched.value.month &&
        isFormTouched.value.planned
    );
});

// VALIDATION FUNCTIONS
const validateActual = () => {
    formValidationMessages.value.actual = '';

    if (actual.value === '') {
        formValidationMessages.value.actual = 'Actual value cannot be empty';
    } else if (actual.value! < 0) {
        formValidationMessages.value.actual =
            'Actual value must be positive number';
    }

    if (!isFormTouched.value.actual) {
        isFormTouched.value.actual = true;
    }
};

const validatePlanned = () => {
    formValidationMessages.value.planned = '';

    if (planned.value === '') {
        formValidationMessages.value.planned = 'Planned value cannot be empty';
    } else if (planned.value! < 0) {
        formValidationMessages.value.planned =
            'Planned value must be positive number';
    }

    if (!isFormTouched.value.planned) {
        isFormTouched.value.planned = true;
    }
};

const validateMonth = () => {
    formValidationMessages.value.month = '';
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/;

    if (month.value!.trim() === '') {
        formValidationMessages.value.month = 'Month value cannot be empty';
    } else if (!regex.test(month.value!)) {
        formValidationMessages.value.month =
            'Invalid month value. Example: 2026-02';
    }

    if (!isFormTouched.value.month) {
        isFormTouched.value.month = true;
    }
};

// REFRESH AND REVALIDATE FORM FUNCTIONS
type FormResponse = {
    message: string;
    isSucceed: boolean;
};
const formResponse = ref<FormResponse>({
    isSucceed: false,
    message: '',
});

const revalidateForm = () => {
    formValidationMessages.value.actual = '';
    formValidationMessages.value.month = '';
    formValidationMessages.value.planned = '';
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/;

    if (actual.value === '') {
        formValidationMessages.value.actual = 'Actual value cannot be empty';
    } else if (actual.value! < 0) {
        formValidationMessages.value.actual =
            'Actual value must be positive number';
    }

    if (planned.value === '') {
        formValidationMessages.value.planned = 'Planned value cannot be empty';
    } else if (planned.value! < 0) {
        formValidationMessages.value.planned =
            'Planned value must be positive number';
    }

    if (month.value!.trim() === '') {
        formValidationMessages.value.month = 'Month value cannot be empty';
    } else if (!regex.test(month.value!)) {
        formValidationMessages.value.month =
            'Invalid month value. Example: 2026-02';
    }

    const isActualValidationMessageEmpty =
        formValidationMessages.value.actual === '';
    const isMonthValidationMessageEmpty =
        formValidationMessages.value.month === '';
    const isPlannedValidationMessageEmpty =
        formValidationMessages.value.planned === '';

    return (
        isActualValidationMessageEmpty &&
        isMonthValidationMessageEmpty &&
        isPlannedValidationMessageEmpty
    );
};

const refreshForm = async (updatedExpense: MonthlyExpense) => {
    month.value = '';
    actual.value = '';
    planned.value = '';

    isFormTouched.value.actual = false;
    isFormTouched.value.month = false;
    isFormTouched.value.planned = false;

    formValidationMessages.value.actual = '';
    formValidationMessages.value.month = '';
    formValidationMessages.value.planned = '';

    formResponse.value = {
        isSucceed: true,
        message: `Successfully added new expense with ID ${updatedExpense.id}`,
    };

    await refresh();
};

// PATCH FUNCTION
const patchExpense = async () => {
    if (!revalidateForm()) return;

    try {
        const updatedExpense = await $fetch<MonthlyExpense>(
            `/api/expenses/${expenseId}`,
            {
                method: 'PATCH',
                body: {
                    projectId: Number(projectId),
                    month: month.value,
                    planned: planned.value,
                    actual: actual.value,
                },
            }
        );

        await refreshForm(updatedExpense);
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error',
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
