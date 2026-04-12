<template>
    <div class="flex flex-col gap-3">
        <span>Project info</span>
        <div class="w-full h-px bg-black"></div>
        <span v-if="project === undefined">Project has not found</span>
        <span v-else-if="pendingProject">Pending...</span>
        <span v-else-if="errorProject">Error</span>
        <div v-else class="flex gap-4">
            <div class="flex flex-col gap-4">
                <span v-if="expenses === undefined"
                    >Error during getting expenses list</span
                >
                <span v-else-if="expenses.length === 0">Empty expenses list</span>
                <span v-else-if="pendingExpenses">Pending expenses...</span>
                <span v-else-if="errorExpenses"
                    >Error during getting expenses</span
                >

                <ul
                    v-else
                    class="flex flex-col gap-3 p-4 rounded-md border max-h-[700px] overflow-auto"
                >
                    <li
                        class="flex flex-col gap-4 rounded-md border p-3"
                        v-for="e in expenses"
                        :key="e.id"
                    >
                        <div class="flex flex-col gap-2">
                            <span>Month: {{ e.month }}</span>
                            <span>Planned: {{ e.planned }}</span>
                            <span>Actual: {{ e.actual }}</span>
                        </div>
                        <div class="w-full flex gap-4">
                            <button class="p-4 rounded-md border flex-1" @click="deleteExpense(e.id)">
                                Delete
                            </button>
                            <NuxtLink
                                class="p-4 rounded-md border flex-1"
                                :to="`/task7/projects/${id}/expenses/${e.id}`"
                            >
                                See details
                            </NuxtLink>
                        </div>
                    </li>
                </ul>
                <NuxtLink class="w-full p-4 rounded-md border flex justify-center" :to="'/task7'">
                    Return to homepage
                </NuxtLink>
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <span>Project Info</span>
                    <div class="w-full h-px bg-black"></div>
                    <div class="flex flex-col gap-2 p-4 rounded-md border">
                        <span>ID: {{ project.id }}</span>
                        <span>Owner: {{ project.owner }}</span>
                        <span>Title: {{ project.title }}</span>
                        <span>Description: {{ project.description }}</span>
                        <span>Code: {{ project.code }}</span>
                        <span
                            >Is over budget?:
                            {{ project.isOverBudget ? 'yes' : 'no' }}</span
                        >
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <span>Add monthly expense</span>
                    <div class="w-full h-px bg-black"></div>
                    <form @submit.prevent="addExpense" class="flex flex-col gap-3 p-4 rounded-md border">
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
                            Add monthly expense
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

                <div class="flex flex-col gap-2">
                    <span>Statistics</span>
                    <div class="w-full h-px bg-black"></div>
                    <div class="flex flex-col gap-2 p-4 rounded-md border">
                        <span v-if="totalPlanned === undefined">Total planned: cannot calculate</span>
                        <span v-else>Total planned: {{ totalPlanned }}</span>
                        <span v-if="totalActual === undefined">Total actual: cannot calculate</span>
                        <span v-else>Total actual: {{ totalActual }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomInput from '~/components/Task7/CustomInput.vue';
import type { MonthlyExpense, Project } from '~~/shared/types';

// ROUTES AND API
const route = useRoute();
const id = Number(route.params.projectId);

const {
    data: project,
    pending: pendingProject,
    error: errorProject,
    refresh: refreshProject,
} = await useFetch<Project>(`/api/projects/${id}`);

const {
    data: expenses,
    pending: pendingExpenses,
    error: errorExpenses,
    refresh: refreshExpenses,
} = await useFetch<MonthlyExpense[]>(`/api/projects/${id}/expenses`);


// COMPUTED
const totalPlanned = computed(() => {
    if(expenses.value === undefined) {
        return undefined;
    }
    const totalSum = expenses.value.reduce((acc, e) => acc + e.planned, 0);
    return totalSum;
})

const totalActual = computed(() => {
    if(expenses.value === undefined) {
        return undefined;
    }
    const totalSum = expenses.value.reduce((acc, e) => acc + e.actual, 0);
    return totalSum;
})


// BASE REFS
const month = ref('');
const planned = ref<number | ''>('');
const actual = ref<number | ''>('');


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
    } else if (actual.value < 0) {
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
    } else if (planned.value < 0) {
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

    if (month.value.trim() === '') {
        formValidationMessages.value.month = 'Month value cannot be empty';
    } else if (!regex.test(month.value)) {
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
}
const formResponse = ref<FormResponse>({
    isSucceed: false,
    message: ''
})

const revalidateForm = () => {
    formValidationMessages.value.actual = '';
    formValidationMessages.value.month = '';
    formValidationMessages.value.planned = '';
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/;

    if (actual.value === '') {
        formValidationMessages.value.actual = 'Actual value cannot be empty';
    } else if (actual.value < 0) {
        formValidationMessages.value.actual =
            'Actual value must be positive number';
    }

    if (planned.value === '') {
        formValidationMessages.value.planned = 'Planned value cannot be empty';
    } else if (planned.value < 0) {
        formValidationMessages.value.planned =
            'Planned value must be positive number';
    }

    if (month.value.trim() === '') {
        formValidationMessages.value.month = 'Month value cannot be empty';
    } else if (!regex.test(month.value)) {
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

const refreshFormAfterAddingNewExpense = async (newExpense: MonthlyExpense) => {
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
        message: `Successfully added new expense with ID ${newExpense.id}`
    }

    await refreshExpenses();
    await refreshProject();
}

const refreshFormAfterDeletingExpense = async (deletedExpense: MonthlyExpense) => {
    await refreshExpenses();
    await refreshProject();
}


// ADD EXPENSE
const addExpense = async () => {
    if(!revalidateForm()) return;

    try {
        const newExpense = await $fetch<MonthlyExpense>('/api/expenses', {
            method: 'POST',
            body: {
                projectId: id,
                month: month.value,
                planned: planned.value,
                actual: actual.value
            }
        })

        await refreshFormAfterAddingNewExpense(newExpense);

    } catch (err: any) {
        formResponse.value = {
            isSucceed: true,
            message: err.statusMessage || 'Server error'
        }
    } finally {
        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: ''
            }
        }, 10000)
    }
}

// DELETE EXPENSE
const deleteExpense = async (expenseId: number) => {
    try {
        const deletedExpense = await $fetch<MonthlyExpense>(`/api/expenses/${expenseId}`, {
            method: "DELETE"
        })

        await refreshFormAfterDeletingExpense(deletedExpense);
    } catch (err: any) {
        throw createError({
            statusCode: 400,
            statusMessage: err.statusMessage || `Server error during deleting expense with ID ${expenseId}`
        })
    }
}
</script>
